import { INativeNotificationService, INativeNotificationPayload } from "../INativeNotificationService";
import { Result } from "../../../util/Result";
export declare class FaleNativeNotificationService implements INativeNotificationService {
    send(payload: INativeNotificationPayload): Promise<Result<boolean>>;
}
