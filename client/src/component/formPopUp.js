import React, { useState } from "react";

function UpdateFormPopup({ user, onUpdate, onClose }) {
  const [name, setName] = useState(user.name);
  const [number, setNumber] = useState(user.number);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, number };
    onUpdate(userData);
    console.log("In Update Form Popup", name, number);
    // Close the pop-up or modal
    onClose();
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="number">Phone:</label>
        <input
          type="text"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateFormPopup;
