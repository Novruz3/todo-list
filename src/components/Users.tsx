import AddUser from "./AddUser";
import User from "./User";

const Users = () => {
  return (
    <div className="bg-white py-2 px-8 rounded-md">
      <AddUser />
      <User />
    </div>
  );
};

export default Users;
