import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ISignInForm } from "../types/types";
import { http } from "../api/http";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ISignInForm>({
    username: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(localStorage.getItem("token"));
    
    try {
      const res = await http.post("/users/login", {
        username : formData.username,
        password : formData.password
      })
      console.log(await res.data.token);
      localStorage.setItem("token", res.data.token)
      navigate("/")
    } catch ({response}) {
      if(response.data.status === "fail"){
        alert("Username or password wrong")
      }
    }
    console.log(formData);
    // formRef.current!.reset();
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className=" w-96 h-96 bg-blue-300 rounded-xl p-4">
        <p className="flex justify-center text-2xl">Login</p>
        <form
          ref={formRef}
          className="mt-16 flex flex-col gap-4 items-center justify-center my-auto"
          onSubmit={handleSubmit}
        >
          <input
            required
            type="text"
            className="h-8 w-72 mx-auto flex rounded px-2"
            placeholder="Username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <div className="relative">
            <input
              required
              type={showPass ? "password" : "text"}
              className="h-8 w-72 mx-auto flex rounded px-2"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div
              className="absolute top-2 right-4"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button className="bg-blue-500 rounded-xl px-4 py-2 mt-4 text-white w-36">
            Login
          </button>
          <p className="text-white text-sm">Forgot Username / Password ?</p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
