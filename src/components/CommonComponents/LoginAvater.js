import { StarIcon } from "@heroicons/react/solid";

export default function LoginAvater({ username }) {
  return (
    <div
      className={
        "flex items-center justify-between w-min  py-0.5 bg-indigo-800 bg-opacity-30 rounded-3xl"
      }
    >
      <div className={"text-sm px-2"}>{username?.substr(0, 3)}</div>
      <div
        className={
          "bg-gray-100  shadow rounded-full flex items-center justify-center  h-6 w-6  align-middle border-none"
        }
      >
        <StarIcon className={"h-5 w-5  text-indigo-500"} />
      </div>
    </div>
  );
}
