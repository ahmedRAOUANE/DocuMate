import Providers from "@/store/provider";

// components
import Modal from "@/components/Modal";
import Loading from "@/components/states/Loading";

// styles
import "../styles/globals.css";
import "../styles/layout.css";
import "../styles/button.css";
import "../styles/customes.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Loading />
          <Modal />
        </Providers>
      </body>
    </html>
  );
}

