import { getCollection } from 'astro:content';
import archive from '../data/chronik-archiv.json';

export interface ArchiveImage {
  image: string;
  caption: string;
  source: string;
}

export interface ArchiveNote {
  date?: string;
  order: number;
  text: string[];
  links?: { href: string; label: string }[];
  photos?: ArchiveImage[];
}

const notes: Record<string, ArchiveNote[]> = archive.years;
const press: Record<string, ArchiveImage[]> = archive.press;

export async function getChronicle() {
  const entries = (await getCollection('chronik')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
  const years = [...new Set([
    ...Object.keys(notes).map(Number),
    ...entries.map((entry) => entry.data.date.getUTCFullYear()),
  ])].sort((a, b) => b - a);

  return { entries, years, notes, press };
}

export function formatChronicleDate(date: Date) {
  return date.toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
