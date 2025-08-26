type Level = 'debug' | 'info' | 'warn' | 'error';
const LOG_ENDPOINT = '/api/log';
const IS_PROD = process.env.NODE_ENV === 'production';
const MIN_LEVEL: Level =
  (process.env.NEXT_PUBLIC_LOG_LEVEL as Level) ?? (IS_PROD ? 'warn' : 'debug');

const order: Record<Level, number> = { debug: 0, info: 1, warn: 2, error: 3 };

function getSessionId() {
  try {
    const key = 'sid';
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

function base(fields?: Record<string, unknown>) {
  return {
    ...fields,
    ts: new Date().toISOString(),
    url: location.href,
    path: location.pathname,
    ref: document.referrer || undefined,
    ua: navigator.userAgent,
    lang: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    vp: { w: innerWidth, h: innerHeight },
    sessionId: getSessionId(),
  };
}

function send(payload: unknown) {
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    const ok = navigator.sendBeacon(
      LOG_ENDPOINT,
      new Blob([body], { type: 'application/json' })
    );
    if (ok) return;
  }
  fetch(LOG_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}

function shouldLog(level: Level) {
  return order[level] >= order[MIN_LEVEL];
}
function shouldSend(level: Level) {
  if (!IS_PROD) return false;
  if (level === 'error') return true;
  if (level === 'warn') return Math.random() < 0.1; // sample 10%
  return false; // info/debug không gửi ở prod
}

export const clientLogger = {
  debug(msg: string, f?: Record<string, unknown>) {
    if (shouldLog('debug')) console.debug(msg, f ?? {});
    if (shouldSend('debug')) send({ level: 'debug', msg, ...base(f) });
  },
  info(msg: string, f?: Record<string, unknown>) {
    if (shouldLog('info')) console.info(msg, f ?? {});
    if (shouldSend('info')) send({ level: 'info', msg, ...base(f) });
  },
  warn(msg: string, f?: Record<string, unknown>) {
    console.warn(msg, f ?? {});
    if (shouldSend('warn')) send({ level: 'warn', msg, ...base(f) });
  },
  error(msg: string, f?: Record<string, unknown>) {
    console.error(msg, f ?? {});
    send({ level: 'error', msg, ...base(f) });
  },
  child(bindings: Record<string, unknown>) {
    return {
      debug: (m: string, f?: Record<string, unknown>) =>
        this.debug(m, { ...bindings, ...(f ?? {}) }),
      info: (m: string, f?: Record<string, unknown>) =>
        this.info(m, { ...bindings, ...(f ?? {}) }),
      warn: (m: string, f?: Record<string, unknown>) =>
        this.warn(m, { ...bindings, ...(f ?? {}) }),
      error: (m: string, f?: Record<string, unknown>) =>
        this.error(m, { ...bindings, ...(f ?? {}) }),
    };
  },
};
