import Users from "./Users";
import Tasks from "./Tasks";

const Main = () => {
  const token = localStorage.getItem('token')
  return (
    <div className="flex justify-center min-h-[calc(100vh-3.5rem)] pt-4">
      {token ? (
        <div className="flex flex-col">
          <Users />
          <Tasks />
        </div>
      ) : (
        <p className="text-4xl font-bold mt-16 dark:text-white">
          Please sign in or create your account !!!
        </p>
      )}
    </div>
  );
};

export default Main;
