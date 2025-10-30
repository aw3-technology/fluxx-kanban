import "@/styles/app.sass";
import { headers } from "next/headers";
import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";

const rubik = Rubik({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "block",
    variable: "--font-rubik",
});

export const metadata: Metadata = {
    title: "FluxxBoard",
    description: "Focus on what matters with Fluxxboard's intuitive task management",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Description no longer than 155 characters */}
                <meta name="description" content="Focus on what matters with Fluxxboard's intuitive task management" />
                {/* Product Name */}
                <meta name="product-name" content="Fluxxboard" />
                {/* Twitter Card data */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="FluxxBoard" />
                <meta
                    name="twitter:description"
                    content="Focus on what matters with Fluxxboard's intuitive task management"
                />
                {/* Twitter Summary card images must be at least 120x120px */}
                <meta
                    name="twitter:image"
                    content="%PUBLIC_URL%/twitter-card.png"
                />

                {/* Open Graph data for Facebook */}
                <meta property="og:title" content="FluxxBoard" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content="%PUBLIC_URL%/fb-og-image.png"
                />
                <meta
                    property="og:description"
                    content="Focus on what matters with Fluxxboard's intuitive task management"
                />
                <meta
                    property="og:site_name"
                    content="Fluxxboard"
                />

                {/* Open Graph data for LinkedIn */}
                <meta property="og:title" content="FluxxBoard" />
                <meta
                    property="og:image"
                    content="%PUBLIC_URL%/linkedin-og-image.png"
                />
                <meta
                    property="og:description"
                    content="Focus on what matters with Fluxxboard's intuitive task management"
                />

                {/* Open Graph data for Pinterest */}
                <meta property="og:title" content="FluxxBoard" />
                <meta
                    property="og:image"
                    content="%PUBLIC_URL%/pinterest-og-image.png"
                />
                <meta
                    property="og:description"
                    content="Focus on what matters with Fluxxboard's intuitive task management"
                />
            </head>
            <body className={rubik.className}>{children}</body>
        </html>
    );
}

export async function generateViewport(): Promise<Viewport> {
    const userAgent = headers().get("user-agent");
    const isiPhone = /iphone/i.test(userAgent ?? "");
    return isiPhone
        ? {
              width: "device-width",
              initialScale: 1,
              maximumScale: 1, // disables auto-zoom on ios safari
          }
        : {};
}
