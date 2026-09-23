# ไปด้วยกัน

> เจอกิจกรรมที่ชอบ พบเพื่อนที่ใช่

เว็บคอมมูนิตี้ภาษาไทยสำหรับค้นหาเพื่อนทำกิจกรรมร่วมกัน ออกแบบแบบ Mobile-first สำหรับผู้ใช้ทุกกลุ่ม โดยเน้นนักศึกษา ไม่มีการจ้างงาน ระบบชำระเงิน หรือค่าบริการแพลตฟอร์ม

## ทดลองใช้งาน

- Production: [https://pai-duay-kan.vercel.app](https://pai-duay-kan.vercel.app)
- สถานะปัจจุบัน: Frontend demo พร้อมข้อมูลตัวอย่าง

## แนวคิดผลิตภัณฑ์

ไปด้วยกันช่วยให้ผู้ใช้ค้นหา เข้าร่วม และสร้างกิจกรรมใกล้ตัว พร้อมทำความรู้จักคนที่มีความสนใจคล้ายกัน ตัวเว็บไซต์ใช้ภาษาไทยทั้งหมด โทนสีฟ้า–ขาว และหลีกเลี่ยง Emoji เพื่อรักษาภาพลักษณ์ที่สะอาดและทันสมัย

หมวดกิจกรรมหลัก:

- กีฬา
- ท่องเที่ยว
- เกม
- ดนตรี
- อาหาร
- เรียนรู้

## ฟีเจอร์ใน Demo

- Welcome และ onboarding
- สมัครสมาชิกและเข้าสู่ระบบ
- Google, Facebook และ Apple Auth แบบสาธิต
- หน้า Home พร้อมกิจกรรมแนะนำและหมวดความสนใจ
- ค้นหาและกรองกิจกรรมตามหมวดหมู่
- ดูวัน เวลา สถานที่ จำนวนสมาชิก เพศ ช่วงอายุ และระดับทักษะ
- บันทึก เข้าร่วม และออกจากกิจกรรม
- สร้างกิจกรรมใหม่
- หน้ากิจกรรมของฉันและโปรไฟล์
- Empty state, notification toast และ validation ขั้นต้น
- Reset ตำแหน่ง scroll เมื่อเปลี่ยนหน้า

หน้าภายในระบบประกอบด้วย Welcome, Login, Register, Home, Discover/Search, Activity Detail, Create Activity, My Activities และ Profile

## Responsive Design

- มือถือแสดงผลเต็มหน้าจอ
- เดสก์ท็อปจำลองกรอบมือถือความกว้างสูงสุด `393px`
- พื้นหลังด้านข้างเป็นสีดำและตัวแอปอยู่กึ่งกลาง
- Bottom navigation รองรับ safe area
- Category grid และ filter chips แสดงครบโดยไม่ล้นแนวนอน
- การ์ดกิจกรรมเรียงแนวตั้งเพื่อไม่ให้เนื้อหาถูกตัด

## ข้อมูลกิจกรรม

กิจกรรมมีชื่อ หมวด วัน เวลา สถานที่ จำนวนผู้เข้าร่วม เพศ ช่วงอายุ ระดับทักษะ ผู้จัด รายละเอียด สถานะการเข้าร่วม และการบันทึก แอปนี้ฟรี 100% จึงไม่มีฟิลด์ราคา ค่าใช้จ่าย หรือระบบชำระเงิน

## เทคโนโลยี

- React 19 และ TypeScript
- Next.js-compatible App Router ผ่าน Vinext
- Vite / Vinext
- Tailwind CSS 4
- Lucide React
- Static export และ Vercel

## เริ่มต้นใช้งาน

ต้องใช้ Node.js `22.13.0` ขึ้นไปและ pnpm

```bash
pnpm install
pnpm run dev
```

เปิด [http://localhost:5173](http://localhost:5173)

ตรวจสอบ Production build:

```bash
pnpm run build
```

ผลลัพธ์ static export อยู่ที่ `dist/client`

Deploy ไป Vercel:

```bash
pnpm dlx vercel --prod --yes
```

## โครงสร้างสำคัญ

```text
app/
  page.tsx          UI, components, state และข้อมูลตัวอย่างของ Demo
  globals.css       Design system และ responsive styles
  layout.tsx        Root layout และ metadata
components/         Shared components จาก starter
public/             ภาพกิจกรรม ไอคอน และ static assets
scripts/            Scripts สำหรับ development และ build
next.config.ts      Static export configuration
vercel.json         Vercel build/output configuration
```

## Typography

Font stack หลัก:

```css
"SF Thonburi", "Thonburi", -apple-system, BlinkMacSystemFont,
"Leelawadee UI", Tahoma, sans-serif
```

อุปกรณ์ที่ไม่มี SF Thonburi หรือ Thonburi จะใช้ system fallback โดยไม่มีการนำไฟล์ฟอนต์ proprietary มาเก็บใน repository

## Backend และ Authentication

เวอร์ชันนี้เป็น Frontend demo:

- ยังไม่มีฐานข้อมูลหรือ API จริง
- Auth จาก Google, Facebook และ Apple เป็น interaction จำลอง
- ข้อมูลและสถานะทั้งหมดเก็บใน React state
- ข้อมูลที่สร้างใหม่ สถานะเข้าร่วม และรายการบันทึกจะหายหลัง refresh
- Navigation ใช้ view state ภายในหน้าเดียว ยังไม่ใช่ URL routes แยก

โครงสร้างข้อมูลและ UI เตรียมไว้สำหรับแยก service/repository layer และเชื่อม Backend ภายหลัง

## แนวทางพัฒนาต่อ

- แยก `app/page.tsx` เป็น components และ feature modules
- เปลี่ยน view state เป็น routes
- ออกแบบฐานข้อมูลผู้ใช้ กิจกรรม การเข้าร่วม และรายการบันทึก
- เชื่อม OAuth จริงสำหรับ Google, Facebook และ Apple
- เพิ่ม moderation, report workflow และระบบความปลอดภัย
- เพิ่ม loading, error handling และ validation ฝั่ง server
- เพิ่ม unit, integration, end-to-end และ visual regression tests
- ตรวจ accessibility โดยเฉพาะปุ่ม icon-only และ keyboard navigation
- ทดสอบ viewport `320`, `375`, `393`, `430`, `1366×768` และ `1440×900`

## ข้อกำหนดการออกแบบ

- ภาษาไทยเป็นหลักและ Mobile-first
- สีฟ้า–ขาว สไตล์ Modern
- ไม่ใช้ Emoji
- ไม่เพิ่มราคา ค่าใช้จ่าย หรือ payment flow
- ไม่วางปุ่มหรือสัญลักษณ์ลอยทับเนื้อหา
- ตรวจหน้าเว็บจริงทุกหน้าก่อน deploy

## ความปลอดภัยของ Repository

`.env*`, `.vercel/`, `.sites-runtime/`, `.wrangler/`, `node_modules/` และ build output ถูก ignore ห้าม commit access token, OAuth secret, deployment credential หรือไฟล์ฟอนต์ที่ไม่มีสิทธิ์แจกจ่าย

## License

ยังไม่ได้กำหนด license กรุณาเพิ่มไฟล์ `LICENSE` เมื่อเลือกรูปแบบสิทธิ์การใช้งานแล้ว
