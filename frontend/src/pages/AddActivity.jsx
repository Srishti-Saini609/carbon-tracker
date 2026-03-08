import React from "react";
import ActivityForm from "../components/ActivityForm";

const AddActivity = ({ fetchActivities }) => {
  return (
    <div className="card">

      <h2>Add Activity</h2>

      <ActivityForm fetchActivities={fetchActivities} />

    </div>
  );
};

export default AddActivity;