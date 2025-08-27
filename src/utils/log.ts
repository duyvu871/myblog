import winston from 'winston';
import path from 'path';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

// Define colors for each log level
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'grey',
  debug: 'white',
  silly: 'grey',
};

// Add colors to winston
winston.addColors(logColors);

// Create logs directory path
const logsDir = path.join(process.cwd(), 'logs');

// Define log format for production
const productionFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
);

// Define log format for development
const developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    let log = `${timestamp} [${level}]: ${message}`;

    // Add stack trace for errors
    if (stack) {
      log += `\n${stack}`;
    }

    // Add metadata if present
    if (Object.keys(meta).length > 0) {
      log += `\n${JSON.stringify(meta, null, 2)}`;
    }

    return log;
  })
);

// Define transports based on environment
const transports: winston.transport[] = [];

// Console transport (always enabled)
transports.push(
  new winston.transports.Console({
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
    format: process.env.NODE_ENV === 'production' ? productionFormat : developmentFormat,
  })
);

// File transports (only in production or when LOG_TO_FILE is true)
if (process.env.NODE_ENV === 'production' || process.env.LOG_TO_FILE === 'true') {
  // Error logs
  transports.push(
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      format: productionFormat,
      maxsize: 10485760, // 10MB
      maxFiles: 5,
    })
  );

  // Combined logs
  transports.push(
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      level: 'info',
      format: productionFormat,
      maxsize: 10485760, // 10MB
      maxFiles: 5,
    })
  );

  // HTTP logs (for API requests)
  transports.push(
    new winston.transports.File({
      filename: path.join(logsDir, 'http.log'),
      level: 'http',
      format: productionFormat,
      maxsize: 10485760, // 10MB
      maxFiles: 3,
    })
  );
}

// Create the Winston logger
const logger = winston.createLogger({
  levels: logLevels,
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: process.env.NODE_ENV === 'production' ? productionFormat : developmentFormat,
  transports,
  // Don't exit on handled exceptions
  exitOnError: false,
});

// Handle uncaught exceptions and unhandled rejections
if (process.env.NODE_ENV === 'production') {
  logger.exceptions.handle(
    new winston.transports.File({
      filename: path.join(logsDir, 'exceptions.log'),
      format: productionFormat,
    })
  );

  logger.rejections.handle(
    new winston.transports.File({
      filename: path.join(logsDir, 'rejections.log'),
      format: productionFormat,
    })
  );
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Log an error with stack trace and context
 */
export const logError = (error: Error | string, context?: Record<string, unknown>) => {
  if (error instanceof Error) {
    logger.error(error.message, {
      stack: error.stack,
      name: error.name,
      ...context,
    });
  } else {
    logger.error(error, context);
  }
};

/**
 * Log a warning message
 */
export const logWarning = (message: string, context?: Record<string, unknown>) => {
  logger.warn(message, context);
};

/**
 * Log an info message
 */
export const logInfo = (message: string, context?: Record<string, unknown>) => {
  logger.info(message, context);
};

/**
 * Log HTTP request/response
 */
export const logHttp = (message: string, context?: Record<string, unknown>) => {
  logger.http(message, context);
};

/**
 * Log debug information (development only)
 */
export const logDebug = (message: string, context?: Record<string, unknown>) => {
  logger.debug(message, context);
};

/**
 * Log authentication events
 */
export const logAuth = (event: string, userId?: string, context?: Record<string, unknown>) => {
  logger.info(`AUTH: ${event}`, {
    userId,
    type: 'authentication',
    ...context,
  });
};

/**
 * Log database operations
 */
export const logDatabase = (
  operation: string,
  table?: string,
  context?: Record<string, unknown>
) => {
  logger.debug(`DB: ${operation}`, {
    table,
    type: 'database',
    ...context,
  });
};

/**
 * Log API requests
 */
export const logApiRequest = (
  method: string,
  url: string,
  statusCode: number,
  responseTime: number,
  userId?: string,
  context?: Record<string, unknown>
) => {
  const level = statusCode >= 400 ? 'warn' : 'http';

  logger.log(level, `${method} ${url} ${statusCode}`, {
    method,
    url,
    statusCode,
    responseTime: `${responseTime}ms`,
    userId,
    type: 'api_request',
    ...context,
  });
};

/**
 * Log server action execution
 */
export const logServerAction = (
  actionName: string,
  success: boolean,
  duration: number,
  userId?: string,
  context?: Record<string, unknown>
) => {
  const level = success ? 'info' : 'warn';
  const status = success ? 'SUCCESS' : 'FAILED';

  logger.log(level, `SERVER_ACTION: ${actionName} - ${status}`, {
    actionName,
    success,
    duration: `${duration}ms`,
    userId,
    type: 'server_action',
    ...context,
  });
};

/**
 * Log security events
 */
export const logSecurity = (
  event: string,
  severity: 'low' | 'medium' | 'high',
  context?: Record<string, unknown>
) => {
  const level = severity === 'high' ? 'error' : severity === 'medium' ? 'warn' : 'info';

  logger.log(level, `SECURITY: ${event}`, {
    severity,
    type: 'security',
    timestamp: new Date().toISOString(),
    ...context,
  });
};

/**
 * Log performance metrics
 */
export const logPerformance = (
  metric: string,
  value: number,
  unit: string,
  context?: Record<string, unknown>
) => {
  logger.info(`PERFORMANCE: ${metric}`, {
    metric,
    value,
    unit,
    type: 'performance',
    ...context,
  });
};

/**
 * Log business events
 */
export const logBusiness = (
  event: string,
  entityType?: string,
  entityId?: string,
  context?: Record<string, unknown>
) => {
  logger.info(`BUSINESS: ${event}`, {
    event,
    entityType,
    entityId,
    type: 'business',
    ...context,
  });
};

// ============================================================================
// DEVELOPMENT HELPERS
// ============================================================================

/**
 * Create a function timer for performance logging
 */
export const createTimer = (label: string) => {
  const start = Date.now();

  return {
    end: (context?: Record<string, unknown>) => {
      const duration = Date.now() - start;
      logPerformance(label, duration, 'ms', context);
      return duration;
    },
  };
};

/**
 * Log function execution (decorator pattern)
 */
export const logExecution = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  functionName?: string
): T => {
  const name = functionName || fn.name || 'anonymous';

  return ((...args: Parameters<T>) => {
    const timer = createTimer(`Function: ${name}`);

    try {
      const result = fn(...args);

      // Handle promises
      if (result instanceof Promise) {
        return result
          .then((value) => {
            timer.end({ success: true });
            return value;
          })
          .catch((error) => {
            timer.end({ success: false, error: error.message });
            throw error;
          });
      }

      // Handle synchronous functions
      timer.end({ success: true });
      return result;
    } catch (error) {
      timer.end({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }) as T;
};

// ============================================================================
// EXPORTS
// ============================================================================

// Export the main logger instance
export default logger;

// Export all utility functions
export { logger, logLevels, logColors };

// ============================================================================
// TYPES
// ============================================================================

export type LogLevel = keyof typeof logLevels;
export type LogContext = Record<string, unknown>;

export interface LoggerConfig {
  level?: LogLevel;
  logToFile?: boolean;
  maxFileSize?: number;
  maxFiles?: number;
  logDir?: string;
}
