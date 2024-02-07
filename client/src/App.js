import "./App.css";
import React, { useEffect, useState } from "react";
import UpdateFormPopup from "./component/formPopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [usersData, setusersData] = useState([]);
  const [selectedUser, setselectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const toggleFormPopup = (user) => {
    setselectedUser(user === selectedUser ? null : user);
    setShowForm(!showForm);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/getData");
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setusersData(data);
      console.log(data);
    } catch (error) {
      console.error("Error arrise to fetching Data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/postData", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, number }),
      });
      if (!response.ok) {
        throw new Error();
      }
      alert("User saved Sucessfully");
      setName("");
      setNumber("");
      fetchData();
    } catch (error) {
      console.error("Error fetching Data ", error);
    }
  };

  const handleDelete = async (user) => {
    console.log(user);
    console.log(user._id);
    try {
      const response = await fetch(
        `http://localhost:3001/deleteData/${user._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      fetchData();
    } catch (error) {
      console.error("Error in Deleting Data", error);
    }
  };

  const handleUpdate = async (userId, userData) => {
    try {
      const response = await fetch(`http://localhost:3001/putData/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      fetchData();
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  return (
    <div className="container">
      <form className="my-2" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name here..."
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputNumber1" className="form-label">
            Mobile Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="exampleInputNumber1"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            pattern="[0-9]{10}"
            title="Please enter a 10-digit mobile number"
            placeholder="Enter your mobile number here..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <ul className="list-group">
        {usersData ? (
          usersData.map((user) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center mb-2"
              key={user._id}
            >
              <span> Name : {user.name} </span>
              <span> Phone : {user.number} </span>
              <span>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleDelete(user)}
                >
                  Delete
                </button>
              </span>
              <span>
                {" "}
                <FontAwesomeIcon
                  icon={faUserPen}
                  className="edit-icon"
                  onClick={() => toggleFormPopup(user)}
                />{" "}
                {selectedUser && selectedUser._id === user._id && showForm && (
                  <UpdateFormPopup
                    user={user}
                    onUpdate={(userData) => handleUpdate(user._id, userData)}
                    onClose={() => setShowForm(!showForm)}
                  />
                )}
              </span>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}

export default App;
