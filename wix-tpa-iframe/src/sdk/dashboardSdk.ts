export interface DashboardSDK {
    sayHello(): Promise<string>;
    getInstance(): Promise<string | null>;
    onContainerParamsChanged(cb: (params: any) => void): void;
}