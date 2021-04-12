import { Result } from "../../util/Result";
export interface IMagicBellAuthorizationParams {
    apiKey: string;
    userEmail: string;
}
export interface IMagicBellNotification {
    title: string;
    content: string;
    actionUrl: string;
}
export interface IMagicBellService {
    delivered: number;
    failed: number;
    authorize(params: IMagicBellAuthorizationParams): Promise<Result<boolean>>;
    listen(): this;
}
