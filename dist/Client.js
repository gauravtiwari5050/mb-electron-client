"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const { Notification, shell } = require("electron");
const core_1 = __importStar(require("@magicbell/core"));
class Client {
    constructor(params) {
        this.apiKey = params.apiKey;
        this.userEmail = params.userEmail;
        this.verbose = false;
    }
    enableLogs(flag) {
        this.verbose = flag;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield core_1.default.createInstance({
                apiKey: this.apiKey,
                userEmail: this.userEmail,
            });
            core_1.pushEventAggregator.on("notifications.new", (notification) => {
                const payload = {
                    title: notification.title,
                    body: notification.content,
                };
                const nativeNotification = new Notification(payload);
                nativeNotification.on("click", (event, arg) => {
                    if (notification.actionUrl) {
                        shell.openExternal(notification.actionUrl);
                    }
                });
                nativeNotification.show();
                client.getStore().fetchAndReset();
            });
            client.startRealTimeListener();
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map