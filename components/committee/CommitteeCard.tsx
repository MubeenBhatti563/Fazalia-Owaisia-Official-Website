"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CommitteeMember } from "@/types";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Phone, UserCheck } from "lucide-react";

interface CommitteeCardProps {
  member: CommitteeMember;
}

export const CommitteeCard: React.FC<CommitteeCardProps> = ({ member }) => {
  const { isUrdu, t } = useLanguage();

  const name = isUrdu ? member.name_ur : member.name_en;
  const role = isUrdu ? member.role_ur : member.role_en;
  const tag = isUrdu ? member.tag_ur : member.tag_en;

  return (
    <div className="relative rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-gold-400 transition-all duration-300 flex flex-col items-center text-center group">
      {/* Avatar Container with Badge */}
      <div className="relative mb-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-navy-900 to-navy-800 text-gold-400 border-2 border-gold-400/50 flex items-center justify-center shadow-md group-hover:scale-105 group-hover:border-gold-400 transition-all duration-300">
          <UserCheck size={36} />
        </div>

        {tag && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold bg-gold-400 text-navy-950 shadow-md whitespace-nowrap">
            {tag}
          </span>
        )}
      </div>

      {/* Name & Role */}
      <h3 className="text-lg sm:text-xl font-bold text-navy-950 mb-1 group-hover:text-navy-800 transition-colors">
        {name}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6">
        {role}
      </p>

      {/* Direct Contact Action Buttons */}
      <div className="w-full grid grid-cols-2 gap-2.5 mt-auto">
        <a
          href={`tel:${member.phone}`}
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-navy-900 text-slate-700 hover:text-white font-semibold text-xs sm:text-sm border border-slate-200 hover:border-navy-900 transition-all duration-200"
          title={t("btn_call_now")}
        >
          <Phone size={14} className="text-gold-600" />
          <span className="truncate">{t("btn_call_now")}</span>
        </a>

        <a
          href={`https://wa.me/${member.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-whatsapp/10 hover:bg-whatsapp text-whatsapp hover:text-white font-semibold text-xs sm:text-sm border border-whatsapp/20 hover:border-whatsapp transition-all duration-200"
          title={t("btn_chat_whatsapp")}
        >
          <WhatsAppIcon size={15} />
          <span className="truncate">{t("btn_chat_whatsapp")}</span>
        </a>
      </div>
    </div>
  );
};
