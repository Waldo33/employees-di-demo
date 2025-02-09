import React from "react";
import { DIContainer } from "../../di/DIContainer";

export const DIContext = React.createContext<DIContainer | null>(null)