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
exports.NativeNotificationService = void 0;
const { Notification, shell } = require("electron");
const Result_1 = require("../../util/Result");
class NativeNotificationService {
    send(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nativeNotification = new Notification({
                    title: payload.title,
                    body: payload.body,
                });
                nativeNotification.on("click", (event, arg) => {
                    if (payload.url) {
                        shell.openExternal(payload.url);
                    }
                });
                nativeNotification.show();
                return Result_1.Result.ok(true);
            }
            catch (err) {
                return Result_1.Result.fail(err.message);
            }
        });
    }
}
exports.NativeNotificationService = NativeNotificationService;
//# sourceMappingURL=NativeNotificationService.js.map