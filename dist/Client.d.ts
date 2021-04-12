import { MagicBellConfigOptions } from "@magicbell/core";
export declare class Client {
    private magicBellConfigOptions;
    private verbose;
    private magicBellService;
    private nativeNotificationService;
    constructor(options: MagicBellConfigOptions);
    enableLogs(flag: boolean): void;
    start(): Promise<void>;
}
