import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TaskScreen } from "../screens";
import AddTaskScreen from "../screens/AddTaskScreen";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TaskScreen />} />
          <Route path="/add-task" element={<AddTaskScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
