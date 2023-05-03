import clsx from "clsx";
import { Html, Head, Main, NextScript } from "next/document";
import useLocalStorage from "use-local-storage";

export default function Document() {
  const [theme, seTheme] = useLocalStorage<string>("theme", "light");
  return (
    <Html lang="en" className="theme">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
