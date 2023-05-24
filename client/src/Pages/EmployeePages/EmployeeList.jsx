import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import EmployeeTable from "../../Components/Employees/EmployeeTable";

const fetchEmployees = (signal, filterInput, sortBy) => {
  return fetch(`/api/employees?filter=${filterInput}&sort=${sortBy}`, { signal }).then((res) => res.json())
};

const deleteEmployee = (id) => {
  console.log(id)
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [sortBy, setSortBy] = useState("Name");
  
 

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });
    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleFilterEmployees = (filterInput) => {
    console.log(filterInput)
    fetchEmployees(undefined, filterInput, undefined).then((employees) => setData(employees))
  }


  useEffect(() => {
    const controller = new AbortController();
    fetchEmployees(controller.signal, undefined, sortBy)
      .then((employees) => {
        setLoading(false);
        setData(employees);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, [sortBy]);

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable employees={data} onDelete={handleDelete} onFilterEmployees={handleFilterEmployees} setSortBy={setSortBy}/>;
};

export default EmployeeList;
