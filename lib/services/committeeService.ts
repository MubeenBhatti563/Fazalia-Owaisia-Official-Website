import { CommitteeMember } from "@/types";
import { initialCommitteeMembers } from "@/lib/data/committee";

export async function getCommitteeMembers(): Promise<CommitteeMember[]> {
  return initialCommitteeMembers;
}
