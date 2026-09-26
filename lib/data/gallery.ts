import { GalleryAlbum } from "@/types";

export const initialGalleryAlbums: GalleryAlbum[] = [
  {
    id: 1,
    albumId: "astana",
    category_ur: "آستانہ عالیہ",
    category_en: "Astana Sharif",
    albumTitle_ur: "مرکزی آستانہ عالیہ و دربار شریف",
    albumTitle_en: "Central Astana Sharif & Shrine",
    title_ur: "آستانہ عالیہ شریف و دربار کا خوبصورت اور پُرسکون منظر",
    title_en: "Scenic Architectural View of Central Astana Sharif",
    image: "/images/gallery/gallery-1.png",
    date: "2026",
    description_ur:
      "مرکزی آستانہ عالیہ کی پرنور عمارت اور گنبد شریف، جہاں سال بھر فیضان و برکات کا سلسلہ جاری رہتا ہے۔",
    description_en:
      "The historic spiritual sanctuary and central dome of Astana Sharif, radiating serene peace and hospitality.",
    relatedImages: [
      {
        src: "/images/gallery/gallery-1.png",
        title_ur: "آستانہ عالیہ دربار شریف (مرکزی زاویہ)",
        title_en: "Astana Sharif Main Front View",
      },
      {
        src: "/images/hero/shrine-main.png",
        title_ur: "آستانہ عالیہ کا وسیع منظر اور صحن",
        title_en: "Wide Panoramic View of the Shrine Courtyard",
      },
      {
        src: "/images/gallery/gallery-4.png",
        title_ur: "شام کے وقت آستانہ شریف پر چراغاں",
        title_en: "Evening Illumination at Astana Grounds",
      },
    ],
  },
  {
    id: 2,
    albumId: "milad",
    category_ur: "محفلِ میلاد",
    category_en: "Milad Mehfil",
    albumTitle_ur: "سالانہ محفلِ میلاد النبی ﷺ",
    albumTitle_en: "Annual Mehfil-e-Milad-un-Nabi",
    title_ur: "محفلِ میلاد النبی ﷺ کے پُررونق اور پرکیف لمحات",
    title_en: "Moments from the Grand Mehfil-e-Milad-un-Nabi",
    image: "/images/gallery/gallery-2.png",
    date: "2026",
    description_ur:
      "ولادتِ مصطفیٰ ﷺ کی محفلِ پاک میں ثناء خوانی اور علمائے حق کے پُراثر خطابات کے روح پرور مناظر۔",
    description_en:
      "Soul-stirring gatherings of devotional poetry, Naat recitation, and spiritual guidance by guest scholars.",
    relatedImages: [
      {
        src: "/images/gallery/gallery-2.png",
        title_ur: "محفلِ میلاد کا مرکزی اسٹیج اور نعت خوانی",
        title_en: "Main Stage & Devotional Naat Recitation",
      },
      {
        src: "/images/gallery/gallery-3.png",
        title_ur: "علمائے کرام اور مشائخ کا خصوصی خطاب",
        title_en: "Keynote Spiritual Addresses by Scholars",
      },
      {
        src: "/images/events/program-c.jpg",
        title_ur: "محفلِ میلاد النبی ﷺ کا آفیشل پروگرام پوسٹر",
        title_en: "Official Event Program Banner & Schedule",
      },
      {
        src: "/images/gallery/gallery-5.png",
        title_ur: "محفل میں شریک عاشقانِ رسول کا اجتماع",
        title_en: "Gathering of Dedicated Attendees",
      },
    ],
  },
  {
    id: 3,
    albumId: "lectures",
    category_ur: "دینی خطابات",
    category_en: "Spiritual Discourses",
    albumTitle_ur: "علمائے کرام و مشائخ کے خطابات",
    albumTitle_en: "Spiritual Discourses & Lectures",
    title_ur: "جید علمائے کرام کے ایمان افروز بیانات و نصائح",
    title_en: "Enlightening Sermons by Renowned Scholars",
    image: "/images/gallery/gallery-3.png",
    date: "2026",
    description_ur:
      "اصلاحِ معاشرہ، حقوق العباد اور سنتِ نبوی ﷺ کے احیاء پر مشائخ عظام کے علمی و فکری بیانات۔",
    description_en:
      "Scholarly lectures focusing on character building, moral ethics, and adherence to Islamic traditions.",
    relatedImages: [
      {
        src: "/images/gallery/gallery-3.png",
        title_ur: "علمائے کرام کا خصوصی خطاب اور دعا",
        title_en: "Scholarly Address and Collective Supplication",
      },
      {
        src: "/images/gallery/gallery-2.png",
        title_ur: "خطاب کے دوران سامعین کا پُرجوش و باادب ردعمل",
        title_en: "Attentive Audience During Keynote Sermon",
      },
      {
        src: "/images/events/program-d.jpg",
        title_ur: "ماہانہ مجلسِ ذکر و وعظ کا پوسٹر",
        title_en: "Monthly Spiritual Discourses Announcement",
      },
    ],
  },
  {
    id: 4,
    albumId: "urs",
    category_ur: "عرس مبارک",
    category_en: "Annual Urs",
    albumTitle_ur: "سالانہ عرس مبارک کی تقریبات",
    albumTitle_en: "Annual Urs Mubarak Celebrations",
    title_ur: "سالانہ عرس مبارک پر چراغاں، چادر پوشی و اجتماع",
    title_en: "Illuminations, Floral Tribute & Gathering at Annual Urs",
    image: "/images/gallery/gallery-4.png",
    date: "2026",
    description_ur:
      "سالانہ عرس مبارک کے روح پرور مناظر، ملک بھر سے عقیدت مندوں کی آمد اور دعائے خیر۔",
    description_en:
      "Grand scenes from the Annual Urs, welcoming visitors from all regions with floral tributes and unity.",
    relatedImages: [
      {
        src: "/images/gallery/gallery-4.png",
        title_ur: "عرس مبارک پر برقی قمقموں اور چراغاں کا منظر",
        title_en: "Night Illumination & Festive Lights at Shrine",
      },
      {
        src: "/images/events/program-b.jpg",
        title_ur: "عرس مبارک کی تقریب کا آفیشل دعوت نامہ",
        title_en: "Official Urs Mubarak Invitation Banner",
      },
      {
        src: "/images/gallery/gallery-6.png",
        title_ur: "عرس کے اختتام پر محفلِ دعا و سلام",
        title_en: "Concluding Supplication & Salam at Shrine",
      },
      {
        src: "/images/gallery/gallery-1.png",
        title_ur: "عرس کے دوران دربار شریف کا خارجی منظر",
        title_en: "Exterior Panorama of Astana During Urs",
      },
    ],
  },
  {
    id: 5,
    albumId: "community",
    category_ur: "اہل علاقہ",
    category_en: "Community",
    albumTitle_ur: "اہلِ علاقہ اور نوجوانوں کی سرگرمیاں",
    albumTitle_en: "Village Community & Youth Activities",
    title_ur: "گاؤں کے بزرگوں اور نوجوانوں کی تقاریب میں شرکت",
    title_en: "Village Elders and Youth Participating in Events",
    image: "/images/gallery/gallery-5.png",
    date: "2026",
    description_ur:
      "گاؤں کے تمام افراد کا باہمی اتفاق و اتحاد، نوجوانوں کے مثبت اقدامات اور سماجی روابط۔",
    description_en:
      "Warm moments celebrating mutual solidarity, community brotherhood, and positive youth initiatives.",
    relatedImages: [
      {
        src: "/images/gallery/gallery-5.png",
        title_ur: "اجتماع میں شریک گاؤں کے معزز عمائدین",
        title_en: "Respected Village Dignitaries in Attendance",
      },
      {
        src: "/images/gallery/gallery-2.png",
        title_ur: "پروگرام کے انتظامات میں سرگرم رضاکار",
        title_en: "Dedicated Village Volunteers Managing Logistics",
      },
      {
        src: "/images/gallery/gallery-3.png",
        title_ur: "نوجوانوں کی کثیر تعداد میں باوقار شرکت",
        title_en: "Enthusiastic Youth Participation",
      },
    ],
  },
  {
    id: 6,
    albumId: "langar",
    category_ur: "لنگرِ عام",
    category_en: "Langar & Hospitality",
    albumTitle_ur: "لنگرِ عام و مہمان نوازی",
    albumTitle_en: "Community Langar & Hospitality",
    title_ur: "روحانی محافل کے بعد لنگرِ عام کی تقسیم کے لمحات",
    title_en: "Community Feast & Langar Distribution After Gatherings",
    image: "/images/gallery/gallery-6.png",
    date: "2026",
    description_ur:
      "روایتی مہمان نوازی کے تحت ہر آنے والے عقیدت مند اور مہمان کے لیے لنگرِ عام کا پرخلوص اہتمام۔",
    description_en:
      "Traditional hospitality offering blessed community meals (Langar) to all guests and attendees without distinction.",
    relatedImages: [
      {
        src: "/images/gallery/gallery-6.png",
        title_ur: "لنگرِ عام کی تیاری اور تقسیم کا اہتمام",
        title_en: "Preparation & Distribution of Community Langar",
      },
      {
        src: "/images/gallery/gallery-4.png",
        title_ur: "لنگر کے وقت محفل کا پُرسکون ماحول",
        title_en: "Peaceful Hospitality at Astana Grounds",
      },
      {
        src: "/images/gallery/gallery-1.png",
        title_ur: "مرکزی لنگر خانہ و ضیافت ہال کا منظر",
        title_en: "Central Hospitality Hall of Astana Sharif",
      },
    ],
  },
];
