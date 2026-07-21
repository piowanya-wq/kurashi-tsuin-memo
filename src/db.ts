// 作成日: 2026-07-18 / 作成担当: Codex
// 最終更新日: 2026-07-21 (Codex) — 汎用版の保存設定。
import Dexie, { type Table } from "dexie";

export type LifeEntry = {
  date: string;
  bedtimePrev: string;
  wakeTime: string;
  meals: { breakfast: boolean; lunch: boolean; dinner: boolean; lateSnack: boolean };
  medicine: boolean;
  medicines?: Record<string, boolean>;
  activities: Record<string, boolean>;
  note: string;
  // 困りごとのメモ: 通院などで伝えたい事実を、端末内に残す欄。
  troubleNote?: string;
  createdAt: string;
  updatedAt: string;
};

export type AppSettings = {
  id: "main";
  enabledExtras: Record<string, boolean>;
  visibleSections?: Record<string, boolean>;
  clinicDays?: number | "all";
  clinicFields?: Record<string, boolean>;
  medicineItems?: string[];
  customItems?: string[];
  backupAt?: string;
};

class KurashiTsuinDatabase extends Dexie {
  entries!: Table<LifeEntry, string>;
  settings!: Table<AppSettings, string>;
  constructor() {
    super("kurashi-tsuin-memo-db");
    this.version(1).stores({ entries: "date, updatedAt", settings: "id" });
  }
}

export const db = new KurashiTsuinDatabase();
export const extras = [
  ["outing", "外出したこと"], ["work", "仕事"], ["bath", "入浴"], ["ai", "AI開発"], ["lateSnack", "夜食"], ["condition", "体調不良だった"],
] as const;

export function blankEntry(date: string): LifeEntry {
  const now = new Date().toISOString();
  return { date, bedtimePrev: "", wakeTime: "", meals: { breakfast: false, lunch: false, dinner: false, lateSnack: false }, medicine: false, medicines: {}, activities: {}, note: "", troubleNote: "", createdAt: now, updatedAt: now };
}
