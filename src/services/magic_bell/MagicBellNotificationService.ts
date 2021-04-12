import { IMagicBellNotificationService } from "./IMagicBellNotificationService";
import { IMagicBellNotification } from "./IMagicBellNotification";
import { IMagicBellAuthorizationParams } from "./IMagicBellAuthorizationParams";
import { Result } from "../../util/Result";
import MagicBellClient, { MagicBellConfigOptions } from "@magicbell/core";
import { Emitter } from "mitt";
import { INativeNotificationService } from "../native_notifcation/INativeNotificationService";
import EventEmitter from "events";

export class MagicBellNotificationService implements IMagicBellNotificationService {
  private client: MagicBellClient;
  private nativeNotificationService: INativeNotificationService;

  private pushEventAggregator: Emitter;

  private deliveredCount: number;
  private failedCount: number;

  constructor(
    nativeNotificationService: INativeNotificationService,
    pushEventAggregator: Emitter
  ) {
    this.nativeNotificationService = nativeNotificationService;
    this.deliveredCount = 0;
    this.failedCount = 0;
    this.pushEventAggregator = pushEventAggregator;
  }
  delivered(): number {
    return this.deliveredCount;
  }
  failed(): number {
    return this.failedCount;
  }
  async deliver(
    magicBellNotification: IMagicBellNotification
  ): Promise<Result<boolean>> {
    try {
      const delivery = await this.nativeNotificationService.send({
        title: magicBellNotification.title,
        url: magicBellNotification.actionUrl,
        body: magicBellNotification.content,
      });
      if (delivery.isSuccess) {
        this.deliveredCount += 1;
        if (this.client) {
          this.client.getStore().fetchAndReset();
        }
      } else {
        this.failedCount += 1;
      }
      return Result.ok<boolean>(true);
    } catch (err) {
      console.error(err);
      return Result.fail<boolean>("Something went wrong");
    }
  }

  async authorize(params: MagicBellConfigOptions): Promise<Result<boolean>> {
    try {
      this.client = await MagicBellClient.createInstance(params);
      return Result.ok<boolean>(true);
    } catch (err) {
      return Result.ok<boolean>(err.message);
    }
  }
  listen(): this {
    this.pushEventAggregator.on("notifications.new", this.deliver.bind(this));
    if (this.client) {
      this.client.startRealTimeListener();
    }
    return this;
  }
}