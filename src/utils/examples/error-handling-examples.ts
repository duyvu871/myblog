// // Examples of how to use the error handling system

// import {
//   withServerActionErrorHandling,
//   withApiErrorHandling,
//   withAuthServerAction,
//   withValidatedServerAction
// } from 'app/utils/with-error-handling';
// import {
//   ValidationError,
//   AuthenticationError,
//   NotFoundError,
//   apiSuccess,
//   apiError,
//   actionSuccess,
//   AuthorizationError,
//   ConflictError,
//   ErrorResponse,
//   SuccessResponse
// } from 'app/utils/response';
// import { z } from 'zod';
// import { User } from 'db/client';
// import { NextResponse } from 'next/server';

// // ============================================================================
// // SERVER ACTION EXAMPLES
// // ============================================================================

// // Basic Server Action with error handling
// const rawCreateUser = async (userData: { name: string; email: string }) => {
//   // Your business logic here
//   if (!userData.email.includes('@')) {
//     throw new ValidationError('Invalid email format');
//   }

//   // Simulate database operation
//   const user = { id: '1', ...userData };
//   return user;
// };

// // Wrapped with error handling
// export const createUser = withServerActionErrorHandling(rawCreateUser);

// // Usage in component:
// // const result = await createUser({ name: 'John', email: 'john@example.com' });
// // if (result.success) {
// //   console.log('User created:', result.data);
// // } else {
// //   console.error('Error:', result.error.message);
// // }

// // ============================================================================
// // AUTH-REQUIRED SERVER ACTION EXAMPLE
// // ============================================================================

// const rawUpdateProfile = async (userId: string, profileData: Partial<User>) => {
//   // Check authentication (this would throw AuthenticationError if not authenticated)
//   const currentUser = await getCurrentUser();
//   if (!currentUser) {
//     throw new AuthenticationError();
//   }

//   // @ts-expect-error - currentUser is not typed
//   if (currentUser.id !== userId) {
//     throw new AuthorizationError('Cannot update another user\'s profile');
//   }

//   // Update logic here
//   return { ...profileData, id: userId };
// };

// export const updateProfile = withAuthServerAction(rawUpdateProfile, {
//   redirectTo: '/auth/login',
// });

// // ============================================================================
// // VALIDATED SERVER ACTION EXAMPLE
// // ============================================================================

// const CreatePostSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   content: z.string().min(10, 'Content must be at least 10 characters'),
//   tags: z.array(z.string()).optional(),
// });

// const rawCreatePost = async (postData: z.infer<typeof CreatePostSchema>) => {
//   // Business logic here
//   const post = { id: Date.now().toString(), ...postData };
//   return post;
// };

// const validatePostData = async (args: [z.infer<typeof CreatePostSchema>]) => {
//   const [postData] = args;
//   const result = CreatePostSchema.safeParse(postData);
//   if (!result.success) {
//     throw new ValidationError('Invalid post data', { issues: result.error.issues.map(issue => ({
//       path: issue.path,
//       message: issue.message,
//     })) });
//   }
// };

// export const createPost = withValidatedServerAction(rawCreatePost, validatePostData);

// // ============================================================================
// // API ROUTE EXAMPLES WITH APP ROUTER
// // ============================================================================

// // Example 1: Basic CRUD API Route (app/api/users/route.ts)
// const rawUsersHandler = async (request: Request) => {
//   const method = request.method;

//   if (method === 'GET') {
//     // Get query parameters
//     const url = new URL(request.url);
//     const page = parseInt(url.searchParams.get('page') || '1');
//     const limit = parseInt(url.searchParams.get('limit') || '10');

//     if (page < 1 || limit < 1 || limit > 100) {
//       throw new ValidationError('Invalid pagination parameters');
//     }

//     const users = [
//       { id: '1', name: 'John Doe', email: 'john@example.com' },
//       { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
//     ];

//     return apiSuccess({
//       users: users.slice((page - 1) * limit, page * limit),
//       pagination: {
//         page,
//         limit,
//         total: users.length,
//         totalPages: Math.ceil(users.length / limit),
//       }
//     }, 'Users retrieved successfully');
//   }

//   if (method === 'POST') {
//     const body = await request.json();

//     // Validate required fields
//     if (!body.name || !body.email) {
//       throw new ValidationError('Name and email are required');
//     }

//     // Check if user already exists
//     const existingUser = await db.user.findUnique({ where: { email: body.email } });
//     if (existingUser) {
//       throw new ConflictError('User with this email already exists');
//     }

//     const newUser = {
//       id: Date.now().toString(),
//       ...body,
//       createdAt: new Date().toISOString(),
//     };

