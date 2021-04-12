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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const MagicBellNotificationService_1 = require("./services/magic_bell/MagicBellNotificationService");
const NativeNotificationService_1 = require("./services/native_notifcation/NativeNotificationService");
const core_1 = require("@magicbell/core");
class Client {
    constructor(options) {
        this.magicBellConfigOptions = options;
        this.verbose = false;
        this.nativeNotificationService = new NativeNotificationService_1.NativeNotificationService();
        this.magicBellService = new MagicBellNotificationService_1.MagicBellNotificationService(this.nativeNotificationService, core_1.pushEventAggregator);
    }
    enableLogs(flag) {
        this.verbose = flag;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.magicBellService.authorize(this.magicBellConfigOptions);
            this.magicBellService.listen();
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map