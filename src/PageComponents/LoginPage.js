import { useRef } from "react";
import LAPI from "../API/LoginAPI";

export default function LoginPage({ setToken }) {
  const eRef = useRef();
  const pRef = useRef();
  const handleLogin = (ev) => {
    ev.preventDefault();
    LAPI.post("/", {
      realStudentID: eRef.current.value,
      password: pRef.current.value,
    }).then((lr) => {
      if (lr.data?.message) {
        console.log(lr.data.message);
      } else {
        sessionStorage.setItem("token", lr.data);
        setToken(lr.data);
      }
    });
  };

  return (
    <div
      className={
        "flex items-center min-h-screen bg-gray-100 dark:bg-coolGray-900"
      }
    >
      <div className={"container mx-auto "}>
        <div className={"max-w-sm mx-auto my-5  dark:bg-transparent p-2"}>
          <div className={"text-center"}>
            <h1
              className={
                "my-3 text-2xl font-semibold text-gray-700 dark:text-emerald-400 "
              }
            >
              Done This
            </h1>
            <p className={"text-sm text-gray-600 dark:text-emerald-400"}>
              Enter your email and credentials
            </p>
          </div>
          <div className={"m-7"}>
            <form onSubmit={handleLogin}>
              <div className={"mb-6"}>
                <label
                  htmlFor={"email"}
                  className={
                    "block mb-2 text-sm text-gray-600 dark:text-emerald-400"
                  }
                >
                  Email
                </label>
                <input
                  autoComplete={"username"}
                  id={"email"}
                  type="email"
                  className={
                    "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-coolGray-600 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
                  }
                  required={true}
                  ref={eRef}
                />
              </div>
              <div className={"mb-6"}>
                <label
                  className={
                    "block mb-2 text-sm text-gray-600 dark:text-emerald-400"
                  }
                  htmlFor={"password"}
                >
                  Password
                </label>
                <input
                  autoComplete={"current-password"}
                  id={"password"}
                  type="password"
                  className={
                    "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-coolGray-600 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
                  }
                  required={true}
                  ref={pRef}
                />
              </div>
              <div className={"mb-6"}>
                <button
                  className={
                    "w-full tracking-widest px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none dark:hover:bg-emerald-800 dark:bg-emerald-600 dark:focus:bg-lightBlue-700"
                  }
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
