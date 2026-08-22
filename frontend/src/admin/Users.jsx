import { useEffect, useState } from "react";
import api from "../api/axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data.users || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading Users...</h2>
      </div>
    );
  }

  return (
    <div className="container">

      <h1>All Users</h1>

      <table className="admin-table">

        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user, index) => (

            <tr key={user._id}>

              <td>{index + 1}</td>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.phone || "-"}</td>

              <td>
                <span
                  className={
                    user.role === "admin"
                      ? "admin-badge"
                      : "customer-badge"
                  }
                >
                  {user.role}
                </span>
              </td>

              <td>
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Users;