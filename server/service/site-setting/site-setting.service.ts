import "server-only";
import { db } from "@server/db";
import { siteSetting, SiteSettingEnum } from "@server/db/schema";

export const getSiteSettings = async () => {
  const result = await db.query.siteSetting.findMany();
  const resultMap = new Map<SiteSettingEnum, string>();
  result.forEach((item) => {
    resultMap.set(item.id, item.value);
  });
  return resultMap;
};

export const upsertSiteSetting = async (
  key: SiteSettingEnum,
  value: string,
) => {
  const result = await db
    .insert(siteSetting)
    .values({ id: key, value })
    .onConflictDoUpdate({
      target: [siteSetting.id],
      set: { value },
    });

  return result;
};
