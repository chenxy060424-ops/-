import {
  PracticeRecord,
  SavedScript,
  TreeholeEntry,
} from '../types/zhixian';

const KEYS = {
  RECORDS: 'zhixian_practice_records_v1',
  SCRIPTS: 'zhixian_saved_scripts_v1',
  TREEHOLE: 'zhixian_treehole_notes_v1',
};

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors safely
  }
}

export function formatChineseDate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatChineseDateTime(date = new Date()): string {
  const d = formatChineseDate(date);
  const hours = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');
  return `${d} ${hours}:${mins}`;
}

export function getPracticeRecords(): PracticeRecord[] {
  return readJSON<PracticeRecord[]>(KEYS.RECORDS, []);
}

export function savePracticeRecord(record: PracticeRecord): PracticeRecord[] {
  const existing = getPracticeRecords();
  const updated = [record, ...existing.filter((r) => r.id !== record.id)];
  writeJSON(KEYS.RECORDS, updated);
  return updated;
}

export function deletePracticeRecord(id: string): PracticeRecord[] {
  const updated = getPracticeRecords().filter((r) => r.id !== id);
  writeJSON(KEYS.RECORDS, updated);
  return updated;
}

export function getSavedScripts(): SavedScript[] {
  return readJSON<SavedScript[]>(KEYS.SCRIPTS, []);
}

export function saveScript(script: SavedScript): SavedScript[] {
  const existing = getSavedScripts();
  const duplicate = existing.find(
    (s) =>
      s.scenarioId === script.scenarioId &&
      s.content.trim() === script.content.trim()
  );
  if (duplicate) return existing;
  const updated = [script, ...existing];
  writeJSON(KEYS.SCRIPTS, updated);
  return updated;
}

export function removeSavedScript(id: string): SavedScript[] {
  const updated = getSavedScripts().filter((s) => s.id !== id);
  writeJSON(KEYS.SCRIPTS, updated);
  return updated;
}

export function getTreeholeEntries(): TreeholeEntry[] {
  return readJSON<TreeholeEntry[]>(KEYS.TREEHOLE, []);
}

export function addTreeholeEntry(content: string): TreeholeEntry[] {
  const entry: TreeholeEntry = {
    id: `th-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    content: content.trim(),
    createdAt: formatChineseDateTime(new Date()),
  };
  const updated = [entry, ...getTreeholeEntries()];
  writeJSON(KEYS.TREEHOLE, updated);
  return updated;
}

export function deleteTreeholeEntry(id: string): TreeholeEntry[] {
  const updated = getTreeholeEntries().filter((e) => e.id !== id);
  writeJSON(KEYS.TREEHOLE, updated);
  return updated;
}
