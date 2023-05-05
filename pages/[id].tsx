import { Header } from "@/components/header";
import axios from "axios";
import { useRouter } from "next/router";

export default function JokeForm() {
  const router = useRouter();
  return (
    <div className="  h-screen w-screen overflow-hidden ">
      <div className="h-full min-h-screen w-screen ">
        <Header />
        <div className="flex justify-center items-center ">
          <form
            className="p-16"
            onSubmit={(e) => {
              //   e.preventDefault();
              //   if (id) {
              //     axios
              //       .put(`/api/projects?id=${id}`, {
              //         name: projectName,
              //         url: projectUrl,
              //       })
              //       .then((response) => {
              //         setProjects([
              //           response.data,
              //           ...projects.filter((pr) => pr.id !== response.data.id),
              //         ]);
              //       });
              //   } else {
              //     axios
              //       .post("/api/projects", {
              //         name: projectName,
              //         url: projectUrl,
              //       })
              //       .then((response) => {
              //         setProjects([response.data, ...projects]);
              //       });
              //   }
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
                type="text"
                placeholder="23 Feb 2022"
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
