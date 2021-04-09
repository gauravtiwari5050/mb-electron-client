const { Notification, shell } = require("electron");
import MagicBellClient, { pushEventAggregator } from "@magicbell/core";
          
export class Client {
    private apiKey: string;
    private userEmail: string;
    private verbose: boolean;
    constructor(params: {
      apiKey: string;
      userEmail: string;
    }) {
      this.apiKey = params.apiKey;
      this.userEmail = params.userEmail;
      this.verbose = false;
    }

    public enableLogs(flag: boolean) {
      this.verbose = flag;
    }
    public async start(): Promise<void> {
        const client = await  MagicBellClient.createInstance({
          apiKey: this.apiKey,
          userEmail: this.userEmail,
        });
        pushEventAggregator.on("notifications.new", (notification) => {
          const payload = {
            title: notification.title,
            body: notification.content,
          };
          const nativeNotification = new Notification(payload);
          nativeNotification.on("click", (event: unknown, arg: unknown) => {
            if (notification.actionUrl) {
              shell.openExternal(notification.actionUrl);
            }
          });
          nativeNotification.show();
          client.getStore().fetchAndReset();
        });
        client.startRealTimeListener();
    }
}