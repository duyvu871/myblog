import { NextResponse } from 'next/server';

// Standard response types
export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error codes
export const ERROR_CODES = {
  // Authentication & Authorization
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELDS: 'MISSING_REQUIRED_FIELDS',
  INVALID_INPUT: 'INVALID_INPUT',
  
  // Resource
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  
  // Server
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  
  // Rate limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const;

// Custom error classes
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(code: string, message: string, statusCode: number, details?: any) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(ERROR_CODES.VALIDATION_ERROR, message, HTTP_STATUS.BAD_REQUEST, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(ERROR_CODES.UNAUTHORIZED, message, HTTP_STATUS.UNAUTHORIZED);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access forbidden') {
    super(ERROR_CODES.FORBIDDEN, message, HTTP_STATUS.FORBIDDEN);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(ERROR_CODES.NOT_FOUND, `${resource} not found`, HTTP_STATUS.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(ERROR_CODES.ALREADY_EXISTS, message, HTTP_STATUS.CONFLICT);
    this.name = 'ConflictError';
  }
}

// Response builders
export const createSuccessResponse = <T>(
  data: T,
  message?: string
): SuccessResponse<T> => ({
  success: true,
  data,
  message,
});

export const createErrorResponse = (
  code: string,
  message: string,
  details?: any
): ErrorResponse => ({
  success: false,
  error: {
    code,
    message,
    details,
  },
});

// API Response builders for Next.js
export const apiSuccess = <T>(
  data: T,
  message?: string,
  status: number = HTTP_STATUS.OK
) => {
  return NextResponse.json(createSuccessResponse(data, message), { status });
};

export const apiError = (
  code: string,
  message: string,
  status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  details?: any
) => {
  return NextResponse.json(createErrorResponse(code, message, details), { status });
};

// Server Action response builders
export const actionSuccess = <T>(data: T, message?: string): SuccessResponse<T> => {
  return createSuccessResponse(data, message);
};

export const actionError = (code: string, message: string, details?: any): ErrorResponse => {
  return createErrorResponse(code, message, details);
};

// Error handler utility
export const handleError = (error: unknown): { code: string; message: string; statusCode: number; details?: any } => {
  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    // Handle specific error types
    if (error.name === 'PrismaClientKnownRequestError') {
      return {
        code: ERROR_CODES.DATABASE_ERROR,
        message: 'Database operation failed',
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      };
    }

    if (error.name === 'ZodError') {
      return {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: 'Validation failed',
        statusCode: HTTP_STATUS.BAD_REQUEST,
        details: error.message,
      };
    }

    return {
      code: ERROR_CODES.INTERNAL_ERROR,
      message: error.message || 'Internal server error',
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };
  }

  return {
    code: ERROR_CODES.INTERNAL_ERROR,
    message: 'An unexpected error occurred',
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  };
};
