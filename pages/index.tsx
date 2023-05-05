import { Header } from "@/components/header";

import axios from "axios";
import clsx from "clsx";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

export default function Home() {
  const router = useRouter();
  const [jokes, setJokes] = useState<
    {
      id: number;
      Title: string;
      Body: string;
      Author: string;
      Views: number;
      CreatedAt: string;
    }[]
  >([]);
  const q = router.query;
  const limit = router.query.limit as string;
  const page = router.query.page as string;

  const [token, seToken] = useLocalStorage<string | null>("token", null);

  // converts the numeric date to the full date

  function formatDate(dateString: string) {
    return format(new Date(dateString), "dd MMM yyy");
  }

  // hides part of the email with ***!

  function maskEmailDomain(email: string) {
    const [localPart, domain] = email.split("@");
    const domainParts = domain.split(".");
    const maskedDomain =
      domainParts
        .slice(0, -1)
        .map((part) => "*".repeat(part.length))
        .join(".") +
      "." +
      domainParts.slice(-1);
    return `${localPart}@${maskedDomain}`;
  }

  // when token is null it goes to the login page

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // brings the data from the server in every render and saves them in a state

  useEffect(() => {
    axios
      .get(
        `https://retoolapi.dev/zu9TVE/jokes?_page=${page ?? 0}&_limit=${
          limit ?? 5
        }`
      )
      .then((e) => {
        setJokes(e.data);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);
  console.log(limit);
  return (
    <div className="  h-screen w-screen overflow-hidden ">
      <div className="h-full min-h-screen w-screen ">
        <Header />
        <div className="px-8">
          <div className="flex justify-center items-center gap-6 mb-6">
            <select
              value={+limit}
              className=" select select-bordered w-full max-w-xs "
              onChange={(evt) => {
                router.push({
                  query: { ...q, limit: evt.currentTarget.value },
                });
              }}
            >
              <option value={5}>Show 5 jokes</option>
              <option value={10}>Show 10 jokes</option>
            </select>

            <button className=" btn  normal-case w-auto h-fit px-4 py-4 mr-6 ">
              <span className="text-lg mr-2"> + </span>
              <span
                className="text-lg"
                onClick={() =>
                  router.push(
                    router.asPath.includes("?")
                      ? `/a?page=${page}&limit=${limit}`
                      : "/a"
                  )
                }
              >
                New Joke
              </span>
            </button>
          </div>

          <div className="overflow-auto flex justify-center items-center mb-8 ">
            <table className=" table-fixed  border-collapse border-spacing-6 text-center  ">
              {/* head */}
              <thead>
                <tr>
                  <th className="px-6 py-2">Title</th>
                  <th className="px-6 py-2">Author</th>
                  <th className="px-6 py-2">Created Date</th>
                  <th className="px-6 py-2">Views</th>
                  <th className="px-6 py-2">Action</th>
                </tr>
              </thead>
              {/* body */}
              <tbody className="gap-y-4">
                {jokes.map((j, idx) => {
                  return (
                    <tr key={j.id} className="hover cursor-pointer  ">
                      <td
                        className="border-r border-black px-4 py-2 hover:underline"
                        onClick={() => {
                          router.push(`/${j.id}`);
                        }}
                      >
                        {j.Title}
                      </td>
                      <td className="border-r border-black px-4 py-2  ">
                        {maskEmailDomain(j.Author)}
                      </td>
                      <td className="border-r border-black px-4 py-2  ">
                        {formatDate(j.CreatedAt)}
                      </td>
                      <td
                        className={clsx(
                          "border-r border-black font-semibold ",
                          {
                            tomato: j.Views >= 0 && j.Views <= 25,
                          },

                          {
                            orange: j.Views >= 26 && j.Views <= 50,
                          },
                          {
                            yellow: j.Views >= 51 && j.Views <= 75,
                          },
                          {
                            green: j.Views >= 76 && j.Views <= 100,
                          }
                        )}
                      >
                        {j.Views}
                      </td>

                      <td
                        // onClick={() => {
                        //   console.log("delete");
                        //   axios
                        //     .delete(
                        //       ` https://retoolapi.dev/zu9TVE/jokes/${j.id}`
                        //     )
                        //     .then((response) => {
                        //       setJokes(jokes.filter((pr) => pr.id !== j.id));
                        //     });
                        // }}
                        className="px-4 py-2"
                      >
                        🗑️
                      </td>
                    </tr>
                    // deletes the selected joke and saves the new list of jokes
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center ">
            <button
              className="font-bold mr-8"
              onClick={() => {
                router.push({
                  query: { ...q, page: +page - 1 },
                });
              }}
            >
              {"< Prev"}
            </button>
            <button
              className="font-bold"
              onClick={() => {
                router.push({
                  query: { ...q, page: +page + 1 },
                });
              }}
            >
              {"Next >"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
