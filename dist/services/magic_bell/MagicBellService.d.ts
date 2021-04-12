import { IMagicBellService, IMagicBellAuthorizationParams } from "./IMagicBellService";
import { Result } from "../../util/Result";
import { INativeNotificationService } from "../native_notifcation/INativeNotificationService";
export declare class MagicBellService implements IMagicBellService {
    private client;
    private nativeNotificationService;
    delivered: number;
    failed: number;
    constructor(nativeNotificationService: INativeNotificationService);
    authorize(params: IMagicBellAuthorizationParams): Promise<Result<boolean>>;
    listen(): this;
}
