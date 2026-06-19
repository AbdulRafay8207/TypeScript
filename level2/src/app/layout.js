import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className="w-screen h-screen flex">
        <div>
          <div className="w-[30%] bg-amber-200">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
