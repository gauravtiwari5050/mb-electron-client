export declare class Client {
    private apiKey;
    private userEmail;
    private verbose;
    constructor(params: {
        apiKey: string;
        userEmail: string;
    });
    enableLogs(flag: boolean): void;
    start(): Promise<void>;
}
