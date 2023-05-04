import { Header } from "@/components/header";
import Link from "next/link";
import { useState } from "react";
import useLocalStorage from "use-local-storage";

export default function Login() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div>
      <Header setDarkMode={setDarkMode} />
    </div>
  );
}
