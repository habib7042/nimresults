# 🚀 Vercel Deployment Guide for School Result Management System

This guide will help you deploy the School Result Management System to Vercel with a proper database setup.

## 📋 Prerequisites

1. **GitHub Account** - For code repository
2. **Vercel Account** - For deployment
3. **Database Service** - Choose one of the following:
   - **PlanetScale** (Recommended for MySQL)
   - **Supabase** (PostgreSQL)
   - **Neon** (PostgreSQL)
   - **MongoDB Atlas** (If you prefer MongoDB)

## 🗄️ Database Setup Options

### Option 1: PlanetScale (Recommended)

#### 1. Create PlanetScale Database
1. Go to [PlanetScale](https://planetscale.com/) and sign up
2. Create a new database named `school_results`
3. Create a new service role password
4. Get your connection string

#### 2. Update Prisma Schema
```bash
# Update .env file with PlanetScale connection
DATABASE_URL="mysql://user:password@host/school_results?sslaccept=strict"
```

#### 3. Update Prisma Schema
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}
```

### Option 2: Supabase

#### 1. Create Supabase Project
1. Go to [Supabase](https://supabase.com/) and sign up
2. Create a new project
3. Get your database connection string from Project Settings > Database

#### 2. Update Prisma Schema
```bash
# Update .env file with Supabase connection
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
```

#### 3. Update Prisma Schema
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Option 3: Neon (PostgreSQL)

#### 1. Create Neon Project
1. Go to [Neon](https://neon.tech/) and sign up
2. Create a new project
3. Get your connection string

#### 2. Update Prisma Schema
```bash
# Update .env file with Neon connection
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

#### 3. Update Prisma Schema
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub

1. **Initialize Git Repository**
```bash
git init
git add .
git commit -m "Initial commit: School Result Management System"
```

2. **Create GitHub Repository**
   - Go to GitHub and create a new repository
   - Copy the repository URL

3. **Push to GitHub**
```bash
git remote add origin https://github.com/your-username/school-result-system.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Connect Vercel to GitHub**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

2. **Configure Environment Variables**
   - After deployment, go to Project Settings > Environment Variables
   - Add your `DATABASE_URL` from your chosen database provider

3. **Set Build Commands**
   - Vercel will automatically detect Next.js and set up the build commands
   - If needed, you can manually set:
     - Build Command: `npm run build`
     - Output Directory: `.next`

### Step 3: Database Migration

#### For PlanetScale/MySQL:
```bash
# Install PlanetScale CLI
npm install -g prisma

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# If you want to use migrations
npx prisma migrate dev
```

#### For Supabase/Neon (PostgreSQL):
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Or use migrations
npx prisma migrate dev
```

### Step 4: Seed Database (Optional)

If you want to populate your database with sample data:

1. **Create Seed Script**
   - The seed script is already available at `src/lib/seed.ts`

2. **Add Seed Script to package.json**
```json
{
  "scripts": {
    "db:seed": "tsx src/lib/seed.ts"
  }
}
```

3. **Run Seed Script**
```bash
npm install tsx --save-dev
npm run db:seed
```

### Step 5: Configure Vercel Cron Job (Optional)

If you want to run the seed script periodically:

1. **Create `vercel.json` file**
```json
{
  "crons": [
    {
      "path": "/api/cron/seed",
      "schedule": "0 0 * * *"
    }
  ]
}
```

2. **Create cron API route**
```bash
mkdir -p src/app/api/cron
```

3. **Create `src/app/api/cron/seed/route.ts`**
```typescript
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  
  // Simple security check
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Run your seed logic here
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
```

## 🔧 Environment Variables Setup

In Vercel Dashboard > Project Settings > Environment Variables:

### Required Variables:
```
DATABASE_URL=your_database_connection_string
```

### Optional Variables:
```
CRON_SECRET=your_secret_key_for_cron_jobs
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-app.vercel.app
```

## 📝 Production Considerations

### 1. Security
- **Environment Variables**: Never commit sensitive data to git
- **Database Security**: Use strong passwords and SSL connections
- **API Security**: Implement proper authentication and authorization

### 2. Performance
- **Database Indexing**: Add indexes to frequently queried fields
- **Caching**: Implement Redis caching for better performance
- **CDN**: Use Vercel's built-in CDN for static assets

### 3. Backup
- **Database Backups**: Enable automatic backups from your database provider
- **Code Backups**: GitHub provides version control

### 4. Monitoring
- **Vercel Analytics**: Enable for performance monitoring
- **Error Tracking**: Consider adding Sentry or similar error tracking

## 🐛 Troubleshooting

### Common Issues:

1. **Database Connection Issues**
   - Check your `DATABASE_URL` format
   - Ensure SSL is properly configured
   - Verify database credentials

2. **Build Failures**
   - Check for missing dependencies
   - Ensure all environment variables are set
   - Review build logs for specific errors

3. **Migration Issues**
   - Run `npx prisma generate` before building
   - Ensure database is accessible from Vercel
   - Check for schema conflicts

### Useful Commands:
```bash
# Check database connection
npx prisma db pull

# Reset database (use with caution!)
npx prisma migrate reset

# Generate Prisma client
npx prisma generate

# View database schema
npx prisma studio
```

## 🎯 Final Steps

1. **Test Your Application**
   - Visit your Vercel deployment URL
   - Test all features (student search, admin login, CRUD operations)
   - Verify print functionality works

2. **Set Up Custom Domain**
   - In Vercel project settings, add your custom domain
   - Configure DNS settings

3. **Enable HTTPS**
   - Vercel automatically provides HTTPS for all deployments

4. **Monitor Performance**
   - Use Vercel Analytics to monitor performance
   - Set up alerts for any issues

## 📞 Support

If you encounter any issues:
1. Check Vercel logs for error messages
2. Review database provider documentation
3. Check Prisma documentation for database-specific issues
4. Ensure all dependencies are properly installed

Your School Result Management System is now ready for production use! 🎉