//     return apiSuccess(newUser, 'User created successfully', 201);
//   }

//   return apiError('METHOD_NOT_ALLOWED', 'Method not allowed', 405);
// };

// // Export for app/api/users/route.ts
// export const GET = withApiErrorHandling(rawUsersHandler);
// export const POST = withApiErrorHandling(rawUsersHandler, {
//   logErrors: true,
//   enableCors: false,
// });

// // Example 2: Dynamic Route with Authentication (app/api/users/[id]/route.ts)
// const rawUserByIdHandler = async (request: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> => {
//   const method = request.method;
//   const userId = (await params).id;

//   // Validate ID format
//   if (!userId || userId.length < 1) {
//     throw new ValidationError('Invalid user ID');
//   }

//   // Check authentication
//   const authHeader = request.headers.get('authorization');
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     throw new AuthenticationError('Authentication token required');
//   }

//   const token = authHeader.split(' ')[1];
//   const currentUser = await verifyToken(token);
//   if (!currentUser) {
//     throw new AuthenticationError('Invalid or expired token');
//   }

//   if (method === 'GET') {
//     const user = await db.user.findUnique({ where: { id: userId } });

//     if (!user) {
//       throw new NotFoundError('User');
//     }

//     // Check authorization - users can only access their own data
//     if (user.id !== currentUser.id && currentUser.role !== 'ADMIN') {
//       throw new AuthorizationError('Access denied');
//     }

//     return apiSuccess(user, 'User retrieved successfully');
//   }

//   if (method === 'PATCH') {
//     const body = await request.json();

//     // Check if user exists
//     const existingUser = await db.user.findUnique({ where: { id: userId } });
//     if (!existingUser) {
//       throw new NotFoundError('User');
//     }

//     // Check authorization
//     if (existingUser.id !== currentUser.id && currentUser.role !== 'ADMIN') {
//       throw new AuthorizationError('Cannot update another user\'s profile');
//     }

//     // Validate update data
//     const allowedFields = ['name', 'bio', 'avatar'];
//     const updateData = Object.keys(body)
//       .filter(key => allowedFields.includes(key))
//       .reduce((obj, key) => {
//         obj[key] = body[key];
//         return obj;
//       }, {} as Record<string, string | number | boolean | null | undefined>);

//     if (Object.keys(updateData).length === 0) {
//       throw new ValidationError('No valid fields to update');
//     }

//     const updatedUser = {
//       ...existingUser,
//       ...updateData,
//       updatedAt: new Date().toISOString(),
//     };

//     return apiSuccess(updatedUser, 'User updated successfully');
//   }

//   if (method === 'DELETE') {
//     const existingUser = await db.user.findUnique({ where: { id: userId } });
//     if (!existingUser) {
//       throw new NotFoundError('User');
//     }

//     // Only admins or the user themselves can delete
//     if (existingUser.id !== currentUser.id && currentUser.role !== 'ADMIN') {
//       throw new AuthorizationError('Cannot delete another user\'s account');
//     }

//     // Soft delete
//     const deletedUser = {
//       ...existingUser,
//       deletedAt: new Date().toISOString(),
//       email: `deleted_${existingUser.id}@example.com`, // Anonymize email
//     };

//     return apiSuccess({ id: userId }, 'User deleted successfully');
//   }

//   return apiError('METHOD_NOT_ALLOWED', 'Method not allowed', 405);
// };

// // Export for app/api/users/[id]/route.ts
// export const getUserByIdApi = withApiErrorHandling(rawUserByIdHandler);
// export const updateUserApi = withApiErrorHandling(rawUserByIdHandler);
// export const deleteUserApi = withApiErrorHandling(rawUserByIdHandler);

// // Example 3: File Upload API (app/api/upload/route.ts)
// const rawUploadHandler = async (request: Request) => {
//   if (request.method !== 'POST') {
//     return apiError('METHOD_NOT_ALLOWED', 'Only POST method allowed', 405);
//   }

//   // Check authentication
//   const authHeader = request.headers.get('authorization');
//   if (!authHeader) {
//     throw new AuthenticationError('Authentication required for file upload');
//   }

//   try {
//     const formData = await request.formData();
//     const file = formData.get('file') as File;

//     if (!file) {
//       throw new ValidationError('No file provided');
//     }

//     // Validate file size (5MB limit)
//     if (file.size > 5 * 1024 * 1024) {
//       throw new ValidationError('File size must be less than 5MB');
//     }

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       throw new ValidationError('Only JPEG, PNG, GIF, and WebP files are allowed');
//     }

