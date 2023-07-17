import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customers.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    customer_id: null,
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  });
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    getCustomers();
  }, []);

  async function getCustomers() {
    try {
      const response = await fetch("http://localhost:8082/customers");
      const data = await response.json();
      setCustomers(data.customers);
      setFilteredCustomers(data.customers); // Set filteredCustomers initially with all customers
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }

  const deleteCustomer = async (customerId) => {
    try {
      await fetch(`http://localhost:3000/customers/${customerId}/delete`, {
        method: "DELETE",
      });
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.customer_id !== customerId)
      );
      setFilteredCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.customer_id !== customerId)
      );
      toast.success("Customer deleted successfully!");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const editCustomer = (customerId) => {
    const customerToEdit = customers.find(
      (customer) => customer.customer_id === customerId
    );
    if (customerToEdit) {
      setNewCustomer(customerToEdit);
    } else {
      toast.error("Customer not found.");
    }
  };

  const searchCustomers = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredCustomers = customers.filter((customer) =>
      `${customer.first_name} ${customer.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filteredCustomers);
  };

  const updateCustomer = async () => {
    try {
      if (!newCustomer.customer_id) {
        toast.error("Customer ID is required for updating a customer.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/customers/${newCustomer.customer_id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCustomer),
        }
      );

      if (response.ok) {
        const updatedCustomer = await response.json();
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.customer_id === updatedCustomer.customer_id
              ? updatedCustomer
              : customer
          )
        );
        setFilteredCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.customer_id === updatedCustomer.customer_id
              ? updatedCustomer
              : customer
          )
        );
        toast.success("Customer updated successfully!");
        setNewCustomer({
          customer_id: null,
          first_name: "",
          last_name: "",
          phone_number: "",
          email: "",
          password: "",
        });
      } else {
        toast.error("Failed to update customer.");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleNewCustomerChange = (e) => {
    setNewCustomer((prevCustomer) => ({
      ...prevCustomer,
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
            placeholder="Search customers"
            value={searchTerm}
            onChange={(e) => searchCustomers(e.target.value)}
          />
        </div>
        <button className="add-button" onClick={updateCustomer}>
          Update Customer
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
            {filteredCustomers && filteredCustomers.length === 0 && searchTerm ? (
              <tr>
                <td colSpan={5} className="no-customers">
                  No customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers && filteredCustomers.map((customer) => (
                <tr key={customer.customer_id}>
                  <td>
                    {customer.customer_id === newCustomer.customer_id ? (
                      <input
                        type="text"
                        name="first_name"
                        value={newCustomer.first_name}
                        onChange={handleNewCustomerChange}
                      />
                    ) : (
                      customer.first_name
                    )}
                  </td>
                  <td>
                    {customer.customer_id === newCustomer.customer_id ? (
                      <input
                        type="text"
                        name="last_name"
                        value={newCustomer.last_name}
                        onChange={handleNewCustomerChange}
                      />
                    ) : (
                      customer.last_name
                    )}
                  </td>
                  <td>
                    {customer.customer_id === newCustomer.customer_id ? (
                      <input
                        type="text"
                        name="phone_number"
                        value={newCustomer.phone_number}
                        onChange={handleNewCustomerChange}
                      />
                    ) : (
                      customer.phone_number
                    )}
                  </td>
                  <td>
                    {customer.customer_id === newCustomer.customer_id ? (
                      <input
                        type="text"
                        name="email"
                        value={newCustomer.email}
                        onChange={handleNewCustomerChange}
                      />
                    ) : (
                      customer.email
                    )}
                  </td>
                  <td>
                    {customer.customer_id === newCustomer.customer_id ? (
                      <button className="save-button" onClick={updateCustomer}>
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="edit-button"
                          onClick={() => editCustomer(customer.customer_id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => deleteCustomer(customer.customer_id)}
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
