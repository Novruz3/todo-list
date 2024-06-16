import { useRef, useState } from "react";
import { http } from "../api/http";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IAuthErrorResponce, ISignUpForm } from "../types/types";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState<ISignUpForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState<boolean>(true);
  const [showConPass, setShowConPass] = useState<boolean>(true);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      try {
        const res = await http.post("/users/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", res.data.token);
        alert("Success");
        navigate("/login");
      } catch ({ response }: IAuthErrorResponce | any) {
        console.log(response.data.status);
        if (response.data.status === "confilct") {
          alert("Please change username or password");
        }
      }
      // formRef.current!.reset();
    } else {
      alert("Please check your password");
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className=" w-96 h-96 bg-blue-300 rounded-xl p-4">
        <p className="flex justify-center text-2xl">Sign Up</p>
        <form
          ref={formRef}
          className="mt-8 flex flex-col gap-4 items-center justify-center my-auto"
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
          <input
            required
            type="email"
            className="h-8 w-72 mx-auto flex rounded px-2"
            placeholder="E-mail"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
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
          <div className="relative">
            <input
              required
              type={showPass ? "password" : "text"}
              className="h-8 w-72 mx-auto flex rounded px-2"
              placeholder="Confirm Password"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <div
              className="absolute top-2 right-4"
              onClick={() => setShowConPass(!showConPass)}
            >
              {showConPass ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button className="bg-blue-500 rounded-xl px-4 py-2 text-white w-36">
            Create account
          </button>
          <p className="text-white text-sm">
            Already have account?{" "}
            <Link to="/login" className="underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