//     // Simulate file upload
//     const uploadedFile = {
//       id: Date.now().toString(),
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       url: `/uploads/${Date.now()}_${file.name}`,
//       uploadedAt: new Date().toISOString(),
//     };

//     return apiSuccess(uploadedFile, 'File uploaded successfully', 201);

//   } catch (error) {
//     if (error instanceof ValidationError || error instanceof AuthenticationError) {
//       throw error;
//     }
//     throw new ValidationError('Invalid form data');
//   }
// };

// export const uploadFileApi = withApiErrorHandling(rawUploadHandler, {
//   logErrors: true,
// });

// // Example 4: Search API with Query Validation (app/api/search/route.ts)
// const rawSearchHandler = async (request: Request) => {
//   if (request.method !== 'GET') {
//     return apiError('METHOD_NOT_ALLOWED', 'Only GET method allowed', 405);
//   }

//   const url = new URL(request.url);
//   const query = url.searchParams.get('q');
//   const type = url.searchParams.get('type') || 'all';
//   const page = parseInt(url.searchParams.get('page') || '1');
//   const limit = parseInt(url.searchParams.get('limit') || '20');

//   // Validate search query
//   if (!query || query.trim().length < 2) {
//     throw new ValidationError('Search query must be at least 2 characters long');
//   }

//   if (query.length > 100) {
//     throw new ValidationError('Search query too long');
//   }

//   // Validate search type
//   const allowedTypes = ['all', 'users', 'posts', 'comments'];
//   if (!allowedTypes.includes(type)) {
//     throw new ValidationError('Invalid search type');
//   }

//   // Validate pagination
//   if (page < 1 || page > 100) {
//     throw new ValidationError('Page must be between 1 and 100');
//   }

//   if (limit < 1 || limit > 50) {
//     throw new ValidationError('Limit must be between 1 and 50');
//   }

//   // Simulate search results
//   const results = [
//     { id: '1', title: `Result for "${query}"`, type: 'post', relevance: 0.95 },
//     { id: '2', title: `Another result for "${query}"`, type: 'user', relevance: 0.87 },
//   ];

//   const filteredResults = type === 'all' ? results : results.filter(r => r.type === type);
//   const paginatedResults = filteredResults.slice((page - 1) * limit, page * limit);

//   return apiSuccess({
//     query,
//     type,
//     results: paginatedResults,
//     pagination: {
//       page,
//       limit,
//       total: filteredResults.length,
//       totalPages: Math.ceil(filteredResults.length / limit),
//     },
//     searchTime: Math.random() * 100, // Simulate search time in ms
//   }, 'Search completed successfully');
// };

// export const search = withApiErrorHandling(rawSearchHandler);

// // Example 5: Webhook Handler (app/api/webhooks/stripe/route.ts)
// const rawWebhookHandler = async (request: Request) => {
//   if (request.method !== 'POST') {
//     return apiError('METHOD_NOT_ALLOWED', 'Only POST method allowed', 405);
//   }

//   // Verify webhook signature
//   const signature = request.headers.get('stripe-signature');
//   if (!signature) {
//     throw new AuthenticationError('Missing webhook signature');
//   }

//   try {
//     const body = await request.text();

//     // Simulate signature verification
//     if (!verifyWebhookSignature(body, signature)) {
//       throw new AuthenticationError('Invalid webhook signature');
//     }

//     const event = JSON.parse(body);

//     // Handle different webhook events
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         await handlePaymentSuccess(event.data.object);
//         break;

//       case 'payment_intent.payment_failed':
//         await handlePaymentFailure(event.data.object);
//         break;

//       case 'customer.subscription.created':
//         await handleSubscriptionCreated(event.data.object);
//         break;

//       default:
//         console.log(`Unhandled event type: ${event.type}`);
//     }

//     return apiSuccess({ received: true }, 'Webhook processed successfully');

//   } catch (error) {
//     if (error instanceof AuthenticationError) {
//       throw error;
//     }
//     throw new ValidationError('Invalid webhook payload');
//   }
// };

// export const handleWebhook = withApiErrorHandling(rawWebhookHandler, {
//   logErrors: true,
//   enableCors: false,
// });

// // Example 6: Health Check API (app/api/health/route.ts)
// const rawHealthHandler = async (request: Request) => {
//   if (request.method !== 'GET') {
//     return apiError('METHOD_NOT_ALLOWED', 'Only GET method allowed', 405);
//   }

//   const checks = {
//     database: await checkDatabase(),
//     redis: await checkRedis(),
//     external_api: await checkExternalAPI(),
//   };

