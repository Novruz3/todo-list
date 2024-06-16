import { useEffect, useRef, useState } from "react";
import { http } from "../api/http";
import { IRootState, IUser } from "../types/types";
import { CiEdit, CiUser } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../store/UserSlice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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

const User = () => {
  const [posts, setPosts] = useState<IUser[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editUsername, setEditUsername] = useState<string>("");
  const [modalUsername, setModalUsername] = useState<string>("");
  const [modalUserId, setModalUserId] = useState<string>("");
  const userRef = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();
  const isFetched = useSelector((state: IRootState) => state.user.isFetched);
  const handleOpen = (name: string, id: string) => {
    setOpen(true);
    setModalUsername(name);
    setModalUserId(id);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!isFetched) {
      const getUsers = async () => {
        try {
          const res = await http.get("/lists");
          setPosts(await res.data);
          dispatch(userAction.setIsFetched());
        } catch (error) {
          console.log(error);
        }
      };
      getUsers();
    }
  }, [isFetched]);

  const deleteUser = async (userId: string) => {
    try {
      console.log(userId);
      const res = await http.delete(`/lists/${userId}`);
      dispatch(userAction.setIsFetched());
      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const editUser = async (userId: string) => {
    handleClose();
    try {
      const res = await http.put(`/lists/${userId}`, { name: editUsername });
      console.log(res.data);
      dispatch(userAction.setIsFetched());
    } catch (error) {
      console.log(error);
    }
  };

  const getUserTasks = (userId: string, name: string) => {
    dispatch(userAction.setListUuid(userId));
    dispatch(userAction.setIsFetchedTasks());
    dispatch(userAction.setUsername(name));
    console.log(userId);
  };

  const getAllTasks = () => {
    dispatch(userAction.setIsFetchedAllTasks());
  };
  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 mt-4 gap-2">
        <li className="me-2 px-4 py-3 border border-black rounded-lg flex items-center gap-2">
          <div
            className="flex hover:text-gray-900 items-center mr-2 gap-1 cursor-pointer"
            onClick={getAllTasks}
          >
            <p className="">All tasks</p>
          </div>
        </li>
        {posts.map((user: IUser) => (
          <li
            className="me-2 px-4 py-3 border border-black rounded-lg flex items-center gap-2"
            key={user.uuid}
            ref={userRef}
          >
            <div
              className="flex hover:text-gray-900 items-center mr-2 gap-1 cursor-pointer"
              onClick={() => getUserTasks(user.uuid, user.name)}
            >
              <CiUser />
              <p>{user.name}</p>
            </div>
            <CiEdit
              onClick={() => handleOpen(user.name, user.uuid)}
              className="cursor-pointer"
            />
            <AiOutlineDelete
              onClick={() => deleteUser(user.uuid)}
              className="cursor-pointer"
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="bg-gray-200"
            >
              <Box sx={style}>
                <div className="flex gap-2 justify-center">
                  <input
                    type="text"
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="bg-gray-200 rounded-md px-2"
                    placeholder={modalUsername}
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 rounded-md"
                    onClick={() => editUser(modalUserId)}
                  >
                    Edit
                  </button>
                </div>
              </Box>
            </Modal>
          </li>
        ))}
      </ul>
    </>
  );
};

export default User;
