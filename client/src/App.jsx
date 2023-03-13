import { useState } from "react";
import EmployeeTables from "./Pages/EmployeeTables";

function App() {
  const [count, setCount] = useState(0);

  return <EmployeeTables />;
}

export default App;
