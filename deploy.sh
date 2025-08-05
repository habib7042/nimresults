#!/bin/bash

# School Result Management System Deployment Script
# This script helps deploy the application to Vercel

echo "🚀 School Result Management System Deployment Script"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please run 'git init' first."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not set. Please set it in your environment variables."
    echo "Example for PlanetScale:"
    echo "export DATABASE_URL='mysql://username:password@host/school_results?sslaccept=strict'"
    echo ""
    echo "Example for Supabase:"
    echo "export DATABASE_URL='postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres'"
    exit 1
fi

# Push database schema
echo "📊 Pushing database schema..."
npx prisma db push

# Seed database (optional)
read -p "🌱 Do you want to seed the database with sample data? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npm run db:seed
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo "🌐 Your application is now live on Vercel!"
echo "📝 Don't forget to set environment variables in Vercel dashboard:"
echo "   - DATABASE_URL"
echo "   - NEXTAUTH_SECRET (if using authentication)"