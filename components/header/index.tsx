import Link from "next/link";
import useLocalStorage from "use-local-storage";

export function Header() {
  const [token, seToken] = useLocalStorage<string | null>("token", null);
  const [theme, seTheme] = useLocalStorage<string>("theme", "light");
  console.log(theme);
  return (
    <div className="navbar bg-base-100 border border-b mb-10">
      <div className="flex-1 pl-4">
        <h2 className=" font-bold text-xl">JokeApp</h2>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li tabIndex={0}>
            <Link href="">
              BgMode
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </Link>
            <ul className="p-2 bg-base-100">
              <li>
                <Link
                  href=""
                  onClick={() => {
                    seTheme("dark");
                  }}
                >
                  Dark mode
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  onClick={() => {
                    seTheme("light");
                  }}
                >
                  Light mode
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              onClick={() => seToken(!token ? "logedin" : null)}
              href={!token ? "/" : "/login"}
            >
              {!token ? "Login" : "Logout"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
