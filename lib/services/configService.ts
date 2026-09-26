import { SiteConfig } from "@/types";
import { siteConfig } from "@/lib/data/config";

export async function getSiteConfig(): Promise<SiteConfig> {
  return siteConfig;
}
