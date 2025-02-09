import React from "react";
import { IAppDependencies } from "../../infrastructure/di/DIContainer";

export const DIContext = React.createContext<IAppDependencies | null>(null)