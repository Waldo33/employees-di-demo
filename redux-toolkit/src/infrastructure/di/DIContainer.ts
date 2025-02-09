import { IHttpClient, MockApiClient } from "../../core/api/HttpClient";
import { EmployeeService } from "../../core/services/EmployeeService";

export interface IAppDependencies {
    employeeService: EmployeeService;
}

export class DIContainer {
    private apiClient: IHttpClient;
    public employeeService: EmployeeService;

    constructor() {
        this.apiClient = new MockApiClient();
        this.employeeService = new EmployeeService(this.apiClient);
    }
}