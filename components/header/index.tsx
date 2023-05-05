import Link from "next/link";
import useLocalStorage from "use-local-storage";

export function Header() {
  const [token, seToken] = useLocalStorage<string | null>("token", null);

  return (
    <div className="navbar  border border-b mb-10">
      <div className="flex-1 pl-4">
        <h2 className=" font-bold text-xl">JokeApp</h2>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal bg-base-100 px-1">
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

            <ul className="p-2 ">
              {["light", "dark"].map((theme) => (
                <li key={theme}>
                  <div
                    onClick={() => {
                      if (document?.documentElement?.dataset)
                        document.documentElement.dataset.theme = theme;
                    }} // gets from the document the html and sets to it a theme - changes the theme of the app
                  >
                    {theme} mode
                  </div>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link
              onClick={() => seToken(!token ? "logedin" : null)} // when the button is clicked if token is null converts to logedin else to null
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
