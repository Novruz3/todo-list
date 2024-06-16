import { useRef, useState } from "react";
import { http } from "../api/http";
import { useDispatch } from "react-redux";
import { userAction } from "../store/UserSlice";

const AddUser = () => {
  const [user, setUser] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user !== "") {
      try {
        const res = await http.post("/lists", {
          name: user,
        });
        console.log(res.data);
        dispatch(userAction.setIsFetched());
      } catch (error) {
        console.log(error);
      }
      setUser("");
      formRef.current!.reset();
    } else {
      alert("Input is empty");
    }
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="gap-4 flex justify-center px-24 md:px-96"
    >
      <input
        type="text"
        className=" rounded-md w-auto px-2 bg-gray-200"
        placeholder="User..."
        onChange={(e) => setUser(e.target.value)}
      />
      <button className="px-4 py-2 w-28 bg-green-500 text-white rounded-md">
        Add User
      </button>
    </form>
  );
};

export default AddUser;
