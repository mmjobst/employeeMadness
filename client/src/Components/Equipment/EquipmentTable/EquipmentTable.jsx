import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";


const EquipmentTable = ({ equipment, onDelete, onFilterEquipment, setSortBy }) => {
  const [inputFilterValue, setInputFilterValue] = useState("");

  const inputHandler = (event) => {
    setInputFilterValue(event.target.value);
  }

  const selectHandler  = (event) => {
    setSortBy(event.target.value);
  }

  return (
    <div className="EquipmentTable">
    <div>
      <label>Filter for: </label>
      <input type="text" onChange={inputHandler}></input>
      <button type="submit" onClick={() => onFilterEquipment(inputFilterValue)}>Submit</button>
      <label>Sort by: </label>
      <select  onChange={selectHandler}>
        <option>Name</option>
        <option>Type</option>
        <option>Amount</option>
      </select>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Amount</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {equipment.map((pieceOfEquipment) => (
          <tr key={pieceOfEquipment._id}>
            <td>{pieceOfEquipment.name}</td>
            <td>{pieceOfEquipment.type}</td>
            <td>{pieceOfEquipment.amount}</td>
            <td>
              <Link to={`/updateEquipment/${pieceOfEquipment._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(pieceOfEquipment._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default EquipmentTable;
