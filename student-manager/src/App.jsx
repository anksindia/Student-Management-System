import React from "react";
import Students from "./Students";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashbord";
import "./App.css"
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Students />
    },
    {
      path:"/login",
      element:<Login />
    },
    {
      path:"/register",
      element:<Register />
    },
    {
      path:"/dashboard",
      element:<Dashboard />
    },
    {
      path:"/AdminLogin",
      element:<AdminLogin />
    },
    {
      path:"/AdminDashboard",
      element:<AdminDashboard />
    },
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
