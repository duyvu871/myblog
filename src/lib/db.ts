import { Prisma, PrismaClient } from 'db/client';

const clientOptions = {
	log: [
		{
			emit: 'event',
			level: 'query',
		},
		{
			emit: 'stdout',
			level: 'error',
		},
		{
			emit: 'stdout',
			level: 'info',
		},
		{
			emit: 'stdout',
			level: 'warn',
		},
	],
} as Prisma.PrismaClientOptions;

const prismaClientSingleton = (): PrismaClient => {
	return new PrismaClient(clientOptions);
};

declare global {
	var prisma: undefined | PrismaClient;
	interface BigInt {	
		toJSON(): string;
	}
}

BigInt.prototype.toJSON = function (): string {
	return this.toString();
};

const prisma: PrismaClient = globalThis.prisma ?? prismaClientSingleton();


// log query time for prisma
// @ts-ignore
prisma.$on('query', (e: Prisma.QueryEvent) => {
	console.log(`Query ${e.target} took ${e.duration}ms`);
});

// @ts-ignore
prisma.$on('beforeExit', () => {
	console.log('Prisma client is shutting down');
	prisma.$disconnect();
});

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;