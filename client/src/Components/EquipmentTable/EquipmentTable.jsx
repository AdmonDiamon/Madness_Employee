import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EquipmentTable = ({ equipment, onDelete }) => {
  const [amounts, setAmounts] = useState({});
  const [types, setTypes] = useState({});
  const [updateBtnActiv, setUpdateBtnActiv] = useState(true);

  const navigate = useNavigate();

  const handleAmountChange = (itemId, event) => {
    const { name, value } = event.target;
    setAmounts({ ...amounts, [itemId]: value });
    setUpdateBtnActiv(false);
  };

  const handleTypeChange = (itemId, event) => {
    const { name, value } = event.target;
    setTypes({ ...types, [itemId]: value });
    setUpdateBtnActiv(false);
  };

  const updateEquipment = (equipment) => {
    return fetch(`/api/equipments/${equipment._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(equipment),
    }).then((res) => res.json());
  };

  const handleUpdateButtonOnClick = (item) => {

    const updatedAmount = amounts[item._id] || item.amount;
  const updatedType = types[item._id] || item.type;

  const updatedEquipment = {
    ...item,
    amount: updatedAmount,
    type: updatedType,
  };

    updateEquipment(updatedEquipment)
      .then(() => {
        setUpdateBtnActiv(true);
        navigate("/equipment");
        console.log("update successfull")
        console.log(updatedEquipment);
      })
      .catch((error) => {
        console.error("Fehler beim Aktualisieren der Ausrüstung:", error);
      });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {equipment.map((item) => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>
              <input
                type="text"
                name={`type_${item._id}`}
                value={types[item._id] || item.type}
                onChange={(e) => handleTypeChange(item._id, e)}
              />
            </td>
            <td>
              <input
                type="number"
                name={`amount_${item._id}`}
                value={amounts[item._id] || item.amount}
                onChange={(e) => handleAmountChange(item._id, e)}
              />
            </td>
            <td>
              <button
                type="button"
                onClick={() => handleUpdateButtonOnClick(item)}
                disabled={updateBtnActiv}
              >
                Update
              </button>
              <button type="button" onClick={() => onDelete(item._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EquipmentTable;
