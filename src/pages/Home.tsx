import Lists from "../components/Lists";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-200">
      <div className="title flex text-center flex-col pt-4">
        <p className="font-bold text-3xl">To Do List</p>
        <div className="flex flex-col md:flex-row">
          <Lists/>
          <div className="flex-1">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
