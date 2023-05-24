import { Link } from "react-router-dom";
import { useState } from "react";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, onFilterEmployees, setSortBy }) => {
  const [inputFilterValue, setInputFilterValue] = useState("");

  const inputHandler = (event) => {
    console.log(event.target.value)
    setInputFilterValue(event.target.value)
  }

  const selectHandler  = (event) => {
    setSortBy(event.target.value)
    
  }

  return (
  <div className="EmployeeTable">
    <div>
      <div>
        <label>Filter for: </label>
        <input type="text" onChange={inputHandler}></input>
        <button type="submit" onClick={() => onFilterEmployees(inputFilterValue)}>Submit</button>
      </div>
      <div>
      <label>Sort by: </label>
        <select  onChange={selectHandler}>
          <option>Name</option>
          <option>Level</option>
          <option>Position</option>
        </select>
      </div>
      <div>
          <Link to="/robert">
            <label>List all Roberts</label>
            <input type="radio" />
          </Link>
        </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default EmployeeTable;
