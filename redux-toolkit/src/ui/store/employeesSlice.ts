import { bindActionCreators, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Employee } from "../../core/models/Employee";
import { IAppDependencies } from "../../infrastructure/di/DIContainer";
import { RootState } from ".";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useMemo } from "react";

const employeeAdapter = createEntityAdapter<Employee>({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const initialState = employeeAdapter.getInitialState({
    isLoading: false,
    error: null as string | null,
})

export const fetchEmployees = createAsyncThunk<Employee[], void, { extra: IAppDependencies }>("employees/fetchAll", async (_, { extra }) => {
    const { employeeService } = extra;
    const employees = await employeeService.getAll();
    return employees;
})

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                employeeAdapter.setAll(state, action.payload);
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch employees";
            })
    }
})

export default employeesSlice.reducer

export const { 
    selectAll: selectAllEmployees,
} = employeeAdapter.getSelectors<RootState>((state) => state.employees);


export const useEmployeesActions = () => {
    const dispatch = useAppDispatch();
    return useMemo(
        () => bindActionCreators(
            { fetchEmployees }, dispatch
        ),
        [dispatch]
    );
}