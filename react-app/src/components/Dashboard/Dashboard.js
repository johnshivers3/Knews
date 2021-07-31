import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";

export const Dashboard = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(()=>{},[])

  return (
    <>
      <div className="header-div">
        <h1>Dashboard</h1>
      </div>
      <div id="dashboard-main-div">
        This is the user dashboard
      </div>
    </>
  );
};

export default Dashboard;
