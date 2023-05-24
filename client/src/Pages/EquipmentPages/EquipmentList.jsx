import React from 'react'
import { useEffect, useState } from "react";

import Loading from "../../Components/Loading";
import EquipmentTable from "../../Components/Equipment/EquipmentTable/EquipmentTable"

const fetchEquipment = (filterInput, sortBy) => {
      return fetch(`/api/equipment?filter=${filterInput}&sort=${sortBy}`).then((res) => res.json())
}

const deleteEquipment = (id) => {
      return fetch(`/api/equipment/${id}`, { method: "DELETE" }).then((res) => res.json())
}

const EquipmentList = () => {
      const [equipment, setEquipment] = useState([]);
      const [loading, setLoading] = useState(true);
      const [sortBy, setSortBy] = useState("Name");

      const handleDelete = (id) => {
            deleteEquipment(id).catch((err) => {
                  console.log(err);
            });
            setEquipment((currEquipment) => {
                  return currEquipment.filter((currEquipment) => currEquipment._id !== id);
            });
      }


      const handleFilterEquipment = (filterInput) => {
            console.log(filterInput)
            fetchEquipment(filterInput, undefined).then((data) => setEquipment(data))
          }


      useEffect(() => {
            fetchEquipment(undefined, sortBy)
                  .then((data) => {
                        setLoading(false);
                        setEquipment(data);
                  })
                  .catch((error) => {
                        if (error.name !== "AbortError") {
                              setEquipment([]);
                              throw error;
                        }
                  })
      }, [sortBy])

      if (loading) {
            return <Loading />;
      }

      return <EquipmentTable equipment={equipment} onDelete={handleDelete} onFilterEquipment={handleFilterEquipment} setSortBy={setSortBy}/>;


}

export default EquipmentList
