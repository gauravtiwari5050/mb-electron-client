"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicBellNotificationService = void 0;
const Result_1 = require("../../util/Result");
const core_1 = __importDefault(require("@magicbell/core"));
class MagicBellNotificationService {
    constructor(nativeNotificationService, pushEventAggregator) {
        this.nativeNotificationService = nativeNotificationService;
        this.deliveredCount = 0;
        this.failedCount = 0;
        this.pushEventAggregator = pushEventAggregator;
    }
    delivered() {
        return this.deliveredCount;
    }
    failed() {
        return this.failedCount;
    }
    deliver(magicBellNotification) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const delivery = yield this.nativeNotificationService.send({
                    title: magicBellNotification.title,
                    url: magicBellNotification.actionUrl,
                    body: magicBellNotification.content,
                });
                if (delivery.isSuccess) {
                    this.deliveredCount += 1;
                    if (this.client) {
                        this.client.getStore().fetchAndReset();
                    }
                }
                else {
                    this.failedCount += 1;
                }
                return Result_1.Result.ok(true);
            }
            catch (err) {
                console.error(err);
                return Result_1.Result.fail("Something went wrong");
            }
        });
    }
    authorize(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.client = yield core_1.default.createInstance(params);
                return Result_1.Result.ok(true);
            }
            catch (err) {
                return Result_1.Result.ok(err.message);
            }
        });
    }
    listen() {
        this.pushEventAggregator.on("notifications.new", this.deliver.bind(this));
        if (this.client) {
            this.client.startRealTimeListener();
        }
        return this;
    }
}
exports.MagicBellNotificationService = MagicBellNotificationService;
//# sourceMappingURL=MagicBellNotificationService.js.map