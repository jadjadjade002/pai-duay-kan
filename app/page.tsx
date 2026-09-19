"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Apple,
  ArrowLeft,
  Bell,
  Bookmark,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  Compass,
  Flag,
  Gamepad2,
  GraduationCap,
  HeartHandshake,
  House,
  MapPin,
  MessageCircle,
  Music2,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Trophy,
  Users,
  Utensils,
  X,
} from "lucide-react";
type Cat = "กีฬา" | "ท่องเที่ยว" | "เกม" | "ดนตรี" | "อาหาร" | "เรียนรู้";
type View =
  | "welcome"
  | "login"
  | "register"
  | "home"
  | "discover"
  | "detail"
  | "create"
  | "mine"
  | "profile";
type Act = {
  id: number;
  title: string;
  cat: Cat;
  date: string;
  time: string;
  place: string;
  joined: number;
  cap: number;
  level: string;
  gender: string;
  age: string;
  host: string;
  desc: string;
  joinedByMe?: boolean;
  image?: string;
};
const cats: [Cat, typeof Trophy][] = [
  ["กีฬา", Trophy],
  ["ท่องเที่ยว", Compass],
  ["เกม", Gamepad2],
  ["ดนตรี", Music2],
  ["อาหาร", Utensils],
  ["เรียนรู้", GraduationCap],
];
const seed: Act[] = [
  {
    id: 1,
    title: "วิ่งรับลมเย็นที่สวนเบญจกิติ",
    cat: "กีฬา",
    date: "ส. 21 ก.ย.",
    time: "17:30–19:00",
    place: "สวนเบญจกิติ กรุงเทพฯ",
    joined: 12,
    cap: 18,
    level: "เริ่มต้น",
    gender: "ทุกเพศ",
    age: "18–35 ปี",
    host: "พีท",
    desc: "วิ่งสบาย ๆ ระยะประมาณ 5 กิโลเมตร ชวนกันออกกำลังและรู้จักเพื่อนใหม่ ไม่ต้องทำเวลา มือใหม่มาได้",
    image: "/activities/activity-1-running/cover.jpg",
  },
  {
    id: 2,
    title: "ตะลุยตลาดน้อย ถ่ายรูปย่านเก่า",
    cat: "ท่องเที่ยว",
    date: "อา. 22 ก.ย.",
    time: "09:00–13:00",
    place: "ตลาดน้อย กรุงเทพฯ",
    joined: 5,
    cap: 8,
    level: "ทุกระดับ",
    gender: "ทุกเพศ",
    age: "18–30 ปี",
    host: "อิง",
    desc: "เดินเล่น ถ่ายภาพ และแวะชิมของอร่อยในย่านตลาดน้อย เน้นบรรยากาศสบาย ๆ และเคารพพื้นที่ชุมชน",
    image: "/activities/activity-2-travel/cover.jpg",
  },
  {
    id: 3,
    title: "บอร์ดเกมหลังเลิกเรียน",
    cat: "เกม",
    date: "ศ. 27 ก.ย.",
    time: "18:00–21:00",
    place: "สามย่านมิตรทาวน์",
    joined: 6,
    cap: 10,
    level: "มือใหม่",
    gender: "ทุกเพศ",
    age: "18–28 ปี",
    host: "นนท์",
    desc: "รวมตัวเล่นบอร์ดเกมแนวปาร์ตี้และวางแผน มาคนเดียวได้ มีคนสอนกติกาทุกเกม",
    image: "/activities/activity-3-boardgame/cover.jpg",
  },
  {
    id: 4,
    title: "ฝึกกีตาร์และร้องเพลงด้วยกัน",
    cat: "ดนตรี",
    date: "ส. 28 ก.ย.",
    time: "14:00–16:30",
    place: "หอศิลป์กรุงเทพฯ",
    joined: 4,
    cap: 8,
    level: "พื้นฐาน",
    gender: "ทุกเพศ",
    age: "18–35 ปี",
    host: "เมย์",
    desc: "วงเล็ก ๆ สำหรับคนอยากฝึกกีตาร์และร้องเพลง แลกเพลงกันเล่นแบบไม่กดดัน",
    image: "/activities/activity-4-music/cover.jpg",
  },
  {
    id: 5,
    title: "ชวนชิมร้านลับย่านอารีย์",
    cat: "อาหาร",
    date: "อา. 29 ก.ย.",
    time: "11:30–14:00",
    place: "BTS อารีย์",
    joined: 3,
    cap: 6,
    level: "ทุกระดับ",
    gender: "ทุกเพศ",
    age: "20–40 ปี",
    host: "ฝน",
    desc: "ลองร้านเล็ก ๆ ในย่านอารีย์ แชร์เมนู แบ่งกันชิม และคุยกับเพื่อนใหม่แบบกลุ่มเล็ก",
    image: "/activities/activity-5-food/cover.jpg",
  },
  {
    id: 6,
    title: "ติวภาษาอังกฤษแลกเปลี่ยนกัน",
    cat: "เรียนรู้",
    date: "พ. 2 ต.ค.",
    time: "18:30–20:00",
    place: "ออนไลน์ผ่าน Google Meet",
    joined: 7,
    cap: 12,
    level: "พื้นฐาน",
    gender: "ทุกเพศ",
    age: "18 ปีขึ้นไป",
    host: "เจ",
    desc: "ฝึกสนทนาภาษาอังกฤษผ่านหัวข้อใกล้ตัว แบ่งกลุ่มย่อยและช่วยกันให้คำแนะนำอย่างเป็นมิตร",
    image: "/activities/activity-6-learning/cover.jpg",
  },
  {
    id: 7,
    title: "แบดมินตันตีคอร์ดหลังเลิกเรียน",
    cat: "กีฬา",
    date: "อ. 24 ก.ย.",
    time: "18:00–20:00",
    place: "สนามแบด Winner อารีย์",
    joined: 4,
    cap: 8,
    level: "มือใหม่–ทั่วไป",
    gender: "ทุกเพศ",
    age: "18–28 ปี",
    host: "นนท์",
    desc: "หาเพื่อนตีแบดมินตันขำ ๆ หลังเลิกเรียนและเลิกงาน ตีสนุก เน้นออกกำลังและเหงื่อออก มีลูกแบดให้พร้อม มาเดี่ยวหรือมาคู่ได้เลย",
    image: "/activities/activity-7-badminton/cover.jpg",
  },
  {
    id: 8,
    title: "ชวนปั่นจักรยาน Skylane สุวรรณภูมิ",
    cat: "กีฬา",
    date: "ส. 28 ก.ย.",
    time: "06:30–09:00",
    place: "สนามเจริญสุขมงคลจิต (Skylane)",
    joined: 5,
    cap: 10,
    level: "ปานกลาง",
    gender: "ทุกเพศ",
    age: "18–35 ปี",
    host: "ตั้ม",
    desc: "รับลมเช้าสดชื่น ปั่นสนามฟ้าลู่ใหญ่ประมาณ 2 รอบ แวะจิบกาแฟและแลกเปลี่ยนเรื่องจักรยานหลังปั่นเสร็จ เตรียมหมวกกันน็อกมาด้วยนะ",
    image: "/activities/activity-8-cycling/cover.jpg",
  },
  {
    id: 9,
    title: "ปีนหน้าผาจำลอง Bouldering มือใหม่",
    cat: "กีฬา",
    date: "อา. 29 ก.ย.",
    time: "14:00–17:00",
    place: "Stonegoat Climbing พระโขนง",
    joined: 3,
    cap: 6,
    level: "มือใหม่",
    gender: "ทุกเพศ",
    age: "18–30 ปี",
    host: "ฟ้าใส",
    desc: "ชวนไปลองปีนหน้าผาจำลองในร่ม สนุกและท้าทาย มีเพื่อนช่วยดูไลน์และแนะนำเทคนิคพื้นฐานให้ ไม่ต้องมีอุปกรณ์ ยืมรองเท้าที่ยิมได้",
    image: "/activities/activity-9-bouldering/cover.jpg",
  },
  {
    id: 25,
    title: "ว่ายน้ำออกกำลังกายสระโอลิมปิก",
    cat: "กีฬา",
    date: "ส. 5 ต.ค.",
    time: "16:00–18:00",
    place: "ศูนย์กีฬาจุฬาลงกรณ์มหาวิทยาลัย",
    joined: 4,
    cap: 8,
    level: "ว่ายน้ำเป็น",
    gender: "ทุกเพศ",
    age: "18–32 ปี",
    host: "เต้",
    desc: "หาเพื่อนว่ายน้ำสระ 50 เมตร คลายร้อนและออกกำลังกายคาร์ดิโอ ว่ายรอบสบาย ๆ สลับพักคุย แนะนำแว่นตาและหมวกว่ายน้ำมาด้วย",
    image: "/activities/activity-25-swimming/cover.jpg",
  },
  {
    id: 10,
    title: "เดินเล่นชมนิทรรศการศิลปะร่วมสมัย MOCA",
    cat: "ท่องเที่ยว",
    date: "ส. 28 ก.ย.",
    time: "13:00–16:30",
    place: "พิพิธภัณฑ์ศิลปะไทยร่วมสมัย (MOCA)",
    joined: 4,
    cap: 6,
    level: "ทุกระดับ",
    gender: "ทุกเพศ",
    age: "18–28 ปี",
    host: "แพรว",
    desc: "ชวนเพื่อนที่ชอบเสพงานศิลป์และถ่ายรูปมุมมินิมอล เดินชมนิทรรศการ 5 ชั้นแบบสบาย ๆ จบทริปแวะคาเฟ่แลกเปลี่ยนมุมมองภาพวาดกัน",
    image: "/activities/activity-10-museum/cover.jpg",
  },
  {
    id: 11,
    title: "One Day Trip นั่งรถไฟไปอยุธยาไหว้พระ",
    cat: "ท่องเที่ยว",
    date: "อา. 29 ก.ย.",
    time: "07:30–17:00",
    place: "สถานีกลางกรุงเทพอภิวัฒน์ – อยุธยา",
    joined: 5,
    cap: 8,
    level: "ลุยได้ เดินเยอะ",
    gender: "ทุกเพศ",
    age: "18–30 ปี",
    host: "อาร์ม",
    desc: "ทริปนั่งรถไฟชิล ๆ เช่าจักรยานปั่นรอบเมืองเก่าอยุธยา ไหว้พระวัดมหาธาตุ กินก๋วยเตี๋ยวเรือและโรตีสายไหมเจ้าดัง บรรยากาศเป็นกันเอง",
    image: "/activities/activity-11-train/cover.jpg",
  },
  {
    id: 12,
    title: "แคมป์ปิ้งกางเต็นท์ดูดาวรับลมหนาวเขาใหญ่",
    cat: "ท่องเที่ยว",
    date: "ส. 5 ต.ค. – อา. 6 ต.ค.",
    time: "10:00 (2 วัน 1 คืน)",
    place: "ลานกางเต็นท์ลำตะคอง เขาใหญ่",
    joined: 4,
    cap: 8,
    level: "ชอบธรรมชาติ",
    gender: "ทุกเพศ",
    age: "20–35 ปี",
    host: "บาส",
    desc: "จัดทริปแคมป์ปิ้งรับลมเย็นบนเขาใหญ่ ก่อกองไฟ นั่งดริปกาแฟ ปิ้งบาร์บีคิว และดูดาวตอนกลางคืน มีเต็นท์ส่วนกลางและอุปกรณ์ทำครัวพร้อม",
    image: "/activities/activity-12-camping/cover.jpg",
  },
  {
    id: 26,
    title: "ล่องเรือด่วนเจ้าพระยาชมอาทิตย์ตกดินวัดอรุณ",
    cat: "ท่องเที่ยว",
    date: "อา. 29 ก.ย.",
    time: "16:30–19:30",
    place: "ท่าเตียน – วัดอรุณ กรุงเทพฯ",
    joined: 5,
    cap: 8,
    level: "ทุกระดับ",
    gender: "ทุกเพศ",
    age: "18–30 ปี",
    host: "กิ๊ฟ",
    desc: "นั่งเรือข้ามฟากชมวิวแม่น้ำเจ้าพระยายามเย็น ถ่ายรูปแสงสีส้มกระทบยอดปรางค์วัดอรุณ แวะชิมขนมปังปิ้งและเครื่องดื่มริมน้ำท่าเตียน",
    image: "/activities/activity-26-sunset-view/cover.jpg",
  },
  {
    id: 27,
    title: "เดินสำรวจสะพานไม้ป่าชายเลนบางขุนเทียน",
    cat: "ท่องเที่ยว",
    date: "ส. 5 ต.ค.",
    time: "08:30–12:30",
    place: "สะพานรักษ์ทะเลบางขุนเทียน",
    joined: 3,
    cap: 6,
    level: "เดินเพลิน ๆ",
    gender: "ทุกเพศ",
    age: "18–35 ปี",
    host: "ปอนด์",
    desc: "เช่าจักรยานปั่นเลียบเส้นทางธรรมชาติ แวะถ่ายรูปสะพานไม้กลางป่าชายเลน สูดอากาศบริสุทธิ์ชายทะเลกรุงเทพฯ และแวะทานซีฟู้ดสด ๆ",
    image: "/activities/activity-27-nature-walk/cover.jpg",
  },
  {
    id: 28,
    title: "เดินช้อปปิ้งสตรีตมาร์เก็ตตลาดนัดกลางคืน",
    cat: "ท่องเที่ยว",
    date: "ศ. 4 ต.ค.",
    time: "19:00–22:30",
    place: "ตลาดนัดจตุจักรกลางคืน",
    joined: 4,
    cap: 6,
    level: "สายช้อป",
    gender: "ทุกเพศ",
    age: "18–28 ปี",
    host: "แพท",
    desc: "ชวนเพื่อนเดินคุ้ยเสื้อผ้าวินเทจ ของแต่งห้องน่ารัก ๆ และกินสตรีตฟู้ดรอบตลาด บรรยากาศคึกคัก เดินเพลินไม่ต้องรีบร้อน",
    image: "/activities/activity-28-night-market/cover.jpg",
  },
  {
    id: 13,
    title: "ตะลุยตู้เกม Arcade แข่ง Mario Kart",
    cat: "เกม",
    date: "พฤ. 26 ก.ย.",
    time: "17:30–20:00",
    place: "Hero City MBK Center ชั้น 7",
    joined: 4,
    cap: 6,
    level: "เล่นสนุก",
    gender: "ทุกเพศ",
    age: "18–26 ปี",
    host: "มิว",
    desc: "ชวนเพื่อนสายเกมตู้ไปดวล Mario Kart Arcade, ตีกลอง Taiko no Tatsujin, และแข่งชู้ตบาสหยอดเหรียญคลายเครียดหลังเลิกเรียน",
    image: "/activities/activity-13-arcade/cover.jpg",
  },
  {
    id: 14,
    title: "นัดดวล Party Game บน Nintendo Switch",
    cat: "เกม",
    date: "ศ. 27 ก.ย.",
    time: "18:00–21:30",
    place: "Console Lounge สยาม",
    joined: 3,
    cap: 8,
    level: "ทุกระดับ",
    gender: "ทุกเพศ",
    age: "18–28 ปี",
    host: "ป้อง",
    desc: "รวมพลคนชอบปาร์ตี้เกม! เล่น Mario Party Superstars, Super Smash Bros, และ Overcooked 2 แข่งกันเฮฮา จอโปรเจกเตอร์ใหญ่",
    image: "/activities/activity-14-switch/cover.jpg",
  },
  {
    id: 15,
    title: "ซ้อมทีม ROV / Valorant หาเพื่อนไต่แรงค์",
    cat: "เกม",
    date: "ส. 28 ก.ย.",
    time: "20:00–23:00",
    place: "ออนไลน์ผ่าน Discord ช่องเสียง",
    joined: 3,
    cap: 5,
    level: "Diamond ขึ้นไป",
    gender: "ทุกเพศ",
    age: "18–28 ปี",
    host: "ไอซ์",
    desc: "หาเพื่อนร่วมทีม 5 คนสื่อสารดี ไม่โทษกันเอง ช่วยกันคอลเกมและฝึกคอมโบสกิล ซ้อมทีม 5-man stack ไต่แรงค์ยาว ๆ เสาร์ค่ำ",
    image: "/activities/activity-15-esports/cover.jpg",
  },
  {
    id: 29,
    title: "นัดดวลบอร์ดเกมวางแผน Catan & กลยุทธ์",
    cat: "เกม",
    date: "อา. 29 ก.ย.",
    time: "13:00–18:00",
    place: "More Than a Game Cafe สามย่าน",
    joined: 4,
    cap: 6,
    level: "ปานกลาง",
    gender: "ทุกเพศ",
    age: "18–32 ปี",
    host: "พี",
    desc: "เปิดศึกเจรจาค้าขายสร้างอาณานิคมใน Catan, Splendor และ Terraforming Mars มีเพื่อนช่วยอธิบายกฎและแลกเปลี่ยนกลยุทธ์อย่างสนุกสนาน",
    image: "/activities/activity-29-boardgame-catan/cover.jpg",
  },
  {
    id: 30,
    title: "ยกก๊วนตีป้อมร้านเกมมิ่งคาเฟ่ไฮเอนด์",
    cat: "เกม",
    date: "ศ. 4 ต.ค.",
    time: "19:00–23:00",
    place: "Glap Gaming Cafe พระราม 9",
    joined: 5,
    cap: 10,
    level: "ทุกระดับ",
    gender: "ทุกเพศ",
    age: "18–28 ปี",
    host: "มาร์ค",
    desc: "เหมาโซนเล่นเกม LAN Party บนจอ 240Hz และเก้าอี้เกมมิ่ง เล่นได้ทั้ง Dota 2, League of Legends, และ PUBG สั่งของกินอร่อย ๆ ส่งถึงโต๊ะ",
    image: "/activities/activity-30-pc-cafe/cover.jpg",
  },
  {
    id: 16,
    title: "ไปฟังดนตรีสดเทศกาลอินดี้ Cat Expo",
    cat: "ดนตรี",
    date: "ส. 16 พ.ย.",
    time: "14:00–22:30",
    place: "ศูนย์การประชุมแห่งชาติสิริกิติ์",
    joined: 5,
    cap: 8,
    level: "ชอบดนตรีอินดี้",
    gender: "ทุกเพศ",
    age: "18–30 ปี",
    host: "จูน",
    desc: "หาเพื่อนไปเดินงาน Cat Expo ดูคอนเสิร์ตหลายเวที ซื้ออัลบั้มและสินค้าศิลปินอินดี้ไทย ใครไปคนเดียวมารวมแก๊งเดินด้วยกันได้เลย",
    image: "/activities/activity-16-concert/cover.jpg",
  },
  {
    id: 17,
    title: "รวมกลุ่มซ้อมดนตรีห้องซ้อมแกะเพลง Pop/Rock",
    cat: "ดนตรี",
    date: "อา. 29 ก.ย.",
    time: "15:00–18:00",
    place: "Overdrive Studio เอกมัย",
    joined: 2,
    cap: 5,
    level: "เล่นเครื่องดนตรีได้",
    gender: "ทุกเพศ",
    age: "18–30 ปี",
    host: "วิน",
    desc: "รับมือกีตาร์ เบส กลอง และนักร้อง มาแจมเพลงฮิต Three Man Down, Tilly Birds, Polycat ซ้อมสนุก ๆ แลกเปลี่ยนเทคนิคดนตรีกัน",
    image: "/activities/activity-17-rehearsal/cover.jpg",
  },
  {
    id: 18,
    title: "ร้องคาราโอเกะปลดปล่อยพลังเสียงหลังสอบ",
    cat: "ดนตรี",
    date: "ศ. 4 ต.ค.",
    time: "17:30–20:30",
    place: "Siam Karaoke สยามสแควร์วัน",
    joined: 4,
    cap: 8,
    level: "ไม่จำกัดเสียงร้อง",
    gender: "ทุกเพศ",
    age: "18–26 ปี",
    host: "โบว์",
    desc: "สอบมิดเทอมเสร็จแล้วมาชวนแหกปากร้องคาราโอเกะระบายความเครียด เพลง T-Pop ยุค 90/2000 จนถึง K-Pop ฮิต ห้องใหญ่แอร์เย็นสบาย",
    image: "/activities/activity-18-karaoke/cover.jpg",
  },
  {
    id: 19,
    title: "Cafe Hopping คาเฟ่เปิดใหม่ถ่ายรูปสวย",
    cat: "อาหาร",
    date: "ส. 28 ก.ย.",
    time: "13:30–17:00",
    place: "ย่านอารีย์ ซอย 4",
    joined: 3,
    cap: 5,
    level: "ชอบถ่ายรูป",
    gender: "ทุกเพศ",
    age: "18–28 ปี",
    host: "พลอย",
    desc: "พกกล้องไปเดินฮอปปิ้ง 2-3 คาเฟ่สไตล์มินิมอลและ Specialty Coffee ชิมครัวซองต์ ถ่ายรูปพอร์ตเทรตสวย ๆ แสงธรรมชาติ",
    image: "/activities/activity-19-cafe/cover.jpg",
  },
  {
    id: 20,
    title: "ตะลุยกินบุฟเฟต์ชาบูหม่าล่าสายพาน",
    cat: "อาหาร",
    date: "พ. 25 ก.ย.",
    time: "18:30–20:30",
    place: "สุกี้จินดา สยามสแควร์",
    joined: 3,
    cap: 6,
    level: "สายกินจุ",
    gender: "ทุกเพศ",
    age: "18–28 ปี",
    host: "กัปตัน",
    desc: "หาเพื่อนร่วมโต๊ะสายซดน้ำซุปหม่าล่าเข้มข้น นั่งกินซุปกระดูกหมูผสมหม่าล่า สันคอหมู ฟองเต้าหู้ และน้ำจิ้มสูตรเด็ดหลังเลิกเรียน",
    image: "/activities/activity-20-hotpot/cover.jpg",
  },
  {
    id: 21,
    title: "เวิร์กช็อปทำเบเกอรี่อบขนมปังวันหยุด",
    cat: "อาหาร",
    date: "อา. 6 ต.ค.",
    time: "10:00–14:00",
    place: "Bake Studio สุขุมวิท 39",
    joined: 2,
    cap: 6,
    level: "เริ่มต้นจากศูนย์ได้",
    gender: "ทุกเพศ",
    age: "18–35 ปี",
    host: "มายด์",
    desc: "เรียนรู้วิธีนวดแป้ง หมักยีสต์ และอบขนมปัง Sourdough & Cinnamon Roll หอมกรุ่นจากเตา มีเชฟคอยประกบ ได้ขนมปังฝีมือตัวเองกลับบ้าน",
    image: "/activities/activity-21-baking/cover.jpg",
  },
  {
    id: 31,
    title: "ตระเวนกินสตรีตฟู้ดตลาดพลู กุยช่ายในตำนาน",
    cat: "อาหาร",
    date: "ส. 28 ก.ย.",
    time: "17:00–20:30",
    place: "สถานีรถไฟตลาดพลู ธนบุรี",
    joined: 4,
    cap: 6,
    level: "สายกินแหลก",
    gender: "ทุกเพศ",
    age: "18–35 ปี",
    host: "กอล์ฟ",
    desc: "พาลุยตลาดสตรีตฟู้ดยามเย็น ชิมกุยช่ายทอดตลาดพลูเจ้าดัง หมี่กรอบโบราณ บะหมี่ต้มยำ และขนมหวานไทยรสกลมกล่อมริมรางรถไฟ",
    image: "/activities/activity-31-street-food/cover.jpg",
  },
  {
    id: 32,
    title: "ตะลุยชิมราเมงน้ำซุปเข้มข้นย่านทองหล่อ",
    cat: "อาหาร",
    date: "พฤ. 3 ต.ค.",
    time: "18:30–21:00",
    place: "ย่านทองหล่อ สุขุมวิท 55",
    joined: 3,
    cap: 5,
    level: "สาวกราเมง",
    gender: "ทุกเพศ",
    age: "18–32 ปี",
    host: "เคน",
    desc: "ทัวร์ร้านราเมงต้นตำรับญี่ปุ่น ซดซุปทงคตสึเข้มข้น เส้นเหนียวนุ่ม หมูชาชูนุ่มละลายในปาก พูดคุยแลกเปลี่ยนร้านราเมงโปรดกัน",
    image: "/activities/activity-32-ramen/cover.jpg",
  },
  {
    id: 34,
    title: "ทัวร์ของหวานไอศกรีมเจลาโต้คราฟต์สามย่าน",
    cat: "อาหาร",
    date: "อา. 29 ก.ย.",
    time: "14:00–17:00",
    place: "จุฬาฯ ซอย 12 – สวนหลวงสแควร์",
    joined: 4,
    cap: 6,
    level: "สายหวาน",
    gender: "ทุกเพศ",
    age: "18–28 ปี",
    host: "เนย",
    desc: "ตระเวนกินไอศกรีมเจลาโต้รสแปลกใหม่ วาฟเฟิลอบร้อน และพุดดิ้งนมสดในย่านมหาวิทยาลัย เดินรับลม ถ่ายรูปชิค ๆ กับก๊วนเพื่อน",
    image: "/activities/activity-34-icecream/cover.jpg",
  },
  {
    id: 22,
    title: "Hackathon & AI Project Brainstorming",
    cat: "เรียนรู้",
    date: "ส. 5 ต.ค.",
    time: "13:00–17:30",
    place: "True Digital Park ชั้น 6",
    joined: 4,
    cap: 8,
    level: "สนใจเทคโนโลยี",
    gender: "ทุกเพศ",
    age: "18–30 ปี",
    host: "แทน",
    desc: "นัดรวมตัวนักศึกษาและคนทำงานสายไอที ระดมไอเดียสร้าง AI Agent และ Web App ต่อยอดส่งแข่ง Hackathon หรือทำเป็น Side Project ร่วมกัน",
    image: "/activities/activity-22-hackathon/cover.jpg",
  },
  {
    id: 23,
    title: "ฝึกพูดภาษาอังกฤษ Language Exchange ในคาเฟ่",
    cat: "เรียนรู้",
    date: "อา. 29 ก.ย.",
    time: "14:00–16:30",
    place: "Paper Plane Project ทองหล่อ",
    joined: 5,
    cap: 10,
    level: "ทุกระดับ",
    gender: "ทุกเพศ",
    age: "18–32 ปี",
    host: "เจสสิก้า",
    desc: "โต๊ะแลกเปลี่ยนภาษาอังกฤษแบบเป็นมิตร มีการ์ดคำถามชวนคุยเรื่องไลฟ์สไตล์ งานอดิเรก และการเดินทาง ช่วยกันฝึกความมั่นใจในการสื่อสาร",
    image: "/activities/activity-23-language/cover.jpg",
  },
  {
    id: 24,
    title: "เวิร์กช็อปวาดภาพสีน้ำและงานคราฟต์",
    cat: "เรียนรู้",
    date: "ส. 28 ก.ย.",
    time: "13:30–16:30",
    place: "BACC หอศิลป์กรุงเทพฯ ชั้น 4",
    joined: 3,
    cap: 6,
    level: "ไม่ต้องมีพื้นฐาน",
    gender: "ทุกเพศ",
    age: "18–30 ปี",
    host: "ข้าวหอม",
    desc: "ชวนมานั่งเพ้นต์สีน้ำรูปดอกไม้และทิวทัศน์ พร้อมอุปกรณ์สีน้ำเกรดสตูดิโอครบชุด บรรยากาศสงบ ผ่อนคลายฮีลใจในวันหยุด",
    image: "/activities/activity-24-watercolor/cover.jpg",
  },
  {
    id: 35,
    title: "Book Club นั่งอ่านหนังสือและเสวนาวรรณกรรม",
    cat: "เรียนรู้",
    date: "อา. 6 ต.ค.",
    time: "13:30–16:30",
    place: "หอสมุดเมืองกรุงเทพมหานคร (ราชดำเนิน)",
    joined: 4,
    cap: 8,
    level: "คนรักการอ่าน",
    gender: "ทุกเพศ",
    age: "18–35 ปี",
    host: "กานต์",
    desc: "นำหนังสือเล่มโปรดคนละหนึ่งเล่มมาแลกเปลี่ยนบทเรียน ความคิด และแรงบันดาลใจ มีเวลานั่งอ่านเงียบ ๆ และวงพูดคุยแบ่งปันมุมมอง",
    image: "/activities/activity-35-book-club/cover.jpg",
  },
  {
    id: 36,
    title: "เวิร์กช็อปถ่ายภาพ Portrait ด้วยกล้องฟิล์ม",
    cat: "เรียนรู้",
    date: "ส. 5 ต.ค.",
    time: "14:00–17:30",
    place: "สวนป่าเบญจกิติ (โซนสกายวอล์ก)",
    joined: 3,
    cap: 6,
    level: "มือใหม่–ปานกลาง",
    gender: "ทุกเพศ",
    age: "18–30 ปี",
    host: "นิว",
    desc: "ฝึกวัดแสง จัดองค์ประกอบ และถ่ายรูป Portrait ย้อนแสงสวย ๆ ทั้งกล้องฟิล์มและดิจิทัล ช่วยกันเป็นแบบและแลกรูปกันหลังจบคลาส",
    image: "/activities/activity-36-photography/cover.jpg",
  },
];
function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className={"logo " + (small ? "small" : "")}>
      <HeartHandshake />
    </div>
  );
}
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="stage">
      <div className="phone">{children}</div>
    </div>
  );
}
function Top({
  title,
  back,
  action,
}: {
  title: string;
  back?: () => void;
  action?: React.ReactNode;
}) {
  return (
    <header className="top">
      {back ? (
        <button className="icon" onClick={back}>
          <ArrowLeft />
        </button>
      ) : <span aria-hidden="true" className="top-spacer" />}
      <b>{title}</b>
      <div>{action}</div>
    </header>
  );
}
function Nav({ view, set }: { view: View; set: (v: View) => void }) {
  const all: [View, string, typeof House][] = [
    ["home", "หน้าแรก", House],
    ["discover", "ค้นหา", Search],
    ["mine", "ของฉัน", CalendarDays],
    ["profile", "โปรไฟล์", CircleUserRound],
  ];
  return (
    <nav className="nav">
      {all.slice(0, 2).map(([v, l, I]) => (
        <button
          className={view === v ? "on" : ""}
          onClick={() => set(v)}
          key={v}
        >
          <I />
          <span>{l}</span>
        </button>
      ))}
      <button className="create" onClick={() => set("create")}>
        <Plus />
        <span>สร้าง</span>
      </button>
      {all.slice(2).map(([v, l, I]) => (
        <button
          className={view === v ? "on" : ""}
          onClick={() => set(v)}
          key={v}
        >
          <I />
          <span>{l}</span>
        </button>
      ))}
    </nav>
  );
}
function Card({
  a,
  open,
  saved,
  toggle,
}: {
  a: Act;
  open: () => void;
  saved: boolean;
  toggle: () => void;
}) {
  return (
    <article
      className="card"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => e.key === "Enter" && open()}
    >
      <div
        className={"cover c" + a.id}
        style={
          a.image
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.4) 100%), url(${a.image})`,
              }
            : undefined
        }
      >
        <span>{a.cat}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
        >
          <Bookmark fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="cardbody">
        <h3>{a.title}</h3>
        <p>
          <CalendarDays />
          {a.date} · {a.time}
        </p>
        <p>
          <MapPin />
          {a.place}
        </p>
        <footer>
          <span>
            <Users />
            เหลือ {a.cap - a.joined} ที่
          </span>
        </footer>
      </div>
    </article>
  );
}
function Auth({
  reg,
  back,
  done,
  swap,
}: {
  reg: boolean;
  back: () => void;
  done: () => void;
  swap: () => void;
}) {
  const [loading, setLoading] = useState("");
  const go = (p: string) => {
    setLoading(p);
    setTimeout(done, 500);
  };
  return (
    <main className="auth fade">
      <button className="icon" onClick={back}>
        <ArrowLeft />
      </button>
      <div className="authbrand">
        <Logo />
        <b>ไปด้วยกัน</b>
      </div>
      <span className="eyebrow">ชุมชนกิจกรรมที่เป็นมิตร</span>
      <h1>{reg ? "เริ่มรู้จักเพื่อนใหม่" : "ยินดีต้อนรับกลับมา"}</h1>
      <p>
        {reg
          ? "สร้างโปรไฟล์สั้น ๆ แล้วออกไปทำสิ่งที่ชอบด้วยกัน"
          : "เข้าสู่ระบบเพื่อดูนัดหมายและกิจกรรมที่บันทึกไว้"}
      </p>
      {reg && (
        <div className="fields">
          <label>
            ชื่อที่ต้องการให้แสดง
            <input placeholder="เช่น มินตรา" />
          </label>
          <label>
            อีเมล
            <input type="email" placeholder="name@email.com" />
          </label>
        </div>
      )}
      <div className="social">
        <button onClick={() => go("Google")}>
          <b>G</b>
          {loading === "Google"
            ? "กำลังดำเนินการ..."
            : "ดำเนินการต่อด้วย Google"}
        </button>
        <button onClick={() => go("Facebook")}>
          <b className="facebook-letter">f</b>
          {loading === "Facebook"
            ? "กำลังดำเนินการ..."
            : "ดำเนินการต่อด้วย Facebook"}
        </button>
        <button onClick={() => go("Apple")}>
          <Apple />
          {loading === "Apple" ? "กำลังดำเนินการ..." : "ดำเนินการต่อด้วย Apple"}
        </button>
      </div>
      <aside className="demo">
        <ShieldCheck />
        ระบบเข้าสู่ระบบเป็นบัญชีทดลอง ยังไม่เชื่อมต่อผู้ให้บริการจริง
      </aside>
      <p className="swap">
        {reg ? "มีบัญชีอยู่แล้ว" : "ยังไม่มีบัญชี"}{" "}
        <button onClick={swap}>{reg ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}</button>
      </p>
      <small className="terms">
        การดำเนินการต่อแสดงว่าคุณยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว
      </small>
    </main>
  );
}
export default function App() {
  const [view, setView] = useState<View>("welcome"),
    [acts, setActs] = useState(seed),
    [picked, setPicked] = useState(1),
    [cat, setCat] = useState<Cat | "ทั้งหมด">("ทั้งหมด"),
    [q, setQ] = useState(""),
    [saved, setSaved] = useState([2]),
    [toast, setToast] = useState("");
  const selected = acts.find((a) => a.id === picked) || acts[0],
    filtered = useMemo(
      () =>
        acts.filter(
          (a) => (cat === "ทั้งหมด" || a.cat === cat) && a.title.includes(q),
        ),
      [acts, cat, q],
    );
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document
      .querySelector<HTMLElement>(".phone")
      ?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [view]);
  const open = (id: number) => {
      setPicked(id);
      setView("detail");
    },
    toggleSave = (id: number) =>
      setSaved((s) =>
        s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
      ),
    notify = (s: string) => {
      setToast(s);
      setTimeout(() => setToast(""), 1800);
    };
  if (view === "welcome")
    return (
      <Shell>
        <main className="welcome fade">
          <div className="art">
            <i />
            <i />
            <i />
            <div>
              <Logo />
            </div>
          </div>
          <section>
            <span className="eyebrow">
              กิจกรรมดี ๆ เริ่มจากคนที่ชอบเหมือนกัน
            </span>
            <h1>ไปด้วยกัน</h1>
            <h2>
              เจอกิจกรรมที่ชอบ
              <br />
              พบเพื่อนที่ใช่
            </h2>
            <p>
              ค้นหา เข้าร่วม หรือสร้างกิจกรรมใกล้ตัว
              ในชุมชนที่ออกแบบให้ทุกคนรู้สึกเป็นส่วนหนึ่ง
            </p>
          </section>
          <footer>
            <button className="primary" onClick={() => setView("register")}>
              เริ่มต้นใช้งาน <ChevronRight />
            </button>
            <button className="link" onClick={() => setView("login")}>
              มีบัญชีแล้ว เข้าสู่ระบบ
            </button>
            <button className="guest" onClick={() => setView("home")}>
              ดูแบบผู้เยี่ยมชม
            </button>
          </footer>
        </main>
      </Shell>
    );
  if (view === "login" || view === "register")
    return (
      <Shell>
        <Auth
          reg={view === "register"}
          back={() => setView("welcome")}
          done={() => setView("home")}
          swap={() => setView(view === "login" ? "register" : "login")}
        />
      </Shell>
    );
  return (
    <Shell>
      {toast && (
        <div className="toast">
          <Check />
          {toast}
        </div>
      )}
      {view === "home" && (
        <main className="screen pad fade">
          <header className="hello">
            <div>
              <span>สวัสดี มินตรา</span>
              <h1>วันนี้อยากทำอะไร</h1>
            </div>
            <button>
              <Bell />
              <i />
            </button>
          </header>
          <button className="searchbox" onClick={() => setView("discover")}>
            <Search />
            <span>ค้นหากิจกรรมหรือสถานที่</span>
            <SlidersHorizontal />
          </button>
          <section className="feature">
            <span>กิจกรรมแนะนำใกล้คุณ</span>
            <h2>
              ออกไปเจอประสบการณ์ใหม่
              <br />
              พร้อมเพื่อนใหม่
            </h2>
            <button onClick={() => open(1)}>
              ดูกิจกรรม <ChevronRight />
            </button>
          </section>
          <Title text="เลือกจากสิ่งที่ชอบ" action={() => setView("discover")} />
          <div className="catgrid">
            {cats.map(([n, I]) => (
              <button
                key={n}
                onClick={() => {
                  setCat(n);
                  setView("discover");
                }}
              >
                <I />
                <span>{n}</span>
              </button>
            ))}
          </div>
          <Title text="กำลังเป็นที่สนใจ" action={() => setView("discover")} />
          <div className="rail">
            {acts.slice(0, 3).map((a) => (
              <Card
                key={a.id}
                a={a}
                open={() => open(a.id)}
                saved={saved.includes(a.id)}
                toggle={() => toggleSave(a.id)}
              />
            ))}
          </div>
        </main>
      )}
      {view === "discover" && (
        <main className="screen pad fade">
          <Top
            title="ค้นหากิจกรรม"
            action={
              <button className="icon">
                <SlidersHorizontal />
              </button>
            }
          />
          <div className="searchinput">
            <Search />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ชื่อกิจกรรมหรือสถานที่"
            />
            {q && (
              <button onClick={() => setQ("")}>
                <X />
              </button>
            )}
          </div>
          <div className="chips">
            <button
              className={cat === "ทั้งหมด" ? "on" : ""}
              onClick={() => setCat("ทั้งหมด")}
            >
              ทั้งหมด
            </button>
            {cats.map(([n]) => (
              <button
                key={n}
                className={cat === n ? "on" : ""}
                onClick={() => setCat(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="result">
            <b>{filtered.length} กิจกรรม</b>
            <span>ใกล้ที่สุด</span>
          </div>
          <div className="list">
            {filtered.map((a) => (
              <Card
                key={a.id}
                a={a}
                open={() => open(a.id)}
                saved={saved.includes(a.id)}
                toggle={() => toggleSave(a.id)}
              />
            ))}
            {!filtered.length && (
              <div className="empty">
                <Search />
                <h3>ไม่พบกิจกรรมที่ตรงกัน</h3>
                <p>ลองเปลี่ยนคำค้นหาหรือหมวดกิจกรรม</p>
                <button
                  onClick={() => {
                    setQ("");
                    setCat("ทั้งหมด");
                  }}
                >
                  ล้างตัวกรอง
                </button>
              </div>
            )}
          </div>
        </main>
      )}
      {view === "detail" && (
        <main className="screen detail fade">
          <div
            className={"hero c" + selected.id}
            style={
              selected.image
                ? {
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.5) 100%), url(${selected.image})`,
                  }
                : undefined
            }
          >
            <button className="float left" onClick={() => setView("home")}>
              <ArrowLeft />
            </button>
            <button
              className="float right"
              onClick={() => toggleSave(selected.id)}
            >
              <Bookmark
                fill={saved.includes(selected.id) ? "currentColor" : "none"}
              />
            </button>
          </div>
          <div className="detailbody">
            <span className="pill">{selected.cat}</span>
            <h1>{selected.title}</h1>
            <div className="host">
              <i>{selected.host[0]}</i>
              <span>
                จัดโดย<b>{selected.host}</b>
              </span>
              <button>
                <MessageCircle />
                ข้อความ
              </button>
            </div>
            <div className="infolist">
              <Info I={CalendarDays} a={selected.date} b={selected.time} />
              <Info
                I={MapPin}
                a={selected.place}
                b="แจ้งจุดนัดพบหลังเข้าร่วม"
              />
              <Info
                I={Users}
                a={selected.joined + "/" + selected.cap + " คน"}
                b={selected.gender + " · อายุ " + selected.age}
              />
              <Info I={Trophy} a={"ระดับ " + selected.level} b="" />
            </div>
            <h2>เกี่ยวกับกิจกรรม</h2>
            <p className="description">{selected.desc}</p>
            <aside className="safety">
              <ShieldCheck />
              <span>
                <b>นัดพบอย่างปลอดภัย</b>
                พบกันในพื้นที่สาธารณะและแจ้งคนใกล้ตัวก่อนเข้าร่วม
              </span>
            </aside>
            <button className="report">
              <Flag />
              รายงานกิจกรรมนี้
            </button>
          </div>
          <div className="joinbar">
            <button
              className={selected.joinedByMe ? "joined" : ""}
              onClick={() => {
                setActs((v) =>
                  v.map((a) =>
                    a.id === selected.id
                      ? {
                          ...a,
                          joinedByMe: !a.joinedByMe,
                          joined: a.joined + (a.joinedByMe ? -1 : 1),
                        }
                      : a,
                  ),
                );
                notify(
                  selected.joinedByMe
                    ? "ออกจากกิจกรรมแล้ว"
                    : "เข้าร่วมกิจกรรมเรียบร้อย",
                );
              }}
            >
              {selected.joinedByMe ? "เข้าร่วมแล้ว" : "เข้าร่วมกิจกรรม"}
            </button>
          </div>
        </main>
      )}
      {view === "create" && (
        <Create
          back={() => setView("home")}
          done={(a) => {
            setActs((v) => [a, ...v]);
            notify("สร้างกิจกรรมเรียบร้อยแล้ว");
            setView("mine");
          }}
        />
      )}
      {view === "mine" && (
        <main className="screen pad fade">
          <Top title="กิจกรรมของฉัน" />
          <section className="summary">
            <i>ม</i>
            <span>
              <b>นัดหมายที่กำลังจะมาถึง</b>
              <small>
                {acts.filter((a) => a.joinedByMe).length + 1} กิจกรรม
              </small>
            </span>
          </section>
          <div className="tabs">
            <button className="on">กำลังจะมาถึง</button>
            <button>สร้างโดยฉัน</button>
            <button>ที่ผ่านมา</button>
          </div>
          <div className="list">
            {acts
              .filter((a) => a.joinedByMe || a.id === 2)
              .map((a) => (
                <Card
                  key={a.id}
                  a={a}
                  open={() => open(a.id)}
                  saved={saved.includes(a.id)}
                  toggle={() => toggleSave(a.id)}
                />
              ))}
          </div>
        </main>
      )}
      {view === "profile" && (
        <main className="screen pad fade">
          <Top
            title="โปรไฟล์"
            action={<button className="textaction">ตั้งค่า</button>}
          />
          <section className="profile">
            <i>ม</i>
            <span>
              <h1>มินตรา สุวรรณ</h1>
              <p>กรุงเทพฯ · สมาชิกตั้งแต่ปี 2569</p>
              <button>แก้ไขโปรไฟล์</button>
            </span>
          </section>
          <div className="stats">
            <span>
              <b>8</b>เข้าร่วมแล้ว
            </span>
            <span>
              <b>3</b>จัดกิจกรรม
            </span>
            <span>
              <b>{saved.length}</b>บันทึกไว้
            </span>
          </div>
          <section className="block">
            <h2>เกี่ยวกับฉัน</h2>
            <p>
              ชอบลองกิจกรรมใหม่ ๆ หาเพื่อนไปคาเฟ่ ออกกำลัง
              และเรียนรู้สิ่งใหม่ในวันหยุด
            </p>
          </section>
          <section className="block">
            <h2>ความสนใจ</h2>
            <div className="tags">
              <i>ท่องเที่ยว</i>
              <i>อาหาร</i>
              <i>ดนตรี</i>
              <i>เรียนรู้</i>
            </div>
          </section>
          <section className="block menu">
            <button>
              <ShieldCheck />
              ความปลอดภัยและความเป็นส่วนตัว
              <ChevronRight />
            </button>
            <button>
              <MessageCircle />
              ศูนย์ช่วยเหลือ
              <ChevronRight />
            </button>
          </section>
          <button className="logout" onClick={() => setView("welcome")}>
            ออกจากระบบ
          </button>
        </main>
      )}
      {view !== "detail" && view !== "create" && (
        <Nav view={view} set={setView} />
      )}
    </Shell>
  );
}
function Title({ text, action }: { text: string; action: () => void }) {
  return (
    <div className="title">
      <h2>{text}</h2>
      <button onClick={action}>ดูทั้งหมด</button>
    </div>
  );
}
function Info({ I, a, b }: { I: typeof Trophy; a: string; b: string }) {
  return (
    <div>
      <I />
      <span>
        <b>{a}</b>
        {b}
      </span>
    </div>
  );
}
function Create({ back, done }: { back: () => void; done: (a: Act) => void }) {
  const [title, setTitle] = useState(""),
    [cat, setCat] = useState<Cat>("กีฬา"),
    [place, setPlace] = useState(""),
    [desc, setDesc] = useState("");
  return (
    <main className="screen form fade">
      <Top title="สร้างกิจกรรม" back={back} />
      <section className="formintro">
        <span>ขั้นตอนเดียว</span>
        <h1>ชวนเพื่อนออกไปทำสิ่งที่ชอบ</h1>
        <p>ใส่ข้อมูลให้ชัดเจน เพื่อให้คนที่สนใจตัดสินใจได้ง่ายขึ้น</p>
      </section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const defaultCovers: Record<Cat, string> = {
            กีฬา: "/activities/activity-1-running/cover.jpg",
            ท่องเที่ยว: "/activities/activity-2-travel/cover.jpg",
            เกม: "/activities/activity-3-boardgame/cover.jpg",
            ดนตรี: "/activities/activity-4-music/cover.jpg",
            อาหาร: "/activities/activity-5-food/cover.jpg",
            เรียนรู้: "/activities/activity-6-learning/cover.jpg",
          };
          done({
            id: Date.now(),
            title,
            cat,
            date: "ส. 5 ต.ค.",
            time: "14:00–16:00",
            place,
            joined: 1,
            cap: 8,
            level: "ทุกระดับ",
            gender: "ทุกเพศ",
            age: "18 ปีขึ้นไป",
            host: "มินตรา",
            desc: desc || "มาร่วมทำกิจกรรมและทำความรู้จักเพื่อนใหม่ไปด้วยกัน",
            image: defaultCovers[cat] || "/activities/activity-1-running/cover.jpg",
          });
        }}
      >
        <label>
          ชื่อกิจกรรม
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="เช่น ชวนตีแบดหลังเลิกเรียน"
          />
        </label>
        <label>
          หมวดกิจกรรม
          <select value={cat} onChange={(e) => setCat(e.target.value as Cat)}>
            {cats.map(([n]) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <div className="twocol">
          <label>
            วันที่
            <input type="date" defaultValue="2026-10-05" />
          </label>
          <label>
            เวลา
            <input type="time" defaultValue="14:00" />
          </label>
        </div>
        <label>
          สถานที่
          <input
            required
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="สถานที่หรือพื้นที่โดยประมาณ"
          />
        </label>
        <label>
          จำนวนสูงสุด
          <input type="number" min="2" defaultValue="8" />
        </label>
        <label>
          รายละเอียด
          <textarea
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="เล่าบรรยากาศและสิ่งที่ควรเตรียม"
          />
        </label>
        <aside className="demo">
          <ShieldCheck />
          สถานที่สาธารณะช่วยให้ทุกคนรู้สึกปลอดภัยมากขึ้น
        </aside>
        <button className="primary" disabled={!title || !place}>
          เผยแพร่กิจกรรม
        </button>
      </form>
    </main>
  );
}
