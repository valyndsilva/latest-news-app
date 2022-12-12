import "../styles/globals.css";
import Providers from "./Providers";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-ivory text-balticSea dark:bg-balticSea dark:text-ivory transition-all duration-700">
        <Providers>
          <Header />
          <div className="p-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
