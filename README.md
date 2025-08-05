# 🎓 বিদ্যালয় ফলাফল ব্যবস্থাপনা সিস্টেম

[School Result Management System](https://nimresults.vercel.app) - A comprehensive web application for managing and publishing school results with admin panel and student result viewing.

## ✨ বৈশিষ্ট্য

### 🎯 স্টুডেন্ট ফিচার্স
- **ফলাফল অনুসন্ধান**: ক্লাস, রোল নম্বর, সেমিস্টার এবং বছর দিয়ে ফলাফল খুঁজুন
- **ফলাফল প্রদর্শন**: সাবজেক্টভিত্তিক ফলাফল সহ গ্রেডিং সিস্টেম
- **🖨️ প্রিন্ট ফাংশন**: ফলাফল প্রিন্ট করার সুবিধা
- **রেসপন্সিভ ডিজাইন**: সকল ডিভাইসে কাজ করে

### 🔐 এডমিন ফিচার্স
- **ক্লাস ম্যানেজমেন্ট**: নতুন ক্লাস তৈরি এবং ব্যবস্থাপনা
- **স্টুডেন্ট ম্যানেজমেন্ট**: স্টুডেন্ট তথ্য যোগ এবং ব্যবস্থাপনা
- **সাবজেক্ট ম্যানেজমেন্ট**: সাবজেক্ট তৈরি এবং ব্যবস্থাপনা
- **রেজাল্ট ম্যানেজমেন্ট**: ফলাফল যোগ এবং ব্যবস্থাপনা
- **ড্যাশবোর্ড**: সম্পূর্ণ এডমিন কন্ট্রোল প্যানেল

### 🎨 গ্রেডিং সিস্টেম
- **A+**: 79-100 (🟢 সবুজ)
- **A**: 69-78 (🔵 নীল)
- **A-**: 59-68 (🔷 সায়ান)
- **B**: 49-58 (🟣 বেগুনি)
- **C**: 39-48 (🟡 হলুদ)
- **D**: 33-38 (🟠 কমলা)
- **F**: 0-32 (🔴 লাল)

## 🚀 ডেমো অ্যাক্সেস

### স্টুডেন্ট ফলাফল দেখুন
সরাসরি হোমপেজ থেকে ফলাফল অনুসন্ধান করুন।

### এডমিন প্যানেল
- **ইমেইল**: `admin@school.com`
- **পাসওয়ার্ড**: `admin123`

## 🛠️ টেকনোলজি স্ট্যাক

- **ফ্রন্টএন্ড**: Next.js 15, TypeScript, Tailwind CSS
- **ব্যাকএন্ড**: Next.js API Routes
- **ডাটাবেস**: Prisma ORM (SQLite/MySQL/PostgreSQL)
- **UI কম্পোনেন্ট**: shadcn/ui
- **আইকন**: Lucide React
- **ডিপ্লয়মেন্ট**: Vercel

## 📦 ইনস্টলেশন

### লোকাল ডেভেলপমেন্ট

1. **রেপোসিটরি ক্লোন করুন**
```bash
git clone https://github.com/habib7042/nimresults.git
cd nimresults
```

2. **ডিপেন্ডেন্সি ইনস্টল করুন**
```bash
npm install
```

3. **এনভায়রনমেন্ট ভেরিয়েবল সেটআপ করুন**
```bash
cp .env.example .env
```

4. **ডাটাবেস সেটআপ করুন**
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

5. **ডেভেলপমেন্ট সার্ভার চালু করুন**
```bash
npm run dev
```

অ্যাপ্লিকেশনটি `http://localhost:3000` এ চলবে।

## 🌐 ডিপ্লয়মেন্ট

### Vercel এ ডিপ্লয় করুন

1. **Vercel এ ইম্পোর্ট করুন**
   - [Vercel](https://vercel.com) এ যান
   - "New Project" ক্লিক করুন
   - এই রেপোসিটরি ইম্পোর্ট করুন

2. **এনভায়রনমেন্ট ভেরিয়েবল সেট করুন**
   ```bash
   DATABASE_URL=your_database_connection_string
   ```

3. **ডিপ্লয় করুন**
   - "Deploy" বাটন ক্লিক করুন

### ডাটাবেস অপশন

**PlanetScale (সুপারিশকৃত):**
```bash
DATABASE_URL="mysql://username:password@host/school_results?sslaccept=strict"
```

**Supabase:**
```bash
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
```

**Neon:**
```bash
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

## 📁 প্রোজেক্ট স্ট্রাকচার

```
src/
├── app/
│   ├── api/                 # API রাউটস
│   │   ├── admin/          # এডমিন API
│   │   └── results/        # রেজাল্ট API
│   ├── admin/             # এডমিন প্যানেল
│   ├── globals.css        # গ্লোবাল স্টাইল
│   ├── layout.tsx         # রুট লেআউট
│   └── page.tsx           # হোম পেজ
├── components/
│   └── ui/                # shadcn/ui কম্পোনেন্টস
├── hooks/                 # কাস্টম হুকস
└── lib/
    ├── db.ts             # ডাটাবেস কানেকশন
    ├── seed.ts           # ডাটাবেস সীড
    ├── socket.ts         # সকেট কনফিগ
    └── utils.ts          # ইউটিলিটি ফাংশন
```

## 🗄️ ডাটাবেস স্কিমা

### মডেলস
- **Admin**: এডমিন ইউজার
- **Class**: ক্লাস তথ্য
- **Student**: স্টুডেন্ট তথ্য
- **Subject**: সাবজেক্ট তথ্য
- **Result**: ফলাফল তথ্য

### রিলেশনশিপ
- একটি ক্লাসে একাধিক স্টুডেন্ট থাকতে পারে
- একটি ক্লাসে একাধিক সাবজেক্ট থাকতে পারে
- একটি স্টুডেন্টের একাধিক রেজাল্ট থাকতে পারে
- একটি সাবজেক্টের একাধিক রেজাল্ট থাকতে পারে

## 🔧 এপিআই এন্ডপয়েন্টস

### স্টুডেন্ট এপিআই
- `POST /api/results/search` - ফলাফল অনুসন্ধান

### এডমিন এপিআই
- `POST /api/admin/login` - এডমিন লগইন
- `GET/POST /api/admin/classes` - ক্লাস ম্যানেজমেন্ট
- `GET/POST /api/admin/students` - স্টুডেন্ট ম্যানেজমেন্ট
- `GET/POST /api/admin/subjects` - সাবজেক্ট ম্যানেজমেন্ট
- `GET/POST /api/admin/results` - রেজাল্ট ম্যানেজমেন্ট

## 🎨 স্ক্রিনশট

### স্টুডেন্ট ইন্টারফেস
- ফলাফল অনুসন্ধান ফর্ম
- ফলাফল প্রদর্শন টেবিল
- প্রিন্ট বাটন

### এডমিন ইন্টারফেস
- লগইন পেজ
- ড্যাশবোর্ড
- ক্লাস/স্টুডেন্ট/সাবজেক্ট/রেজাল্ট ম্যানেজমেন্ট

## 🤝 কন্ট্রিবিউশন

কন্ট্রিবিউশন করতে চাইলে:

1. রেপোসিটরি ফর্ক করুন
2. নতুন ব্রাঞ্চ তৈরি করুন (`git checkout -b feature/amazing-feature`)
3. আপনার পরিবর্তন কমিট করুন (`git commit -m 'Add some amazing feature'`)
4. ব্রাঞ্চ পুশ করুন (`git push origin feature/amazing-feature`)
5. পুল রিকোয়েস্ট খুলুন

## 📄 লাইসেন্স

এই প্রোজেক্টটি MIT লাইসেন্সের অধীনে লাইসেন্সকৃত।

## 🙏 কৃতজ্ঞতা

- [Next.js](https://nextjs.org/) - React ফ্রেমওয়ার্ক
- [Prisma](https://prisma.io/) - ডাটাবেস টুলকিট
- [Tailwind CSS](https://tailwindcss.com/) - CSS ফ্রেমওয়ার্ক
- [shadcn/ui](https://ui.shadcn.com/) - UI কম্পোনেন্ট লাইব্রেরি
- [Vercel](https://vercel.com/) - ডিপ্লয়মেন্ট প্ল্যাটফর্ম

## 📞 যোগাযোগ

কোনো প্রশ্ন বা সমস্যা থাকলে:
- ইস্যু খুলুন: [GitHub Issues](https://github.com/habib7042/nimresults/issues)
- ইমেইল: [আপনার ইমেইল]

---

**তৈরি করেছেন**: [আপনার নাম]  
**লাইভ সাইট**: [https://nimresults.vercel.app](https://nimresults.vercel.app)  
**সর্বশেষ আপডেট**: আগস্ট ২০২৪