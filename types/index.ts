export type Language = "ur" | "en";

export interface SiteContact {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  address_ur: string;
  address_en: string;
}

export interface SiteConfig {
  name_ur: string;
  suffix_ur: string;
  brandFull_ur: string;
  name_en: string;
  suffix_en: string;
  brandFull_en: string;
  tagline_ur: string;
  tagline_en: string;
  heroDescription_ur: string;
  heroDescription_en: string;
  logo: string;
  favicon: string;
  heroImage: string;
  contact: SiteContact;
  defaultLanguage: Language;
}

export interface Announcement {
  enabled: boolean;
  isUrgent: boolean;
  badge_ur: string;
  badge_en: string;
  text_ur: string;
  text_en: string;
  date?: string;
}

export type EventCategory = "all" | "spiritual" | "welfare" | "community";

export interface EventItem {
  id: number;
  isFeatured: boolean;
  category: "spiritual" | "welfare" | "community";
  category_ur: string;
  category_en: string;
  title_ur: string;
  title_en: string;
  targetDate: string; // ISO string e.g. "2026-10-15T20:00:00"
  dateDisplay_ur: string;
  dateDisplay_en: string;
  time_ur: string;
  time_en: string;
  location_ur: string;
  location_en: string;
  speaker_ur: string;
  speaker_en: string;
  description_ur: string;
  description_en: string;
  image: string;
  status_ur: string;
  status_en: string;
}

export interface RelatedGalleryImage {
  src: string;
  title_ur: string;
  title_en: string;
}

export type GalleryCategory =
  | "all"
  | "astana"
  | "milad"
  | "lectures"
  | "urs"
  | "community"
  | "langar";

export interface GalleryAlbum {
  id: number;
  albumId: "astana" | "milad" | "lectures" | "urs" | "community" | "langar";
  category_ur: string;
  category_en: string;
  albumTitle_ur: string;
  albumTitle_en: string;
  title_ur: string;
  title_en: string;
  image: string;
  date: string;
  description_ur: string;
  description_en: string;
  relatedImages: RelatedGalleryImage[];
}

export interface SocialChannel {
  id: "facebook" | "youtube" | "instagram" | "tiktok" | "whatsapp";
  name: string;
  handle: string;
  url: string;
  color: string;
  gradient: string;
  title_ur: string;
  title_en: string;
  desc_ur: string;
  desc_en: string;
  btn_text_ur: string;
  btn_text_en: string;
  followersBadge_ur: string;
  followersBadge_en: string;
}

export interface CommitteeMember {
  id: number;
  name_ur: string;
  name_en: string;
  role_ur: string;
  role_en: string;
  phone: string;
  whatsapp: string;
  tag_ur?: string;
  tag_en?: string;
}

export interface Translations {
  [key: string]: string;
}
