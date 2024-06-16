import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/register";
import SignIn from "./pages/login";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
