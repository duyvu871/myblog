import { redirect } from 'next/navigation';
import { 
  handleError, 
  actionError, 
  apiError, 
  type ApiResponse,
  ERROR_CODES,
  HTTP_STATUS 
} from './response';

// Type for Server Actions
type ServerAction<T extends any[], R> = (...args: T) => Promise<R>;
type ServerActionWithErrorHandling<T extends any[], R> = (...args: T) => Promise<ApiResponse<R>>;

// Type for API Route handlers
type ApiHandler<T = any> = (request: Request, context?: any) => Promise<Response>;

// Server Action Error Handling HOC
export function withServerActionErrorHandling<T extends any[], R>(
  action: ServerAction<T, R>,
  options?: {
    redirectOnError?: string;
    logErrors?: boolean;
  }
): ServerActionWithErrorHandling<T, R> {
  return async (...args: T): Promise<ApiResponse<R>> => {
    try {
      const result = await action(...args);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      const errorInfo = handleError(error);
      
      // Log error if enabled
      if (options?.logErrors !== false) {
        console.error(`Server Action Error [${errorInfo.code}]:`, {
          message: errorInfo.message,
          details: errorInfo.details,
          action: action.name,
          args: process.env.NODE_ENV === 'development' ? args : '[HIDDEN]',
        });
      }

      // Handle authentication errors with redirect
      if (errorInfo.code === ERROR_CODES.UNAUTHORIZED && options?.redirectOnError) {
        redirect(options.redirectOnError);
      }

      return actionError(errorInfo.code, errorInfo.message, errorInfo.details);
    }
  };
}

// API Route Error Handling HOC
export function withApiErrorHandling(
  handler: ApiHandler,
  options?: {
    logErrors?: boolean;
    enableCors?: boolean;
  }
): ApiHandler {
  return async (request: Request, context?: any): Promise<Response> => {
    try {
      const response = await handler(request, context);
      
      // Add CORS headers if enabled
      if (options?.enableCors) {
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      }
      
      return response;
    } catch (error) {
      const errorInfo = handleError(error);
      
      // Log error if enabled
      if (options?.logErrors !== false) {
        console.error(`API Route Error [${errorInfo.code}]:`, {
          message: errorInfo.message,
          details: errorInfo.details,
          method: request.method,
          url: request.url,
          userAgent: request.headers.get('user-agent'),
        });
      }

      const response = apiError(
        errorInfo.code,
        errorInfo.message,
        errorInfo.statusCode,
        errorInfo.details
      );

      // Add CORS headers if enabled
      if (options?.enableCors) {
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      }

      return response;
    }
  };
}

// Specialized HOCs for different scenarios

// Auth-required Server Action
export function withAuthServerAction<T extends any[], R>(
  action: ServerAction<T, R>,
  options?: {
    redirectTo?: string;
    requiredRoles?: string[];
  }
) {
  return withServerActionErrorHandling(action, {
    redirectOnError: options?.redirectTo || '/auth/login',
    logErrors: true,
  });
}

// Rate-limited API Route
export function withRateLimitedApi(
  handler: ApiHandler,
  options?: {
    maxRequests?: number;
    windowMs?: number;
  }
) {
  // This would integrate with your rate limiting logic
  return withApiErrorHandling(handler, {
    logErrors: true,
    enableCors: false,
  });
}

// Validation-enabled Server Action
export function withValidatedServerAction<T extends any[], R>(
  action: ServerAction<T, R>,
  validator?: (args: T) => void | Promise<void>
) {
  return withServerActionErrorHandling(async (...args: T): Promise<R> => {
    if (validator) {
      await validator(args);
    }
    return action(...args);
  });
}

// CORS-enabled API Route
export function withCorsApi(handler: ApiHandler) {
  return withApiErrorHandling(handler, {
    enableCors: true,
    logErrors: true,
  });
}

// Development-only enhanced logging
export function withDevLogging<T extends any[], R>(
  action: ServerAction<T, R>
): ServerAction<T, R> {
  if (process.env.NODE_ENV !== 'development') {
    return action;
  }

  return async (...args: T): Promise<R> => {
    const startTime = Date.now();
    console.log(`🚀 Starting action: ${action.name}`, {
      args: args.length > 0 ? args : 'no args',
      timestamp: new Date().toISOString(),
    });

    try {
      const result = await action(...args);
      const duration = Date.now() - startTime;
      
      console.log(`✅ Action completed: ${action.name}`, {
        duration: `${duration}ms`,
        resultType: typeof result,
      });
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      console.error(`❌ Action failed: ${action.name}`, {
        duration: `${duration}ms`,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      
      throw error;
    }
  };
}
