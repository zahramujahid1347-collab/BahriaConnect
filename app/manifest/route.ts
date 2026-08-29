export const runtime = "nodejs";

export async function GET() {
  return Response.json(
    {
      name: "BahriaConnect",
      short_name: "BahriaConnect",
      description: "Verified home services for Bahria Town Karachi residents.",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#2f5d3a",
      icons: [
        {
          src: "/secondary_logo.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/secondary_logo.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    {
      headers: { "Content-Type": "application/manifest+json" },
    },
  );
}
