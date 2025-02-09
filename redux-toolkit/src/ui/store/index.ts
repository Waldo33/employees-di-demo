import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employeesSlice";
import { IAppDependencies } from "../../infrastructure/di/DIContainer";

export function createAppStore(container: IAppDependencies) {
    return configureStore({
        reducer: {
            employees: employeesReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: container,
            }
        })
    })
}

export type AppStore = ReturnType<typeof createAppStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]