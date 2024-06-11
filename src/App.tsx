import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/register";
import SignIn from "./pages/login";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
