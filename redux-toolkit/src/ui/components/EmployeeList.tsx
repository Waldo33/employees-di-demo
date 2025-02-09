import { selectAllEmployees, useEmployeesActions } from "../store/employeesSlice";
import { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

const useEmployeesList = () => {
    const employees = useAppSelector(selectAllEmployees);
    const isLoading = useAppSelector((state) => state.employees.isLoading);
    const error = useAppSelector((state) => state.employees.error);

    return {
        employees, isLoading, error
    }
}

export const EmployeeList = () => {
    const { fetchEmployees } = useEmployeesActions()
    const { employees, isLoading } = useEmployeesList();
    
    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    if(isLoading) {
        return <div>Loading...</div>
    }

    return (
        <ul>
            {employees.map((employee) => (
                <li key={employee.id}>{employee.name}</li>
            ))}
        </ul>
    );
}