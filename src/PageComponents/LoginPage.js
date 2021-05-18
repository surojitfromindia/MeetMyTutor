import { useRef, useState } from "react";
import Modal from "./Modal";
import LAPI from "../API/LoginAPI";
import RAPI from "../API/RequestAPI";

export default function LoginPage({ setToken }) {
  const [modal, setModal] = useState({
    show: false,
    message: "None",
    type: "message",
  });
  const eRef = useRef();
  const pRef = useRef();
  const signUp = useRef();
  const signIn = useRef();
  const seRef = useRef();
  const spRef = useRef();
  const snRef = useRef();
  const saRef = useRef();

  const handleLogin = (ev) => {
    ev.preventDefault();
    LAPI.post("/", {
      realStudentID: eRef.current.value,
      password: pRef.current.value,
    }).then((lr) => {
      if (lr.data?.message) {
        setModal({ message: lr.data.message, type: "error", show: true });
        setTimeout(() => {
          setModal({ show: false });
        }, 4500);
      } else {
        sessionStorage.setItem("token", lr.data);
        setToken(lr.data);
      }
    });
  };

  const handleSignUp = () => {
    let h = {
      realStudentID: seRef.current.value,
      age: Number(saRef.current.value),
      name: snRef.current.value,
      password: spRef.current.value,
    };
    RAPI()
      .post("/newsignup", h)
      .then(({ data }) => {
        console.log(data);
        if (data?.message) {
          setModal({ message: data.message, type: "error", show: true });
          setTimeout(() => {
            setModal({ show: false });
          }, 4500);
        } else {
          alert("Done");
        }
      })
      .catch((err) => {
        setModal({
          message: "Field Validation Failed",
          type: "error",
          show: true,
        });
        setTimeout(() => {
          setModal({ show: false });
        }, 4500);
      });
  };

  const goToSignUp = () => {
    signUp.current.visible = true;
    signUp.current.scrollIntoView({ behavior: "smooth" });
  };

  const goBack = () => {
    signIn.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className={"overflow-y-hidden h-screen  bg-gray-100 dark:bg-coolGray-900"}
    >
      <div className={"sticky top-0"}>
        <Modal show={modal.show} message={modal.message} type={modal.type} />
      </div>
      <div ref={signIn} className={"h-screen mx-auto flex  items-center"}>
        <div className={"w-96 mx-auto my-5  dark:bg-transparent p-2"}>
          <div className={"mx-7"}>
            <h1
              className={
                "my-3 text-4xl font-poppin font-semibold text-gray-700 dark:text-emerald-400 "
              }
            >
              Me , My Tutor
            </h1>
            <p
              className={
                "text-base font-poppin tracking-wide text-gray-600 dark:text-emerald-400"
              }
            >
              Enter your email and credentials
            </p>
          </div>
          <div className={"m-7"}>
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
            <div className={"mb-6 flex flex-row space-x-3"}>
              <button
                onClick={handleLogin}
                className={
                  "transition-colors w-full tracking-widest px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none dark:hover:bg-emerald-800 dark:bg-emerald-600 dark:focus:bg-emerald-700"
                }
              >
                LOGIN
              </button>
              <button
                onClick={goToSignUp}
                className={`transition-colors w-full tracking-widest px-3 py-2 text-emerald-500 hover:text-white focus:text-white  rounded-md border-2 border-emerald-600  
                  focus:outline-none focus:bg-emerald-600   hover:bg-emerald-600 `}
              >
                REGISTER
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={signUp}
        hidden={false}
        className={"h-screen mx-auto flex overflow-hidden items-center"}
      >
        <div className={"w-96 mx-auto my-5  dark:bg-transparent p-2"}>
          <div className={"text-center"}>
            <h1
              className={
                "my-3 text-2xl font-semibold text-gray-700 dark:text-orange-400 "
              }
            >
              Me , My Tutor (Sign Up)
            </h1>
            <p className={"text-sm text-gray-600 dark:text-orange-400"}>
              Enter your email and credentials
            </p>
          </div>
          <div className={"m-7"}>
            <div className={"mb-2"}>
              <label
                className={
                  "block mb-2 text-sm text-gray-600 dark:text-orange-400"
                }
              >
                EMAIL
              </label>
              <input
                autoComplete={"username"}
                ref={seRef}
                type="email"
                className={
                  "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-coolGray-600 dark:focus:ring-orange-600 dark:focus:border-orange-600"
                }
                required={true}
              />
            </div>
            <div className={"mb-2"}>
              <label
                className={
                  "block mb-2 text-sm text-gray-600 dark:text-orange-400"
                }
              >
                NAME
              </label>
              <input
                ref={snRef}
                type="text"
                className={
                  "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-coolGray-600 dark:focus:ring-orange-600 dark:focus:border-orange-600"
                }
                required={true}
              />
            </div>
            <div className={"mb-2"}>
              <label
                className={
                  "block mb-2 text-sm text-gray-600 dark:text-orange-400"
                }
              >
                AGE
              </label>
              <input
                autoComplete={"username"}
                ref={saRef}
                type="number"
                className={
                  "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-coolGray-600 dark:focus:ring-orange-600 dark:focus:border-orange-600"
                }
                required={true}
              />
            </div>
            <div className={"mb-6"}>
              <label
                className={
                  "block mb-2 text-sm text-gray-600 dark:text-orange-400"
                }
              >
                PASSWORD
              </label>
              <input
                autoComplete={"current-password"}
                type="password"
                ref={spRef}
                className={
                  "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-coolGray-600 dark:focus:ring-orange-600 dark:focus:border-orange-600"
                }
                required={true}
              />
            </div>
            <div className={"mb-6 flex flex-col space-y-3"}>
              <button
                onClick={handleSignUp}
                className={
                  "w-full tracking-widest px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none dark:hover:bg-orange-800 dark:bg-orange-600 dark:focus:bg-orange-700"
                }
              >
                SIGN UP
              </button>
              <button
                onClick={goBack}
                className={
                  "w-full hover:underline tracking-widest px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none  dark:bg-transparent "
                }
              >
                BACK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
