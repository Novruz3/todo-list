import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IRootState, ITask } from "../types/types";
import { http } from "../api/http";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../store/UserSlice";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Task = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [editTaskname, setEditTaskname] = useState<string>("");
  const [modalTaskname, setModalTaskname] = useState<string>("");
  const [modalTaskId, setModalTaskId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const userId = useSelector((state: IRootState) => state.user.listUuid);
  const username = useSelector((state: IRootState) => state.user.username);
  const isFetchedTasks = useSelector(
    (state: IRootState) => state.user.isFetchedTasks
  );
  const isFetchedAllTasks = useSelector(
    (state: IRootState) => state.user.isFetchedAllTasks
  );
  const handleOpen = (name: string, id: string) => {
    setOpen(true);
    setModalTaskId(id);
    setModalTaskname(name);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetchedAllTasks) {
      const getAllTasks = async () => {
        setLoading(true);
        try {
          const res = http.get("/tasks");
          setTasks((await res).data);
          setLoading(false);
          dispatch(userAction.setUsername("All tasks"));
          console.log((await res).data);
        } catch (error) {
          console.log(error);
        }
      };
      getAllTasks();
    }
  }, [isFetchedAllTasks]);

  useEffect(() => {
    if (!isFetchedTasks) {
      const getUserTasks = async () => {
        setLoading(true);
        try {
          const res = await http.get(`/lists/${userId}/tasks`);
          setTasks(await res.data);
          setLoading(false);
          console.log(res.data);
          dispatch(userAction.setIsFetchedTasks(await res.data));
        } catch (error) {
          alert(error);
        }
      };
      getUserTasks();
    }
  }, [isFetchedTasks]);

  const deleteTask = async (taskId: string) => {
    const res = http.delete(`/tasks/${taskId}`);
    console.log((await res).data);
    dispatch(userAction.setIsFetchedTasks());
  };

  const editTask = async (taskId: string) => {
    if (editTaskname === "") {
      alert("Taskname is empty");
    } else {
      handleClose();
      try {
        const res = await http.put(`/tasks/${taskId}`, {
          text: editTaskname,
          completed: isCompleted,
          listUuid: taskId,
        });
        console.log(res.data);
        dispatch(userAction.setIsFetchedTasks());
        setEditTaskname("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center mt-2 font-bold text-2xl">
        {username}
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-8">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Task name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Completed
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit task
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete task
                  </th>
                </tr>
              </thead>
              {tasks.map((task: ITask) => {
                return (
                  <tbody key={task.uuid}>
                    <tr className="bg-white border-b hover:bg-gray-50 ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {task.text}
                      </th>
                      <td className="w-4 p-4 text-2xl cursor-pointer">
                        {!task.completed ? (
                          <MdCheckBoxOutlineBlank
                            onClick={() => handleOpen(task.text, task.uuid)}
                          />
                        ) : (
                          <MdCheckBox
                            onClick={() => handleOpen(task.text, task.uuid)}
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 text-2xl">
                        <CiEdit
                          onClick={() => handleOpen(task.text, task.uuid)}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4 text-2xl">
                        <AiOutlineDelete
                          onClick={() => deleteTask(task.uuid)}
                          className=" cursor-pointer"
                        />
                      </td>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className=" bg-gray-200"
                      >
                        <Box sx={style}>
                          <div className="flex flex-col justify-center items-center gap-2 mb-4">
                            <p>Are you completed ?</p>
                            <div className="flex gap-4">
                              <button
                                className="px-4 py-2 bg-green-600 rounded-md"
                                onClick={() => setIsCompleted(true)}
                              >
                                Yes
                              </button>
                              <button
                                className="px-4 py-2 bg-gray-300 rounded-md"
                                onClick={() => setIsCompleted(false)}
                              >
                                No
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-2 justify-center">
                            <input
                              type="text"
                              onChange={(e) => setEditTaskname(e.target.value)}
                              className="bg-gray-200 rounded-md px-2"
                              placeholder={modalTaskname}
                            />
                            <button
                              className="px-4 py-2 bg-blue-500 rounded-md"
                              onClick={() => editTask(modalTaskId)}
                            >
                              Edit
                            </button>
                          </div>
                        </Box>
                      </Modal>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Task;
