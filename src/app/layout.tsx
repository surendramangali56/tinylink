// @ts-ignore: Allow side-effect import of global CSS in this file
import './globals.css'; // Adjust path if your global CSS is elsewhere

// Basic Root Layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* You can add a <head> tag here for metadata if needed */}
      <body>
        {/* The 'children' prop is where your page.tsx content will be rendered */}
        {children} 
      </body>
    </html>
  );
}