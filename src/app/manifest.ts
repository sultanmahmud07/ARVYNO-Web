import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ARVYNO — Wear Your Identity",
    short_name: "ARVYNO",
    description: "Luxury fashion and premium menswear atelier.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    icons: [
      {
        src: "/images/logo/arvyno-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo/arvyno-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
