import { useRef, useState } from "react";

export default function CreateNewGroup({ onCreate }) {
  const groupNameRef = useRef();
  const groupSKeyRef = useRef();
  const numberOfStudentRef = useRef();
  const privateRef = useRef();
  var tlist = [];
  const handleCreate = (ev) => {
    ev.preventDefault();
    onCreate(
      groupNameRef.current.value,
      groupSKeyRef.current.value,
      Number(numberOfStudentRef.current.value),
      privateRef.current.checked,
      tlist
    );
  };
  const handleTeacherIdInput = (idlist) => {
    tlist = idlist;
  };
  return (
    <div className={"px-5 py-4   flex justify-center   "}>
      <div className={"flex flex-col w-11/12 sm:w-3/5 lg:w-1/3"}>
        <span className={"text-3xl mb-8 mt-5  font-robotoCondensed"}>
          Create A Group Of Your Own
        </span>

        <div className={"space-y-3 flex flex-col "}>
          <div className={"flex flex-col"}>
            <label>Group Name (At least 3 character)</label>
            <input
              ref={groupNameRef}
              type="text"
              className={
                "mt-1 px-2 py-1 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 dark:bg-coolGray-700 dark:text-white dark:placeholder-gray-500 dark:border-coolGray-600 dark:focus:ring-lightBlue-600 dark:focus:border-lightBlue-600"
              }
              required={true}
            />
          </div>
          <div className={"flex flex-col"}>
            <label>Secrate key</label>
            <input
              ref={groupSKeyRef}
              type="text"
              className={
                "mt-1 px-2 py-1 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 dark:bg-coolGray-700 dark:text-white dark:placeholder-gray-500 dark:border-coolGray-600 dark:focus:ring-lightBlue-600 dark:focus:border-lightBlue-600"
              }
              required={true}
            />
          </div>
          <div className={"flex flex-col"}>
            <label>Student cap (number of students that can join) </label>
            <input
              ref={numberOfStudentRef}
              type="number"
              min={1}
              className={
                "mt-1 px-2 py-1 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:border-indigo-300 dark:bg-coolGray-700 dark:text-white dark:placeholder-gray-500 dark:border-coolGray-600 dark:focus:ring-lightBlue-600 dark:focus:border-lightBlue-600"
              }
              required={true}
            />
          </div>
          <div className={"flex flex-row items-center space-x-2"}>
            <label> Private </label>
            <input
              ref={privateRef}
              type={"checkbox"}
              min={1}
              className={
                "form-checkbox h-4 w-4 text-lightBlue-400  focus:ring-0"
              }
            />
          </div>
          <div className={"flex flex-col"}>
            <label> Teachers </label>
            <div className={"flex"}>
              <TeacherList onTeacherAdded={handleTeacherIdInput} />
            </div>
          </div>
        </div>
        <button
          onClick={handleCreate}
          className={
            "outline-none mt-5    font-medium text-sm  tracking-wider focus:outline-none  px-6 py-2  rounded-md hover:bg-opacity-95 bg-lightBlue-500 bg-opacity-80 text-warmGray-100"
          }
        >
          Create
        </button>
      </div>
    </div>
  );
}

const TeacherList = ({ onTeacherAdded, teacherIds = [] }) => {
  const [tids, settids] = useState(teacherIds);
  const [isFinalized, setFinalized] = useState(false);

  const handleAdd = () => {
    settids([...tids, ""]);
  };

  const handleEdit = (newid, iID) => {
    let newA = tids;
    newA[iID] = newid;
    settids([...tids]);
  };
  const handleRemove = (tid) => {
    let fiList = tids.filter((_, indx) => indx !== tid);
    settids([...fiList]);
  };
  return (
    <div className={"flex flex-col w-full space-y-3"}>
      {tids && (
        <div className={"grid grid-cols-2  overflow-y-auto  gap-3 "}>
          {tids.map((t, index) => (
            <TIdRow
              key={index}
              iID={index}
              tidProps={t}
              onSaveOrEdit={handleEdit}
              onRmv={handleRemove}
            />
          ))}
        </div>
      )}

      <div className={"flex space-x-2  font-robotoCondensed"}>
        <button
          onClick={handleAdd}
          disabled={isFinalized}
          className={
            "outline-none disabled:bg-opacity-40  w-24 font text-sm  tracking-wider focus:outline-none  px-1 py-2 hover:bg-opacity-95 bg-orange-500 bg-opacity-80 text-warmGray-100"
          }
        >
          ADD
        </button>
        <button
          onClick={() => {
            //remove empty arrays ;

            // if (!isFinalized) alert("Non-saved filelds will be removed");
            let fil = tids.filter((t) => t !== "");
            settids([...fil]);
            setFinalized(!isFinalized);
            if (!isFinalized) onTeacherAdded(tids);
          }}
          className={
            "outline-none w-24  font text-sm  tracking-wider focus:outline-none  px-1 py-2 hover:bg-opacity-95 bg-orange-500 bg-opacity-80 text-warmGray-100"
          }
        >
          {isFinalized ? "EDIT" : "FINAL"}
        </button>
      </div>
    </div>
  );
};

const TIdRow = ({ onSaveOrEdit, iID, onRmv, tidProps = "" }) => {
  const [editable, setEditable] = useState(tidProps ? false : true);
  const newIdRef = useRef();
  const handleEdit = () => {
    if (newIdRef.current.value !== "") {
      setEditable(!editable);
      if (editable) {
        onSaveOrEdit(newIdRef.current.value, iID);
      }
    }
  };
  const handleRmv = () => {
    onRmv(iID);
  };
  return (
    <div className={"flex flex-row h-10 col-span-2 "}>
      <input
        type={"text"}
        ref={newIdRef}
        disabled={!editable}
        defaultValue={tidProps}
        className={
          "px-2 py-2 w-full flex-shrink  border-0  focus:ring-0 outline-none  rounded-none text-sm rounded-l-md bg-coolGray-800  border-collapse focus:border-b-2 focus:border-lightBlue-500"
        }
        placeholder={"User ID"}
      />
      <button
        onClick={handleEdit}
        className={`font-robotoCondensed outline-none w-28   py-2 rounded-none font text-sm  tracking-wider focus:outline-none    hover:bg-opacity-95 ${
          !editable ? "bg-lightBlue-500" : "bg-emerald-500"
        } bg-lightBlue-500 bg-opacity-80 text-warmGray-100`}
      >
        {editable ? "SAVE" : "EDIT"}
      </button>
      <button
        onClick={handleRmv}
        className={
          "font-robotoCondensed outline-none w-28 rounded-none  font text-sm  tracking-wider focus:outline-none  py-2  rounded-r-md hover:bg-opacity-95 bg-red-500 bg-opacity-80 text-warmGray-100"
        }
      >
        RE
      </button>
    </div>
  );
};

export { TIdRow, TeacherList };
