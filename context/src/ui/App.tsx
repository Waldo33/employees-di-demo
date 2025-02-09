import { useCallback, useContext, useEffect, useState } from "react";
import { Employee } from "../core/models/Employee";
import { DIContext } from "./context/DIContext";

export function App() {
  const diContainer = useContext(DIContext);

  if(!diContainer) {
    throw new Error("DIContainer not found");
  }

  const { employeeService } = diContainer;

  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = useCallback(async () => {
    const employees = await employeeService.getAll();
    setEmployees(employees);
  }, [employeeService])

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees])

  return (
    <div>
      <ul>
          {employees.map((employee) => (
              <li key={employee.id}>{employee.name}</li>
          ))}
      </ul>
    </div>
  )
}

export default App
