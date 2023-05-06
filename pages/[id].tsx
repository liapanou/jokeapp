import { Header } from "@/components/header";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Joke } from ".";

export default function JokeForm() {
  const router = useRouter();
  const jid = router.query.id;

  const [jokeTitle, setJokeTitle] = useState<string>("");
  const [jokeAuthor, setJokeAuthor] = useState<string>("");
  const [jokeViews, setJokeViews] = useState<number>(0);
  const [jokeCreatedAt, setJokeCreatedAt] = useState<string>("");

  useEffect(() => {
    if (jid !== "new" && jid)
      axios.get<Joke>(`https://retoolapi.dev/zu9TVE/jokes/${jid}`).then((e) => {
        setJokeTitle(e.data?.Title);
        setJokeAuthor(e.data?.Author);
        setJokeViews(e.data?.Views);
        setJokeCreatedAt(e.data?.CreatedAt);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jid]);

  return (
    <div className="  h-screen w-screen overflow-hidden ">
      <div className="h-full min-h-screen w-screen ">
        <Header />
        <div className="flex justify-center items-center ">
          <form
            className="p-16"
            onSubmit={(e) => {
              e.preventDefault(); // stops the rerender of the page which is caused when you submit the form
              if (jid === "new") {
                axios
                  .post("https://retoolapi.dev/zu9TVE/jokes", {
                    Title: jokeTitle,
                    Body: "",
                    Author: jokeAuthor,
                    Views: jokeViews,
                    CreatedAt: jokeCreatedAt,
                  })
                  .then((response) => {
                    router.push("/");
                  });
              } else {
                axios
                  .put(`https://retoolapi.dev/zu9TVE/jokes/${jid}`, {
                    Title: jokeTitle,
                    Body: "",
                    Author: jokeAuthor,
                    Views: jokeViews,
                    CreatedAt: jokeCreatedAt,
                  })
                  .then((response) => {
                    router.push("/");
                  });
              }
            }}
          >
            <h2 className=" font-bold text-2xl mb-8 text-center">Joke Form</h2>
            <div className="mb-4">
              <label className="  text-lg font-semibold  mb-4" htmlFor="title">
                Title
              </label>

              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="title"
                type="text"
                placeholder="Joke Title"
                onChange={(evt) => setJokeTitle(evt.currentTarget.value)}
                value={jokeTitle}
                required
              />
            </div>
            <div className="mb-4">
              <label className="  text-lg font-semibold mb-4" htmlFor="author">
                Author
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="author"
                type="email"
                placeholder="name@email.com"
                onChange={(evt) => setJokeAuthor(evt.currentTarget.value)}
                value={jokeAuthor}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="  text-lg font-semibold  mb-4"
                htmlFor="createdDate"
              >
                Created Date
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="createdDate"
                type="date"
                placeholder="2023-04-27"
                onChange={(evt) => setJokeCreatedAt(evt.currentTarget.value)}
                value={jokeCreatedAt}
                required
              />
            </div>
            <div className="mb-8">
              <label className="  text-lg font-semibold  mb-4" htmlFor="views">
                Views
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="views"
                type="number"
                placeholder="Number of Views"
                onChange={(evt) =>
                  setJokeViews(Number(evt.currentTarget.value))
                }
                value={jokeViews}
                required
              />
            </div>
            <div className="form-control">
              <div className=" flex justify-center gap-4  ">
                <button className="btn bg-blue-700 hover:bg-blue-700 normal-case text-lg">
                  Submit
                </button>
                <button
                  onClick={() => {
                    router.push("/");
                  }}
                  className="btn bg-blue-700 hover:bg-blue-700 normal-case text-lg"
                  type="submit"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
