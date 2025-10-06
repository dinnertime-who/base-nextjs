import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

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
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
