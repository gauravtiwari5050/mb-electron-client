import * as chai from "chai";
import * as mocha from "mocha";
import * as sinon from "sinon";
import mitt from "mitt";
import { NativeNotificationService } from "../../native_notifcation/NativeNotificationService";
import { MagicBellNotificationService } from "../MagicBellNotificationService";
import { Result } from "../../../util/Result";
import { IMagicBellNotificationService } from "../IMagicBellNotificationService";
import { IMagicBellNotification } from "../IMagicBellNotification";

const expect = chai.expect;
const test = mocha.test;


describe("MagicBellService test cases", () => {
  test("Should deliver notification successfuly", async () => {
    let fakeNotificationService: sinon.SinonStubbedInstance<NativeNotificationService> = sinon.createStubInstance(NativeNotificationService);
    fakeNotificationService.send.resolves(Result.ok<boolean>(true));
    
    const pushEventAggregator = mitt();
    const magicBellService: IMagicBellNotificationService = new MagicBellNotificationService(fakeNotificationService, pushEventAggregator);
    
    magicBellService.listen();
    
    pushEventAggregator.emit("notifications.new", {
      title: "Fake title",
      content: "Fake body",
      actionUrl: "https://fake-uri.com",
    } as IMagicBellNotification);
    
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 10);
    })
    await promise;
    const delivered = magicBellService.delivered();
    const failed = magicBellService.failed();

    expect(delivered).to.be.equal(1);
    expect(failed).to.be.equal(0);
  });
test("Should handled notification failures", async () => {
  let fakeNotificationService: sinon.SinonStubbedInstance<NativeNotificationService> = sinon.createStubInstance(
    NativeNotificationService
  );
  fakeNotificationService.send.resolves(Result.fail<boolean>("faking failure"));

  const pushEventAggregator = mitt();
  const magicBellService: IMagicBellNotificationService = new MagicBellNotificationService(
    fakeNotificationService,
    pushEventAggregator
  );

  magicBellService.listen();

  pushEventAggregator.emit("notifications.new", {
    title: "Fake title",
    content: "Fake body",
    actionUrl: "https://fake-uri.com",
  } as IMagicBellNotification);

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 10);
  });
  await promise;
  const delivered = magicBellService.delivered();
  const failed = magicBellService.failed();

  expect(delivered).to.be.equal(0);
  expect(failed).to.be.equal(1);
});

});
