import { Header } from "@/components/header";

import axios from "axios";
import clsx from "clsx";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

export type Joke = {
  id: number;
  Title: string;
  Body: string;
  Author: string;
  Views: number;
  CreatedAt: string;
};

export default function Home() {
  const router = useRouter();
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const q = router.query;
  const limit = router.query.limit as string;
  const page = Number(!router.query.page ? 1 : router.query.page);

  const [token, seToken] = useLocalStorage<string | null>("token", null);

  // converts the numeric date to the full date

  function formatDate(dateString: string) {
    try {
      return format(new Date(dateString), "dd MMM yyy");
    } catch (err) {
      return "Invalid Date";
    }
  }

  // hides part of the email with ***!

  function maskEmailDomain(email: string) {
    const [localPart, domain] = email?.split("@");
    const domainParts = domain?.split(".");
    const maskedDomain =
      domainParts?.length > 1
        ? domainParts
            .slice(0, -1)
            .map((part) => "*".repeat(part.length))
            .join(".") +
          "." +
          domainParts.slice(-1)
        : domainParts?.join("");
    return `${localPart}@${maskedDomain}`;
  }

  // when token is null it goes to the login page

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // brings the data from the server in the first render and when something in the dependency array changes and saves them in a state

  useEffect(() => {
    axios
      .get(
        `https://retoolapi.dev/zu9TVE/jokes?_sort=id&_order=desc&_page=${page}&_limit=${
          limit ?? 5
        }`
      ) // sort is to organize by some category(e.g.id) and order desc is to organize by largest value first
      .then((e) => {
        setJokes(e.data);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, counter]);

  return (
    <div className="  h-screen w-screen overflow-hidden ">
      <div className="h-full min-h-screen w-screen ">
        <Header />
        <div className="px-8">
          <div className="flex   mb-6">
            <button className=" btn btn-sm  normal-case w-auto h-fit px-4 py-4 mr-6 ml-auto " onClick={() => router.push("/new")} >
              <span className="text-lg mr-2"> + </span>
              <span className="text-lg" >
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
                        onClick={() => {
                          axios
                            .delete(
                              ` https://retoolapi.dev/zu9TVE/jokes/${j.id}`
                            )
                            .then((response) => {
                              setCounter(counter + 1);
                            });
                        }}
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
          <div className="grid place-items-center">
            <select
              value={+limit}
              className=" select select-bordered w-fit "
              onChange={(evt) => {
                router.push({
                  query: { ...q, limit: evt.currentTarget.value },
                });
              }}
            >
              <option value={5}>Show 5 jokes</option>
              <option value={10}>Show 10 jokes</option>
            </select>
          </div>
          <br />

          <div className="flex justify-center items-center ">
            <button
              className="disabled:opacity-20 font-bold "
              onClick={() => {
                router.push({
                  query: {
                    ...q,
                    page: page - 1,
                  },
                });
              }}
              disabled={page === 1}
            >
              {"< Prev"}
            </button>
            <div className="mx-8 font-bold"> page: {page}</div>
            <button
              className="font-bold"
              onClick={() => {
                router.push({
                  query: { ...q, page: page + 1 },
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
