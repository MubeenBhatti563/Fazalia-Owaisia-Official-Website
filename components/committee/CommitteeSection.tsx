"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CommitteeCard } from "./CommitteeCard";
import { CommitteeMember } from "@/types";

interface CommitteeSectionProps {
  members: CommitteeMember[];
}

export const CommitteeSection: React.FC<CommitteeSectionProps> = ({ members }) => {
  const { t } = useLanguage();

  return (
    <section id="committee" className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag={t("committee_tag")}
          title={t("committee_title")}
          subtitle={t("committee_subtitle")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {members.map((member) => (
            <CommitteeCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};
