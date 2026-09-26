import { Language, Translations } from "@/types";

export const translations: Record<Language, Translations> = {
  ur: {
    // Navigation
    nav_home: "ہوم",
    nav_about: "تعارف",
    nav_events: "پروگرامز",
    nav_gallery: "گیلری",
    nav_social: "سوشل میڈیا",
    nav_committee: "انتظامیہ",
    nav_contact: "رابطہ",

    // Hero
    hero_badge: "آفیشل • ہمارے گاؤں کی دینی و فلاحی سرگرمیاں",
    hero_img_badge: "آستانہ عالیہ شریف و دربار • ہمارا گاؤں",
    hero_btn_explore: "پروگرامز دیکھیں",
    hero_btn_social: "سوشل میڈیا چینلز",
    hero_btn_gallery: "تصویری گیلری",

    // Countdown Timer
    countdown_title: "اگلے بڑے پروگرام تک کا وقت:",
    days: "دن",
    hours: "گھنٹے",
    minutes: "منٹ",
    seconds: "سیکنڈ",

    // About Section
    about_tag: "تعارف و مقاصد",
    about_title: "ہمارا تعارف اور گاؤں کے مقاصد",
    about_desc:
      "فضلیہ اویسیہ آفیشل گاؤں کی تمام دینی، روحانی، فلاحی اور سماجی سرگرمیوں کو ایک معتبر پلیٹ فارم پر یکجا کرنے کے لیے قائم کیا گیا ہے۔ اس کا مقصد ملکی و غیر ملکی اہل علاقہ کو ہر لمحہ گاؤں کے تمام بابرکت پروگرامز اور خدمات سے باخبر رکھنا ہے۔",
    feature_1_title: "دینی و روحانی محافل",
    feature_1_desc: "سالانہ عرس، میلاد النبی ﷺ اور ماہانہ مجالسِ ذکر کی بروقت اطلاع اور شیڈول۔",
    feature_2_title: "فلاحی و سماجی خدمات",
    feature_2_desc: "فری میڈیکل کیمپ، راشن تقسیم اور گاؤں کی اجتماعی بہبود کے تمام اقدامات۔",
    feature_3_title: "سوشل میڈیا و ڈیجیٹل کوریج",
    feature_3_desc: "فیس بک، یوٹیوب، انسٹاگرام اور ٹک ٹاک پر مکمل کوریج تاکہ پردیسی بھائی بھی باخبر رہیں۔",

    // Village Events
    events_tag: "پروگرامز و تقریبات",
    events_title: "گاؤں کے آنے والے پروگرامز",
    events_subtitle: "تمام دینی محافل، فلاحی پروگرامز اور اعلانات کی فہرست۔ اپنے احباب کے ساتھ شیئر فرمائیں۔",
    filter_all: "تمام پروگرامز",
    filter_spiritual: "دینی و روحانی",
    filter_welfare: "فلاحی سرگرمیاں",
    filter_community: "کھیل و سماجی",
    btn_share_whatsapp: "واٹس ایپ شیئر",
    btn_details: "مکمل تفصیل",
    event_speaker_label: "خطاب:",
    event_time_label: "وقت:",
    event_venue_label: "مقام:",
    event_date_label: "تاریخ:",
    empty_events_msg: "فی الحال اس کیٹیگری میں کوئی پروگرام درج نہیں ہے۔",

    // Gallery & Lightbox
    gallery_tag: "تصویری البمز",
    gallery_title: "یادگار تصویری گیلری",
    gallery_subtitle:
      "آستانہ عالیہ شریف، سالانہ عرس اور گاؤں کے پروگرامز کے مناظر۔ کسی بھی تصویر پر کلک کر کے متعلقہ تمام تصاویر دیکھیں۔",
    gallery_filter_all: "تمام البمز و تصاویر",
    gallery_filter_astana: "آستانہ عالیہ",
    gallery_filter_milad: "محفلِ میلاد",
    gallery_filter_lectures: "دینی خطابات",
    gallery_filter_urs: "عرس مبارک",
    gallery_filter_community: "اہل علاقہ",
    gallery_filter_langar: "لنگرِ عام",
    gallery_related_title: "اس البم کی تمام متعلقہ تصاویر (نیچے سکرول کر کے تمام تصاویر دیکھیں):",
    gallery_scroll_hint: "نیچے سکرول کر کے تمام تصاویر ملاحظہ فرمائیں",
    gallery_view_btn: "تمام متعلقہ تصاویر دیکھیں",
    gallery_view_large: "بڑی تصویر دیکھیں",
    gallery_other_albums: "دیگر البمز دیکھیں:",
    gallery_photo_count: "تصاویر",
    gallery_view_album: "مکمل البم دیکھیں",
    gallery_modal_close: "بند کریں",
    gallery_click_to_view: "تمام تصاویر دیکھیں (کلک کریں)",

    // Social Media Section
    social_tag: "ڈیجیٹل نیٹ ورک",
    social_title: "ہمارے آفیشل سوشل میڈیا چینلز",
    social_subtitle:
      "تمام مستند اعلانات، ویڈیوز، تصاویر اور بیانات کے لیے ہمارے آفیشل اکاؤنٹس کو فالو اور سبسکرائب فرمائیں۔",
    verified_badge_tooltip: "تصدیق شدہ آفیشل چینل",

    // Committee Section
    committee_tag: "انتظامیہ",
    committee_title: "گاؤں کے منتظمین و رابطہ کار",
    committee_subtitle:
      "کسی بھی پروگرام، دعا کی درخواست یا مشورے کے لیے ہمارے منتظمین سے بلا جھجھک رابطہ فرمائیں۔",
    btn_call_now: "فون کریں",
    btn_chat_whatsapp: "واٹس ایپ",

    // Contact Section
    contact_tag: "رابطہ فرمائیں",
    contact_title: "ہم سے رابطہ کریں",
    contact_subtitle: "پروگرامز کی تفصیلات، اعلانات کے اندراج یا کسی بھی تعاون کے لیے ہمہ وقت دستیاب ہیں۔",
    contact_phone_title: "براہِ راست فون کال",
    contact_wa_title: "آفیشل واٹس ایپ",
    contact_email_title: "آفیشل ای میل ایڈریس",
    contact_address_title: "مرکزی پتہ",

    // Footer
    footer_about: "فضلیہ اویسیہ آفیشل — گاؤں کی تمام دینی، روحانی اور فلاحی تقریبات کا باوقار مرکز۔",
    footer_quick_links: "اہم روابط",
    footer_social_links: "سوشل میڈیا روابط",
    footer_rights: "تمام حقوق محفوظ ہیں۔",
    back_to_top: "اوپر جائیں",
    whatsapp_float_text: "واٹس ایپ رابطہ",
    event_modal_share_btn: "واٹس ایپ پر شیئر کریں",
    image_of: "تصویر",
    image_out_of: "از",
    featured_event_badge: "خاص پروگرام",
  },

  en: {
    // Navigation
    nav_home: "Home",
    nav_about: "About Us",
    nav_events: "Village Events",
    nav_gallery: "Gallery",
    nav_social: "Social Media",
    nav_committee: "Committee",
    nav_contact: "Contact",

    // Hero
    hero_badge: "OFFICIAL • VILLAGE COMMUNITY & SPIRITUAL ACTIVITIES",
    hero_img_badge: "Central Astana Sharif & Shrine • Our Village",
    hero_btn_explore: "Explore Events",
    hero_btn_social: "Social Channels",
    hero_btn_gallery: "Photo Gallery",

    // Countdown Timer
    countdown_title: "Time Remaining Until Next Major Event:",
    days: "Days",
    hours: "Hours",
    minutes: "Mins",
    seconds: "Secs",

    // About Section
    about_tag: "ABOUT & MISSION",
    about_title: "Our Mission & Village Purpose",
    about_desc:
      "The Fazalia Owaisia Official platform unites all spiritual gatherings, community welfare initiatives, youth sports, and urgent announcements on one prestigious platform. It connects residents and overseas brothers with hometown activities in real time.",
    feature_1_title: "Spiritual Gatherings",
    feature_1_desc: "Timely schedules and venues for Annual Urs, Milad-un-Nabi, and monthly Zikr assemblies.",
    feature_2_title: "Community Welfare",
    feature_2_desc: "Free medical camps, assistance drives, and collective development projects for the village.",
    feature_3_title: "Digital & Social Coverage",
    feature_3_desc: "Comprehensive coverage across Facebook, YouTube, Instagram, and TikTok for overseas attendees.",

    // Village Events
    events_tag: "PROGRAMS & EVENTS",
    events_title: "Upcoming Village Programs",
    events_subtitle: "Complete schedule of spiritual gatherings, community meetings, and welfare initiatives.",
    filter_all: "All Events",
    filter_spiritual: "Spiritual & Dini",
    filter_welfare: "Welfare Drives",
    filter_community: "Sports & Youth",
    btn_share_whatsapp: "WhatsApp Share",
    btn_details: "Full Details",
    event_speaker_label: "Address:",
    event_time_label: "Time:",
    event_venue_label: "Venue:",
    event_date_label: "Date:",
    empty_events_msg: "No events currently found in this category.",

    // Gallery & Lightbox
    gallery_tag: "PHOTO ALBUMS",
    gallery_title: "Village Photo Gallery",
    gallery_subtitle:
      "Memorable glimpses from Astana Sharif, Annual Urs, and village gatherings. Click any photo to view all related pictures.",
    gallery_filter_all: "All Albums & Photos",
    gallery_filter_astana: "Astana Sharif",
    gallery_filter_milad: "Milad Mehfil",
    gallery_filter_lectures: "Spiritual Lectures",
    gallery_filter_urs: "Annual Urs",
    gallery_filter_community: "Community",
    gallery_filter_langar: "Langar Feast",
    gallery_related_title: "All Photos in this Album (Scroll down to view all):",
    gallery_scroll_hint: "Scroll down to browse all related pictures in this collection",
    gallery_view_btn: "View All Related Photos",
    gallery_view_large: "View Large Photo",
    gallery_other_albums: "Explore Other Albums:",
    gallery_photo_count: "Photos",
    gallery_view_album: "View Album",
    gallery_modal_close: "Close",
    gallery_click_to_view: "View All Photos (Click)",

    // Social Media Section
    social_tag: "DIGITAL NETWORK",
    social_title: "Official Social Media Channels",
    social_subtitle:
      "Follow and subscribe to our official handles for verified announcements, live videos, speeches, and photo updates.",
    verified_badge_tooltip: "Official Verified Channel",

    // Committee Section
    committee_tag: "ORGANIZING COMMITTEE",
    committee_title: "Village Committee & Coordinators",
    committee_subtitle: "Feel free to reach out to our event organizers and community leaders for inquiries.",
    btn_call_now: "Call Now",
    btn_chat_whatsapp: "WhatsApp",

    // Contact Section
    contact_tag: "GET IN TOUCH",
    contact_title: "Contact & Information",
    contact_subtitle: "Reach out to us for event notices, prayers, community initiatives, or inquiries.",
    contact_phone_title: "Direct Phone Call",
    contact_wa_title: "Official WhatsApp",
    contact_email_title: "Official Email Address",
    contact_address_title: "Village Location",

    // Footer
    footer_about: "Fazalia Owaisia Official — The definitive home for all village spiritual, religious, and community events.",
    footer_quick_links: "Quick Links",
    footer_social_links: "Social Media Links",
    footer_rights: "All Rights Reserved.",
    back_to_top: "Back to Top",
    whatsapp_float_text: "Chat on WhatsApp",
    event_modal_share_btn: "Share on WhatsApp",
    image_of: "Image",
    image_out_of: "of",
    featured_event_badge: "Featured Event",
  },
};
