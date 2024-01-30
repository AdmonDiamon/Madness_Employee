import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm";

const createEquipment = async (equipment) => {
  try {
    const response = await fetch("/api/equipment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(equipment),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to create equipment");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const EquipmentCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEquipment = async (equipmentData) => {
    setLoading(true);

    try {
      await createEquipment(equipmentData);
      setLoading(false);
      navigate("/equipment");
    } catch (error) {
      console.error("Error creating equipment:", error);
      setLoading(false);
    }
  };

  return (
    <EquipmentForm
      onCancel={() => navigate("/equipment")}
      onSave={handleCreateEquipment}
      equipment={null}
    />
  );
};

export default EquipmentCreator;
