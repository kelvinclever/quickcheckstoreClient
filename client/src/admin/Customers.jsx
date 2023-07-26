import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customers.css";

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    UserID: null,
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
  });
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await fetch("http://localhost:8082/customers");
      const data = await response.json();
      setUsers(data.users);
      setFilteredUsers(data.users); // Set filteredUsers initially with all users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:8082/customers/${userId}/delete`, {
        method: "DELETE",
      });
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.UserID !== userId)
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => user.UserID !== userId)
      );
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = (userId) => {
    const userToEdit = users.find((user) => user.UserID === userId);
    if (userToEdit) {
      setNewUser(userToEdit);
    } else {
      toast.error("User not found.");
    }
  };

  const searchUsers = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredUsers = users.filter(
      (user) =>
        `${user.FirstName} ${user.LastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };
  const updateUser = async () => {
    try {
      if (!newUser.UserID) {
        toast.error("User ID is required for updating a user.");
        return;
      }
  
      const response = await fetch(
        `http://localhost:8082/customers/${newUser.UserID}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
  
      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.UserID === newUser.UserID ? { ...user, ...newUser } : user
          )
        );
        setFilteredUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.UserID === newUser.UserID ? { ...user, ...newUser } : user
          )
        );
        toast.success("User updated successfully!");
        setNewUser({
          UserID: null,
          FirstName: "",
          LastName: "",
          Email: "",
          Password: "",
          PhoneNumber: "",
        });
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  
  const handleNewUserChange = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="customers">
      <div className="customers-nav">
        <h1>QUICK CHECK STORE</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => searchUsers(e.target.value)}
          />
        </div>
        <button className="add-button" onClick={updateUser}>
          Update User
        </button>
      </div>
      <div className="customers-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers && filteredUsers.length === 0 && searchTerm ? (
              <tr>
                <td colSpan={5} className="no-customers">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers &&
              filteredUsers.map((user) => (
                <tr key={user.UserID}>
                  <td>
                    {user.UserID === newUser.UserID ? (
                      <input
                        type="text"
                        name="FirstName"
                        value={newUser.FirstName}
                        onChange={handleNewUserChange}
                      />
                    ) : (
                      user.FirstName
                    )}
                  </td>
                  <td>
                    {user.UserID === newUser.UserID ? (
                      <input
                        type="text"
                        name="LastName"
                        value={newUser.LastName}
                        onChange={handleNewUserChange}
                      />
                    ) : (
                      user.LastName
                    )}
                  </td>
                  <td>
                    {user.UserID === newUser.UserID ? (
                      <input
                        type="text"
                        name="PhoneNumber"
                        value={newUser.PhoneNumber}
                        onChange={handleNewUserChange}
                      />
                    ) : (
                      user.PhoneNumber
                    )}
                  </td>
                  <td>
                    {user.UserID === newUser.UserID ? (
                      <input
                        type="text"
                        name="Email"
                        value={newUser.Email}
                        onChange={handleNewUserChange}
                      />
                    ) : (
                      user.Email
                    )}
                  </td>
                  <td>
                    {user.UserID === newUser.UserID ? (
                      <button className="save-button" onClick={updateUser}>
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="edit-button"
                          onClick={() => editUser(user.UserID)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => deleteUser(user.UserID)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
