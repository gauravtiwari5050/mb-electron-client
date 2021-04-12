import { IMagicBellNotificationService } from "./services/magic_bell/IMagicBellNotificationService";
import { MagicBellNotificationService } from "./services/magic_bell/MagicBellNotificationService";
import { INativeNotificationService } from "./services/native_notifcation/INativeNotificationService";
import { NativeNotificationService } from "./services/native_notifcation/NativeNotificationService";
import  { pushEventAggregator, MagicBellConfigOptions } from "@magicbell/core";
      
export class Client {
    private magicBellConfigOptions: MagicBellConfigOptions;
    private verbose: boolean;

    private magicBellService: IMagicBellNotificationService;
    private nativeNotificationService: INativeNotificationService;
    constructor(options: MagicBellConfigOptions) {
      this.magicBellConfigOptions = options;
      this.verbose = false;
      this.nativeNotificationService = new NativeNotificationService();
      this.magicBellService = new MagicBellNotificationService(this.nativeNotificationService, pushEventAggregator);
    }

    public enableLogs(flag: boolean) {
      this.verbose = flag;
    }
    public async start(): Promise<void> {
      await this.magicBellService.authorize(this.magicBellConfigOptions);
      this.magicBellService.listen();
    }
}