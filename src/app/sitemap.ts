import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, priority: 1.0, changeFrequency: "monthly" },
    { url: `${base}/presentation`, priority: 0.8, changeFrequency: "monthly" },
    {
      url: `${base}/presentation/but-gmp`,
      priority: 0.8,
      changeFrequency: "yearly",
    },
    {
      url: `${base}/presentation/programme`,
      priority: 0.8,
      changeFrequency: "yearly",
    },
    {
      url: `${base}/presentation/specificite`,
      priority: 0.7,
      changeFrequency: "yearly",
    },
    {
      url: `${base}/presentation/lieu`,
      priority: 0.7,
      changeFrequency: "yearly",
    },
    {
      url: `${base}/presentation/alternance`,
      priority: 0.8,
      changeFrequency: "yearly",
    },
    {
      url: `${base}/presentation/apres-but`,
      priority: 0.7,
      changeFrequency: "yearly",
    },
    { url: `${base}/licences`, priority: 0.8, changeFrequency: "yearly" },
    { url: `${base}/licences/mie`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${base}/licences/mief`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${base}/licences/mri`, priority: 0.7, changeFrequency: "yearly" },
  ];
}
