import Providers from "@/store/provider";

// styles
import "../styles/globals.css";
import "../styles/layout.css";
import "../styles/button.css";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

