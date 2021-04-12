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
exports.MagicBellService = void 0;
const Result_1 = require("../../util/Result");
const core_1 = __importStar(require("@magicbell/core"));
class MagicBellService {
    constructor(nativeNotificationService) {
        this.nativeNotificationService = nativeNotificationService;
        this.delivered = 0;
        this.failed = 0;
    }
    authorize(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.client = yield core_1.default.createInstance({
                    apiKey: params.apiKey,
                    userEmail: params.userEmail,
                });
                return Result_1.Result.ok(true);
            }
            catch (err) {
                return Result_1.Result.ok(err.message);
            }
        });
    }
    listen() {
        core_1.pushEventAggregator.on("notifications.new", (magicBellNotification) => __awaiter(this, void 0, void 0, function* () {
            const delivery = yield this.nativeNotificationService.send({
                title: magicBellNotification.title,
                url: magicBellNotification.actionUrl,
                body: magicBellNotification.content,
            });
            if (delivery.isSuccess) {
                this.delivered += 1;
                this.client.getStore().fetchAndReset();
            }
            else {
                this.failed += 1;
            }
        }));
        this.client.startRealTimeListener();
        return this;
    }
}
exports.MagicBellService = MagicBellService;
//# sourceMappingURL=MagicBellService.js.map