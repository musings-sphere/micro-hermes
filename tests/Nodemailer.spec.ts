import { Transporter } from "nodemailer";
import { Result } from "../src/common/Result";
import { EmailAddress } from "../src/models/EmailAddress";
import { Mail } from "../src/models/Mail";
import { IMailTransmissionResult } from "../src/models/MailService";
import { NodemailerEmailService } from "../src/services/nodemailer/NodemailerEmailService";

let mail: Mail;
let mailOrError: Result<Mail>;
let sourceAddress: EmailAddress;
let destinationAddress: EmailAddress;
let replyToAddress: EmailAddress;
let nodeMailer: NodemailerEmailService;
let transporter: Transporter;
let mailTransmissionResult: IMailTransmissionResult;

// We need to create a copy of the class to test static methods
let NodeMailerEmailServiceCopy: any = NodemailerEmailService;

describe.skip("#NodemailerEmailService", () => {
	beforeEach(() => {
		mail = null;
		mailOrError = null;
		sourceAddress = null;
		destinationAddress = null;
		replyToAddress = null;
		transporter = null;
	});

	test("Can send mail from a nodemailer instance", async () => {
		transporter = await NodeMailerEmailServiceCopy.createTestTransporter();
		nodeMailer = new NodemailerEmailService(transporter);

		sourceAddress = EmailAddress.create("almond.froyo@gmail.com").getValue();
		destinationAddress = EmailAddress.create("francismasha96@gmail.com").getValue();

		mailOrError = Mail.create({
			destinationAddress,
			sourceAddress,
			messageTitle: "Hello world!",
			messageBody: "This is a message body",
		});

		mail = mailOrError.getValue();

		mailTransmissionResult = await nodeMailer.sendMail(mail);
		expect(mailTransmissionResult.success).toBeTruthy();
	});
});
