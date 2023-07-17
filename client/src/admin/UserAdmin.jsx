import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customers.css";

export default function UserAdmin() {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAdmin, setNewAdmin] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [usernameError, setUsernameError] = useState(false);

  useEffect(() => {
    getAdmins();
  }, []);

  async function getAdmins() {
    try {
      const response = await fetch("http://localhost:3000/admins");
      const { admin } = await response.json(); // Update the property name to 'admin'
      setAdmins(admin);
      setFilteredAdmins(admin);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  }

  const addAdmin = async () => {
    try {
      if (!newAdmin.username) {
        toast.error("Username is required.");
        return;
      }

      const existingAdmin = admins.find(
        (admin) => admin.username === newAdmin.username
      );

      if (existingAdmin) {
        setUsernameError(true);
        return;
      }

      const response = await fetch("http://localhost:3000/admins/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
      });

      if (response.ok) {
        const addedAdmin = await response.json();
        setAdmins((prevAdmins) => [...prevAdmins, addedAdmin]);
        setFilteredAdmins((prevAdmins) => [...prevAdmins, addedAdmin]);
        toast.success("Admin added successfully!");
        setNewAdmin({
          id: null,
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          password: "",
        });
      } else {
        toast.error("Failed to add admin.");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      await fetch(`http://localhost:3000/admins/${id}/delete`, {
        method: "DELETE",
      });
      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin.id !== id)
      );
      setFilteredAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin.id !== id)
      );
      toast.success("Admin deleted successfully!");
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const editAdmin = (id) => {
    const adminToEdit = admins.find((admin) => admin.id === id);
    if (adminToEdit) {
      setNewAdmin(adminToEdit);
    } else {
      toast.error("Admin not found.");
    }
  };

  const searchAdmins = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredAdmins = admins.filter(
      (admin) =>
        `${admin.first_name} ${admin.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredAdmins(filteredAdmins);
  };

  const updateAdmin = async () => {
    try {
      if (!newAdmin.id) {
        toast.error("Admin ID is required for updating an admin.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/admins/${newAdmin.id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAdmin),
        }
      );

      if (response.ok) {
        const updatedAdmin = await response.json();
        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin.id === updatedAdmin.id ? updatedAdmin : admin
          )
        );
        setFilteredAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin.id === updatedAdmin.id ? updatedAdmin : admin
          )
        );
        toast.success("Admin updated successfully!");
        setNewAdmin({
          id: null,
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          password: "",
        });
      } else {
        toast.error("Failed to update admin.");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const handleNewAdminChange = (e) => {
    setNewAdmin((prevAdmin) => ({
      ...prevAdmin,
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
            placeholder="Search admins"
            value={searchTerm}
            onChange={(e) => searchAdmins(e.target.value)}
          />
        </div>
        <div className="add-form">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={newAdmin.first_name}
            onChange={handleNewAdminChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={newAdmin.last_name}
            onChange={handleNewAdminChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={handleNewAdminChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newAdmin.username}
            onChange={handleNewAdminChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newAdmin.password}
            onChange={handleNewAdminChange}
          />
          {usernameError && <div className="error">Username already exists.</div>}
          <button className="add-button" onClick={addAdmin}>
            Add Admin
          </button>
        </div>
      </div>
      <div className="customers-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins && filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    {admin.id === newAdmin.id ? (
                      <input
                        type="text"
                        name="first_name"
                        value={newAdmin.first_name}
                        onChange={handleNewAdminChange}
                      />
                    ) : (
                      admin.first_name
                    )}
                  </td>
                  <td>
                    {admin.id === newAdmin.id ? (
                      <input
                        type="text"
                        name="last_name"
                        value={newAdmin.last_name}
                        onChange={handleNewAdminChange}
                      />
                    ) : (
                      admin.last_name
                    )}
                  </td>
                  <td>
                    {admin.id === newAdmin.id ? (
                      <input
                        type="text"
                        name="email"
                        value={newAdmin.email}
                        onChange={handleNewAdminChange}
                      />
                    ) : (
                      admin.email
                    )}
                  </td>
                  <td>
                    {admin.id === newAdmin.id ? (
                      <input
                        type="text"
                        name="username"
                        value={newAdmin.username}
                        onChange={handleNewAdminChange}
                      />
                    ) : (
                      admin.username
                    )}
                  </td>
                  <td>
                    {admin.id === newAdmin.id ? (
                      <button className="save-button" onClick={updateAdmin}>
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="edit-button"
                          onClick={() => editAdmin(admin.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => deleteAdmin(admin.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-admins">
                  You are the only admin found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
