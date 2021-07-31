import { useEffect, useState } from "react";

const Info = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(["ali", "bali"]);
  }, []);

  return (
    <div>
      <h3>Users:</h3>
      <div>
        {users.map((user) => {
          return <span>{user}, </span>;
        })}
      </div>
    </div>
  );
};

export default Info;
