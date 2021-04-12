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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const mocha = __importStar(require("mocha"));
const sinon = __importStar(require("sinon"));
const mitt_1 = __importDefault(require("mitt"));
const NativeNotificationService_1 = require("../../native_notifcation/NativeNotificationService");
const MagicBellNotificationService_1 = require("../MagicBellNotificationService");
const Result_1 = require("../../../util/Result");
const expect = chai.expect;
const test = mocha.test;
describe("MagicBellService test cases", () => {
    test("Should deliver notification successfuly", () => __awaiter(void 0, void 0, void 0, function* () {
        let fakeNotificationService = sinon.createStubInstance(NativeNotificationService_1.NativeNotificationService);
        fakeNotificationService.send.resolves(Result_1.Result.ok(true));
        const pushEventAggregator = mitt_1.default();
        const magicBellService = new MagicBellNotificationService_1.MagicBellNotificationService(fakeNotificationService, pushEventAggregator);
        magicBellService.listen();
        pushEventAggregator.emit("notifications.new", {
            title: "Fake title",
            content: "Fake body",
            actionUrl: "https://fake-uri.com",
        });
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, 10);
        });
        yield promise;
        const delivered = magicBellService.delivered();
        const failed = magicBellService.failed();
        expect(delivered).to.be.equal(1);
        expect(failed).to.be.equal(0);
    }));
    test("Should handled notification failures", () => __awaiter(void 0, void 0, void 0, function* () {
        let fakeNotificationService = sinon.createStubInstance(NativeNotificationService_1.NativeNotificationService);
        fakeNotificationService.send.resolves(Result_1.Result.fail("faking failure"));
        const pushEventAggregator = mitt_1.default();
        const magicBellService = new MagicBellNotificationService_1.MagicBellNotificationService(fakeNotificationService, pushEventAggregator);
        magicBellService.listen();
        pushEventAggregator.emit("notifications.new", {
            title: "Fake title",
            content: "Fake body",
            actionUrl: "https://fake-uri.com",
        });
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, 10);
        });
        yield promise;
        const delivered = magicBellService.delivered();
        const failed = magicBellService.failed();
        expect(delivered).to.be.equal(0);
        expect(failed).to.be.equal(1);
    }));
});
//# sourceMappingURL=MagicBellService.test.js.map