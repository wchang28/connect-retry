export interface IConnectable<T> {
    connect(): Promise<T>;
}
export interface IConnectRetry<T extends IConnectable<T>> {
    start(): void;
    on(event: "connecting", listener: () => void): this;
    on(event: "connected", listener: (connectable: T) => void): this;
    on(event: "error", listener: (err: any) => void): this;
}
export declare function get<T extends IConnectable<T>>(connectable: T, retryConnectMS: number): IConnectRetry<T>;
