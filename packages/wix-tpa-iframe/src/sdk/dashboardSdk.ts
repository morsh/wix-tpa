export interface DashboardSDK {
    getInstance(): Promise<string | null>;
    onEnvUpdated(cb: (envData: any) => void): void;
}