// 作成日: 2026-07-18 / 作成担当: Codex
// 最終更新日: 2026-07-21 (Codex) — 汎用版の保存設定。
import Dexie, { type Table } from "dexie";

export type LifeEntry = {
  date: string;
  bedtimePrev: string;
  wakeTime: string;
  meals: { breakfast: boolean; lunch: boolean; dinner: boolean; lateSnack: boolean };
  medicine: boolean;
  activities: Record<string, boolean>;
  note: string;
  // 困りごとのメモ: 通院などで伝えたい事実を、端末内に残す欄。
  troubleNote?: string;
  createdAt: string;
  updatedAt: string;
};

export type AkariSettings = {
  id: "main";
  enabledExtras: Record<string, boolean>;
  partnerName: boolean;
  visibleSections?: Record<string, boolean>;
  clinicDays?: number | "all";
  clinicFields?: Record<string, boolean>;
  backupAt?: string;
};

class AkariDatabase extends Dexie {
  entries!: Table<LifeEntry, string>;
  settings!: Table<AkariSettings, string>;
  constructor() {
    super("kurashi-tsuin-memo-db");
    this.version(1).stores({ entries: "date, updatedAt", settings: "id" });
  }
}

export const db = new AkariDatabase();
export const extras = [
  ["outing", "外出したこと"], ["daycare", "デイケア"], ["work", "仕事・作業所へ行った"], ["commute", "通所・通勤"],
  ["bath", "入浴"], ["cleaning", "掃除・庭仕事"], ["ai", "AI開発"], ["lateSnack", "夜食"], ["condition", "体調不良だった"], ["mood", "気分を記した"],
] as const;

export function blankEntry(date: string): LifeEntry {
  const now = new Date().toISOString();
  return { date, bedtimePrev: "", wakeTime: "", meals: { breakfast: false, lunch: false, dinner: false, lateSnack: false }, medicine: false, activities: {}, note: "", troubleNote: "", createdAt: now, updatedAt: now };
}
