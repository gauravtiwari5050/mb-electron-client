import { IMagicBellNotificationService } from "./services/magic_bell/IMagicBellNotificationService";
import { MagicBellNotificationService } from "./services/magic_bell/MagicBellNotificationService";
import { INativeNotificationService } from "./services/native_notifcation/INativeNotificationService";
import { NativeNotificationService } from "./services/native_notifcation/NativeNotificationService";
import  { pushEventAggregator } from "@magicbell/core";
      
export class Client {
    private apiKey: string;
    private userEmail: string;
    private verbose: boolean;

    private magicBellService: IMagicBellNotificationService;
    private nativeNotificationService: INativeNotificationService;
    constructor(params: {
      apiKey: string;
      userEmail: string;
    }) {
      this.apiKey = params.apiKey;
      this.userEmail = params.userEmail;
      this.verbose = false;
      this.nativeNotificationService = new NativeNotificationService();
      this.magicBellService = new MagicBellNotificationService(this.nativeNotificationService, pushEventAggregator);
    }

    public enableLogs(flag: boolean) {
      this.verbose = flag;
    }
    public async start(): Promise<void> {
      await this.magicBellService.authorize({
        apiKey: this.apiKey,
        userEmail: this.userEmail,
      });
      this.magicBellService.listen();
    }
}