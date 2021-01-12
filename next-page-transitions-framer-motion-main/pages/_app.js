import "../styles/theme.sass";
import "../styles/styles.css";
import "../styles/bottom-button.css"
import "@fortawesome/fontawesome-free/css/all.css";
import { AnimateSharedLayout } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <AnimateSharedLayout>
      <Component {...pageProps} />
    </AnimateSharedLayout>
  );
}

export default MyApp;
