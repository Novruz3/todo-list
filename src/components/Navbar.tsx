import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userAction } from "../store/UserSlice";
import { IRootState } from "../types/types";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.user.isUser);
  return (
    <div className=" bg-white h-14 w-full border-b-2 flex justify-between px-8">
      <p className="text-2xl font-bold flex items-center">To do list</p>
      <div className="flex items-center justify-center gap-2">
        {!user ? (
          <>
            <Link to="/login">
              <button className="px-4 py-2 rounded-md bg-slate-500 text-white">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 rounded-md bg-slate-500 text-white">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <Link to="/">
            <button
              className="px-4 py-2 rounded-md bg-slate-500 text-white"
              onClick={() => dispatch(userAction.removeUser())}
            >
              Logout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
