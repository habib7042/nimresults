const { execSync } = require('child_process');

console.log('Generating Prisma Client...');

try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma Client generated successfully!');
} catch (error) {
  console.error('Error generating Prisma Client:', error);
  process.exit(1);
}