import { Result } from "../../util/Result";
import { IMagicBellNotification } from "./IMagicBellNotification";
import { MagicBellConfigOptions } from "@magicbell/core";
export interface IMagicBellNotificationService {
    authorize(params: MagicBellConfigOptions): Promise<Result<boolean>>;
    deliver(magicBellNotification: IMagicBellNotification): Promise<Result<boolean>>;
    listen(): this;
    delivered(): number;
    failed(): number;
}
