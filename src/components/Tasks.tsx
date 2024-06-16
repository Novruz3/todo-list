import { useSelector } from "react-redux";
import AddTask from "./AddTask";
import Task from "./Task";
import { IRootState } from "../types/types";

const Tasks = () => {
  const username = useSelector((state: IRootState) => state.user.username);
  return (
    <div className="bg-white mt-4 py-2 px-8 rounded-md">
      <div className={`${username === "All tasks" ? "hidden" : "flex"}`}>
        <AddTask />
      </div>
      <Task />
    </div>
  );
};

export default Tasks;