//   const allHealthy = Object.values(checks).every(check => check.status === 'healthy');
//   const status = allHealthy ? 'healthy' : 'unhealthy';
//   const httpStatus = allHealthy ? 200 : 503;

//   return apiSuccess({
//     status,
//     timestamp: new Date().toISOString(),
//     checks,
//     uptime: process.uptime(),
//     version: process.env.APP_VERSION || '1.0.0',
//   }, `System is ${status}`, httpStatus);
// };

// export const healthCheck = withApiErrorHandling(rawHealthHandler);

// // ============================================================================
// // SPECIFIC ERROR HANDLING EXAMPLES
// // ============================================================================

// // Example: Database operation with custom error handling
// const rawGetUserById = async (id: string) => {
//   // Simulate database call
//   const user = await db.user.findUnique({ where: { id } });

//   if (!user) {
//     throw new NotFoundError('User');
//   }

//   return user;
// };

// export const getUserByIdAction = withServerActionErrorHandling(rawGetUserById);

// // Example: File upload with validation
// const rawUploadFile = async (file: File) => {
//   if (file.size > 5 * 1024 * 1024) { // 5MB
//     throw new ValidationError('File size must be less than 5MB');
//   }

//   const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//   if (!allowedTypes.includes(file.type)) {
//     throw new ValidationError('Only JPEG, PNG, and GIF files are allowed');
//   }

//   // Upload logic here
//   const uploadedFile = {
//     id: Date.now().toString(),
//     name: file.name,
//     size: file.size,
//     type: file.type,
//     url: `/uploads/${file.name}`,
//   };

//   return uploadedFile;
// };

// export const uploadFileAction = withServerActionErrorHandling(rawUploadFile);

// // ============================================================================
// // CLIENT-SIDE USAGE EXAMPLES
// // ============================================================================

// /*
// // ============================================================================
// // HOW TO USE IN REAL APP ROUTER APPLICATIONS
// // ============================================================================

// // 1. Basic API Route (app/api/users/route.ts)
// import { withApiErrorHandling, apiSuccess, ValidationError } from 'app/utils';

// const handler = async (request: Request) => {
//   if (request.method === 'GET') {
//     const users = await getUsersFromDB();
//     return apiSuccess(users);
//   }

//   if (request.method === 'POST') {
//     const body = await request.json();
//     if (!body.email) {
//       throw new ValidationError('Email is required');
//     }
//     const user = await createUserInDB(body);
//     return apiSuccess(user, 'User created', 201);
//   }
// };

// export const GET = withApiErrorHandling(handler);
// export const POST = withApiErrorHandling(handler);

// // 2. Dynamic Route (app/api/users/[id]/route.ts)
// const userHandler = async (request: Request, { params }: { params: { id: string } }) => {
//   const userId = params.id;

//   if (request.method === 'GET') {
//     const user = await getUserById(userId);
//     if (!user) throw new NotFoundError('User');
//     return apiSuccess(user);
//   }

//   if (request.method === 'DELETE') {
//     await deleteUser(userId);
//     return apiSuccess({ deleted: true });
//   }
// };

// export const GET = withApiErrorHandling(userHandler);
// export const DELETE = withApiErrorHandling(userHandler);

// // 3. Server Action Usage in Components
// 'use server'
// import { withServerActionErrorHandling } from 'app/utils';

// const rawCreateUser = async (formData: FormData) => {
//   const userData = {
//     name: formData.get('name') as string,
//     email: formData.get('email') as string,
//   };

//   return await createUserInDatabase(userData);
// };

// export const createUser = withServerActionErrorHandling(rawCreateUser);

// // 4. Client Component Usage
// 'use client'
// import { createUser } from './actions';

// const UserForm = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (formData: FormData) => {
//     setLoading(true);
//     setError(null);

//     const result = await createUser(formData);

//     if (result.success) {
//       toast.success('User created successfully!');
//       router.push('/users');
//     } else {
//       setError(result.error.message);

//       // Handle specific error codes
//       switch (result.error.code) {
//         case 'VALIDATION_ERROR':
//           // Show field-specific errors
//           break;
//         case 'UNAUTHORIZED':
//           router.push('/auth/login');
//           break;
//         case 'ALREADY_EXISTS':
//           // Show conflict message
//           break;
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <form action={handleSubmit}>
//       {error && <div className="error">{error}</div>}
//       <input name="name" required />
//       <input name="email" type="email" required />
//       <button type="submit" disabled={loading}>
//         {loading ? 'Creating...' : 'Create User'}
//       </button>
//     </form>
//   );
// };

