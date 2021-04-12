import { IMagicBellNotificationService } from "./IMagicBellNotificationService";
import { IMagicBellNotification } from "./IMagicBellNotification";
import { Result } from "../../util/Result";
import { MagicBellConfigOptions } from "@magicbell/core";
import { Emitter } from "mitt";
import { INativeNotificationService } from "../native_notifcation/INativeNotificationService";
export declare class MagicBellNotificationService implements IMagicBellNotificationService {
    private client;
    private nativeNotificationService;
    private pushEventAggregator;
    private deliveredCount;
    private failedCount;
    constructor(nativeNotificationService: INativeNotificationService, pushEventAggregator: Emitter);
    delivered(): number;
    failed(): number;
    deliver(magicBellNotification: IMagicBellNotification): Promise<Result<boolean>>;
    authorize(params: MagicBellConfigOptions): Promise<Result<boolean>>;
    listen(): this;
}
