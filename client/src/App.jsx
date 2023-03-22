import { useState } from "react";
import EmployeeTables from "./Pages/EmployeeTables";
import RegisterUser from "./Pages/Login/RegisterUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/RegisterUser" replace />} />
        <Route path="RegisterUser" element={<RegisterUser />} />
        <Route path="employeetable" element={<EmployeeTables />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
