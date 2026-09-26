import { SocialChannel } from "@/types";
import { initialSocialChannels } from "@/lib/data/social";

export async function getSocialChannels(): Promise<SocialChannel[]> {
  return initialSocialChannels;
}
