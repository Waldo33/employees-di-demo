/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockEmployees } from "../../mockData/employees";

export interface IHttpClient {
    get<T>(url: string): Promise<T>;
    post<T>(url: string, body: unknown): Promise<T>;
    put<T>(url: string, body: unknown): Promise<T>;
    delete<T>(url: string): Promise<T>;
}
export class FetchClient implements IHttpClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(this.baseUrl + url);
        if (!response.ok) {
            throw new Error(`GET ${url} failed: ${response.status} ${response.statusText}`);
        }
        return response.json() as Promise<T>;
    }

    public async post<T>(url: string, body: unknown): Promise<T> {
        const response = await fetch(this.baseUrl + url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if (!response.ok) {
            throw new Error(`POST ${url} failed: ${response.status} ${response.statusText}`);
          }
          return response.json() as Promise<T>;
    }
    public async put<T>(url: string, body: unknown): Promise<T> {
        const response = await fetch(this.baseUrl + url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if (!response.ok) {
            throw new Error(`PUT ${url} failed: ${response.status} ${response.statusText}`);
          }
          return response.json() as Promise<T>;
    }
    public async delete<T>(url: string): Promise<T> {
        const response = await fetch(this.baseUrl + url, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`DELETE ${url} failed: ${response.status} ${response.statusText}`);
        }
        return response.json() as Promise<T>;
    }
}

export class MockApiClient implements IHttpClient {
    get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            if(url === '/employees') {
                resolve(mockEmployees as T);
            }
            reject('Not implemented');
        })
    }
    post<T>(_url: string, _body: unknown): Promise<T> {
        throw new Error("Method not implemented.");
    }
    put<T>(_url: string, _body: unknown): Promise<T> {
        throw new Error("Method not implemented.");
    }
    delete<T>(_url: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
}