import Main from "../components/Main";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 dark:bg-slate-800">
        <Navbar />
        <Main />
      </div>
    </>
  );
};

export default Home;
