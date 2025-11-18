/**
 * Utility to sanitize markdown content and ensure it's safe for copying
 * Removes potentially harmful content while preserving markdown formatting
 */

/**
 * Sanitizes markdown content by:
 * 1. Removing inline HTML scripts
 * 2. Removing dangerous event handlers (onclick, onerror, etc.)
 * 3. Removing javascript: protocol links
 * 4. Preserving safe markdown syntax
 * 5. Removing base64 embedded scripts
 */
export function sanitizeMarkdown(markdown: string): string {
  if (!markdown) return '';

  let sanitized = markdown;

  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove dangerous event handlers in HTML tags
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*[^\s>]*/gi, '');

  // Remove javascript: protocol from links
  sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');
  sanitized = sanitized.replace(/src\s*=\s*["']javascript:[^"']*["']/gi, 'src="#"');

  // Remove data: protocol that might contain scripts (except safe image types)
  sanitized = sanitized.replace(
    /(?:href|src)\s*=\s*["']data:(?!image\/(?:png|jpg|jpeg|gif|svg\+xml|webp))[^"']*["']/gi,
    'href="#"'
  );

  // Remove style tags that might contain expressions
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Remove iframe tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  // Remove object and embed tags
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  sanitized = sanitized.replace(/<embed\b[^>]*>/gi, '');

  // Remove meta tags that could cause issues
  sanitized = sanitized.replace(/<meta\b[^>]*>/gi, '');

  // Remove link tags (except stylesheets which are generally safe in markdown context)
  sanitized = sanitized.replace(/<link\b(?![^>]*rel\s*=\s*["']stylesheet["'])[^>]*>/gi, '');

  return sanitized.trim();
}

/**
 * Prepares markdown for copying by:
 * 1. Sanitizing the content
 * 2. Normalizing line endings
 * 3. Trimming excess whitespace
 */
export function prepareMarkdownForCopy(markdown: string, frontmatter?: any): string {
  // Sanitize the markdown
  let prepared = sanitizeMarkdown(markdown);

  // Normalize line endings to \n
  prepared = prepared.replace(/\r\n/g, '\n');

  // Trim excessive blank lines (more than 2 consecutive)
  prepared = prepared.replace(/\n{3,}/g, '\n\n');

  // If frontmatter is provided, add it to the top
  if (frontmatter) {
    const frontmatterString = createFrontmatterString(frontmatter);
    prepared = `${frontmatterString}\n\n${prepared}`;
  }

  return prepared.trim();
}

/**
 * Creates a safe frontmatter string from an object
 */
function createFrontmatterString(frontmatter: any): string {
  const lines = ['---'];

  for (const [key, value] of Object.entries(frontmatter)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      // Handle arrays (like tags)
      lines.push(`${key}: [${value.map((v) => `"${String(v).replace(/"/g, '\\"')}"`).join(', ')}]`);
    } else if (typeof value === 'string') {
      // Escape quotes in strings
      const escapedValue = value.replace(/"/g, '\\"');
      lines.push(`${key}: "${escapedValue}"`);
    } else if (typeof value === 'boolean' || typeof value === 'number') {
      lines.push(`${key}: ${value}`);
    } else {
      // For other types, convert to JSON
      lines.push(`${key}: ${JSON.stringify(value)}`);
    }
  }

  lines.push('---');
  return lines.join('\n');
}

/**
 * Validates if the markdown content is safe
 * Returns an object with validation result and any warnings
 */
export function validateMarkdownSafety(markdown: string): {
  isSafe: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  // Check for script tags
  if (/<script/i.test(markdown)) {
    warnings.push('Contains script tags');
  }

  // Check for event handlers
  if (/\son\w+\s*=/i.test(markdown)) {
    warnings.push('Contains inline event handlers');
  }

  // Check for javascript: protocol
  if (/javascript:/i.test(markdown)) {
    warnings.push('Contains javascript: protocol');
  }

  // Check for suspicious data URIs
  if (/data:(?!image\/(?:png|jpg|jpeg|gif|svg\+xml|webp))/i.test(markdown)) {
    warnings.push('Contains potentially unsafe data URIs');
  }

  return {
    isSafe: warnings.length === 0,
    warnings,
  };
}
