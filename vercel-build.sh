#!/bin/bash

echo "🚀 Starting Vercel build process..."

# Generate Prisma Client
echo "📊 Generating Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Prisma generation failed!"
    exit 1
fi

echo "✅ Prisma Client generated successfully!"

# Build Next.js application
echo "🔨 Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Next.js build failed!"
    exit 1
fi

echo "✅ Next.js build completed successfully!"
echo "🎉 Build process completed!"