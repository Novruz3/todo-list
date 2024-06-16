import { useRef, useState } from "react";
import { http } from "../api/http";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../types/types";
import { userAction } from "../store/UserSlice";

const AddTask = () => {
  const [task, setTask] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const userId = useSelector((state: IRootState) => state.user.listUuid);
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task !== "") {
      try {
        const res = await http.post("/tasks", {
          text: task,
          completed: false,
          listUuid: userId,
        });
        console.log(res.data);
        dispatch(userAction.setIsFetchedTasks());
      } catch (error) {
        console.log(error);
      }
      setTask("");
      formRef.current!.reset();
    } else {
      alert("Input is empty");
    }
  };
  return (
    <form
      className="gap-4 flex justify-center px-24 md:px-96 "
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <input
        type="text"
        className=" rounded-md w-auto px-2 bg-gray-200"
        placeholder="Task..."
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="px-4 py-2 w-28 bg-blue-500 text-white rounded-md ">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