// // 5. API Client Usage (from frontend to your API)
// const apiClient = {
//   async createUser(userData: any) {
//     const response = await fetch('/api/users', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(userData),
//     });

//     const result = await response.json();

//     if (!result.success) {
//       throw new Error(result.error.message);
//     }

//     return result.data;
//   },

//   async getUser(id: string) {
//     const response = await fetch(`/api/users/${id}`);
//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(result.error?.message || 'Failed to fetch user');
//     }

//     return result.data;
//   }
// };

// // 6. Error Boundary for API Route Errors
// class ApiErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="error-boundary">
//           <h2>Something went wrong</h2>
//           <p>{this.state.error?.message}</p>
//           <button onClick={() => this.setState({ hasError: false, error: null })}>
//             Try again
//           </button>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// */

// // ============================================================================
// // HELPER FUNCTIONS FOR COMMON SCENARIOS
// // ============================================================================

// // Helper to check if user is authenticated in server actions
// async function getCurrentUser() {
//   // This would integrate with your auth system
//   // Return user if authenticated, null if not
//   return null; // Placeholder
// }

// // Helper to verify JWT token for API routes
// async function verifyToken(token: string) {
//   // This would integrate with your JWT verification
//   // Return user if token is valid, null if not
//   if (token === 'valid-token') {
//     return { id: '1', email: 'user@example.com', role: 'USER' };
//   }
//   return null; // Placeholder
// }

// // Helper to check user permissions
// function checkPermission(user: User, resource: string, action: string) {
//   // Your RBAC logic here
//   return true; // Placeholder
// }

// // Helper to verify webhook signatures
// function verifyWebhookSignature(body: string, signature: string): boolean {
//   // This would integrate with your webhook verification logic
//   // For Stripe: use stripe.webhooks.constructEvent()
//   return signature.startsWith('valid-signature'); // Placeholder
// }

// // Helper functions for webhook event handling
// // @typescript-eslint/no-explicit-any
// async function handlePaymentSuccess(paymentIntent: any) {
//   console.log('Payment succeeded:', paymentIntent.id);
//   // Update order status, send confirmation email, etc.
// }

// // @typescript-eslint/no-explicit-any
// async function handlePaymentFailure(paymentIntent: any) {
//   console.log('Payment failed:', paymentIntent.id);
//   // Notify user, retry payment, etc.
// }

// // @typescript-eslint/no-explicit-any
// async function handleSubscriptionCreated(subscription: any) {
//   console.log('Subscription created:', subscription.id);
//   // Update user subscription status, send welcome email, etc.
// }

// // Health check helpers
// async function checkDatabase(): Promise<{ status: 'healthy' | 'unhealthy'; latency?: number; error?: string }> {
//   try {
//     const start = Date.now();
//     // Simulate database check
//     await new Promise(resolve => setTimeout(resolve, Math.random() * 50));
//     const latency = Date.now() - start;

//     return { status: 'healthy', latency };
//   } catch (error) {
//     return {
//       status: 'unhealthy',
//       error: error instanceof Error ? error.message : 'Database connection failed'
//     };
//   }
// }

// async function checkRedis(): Promise<{ status: 'healthy' | 'unhealthy'; latency?: number; error?: string }> {
//   try {
//     const start = Date.now();
//     // Simulate Redis check
//     await new Promise(resolve => setTimeout(resolve, Math.random() * 30));
//     const latency = Date.now() - start;

//     return { status: 'healthy', latency };
//   } catch (error) {
//     return {
//       status: 'unhealthy',
//       error: error instanceof Error ? error.message : 'Redis connection failed'
//     };
//   }
// }

// async function checkExternalAPI(): Promise<{ status: 'healthy' | 'unhealthy'; latency?: number; error?: string }> {
//   try {
//     const start = Date.now();
//     // Simulate external API check
//     await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
//     const latency = Date.now() - start;

//     return { status: 'healthy', latency };
//   } catch (error) {
//     return {
//       status: 'unhealthy',
//       error: error instanceof Error ? error.message : 'External API unavailable'
//     };
//   }
// }

// // Database placeholder (replace with your actual database)
// const db = {
//   user: {
//     findUnique: async ({ where }: { where: { id?: string; email?: string } }) => {
//       // Placeholder database call
//       if (where.email === 'existing@example.com') {
//         return { id: '1', email: 'existing@example.com', name: 'Existing User' };
//       }
//       if (where.id === '1') {
//         return { id: '1', email: 'user@example.com', name: 'Test User', role: 'USER' };
//       }
//       return null;
//     },
//   },
// };
