export interface DashboardSDK {
    getParentUrl(): Promise<string>;
    getInstance(): Promise<string | null>;
    onContainerParamsChanged(cb: (params: any) => void): void;
}