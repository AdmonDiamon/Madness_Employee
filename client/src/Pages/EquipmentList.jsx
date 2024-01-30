import React, { useState, useEffect } from "react";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/equipments")
      .then((response) => response.json())
      .then((data) => {
        setEquipment(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Equipment-Daten:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Lade Equipment-Daten...</p>;
  }

  return (
    <div>
      <h2>Equipment List</h2>
      <EquipmentTable equipment={equipment} />
    </div>
  );
};

export default EquipmentList;
