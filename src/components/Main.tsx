import { useSelector } from "react-redux";
import { IRootState } from "../types/types";
import Users from "./Users";
import Tasks from "./Tasks";

const Main = () => {
  const user = useSelector((state: IRootState) => state.user.isUser);
  return (
    <div className="flex justify-center min-h-[calc(100vh-3.5rem)] pt-4">
      {user ? (
        <div className="flex flex-col">
          <Users />
          <Tasks />
        </div>
      ) : (
        <p className="text-4xl font-bold mt-16">
          Please sign in or create your account !!!
        </p>
      )}
    </div>
  );
};

export default Main;
