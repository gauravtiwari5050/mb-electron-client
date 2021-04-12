import { INativeNotificationService, INativeNotificationPayload } from "./INativeNotificationService";
import { Result } from "../../util/Result";
export declare class NativeNotificationService implements INativeNotificationService {
    send(payload: INativeNotificationPayload): Promise<Result<boolean>>;
}
