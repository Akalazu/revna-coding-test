import React from "react";

interface Users {
  id: number;
  name: string;
}
const Users = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const users: Users[] = await response.json();
  return (
    <>
      <div>
        <h1>All Users Page</h1>
        <table className="table table-hover table-fixed">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.id}.</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
