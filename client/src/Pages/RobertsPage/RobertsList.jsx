import { useEffect } from "react";
import { useState } from "react";

import EmployeeTable from "../../Components/Employees/EmployeeTable";


const fetchRoberts = (setData) => {
      return fetch("/api/robert").then((res) => res.json()).then((roberts) => setData(roberts));
    };

const RobertsList = () => {
      const [data, setData] = useState([]);

      useEffect( () => {
            try{
                  fetchRoberts(setData);
            }
            catch (err) {
                  console.error(err);
            }
      },[])

      console.log(data)

      return data ? (
            <EmployeeTable employees={data}  />
      ) : (
		<p> loading</p>
	);
      
      // <h1>roberts</h1>
}

export default RobertsList;