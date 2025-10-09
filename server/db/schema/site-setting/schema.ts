import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@server/db/util/column";

export const siteSettingEnum = pgEnum("enum_site_setting_name", [
  "site_name",
  "site_description",
  "site_logo_url",
  "site_favicon_url",
  "google_analytics_id",
  "naver_analytics_id",
]);

export type SiteSettingEnum = (typeof siteSettingEnum.enumValues)[number];

export const siteSetting = pgTable("site_setting", {
  id: siteSettingEnum().primaryKey(),
  value: text("value").notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
