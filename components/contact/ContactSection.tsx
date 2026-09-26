"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SiteContact } from "@/types";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { PhoneCall, Mail, MapPin } from "lucide-react";

interface ContactSectionProps {
  contact: SiteContact;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  const { isUrdu, t } = useLanguage();

  const address = isUrdu ? contact.address_ur : contact.address_en;

  const contactItems = [
    {
      id: "whatsapp",
      title: t("contact_wa_title"),
      display: contact.whatsappDisplay,
      href: `https://wa.me/${contact.whatsapp}`,
      isExternal: true,
      icon: <WhatsAppIcon size={24} className="text-whatsapp" />,
      bgIcon: "bg-whatsapp/10 border-whatsapp/30",
    },
    {
      id: "phone",
      title: t("contact_phone_title"),
      display: contact.phoneDisplay,
      href: `tel:${contact.phone}`,
      isExternal: false,
      icon: <PhoneCall size={24} className="text-gold-500" />,
      bgIcon: "bg-gold-500/10 border-gold-400/30",
    },
    {
      id: "email",
      title: t("contact_email_title"),
      display: contact.email,
      href: `mailto:${contact.email}`,
      isExternal: false,
      icon: <Mail size={24} className="text-navy-700" />,
      bgIcon: "bg-navy-700/10 border-navy-700/30",
    },
    {
      id: "address",
      title: t("contact_address_title"),
      display: address,
      href: "#",
      isExternal: false,
      icon: <MapPin size={24} className="text-red-600" />,
      bgIcon: "bg-red-500/10 border-red-500/30",
    },
  ];

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag={t("contact_tag")}
          title={t("contact_title")}
          subtitle={t("contact_subtitle")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {contactItems.map((item) => {
            const Content = (
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-gold-400 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col items-start text-start h-full group">
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm ${item.bgIcon}`}
                >
                  {item.icon}
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {item.title}
                </h3>

                <p className="text-base sm:text-lg font-bold text-navy-950 group-hover:text-gold-600 transition-colors leading-relaxed break-words w-full">
                  {item.display}
                </p>
              </div>
            );

            if (item.href === "#") {
              return <div key={item.id}>{Content}</div>;
            }

            return (
              <a
                key={item.id}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="block h-full focus:outline-none"
              >
                {Content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
