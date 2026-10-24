import './globals.css';

export const metadata = { title: 'Noted — A little space for your ideas', description: 'A simple Next.js note application with React form validation.' };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
