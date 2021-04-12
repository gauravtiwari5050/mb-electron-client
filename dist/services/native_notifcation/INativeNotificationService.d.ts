import { Result } from "../../util/Result";
export interface INativeNotificationPayload {
    title: string;
    body?: string;
    url?: string;
}
export interface INativeNotificationService {
    send(payload: INativeNotificationPayload): Promise<Result<boolean>>;
}
