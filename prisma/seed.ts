import { PrismaClient, Role, AccountProvider, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Hash password using bcrypt
 */
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Generate a random token for password reset or email verification
 */
function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Create test users with different roles
 */
async function createUsers() {
  console.log('🔐 Creating test users...');

  // Admin user
  const adminUser = await prisma.user.create({
    data: {
      name: 'System Administrator',
      email: 'admin@example.com',
      password: await hashPassword('AdminPass123'),
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
      phone: '+1234567890',
      bio: 'System administrator with full access to all features.',
      lastLoginAt: new Date(),
    },
  });

  // Teacher users
  const teacher1 = await prisma.user.create({
    data: {
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      password: await hashPassword('TeacherPass123'),
      role: Role.TEACHER,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
      phone: '+1234567891',
      bio: 'Mathematics professor with 10+ years of experience.',
      lastLoginAt: new Date(Date.now() - 86400000), // 1 day ago
    },
  });

  const teacher2 = await prisma.user.create({
    data: {
      name: 'Prof. Michael Chen',
      email: 'michael.chen@school.edu',
      password: await hashPassword('TeacherPass123'),
      role: Role.TEACHER,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
      phone: '+1234567892',
      bio: 'Computer Science professor specializing in web development.',
      lastLoginAt: new Date(Date.now() - 172800000), // 2 days ago
    },
  });

  // Student users
  const student1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@student.edu',
      password: await hashPassword('StudentPass123'),
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
      phone: '+1234567893',
      bio: 'Computer Science major, Class of 2025.',
      lastLoginAt: new Date(Date.now() - 3600000), // 1 hour ago
    },
  });

  const student2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@student.edu',
      password: await hashPassword('StudentPass123'),
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
      phone: '+1234567894',
      bio: 'Mathematics major, passionate about problem solving.',
      lastLoginAt: new Date(Date.now() - 7200000), // 2 hours ago
    },
  });

  const student3 = await prisma.user.create({
    data: {
      name: 'Alice Wilson',
      email: 'alice.wilson@student.edu',
      password: await hashPassword('StudentPass123'),
      role: Role.STUDENT,
      status: UserStatus.PENDING_VERIFICATION,
      phone: '+1234567895',
      bio: 'New student, just registered.',
    },
  });

  // Inactive/Suspended users for testing
  const suspendedUser = await prisma.user.create({
    data: {
      name: 'Bob Brown',
      email: 'bob.brown@student.edu',
      password: await hashPassword('StudentPass123'),
      role: Role.STUDENT,
      status: UserStatus.SUSPENDED,
      emailVerified: new Date(),
      phone: '+1234567896',
      bio: 'Account suspended for policy violation.',
    },
  });

  // OAuth user (Google sign-in)
  const oauthUser = await prisma.user.create({
    data: {
      name: 'Emma Google',
      email: 'emma.google@gmail.com',
      password: null, // OAuth users don't have passwords
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
      bio: 'Signed up using Google OAuth.',
      lastLoginAt: new Date(),
    },
  });

  console.log(`✅ Created ${await prisma.user.count()} users`);

  return {
    adminUser,
    teacher1,
    teacher2,
    student1,
    student2,
    student3,
    suspendedUser,
    oauthUser,
  };
}

/**
 * Create OAuth accounts for testing
 */
async function createAccounts(users: any) {
  console.log('🔗 Creating OAuth accounts...');

  // Create Google account for OAuth user
  await prisma.account.create({
    data: {
      userId: users.oauthUser.id,
      provider: AccountProvider.GOOGLE,
      providerAccountId: '1234567890',
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresAt: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      tokenType: 'Bearer',
      scope: 'openid profile email',
      idToken: 'mock-id-token',
    },
  });

  // Create additional Google account for admin (testing multiple accounts)
  await prisma.account.create({
    data: {
      userId: users.adminUser.id,
      provider: AccountProvider.GOOGLE,
      providerAccountId: '0987654321',
      accessToken: 'mock-admin-access-token',
      refreshToken: 'mock-admin-refresh-token',
      expiresAt: Math.floor(Date.now() / 1000) + 3600,
      tokenType: 'Bearer',
      scope: 'openid profile email',
      idToken: 'mock-admin-id-token',
    },
  });

  console.log(`✅ Created ${await prisma.account.count()} OAuth accounts`);
}

/**
 * Create active sessions for testing
 */
