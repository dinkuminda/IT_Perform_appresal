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

---

## 5. የዳታ ማስገባት ስህተቶች መፍትሔ (Troubleshooting: "Cannot Insert Records to DB")

በPostgreSQL ውስጥ ዳታ በሚያስገቡበት ወቅት ስህተት (Error) የሚያጋጥምበት ዋና ምክንያቶች እና መፍትሄዎቻቸው፡

### ምክንያት 1፡ የውጭ ቁልፍ ቅደም ተከተል (Foreign Key Dependency Order)
በዚህ ሲስተም ውስጥ ጠረጴዛዎች በግንኙነት (Foreign Key) የተሳሰሩ ናቸው፡
1. `job_descriptions` ሳይገባ `employees` ማስገባት አይቻልም (`linked_job_id` የ`job_descriptions`ን `id` ይፈልጋል)።
2. `employees` ሳይገባ `appraisal_records` ወይም `monthly_reports` ማስገባት አይቻልም (`employee_id` የ`employees`ን `id` ይፈልጋል)።

**ትክክለኛው የዳታ ማስገባት ቅደም ተከተል (Mandatory Insertion Order):**
1. **`departments`** (ክፍሎች)
2. **`official_staff_positions`** (12ቱ ይፋዊ ደረጃዎች)
3. **`job_descriptions`** (የስራ መደቦች ማትሪክስ)
4. **`employees`** (ሰራተኞች)
5. **`appraisal_records`** እና **`monthly_reports`** (ምዘናዎችና ሪፖርቶች)

### ምክንያት 2፡ ሁሉንም ዳታ በአንድ ጊዜ መሙላት (One-Click Bulk Seed)
ሁሉንም 12 የስራ መደቦች፣ 12 ሰራተኞች፣ የምዘና ውጤቶች እና ወርሃዊ ሪፖርቶች በአንድ ጊዜ ያለምንም ስህተት ለማስገባት፡
- በpgAdmin ወይም psql ውስጥ **`database/seed_records.sql`** ፋይልን Run ያድርጉ።

### ምክንያት 3፡ JSONB ፎርማት ስህተት
በPostgreSQL ውስጥ የJSONB አምዶች (duties, evaluation_table, certifications, skills, categories) ትክክለኛ የJSON syntax እና `::jsonb` cast መያዝ አለባቸው። ባዶ ከሆነ `'[]'::jsonb` ወይም `'{}'::jsonb` መጠቀም ያስፈልጋል።

### ምክንያት 4፡ በዌብ አፕሊኬሽኑ ውስጥ መዝገቦችን ማስቀመጥ (Web App In-Memory/Local Storage)
- ዌብ አፕሊኬሽኑ በነባሪነት ሁሉንም ምዘናዎች፣ ሰራተኞችና ወርሃዊ ሪፖርቶች በአሳሹ (Browser localStorage) ውስጥ ያለምንም ውጫዊ ዳታቤዝ ያስቀምጣል።
- የተቀመጡትን መዝገቦች ወደ PostgreSQL SQL ስክሪፕት ለመቀየር ከላይ ያለውን **"ዳታቤዝ (Database)"** ቁልፍ በመጫን **"ዳታ ማስገቢያ (SQL Inserts & Data Export)"** ገጽ ላይ **"አውርድ (.sql)"** የሚለውን መጫን ይችላሉ።

