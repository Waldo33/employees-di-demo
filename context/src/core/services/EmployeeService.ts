import { Employee } from "../models/Employee";
import { IHttpClient } from "../api/HttpClient";

export interface IEmployeeService {
  getAll(): Promise<Employee[]>;
}

export class EmployeeService implements IEmployeeService {
  private endpoint = '/employees';
  private apiClient: IHttpClient;

  constructor(apiClient: IHttpClient) {
    this.apiClient = apiClient;
  }

  async getAll(): Promise<Employee[]> {
    return this.apiClient.get<Employee[]>(this.endpoint);
  }
}