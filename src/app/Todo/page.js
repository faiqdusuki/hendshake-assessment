'use client'; // Client-side-rendering

import { useState, useEffect } from "react"; 
import "./todo.css"; // Import the css file 

export default function ActivityForm() {
  // Declare state variables to hold the activity data and form values
  const [activities, setActivities] = useState([]); // Stores list of activities
  const [activity, setActivity] = useState(""); // Holds activity value
  const [price, setPrice] = useState(0); // Holds price  value
  const [type, setType] = useState("education"); // Holds the selected activity type
  const [accessibility, setAccessibility] = useState(0.5); // Holds the accessibility value
  const [isDone, setIsDone] = useState(false); // for checkbox

  // Array of activity types
  const activityTypes = [
    "education",
    "recreational",
    "social",
    "diy",
    "charity",
    "cooking",
    "relaxation",
    "music",
    "busywork",
  ];


  useEffect(() => {
    const savedActivities = JSON.parse(localStorage.getItem("activities")) || [];
    setActivities(savedActivities); // Set activities state with saved data
  }, []);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]); // Runs on activities update

  // Function to add new activity
  const handleAddActivity = () => {
    if (activity.trim() !== "") { // Make sure activity name isn't empty
      const newActivity = {
        id: Date.now(), // Create a unique id for each activity (based on the current time)
        activity, 
        price,
        type, 
        accessibility, 
        isDone, 
      };
      // Add the new activity
      setActivities([...activities, newActivity]);
      // Clear the form after adding the activity
      setActivity("");
      setPrice(0);
      setType("education");
      setAccessibility(0.5);
      setIsDone(false);
    }
  };

  // delete button
  const handleDeleteActivity = (id) => {
    setActivities(activities.filter((item) => item.id !== id)); 
  };

  // Checkbox function
  const handleToggleDone = (id) => {
    setActivities(
      activities.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item 
      )
    );
  };

  // Exit button
  const handleExit = () => {
    // Confirmation message
    const confirmExit = window.confirm(
      "Are you sure you want to exit? All unsaved data will be lost."
    );
    //Redirect to homepage
    if (confirmExit) {
      window.location.href = "/"; 
    }
  };

  return (
    <div className="page">
      <main className="main">
        <h1>Activity Tracker</h1>
        <p>Total Activities: {activities.length}</p> 

        <div className="form">
          {/* Input for the activity name */}
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)} 
            placeholder="Activity"
          />
          {/* Input for the activity price */}
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))} 
            placeholder="Price"
          />
          {/* scrolldown activities list */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)} 
            className="select"
          >
            {activityTypes.map((type) => (
              <option key={type} value={type}>
                {type} {/* Display each type option */}
              </option>
            ))}
          </select>
          {/* Slider for accessibility */}
          <div className="sliderContainer">
            <label>Accessibility: {accessibility.toFixed(2)}</label> 
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={accessibility}
              onChange={(e) => setAccessibility(parseFloat(e.target.value))} 
              className="slider"
            />
          </div>
          {/* Add activity Button*/}
          <button onClick={handleAddActivity}>Add Activity</button>
          {/* Exit button */}
          <button onClick={handleExit} className="btn btn-secondary">Exit</button>
        </div>

      
        <ul className="activityList">
          {activities.map((item) => (
            <li
              key={item.id}
              className={item.isDone ? "activityList done" : "activityList"} 
            >
              <div className="activityDetails">
                <span>{item.activity}</span>
                <span>Price: ${item.price.toFixed(2)}</span>
                <span>Type: {item.type}</span>
                <span>Accessibility: {item.accessibility.toFixed(2)}</span>
              </div>
              <div className="actions">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={item.isDone}
                  onChange={() => handleToggleDone(item.id)} 
                />
                {/* Button delete  */}
                <button onClick={() => handleDeleteActivity(item.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );

// You have reached the end of my code ^^ . Thank you for the review I hope it fit your requirement on this task .
}