async function createSessions(users: any) {
  console.log('🎫 Creating user sessions...');

  // Active session for admin
  await prisma.session.create({
    data: {
      userId: users.adminUser.id,
      sessionToken: 'session-token-admin-' + generateToken(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  // Active session for student1
  await prisma.session.create({
    data: {
      userId: users.student1.id,
      sessionToken: 'session-token-student1-' + generateToken(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    },
  });

  // Expired session for teacher1 (for testing cleanup)
  await prisma.session.create({
    data: {
      userId: users.teacher1.id,
      sessionToken: 'session-token-teacher1-expired-' + generateToken(),
      expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Expired 1 day ago
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
    },
  });

  console.log(`✅ Created ${await prisma.session.count()} user sessions`);
}

/**
 * Create password reset tokens for testing
 */
async function createPasswordResets(users: any) {
  console.log('🔑 Creating password reset tokens...');

  // Active password reset for student2
  await prisma.passwordReset.create({
    data: {
      email: users.student2.email,
      token: 'reset-token-' + generateToken(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      used: false,
    },
  });

  // Used password reset token (for testing)
  await prisma.passwordReset.create({
    data: {
      email: users.teacher1.email,
      token: 'reset-token-used-' + generateToken(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      used: true,
    },
  });

  // Expired password reset token (for testing cleanup)
  await prisma.passwordReset.create({
    data: {
      email: users.student1.email,
      token: 'reset-token-expired-' + generateToken(),
      expiresAt: new Date(Date.now() - 60 * 60 * 1000), // Expired 1 hour ago
      used: false,
    },
  });

  console.log(`✅ Created ${await prisma.passwordReset.count()} password reset tokens`);
}

/**
 * Create email verification tokens for testing
 */
async function createEmailVerifications(users: any) {
  console.log('📧 Creating email verification tokens...');

  // Pending email verification for student3 (unverified user)
  await prisma.emailVerification.create({
    data: {
      email: users.student3.email,
      token: 'verify-token-' + generateToken(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      verified: false,
    },
  });

  // Used email verification token (for testing)
  await prisma.emailVerification.create({
    data: {
      email: users.student1.email,
      token: 'verify-token-used-' + generateToken(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      verified: true,
    },
  });

  // Expired email verification token (for testing cleanup)
  await prisma.emailVerification.create({
    data: {
      email: 'expired@test.com',
      token: 'verify-token-expired-' + generateToken(),
      expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Expired 1 day ago
      verified: false,
    },
  });

  console.log(`✅ Created ${await prisma.emailVerification.count()} email verification tokens`);
}

/**
 * Print summary of created data
 */
async function printSummary() {
  console.log('\n📊 Database Seed Summary:');
  console.log('========================');
  
  const userCounts = await prisma.user.groupBy({
    by: ['role', 'status'],
    _count: true,
  });

  console.log('\n👥 Users by Role & Status:');
  userCounts.forEach(({ role, status, _count }) => {
    console.log(`   ${role} (${status}): ${_count}`);
  });

  console.log('\n📈 Total Records:');
  console.log(`   Users: ${await prisma.user.count()}`);
  console.log(`   Accounts: ${await prisma.account.count()}`);
  console.log(`   Sessions: ${await prisma.session.count()}`);
  console.log(`   Password Resets: ${await prisma.passwordReset.count()}`);
  console.log(`   Email Verifications: ${await prisma.emailVerification.count()}`);

  console.log('\n🔐 Test Login Credentials:');
  console.log('==========================');
  console.log('Admin: admin@example.com / AdminPass123');
  console.log('Teacher: sarah.johnson@school.edu / TeacherPass123');
  console.log('Teacher: michael.chen@school.edu / TeacherPass123');
  console.log('Student: john.doe@student.edu / StudentPass123');
  console.log('Student: jane.smith@student.edu / StudentPass123');
  console.log('Unverified: alice.wilson@student.edu / StudentPass123');
  console.log('Suspended: bob.brown@student.edu / StudentPass123');
  console.log('OAuth User: emma.google@gmail.com (Google Sign-in only)');
}

/**
 * Main seed function
 */
async function main() {
  console.log('🌱 Starting database seed...');
  console.log('============================');

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🧹 Cleaning existing data...');
    await prisma.emailVerification.deleteMany();
    await prisma.passwordReset.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Existing data cleaned');

    // Create all seed data
    const users = await createUsers();
    await createAccounts(users);
    await createSessions(users);
    await createPasswordResets(users);
    await createEmailVerifications(users);

    await printSummary();

    console.log('\n🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

/**
 * Cleanup function
 */
async function cleanup() {
  await prisma.$disconnect();
}

// Execute the seed
main()
  .then(cleanup)
  .catch(async (error) => {
    console.error('❌ Seed failed:', error);
    await cleanup();
    process.exit(1);
  });
