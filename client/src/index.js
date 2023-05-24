import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeePages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeePages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeePages/EmployeeUpdater";

import EquipmentList from "./Pages/EquipmentPages/EquipmentList";
import EquipmentUpdater from "./Pages/EquipmentPages/EquipmentUpdater"
import RobertsList from "./Pages/RobertsPage/RobertsList";

import "./index.css";
import TableTest from "./Pages/Tests/TableTest";
import FormTest from "./Pages/Tests/FormTest";
import EquipmentCreator from "./Pages/EquipmentPages/EquipmentCreator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/robert",
        element: <RobertsList />,
      },
      {
        path: "/equipment",
        element: <EquipmentList />,
      },
      {
        path: "/updateEquipment/:id",
        element: <EquipmentUpdater />
      },
      {
        path: "/createEquipment",
        element: <EquipmentCreator />,
      },

    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
