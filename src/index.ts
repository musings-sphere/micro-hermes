import { AppLogger } from "./app.logger";
import { EmailAddress } from "./models/EmailAddress";
import { Mail } from "./models/Mail";
import { NodemailerEmailService } from "./services/nodemailer/NodemailerEmailService";

// import { SendGridEmailService } from "./services/sendgrid/SendGridEmailService";
// import sgMail from '@sendgrid/mail'

const logger = new AppLogger("Main");

const main = async (): Promise<void> => {
  try {
    const nodeMailerTransporter =
      await NodemailerEmailService.createTestTransporter();
    const mailer = new NodemailerEmailService(nodeMailerTransporter);
    // const mailer = new SendGridEmailService('sdfdjhfkjsdhfksdhkfjshdkjf', sgMail)
    logger.log("Starting...");

    const sourceAddressOrError = EmailAddress.create(
      "almond.froyo@gmail.com"
    );
    const destinationAddressOrError = EmailAddress.create(
      "francismasha96@gmail.com"
    );
    const sourceAddress = sourceAddressOrError.getValue();
    const destinationAddress = destinationAddressOrError.getValue();

    const mailOrError = Mail.create({
      sourceAddress,
      destinationAddress,
      messageTitle: "Hello world!",
      messageBody: "This is an email Im sending.",
    });

    const mail = mailOrError.getValue();

    const result = await mailer.sendMail(mail);
    logger.log(JSON.stringify(result));
  } catch (err: any) {
    logger.error(`[main] ${err.message}`, err.stack);
  }
};

main()
	.then(() => logger.log("Hermes has started running..."))
	.catch((e) => logger.error(e.message, e.stack));
