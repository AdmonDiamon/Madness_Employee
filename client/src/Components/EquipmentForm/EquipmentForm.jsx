import React, { useState } from "react";

const EquipmentForm = ({ onSave, onCancel, equipment }) => {
  const [formData, setFormData] = useState({
    name: equipment ? equipment.name : "",
    type: equipment ? equipment.type : "",
    amount: equipment ? equipment.amount : 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          name="type"
          id="type"
          value={formData.type}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">{equipment ? "Update" : "Create"}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;
