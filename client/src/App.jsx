import { useState } from "react";
import EmployeeTables from "./Pages/EmployeeTables";
import RegisterUser from "./Pages/Login/RegisterUser";

function App() {
  const [count, setCount] = useState(0);

  return <RegisterUser />;
}

export default App;
