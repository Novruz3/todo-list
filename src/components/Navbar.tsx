import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userAction } from "../store/UserSlice";
import { IRootState } from "../types/types";
import { CiDark, CiLight } from "react-icons/ci";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: IRootState) => state.user.darkMode);
  const token = localStorage.getItem('token')
  useEffect(() => {
    darkMode
      ? window.document.documentElement.classList.add("dark")
      : window.document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // useEffect(()=>{
  //   if(darkMode){
  //     localStorage.setItem('darkMode', 'true')
  //     window.document.documentElement.classList.add("dark")
  //   }else if(!darkMode) {
  //     localStorage.setItem('darkMode', 'false')
  //     window.document.documentElement.classList.remove("dark");
  //   }else{
  //     dispatch(userAction.setDarkMode(localStorage.getItem('darkMode')))
  //   }
  // },[])

  const logout = () =>{
    localStorage.removeItem('token')
    location.reload()
  } 
  return (
    <div className=" bg-white dark:bg-slate-900 h-14 dark:text-white w-full border-b-2 flex justify-between px-8">
      <p className="text-2xl font-bold flex items-center ">To do list</p>
      <div className="flex items-center justify-center gap-2">
        <div
          className="p-2 border rounded-md mr-2 border-gray-600 font-bold"
          onClick={() => dispatch(userAction.switchMode())}
        >
          {darkMode ? <CiLight /> : <CiDark />}
        </div>
        {!token ? (
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
              onClick={logout}
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
