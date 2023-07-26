import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customers.css";

export default function UserAdmin() {
  const [admin, setAdmin] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAdmin, setNewAdmin] = useState({
    id: null,
    FirstName: "",
    LastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [filteredAdmin, setFilteredAdmin] = useState([]);
  const [usernameError, setUsernameError] = useState(false);

  useEffect(() => {
    getAdmins();
  }, []);

  async function getAdmins() {
    try {
      const response = await fetch("http://localhost:3000/admin");
      const data = await response.json();
      setAdmin(data.admin);
      setFilteredAdmin(data.admin);
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

      const existingAdmin = admin.find(
        (admin) => admin.username === newAdmin.username
      );

      if (existingAdmin) {
        setUsernameError(true);
        return;
      }

      const response = await fetch("http://localhost:3000/admin/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
      });

      if (response.ok) {
        const addedAdmin = await response.json();
        setAdmin((prevAdmin) => [...prevAdmin, addedAdmin]);
        setFilteredAdmin((prevAdmin) => [...prevAdmin, addedAdmin]);
        toast.success("Admin added successfully!");
        setNewAdmin({
          id: null,
          FirstName: "",
          LastName: "",
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
      await fetch(`http://localhost:3000/admin/${id}/delete`, {
        method: "DELETE",
      });
      setAdmin((prevAdmin) =>
        prevAdmin.filter((admin) => admin.id !== id)
      );
      setFilteredAdmin((prevAdmin) =>
        prevAdmin.filter((admin) => admin.id !== id)
      );
      toast.success("Admin deleted successfully!");
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const editAdmin = (id) => {
    const adminToEdit = admin.find((admin) => admin.id === id);
    if (adminToEdit) {
      setNewAdmin(adminToEdit);
    } else {
      toast.error("Admin not found.");
    }
  };

  const searchAdmins = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredAdmin = admin.filter(
      (admin) =>
        `${admin.FirstName} ${admin.LastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredAdmin(filteredAdmin);
  };

  const updateAdmin = async () => {
    try {
      if (!newAdmin.id) {
        toast.error("Admin ID is required for updating an admin.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/admin/${newAdmin.id}/update`,
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
        setAdmin((prevAdmin) =>
          prevAdmin.map((admin) =>
            admin.id === updatedAdmin.id ? updatedAdmin : admin
          )
        );
        setFilteredAdmin((prevAdmin) =>
          prevAdmin.map((admin) =>
            admin.id === updatedAdmin.id ? updatedAdmin : admin
          )
        );
        toast.success("Admin updated successfully!");
        setNewAdmin({
          id: null,
          FirstName: "",
          LastName: "",
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
            name="FirstName"
            placeholder="First Name"
            value={newAdmin.FirstName}
            onChange={handleNewAdminChange}
          />
          <input
            type="text"
            name="LastName"
            placeholder="Last Name"
            value={newAdmin.LastName}
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
            {filteredAdmin && filteredAdmin.length > 0 ? (
              filteredAdmin.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    {admin.id === newAdmin.id ? (
                      <input
                        type="text"
                        name="FirstName"
                        value={newAdmin.FirstName}
                        onChange={handleNewAdminChange}
                      />
                    ) : (
                      admin.FirstName
                    )}
                  </td>
                  <td>
                    {admin.id === newAdmin.id ? (
                      <input
                        type="text"
                        name="LastName"
                        value={newAdmin.LastName}
                        onChange={handleNewAdminChange}
                      />
                    ) : (
                      admin.LastName
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
