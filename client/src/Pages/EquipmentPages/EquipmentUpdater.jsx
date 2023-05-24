import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import EquipmentForm from "../../Components/Equipment/EquipmentForm/EquipmentForm"

const updateEquipment = (equipment) => {
  console.log(equipment)
  return fetch(`/api/equipment/${equipment._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const fetchEquipment = (id) => {
  return fetch(`/api/equipment/${id}`).then((res) => res.json())
}
const EquipmentUpdater = () => {
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false); 
  const [equipmentLoading, setEquipmentLoading] = useState(true);

  useEffect(() => {
    setEquipmentLoading(true);
    fetchEquipment(id)
      .then((data) => {
        setEquipment(data);
        setEquipmentLoading(false);
      })
      .catch((error) => {
        throw error;
      })
  }, [id])
  console.log(equipment)

  const handleUpdateEquipment = (equipment) => {
    setUpdateLoading(true);
    updateEquipment(equipment)
      .then(() => {
        navigate("/equipment");
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  if (equipmentLoading){
    return <Loading />;
  }


  return (
    <EquipmentForm 
    equipment={equipment}
    onSave={handleUpdateEquipment}
    disabled={updateLoading}
    onCancel={() => navigate("/equipment")}
    />
  )
}

export default EquipmentUpdater;
