import { useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const handleFetchUsers = async () => {
    try {
      console.log("Inside the Try block for fetching All user..")
      const response = await fetch("http://16.112.150.220:8080/api/auth", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
      setMessage("Users loaded successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Error fetching users");
    }
  };

  return (
    <div>
      <h2>User List</h2>

      <button onClick={handleFetchUsers}>
        Load Users
      </button>

      <p>{message}</p>

      {users.length > 0 && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Created Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.createdTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;
