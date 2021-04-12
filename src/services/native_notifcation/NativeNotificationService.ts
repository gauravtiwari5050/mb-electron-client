const { Notification, shell } = require("electron");
import { INativeNotificationService, INativeNotificationPayload } from "./INativeNotificationService";
import { Result } from "../../util/Result";

export class NativeNotificationService implements INativeNotificationService {
  async send(payload: INativeNotificationPayload): Promise<Result<boolean>> {
    try {
      const nativeNotification = new Notification({
        title: payload.title,
        body: payload.body,
      });
      nativeNotification.on("click", (event: unknown, arg: unknown) => {
        if (payload.url) {
          shell.openExternal(payload.url);
        }
      });
      nativeNotification.show();
      return Result.ok<boolean>(true);
    } catch (err) {
      return Result.fail<boolean>(err.message);
    }
    
  }
}