// @ts-ignore: Suppress missing type declarations for CSS side-effect import
import './globals.css'; // Import global styles if you have them

// Define metadata for your page (optional, but good practice)
export const metadata = {
  title: 'Tinylink App',
  description: 'A URL shortening service',
};

// This is the required Root Layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* The 'children' prop is where your page.tsx content will be rendered */}
        {children} 
      </body>
    </html>
  );
}