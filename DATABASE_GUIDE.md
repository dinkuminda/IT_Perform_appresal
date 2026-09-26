# 🗄️ PostgreSQL Database Guide (Desktop & Vercel)

ይህ መመሪያ ለ**ዴስክቶፕ ፖስትግሬስ (Desktop PostgreSQL)** እና ለ**Vercel Deployment** የተዘጋጀ የተሟላ የዳታቤዝ አጠቃቀም ማብራሪያ ነው።

---

## 1. የዳታቤዝ ፋይሎች አጠቃላይ እይታ (Files Overview)

1. **`database/schema.sql`**  
   - ንፁህ PostgreSQL SQL ስክሪፕት።  
   - በ**pgAdmin 4**፣ በ**psql** ወይም በ**Vercel Postgres Dashboard** ውስጥ በቀጥታ ተከፍቶ የሚሰራ (CREATE TABLE, INDEXES, TRIGGERS, SEED DATA)።
2. **`src/db/schema.ts`**  
   - የ**Drizzle ORM** TypeScript ስኪማ።  
   - በVercel (Next.js/Node API/Serverless) ወይም በExpress backend ላይ ቀጥታ መጠቀም የሚችሉት።
3. **`src/db/index.ts`**  
   - የዳታቤዝ Connection Pool (በአካባቢ/Local እና በVercel ላይ በራስ-ሰር የሚለይ)።

---

## 2. በዴስክቶፕ ፖስትግሬስ መጠቀም (Desktop PostgreSQL / pgAdmin / DBeaver)

### ደረጃ 1፡ አዲስ ዳታቤዝ ይፍጠሩ
በ**pgAdmin** ወይም በኮማንድ መስመር (psql) ውስጥ:
```sql
CREATE DATABASE appraisal_db WITH ENCODING 'UTF8';
```

### ደረጃ 2፡ የስኪማ ፋይሉን ያሂዱ (Execute Schema)
1. `database/schema.sql` ፋይልን ይክፈቱ።
2. ሙሉ ይዘቱን ኮፒ በማድረግ በ**pgAdmin Query Tool** (ወይም DBeaver) ውስጥ ይለጥፉት።
3. **Execute (F5)** ይጫኑ።
4. ሠንጠረዦች (`departments`, `official_staff_positions`, `job_descriptions`, `employees`, `appraisal_records`, `monthly_reports`, `audit_logs`) ወዲያውኑ ይፈጠራሉ።

### ደረጃ 3፡ የአካባቢ (Local) Connection String
```env
DATABASE_URL="postgresql://postgres:የይለፍ_ቃል@localhost:5432/appraisal_db"
```

---

## 3. በVercel ላይ ማስተናገድ (Deploying to Vercel)

### ዘዴ 1፡ Vercel Postgres / Neon Storage መጠቀም
1. ወደ [Vercel Dashboard](https://vercel.com) ይግቡ።
2. **Storage** -> **Create Database** -> **Postgres** (Powered by Neon) ይምረጡ።
3. የተፈጠረውን ዳታቤዝ ከፕሮጀክትዎ ጋር ያገናኙ (Connect to Project)።
4. በVercel ላይ እነዚህ Environment Variables በራስ-ሰር ይገባሉ፡
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
5. በVercel Dashboard ውስጥ **Data / Query** ትርን ከፍተው `database/schema.sql`ን Run ያድርጉ።

---

## 4. የተካተቱ ዋና ዋና ሠንጠረዦች (Core Tables)

| የሠንጠረዥ ስም | ዓላማ (Purpose) |
|---|---|
| `departments` | የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን እና ሌሎች ክፍሎች ዝርዝር |
| `official_staff_positions` | 12ቱ ይፋዊ የሲቪል ሰርቪስ የቴክኖሎጂ ስራ መደቦች |
| `job_descriptions` | ይፋዊ የውጤት ተኮር 60% የምዘና ሰንጠረዦች፣ 100% ተግባራትና መስፈርቶች |
| `employees` | የተሟላ የሰራተኞች ማውጫ (መለያ ቁጥር፣ ስልክ፣ ኢሜይል፣ ደረጃ፣ ተቆጣጣሪ) |
| `appraisal_records` | የ60% ተግባራት + 40% የባህሪ ብቃቶች ውጤቶች፣ ፊርማዎችና ይሁንታዎች |
| `monthly_reports` | የሰራተኞች ወርሃዊ የስራ አፈጻጸም ሪፖርቶችና ዕቅዶች |
| `audit_logs` | የተቋማዊ ኦዲትና ለውጦች መዝገብ |
