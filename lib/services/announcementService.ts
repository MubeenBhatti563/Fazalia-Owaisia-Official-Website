import { Announcement } from "@/types";
import { initialAnnouncement } from "@/lib/data/announcements";

export async function getLatestAnnouncement(): Promise<Announcement> {
  return initialAnnouncement;
}
