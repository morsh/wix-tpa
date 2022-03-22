export interface DashboardSDK {
    sayHello(): Promise<string>;
    getInstance(): Promise<string | null>;
    subscribeContainerParams(subscriber: any): void;
}