import { google } from "googleapis";
import { createTestAccount, createTransport, Transporter } from "nodemailer";
import { config } from "../../config";
import { Mail } from "../../models/Mail";
import {
	IMailService,
	IMailTransmissionResult,
} from "../../models/MailService";
import { ITransporterConfig } from "./ITransporterConfig";

const {
	google: { mailClientId, mailClientSecret, mailRefreshToken },
} = config;

export class NodemailerEmailService implements IMailService {
	private transporter: Transporter;

	constructor(transporter: Transporter) {
		this.transporter = transporter;
	}

	// Factory method
	public static async createTransporter(): Promise<Transporter> {
		const { OAuth2 } = google.auth;
		const oauth2Client = new OAuth2(
			mailClientId,
			mailClientSecret,
			"https://developers.google.com/oauthplayground"
		);

		oauth2Client.setCredentials({
			refresh_token: mailRefreshToken,
		});

		const accessToken = await oauth2Client.getAccessToken();

		return createTransport({
			service: "gmail",
			auth: {
				accessToken: accessToken.token,
				type: "OAuth2",
				user: "almond.froyo@gmail.com",
				clientId: mailClientId,
				clientSecret: mailClientSecret,
				refreshToken: mailRefreshToken,
			},
			tls: {
				rejectUnauthorized: false,
			},
		} as any);
	}

	// Factory method
	public static async createTestTransporter(): Promise<Transporter> {
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		// let testAccount = await createTestAccount();

		// create reusable transporter object using the default SMTP transport
		return createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: "nikolas.herman5@ethereal.email", // generated ethereal user
				pass: "prABqyBERaSQmmQr6d", // generated ethereal password
			},
		});
	}

	async sendMail(mail: Mail): Promise<IMailTransmissionResult> {
		try {
			let info = await this.transporter.sendMail({
				from: mail.sourceAddress.email, // sender address
				to: mail.destinationAddress.email, // list of receivers
				subject: mail.messageTitle, // Subject line
				text: mail.messageBody, // plain text body
				// html: "<b>Hello world?</b>" // html body
			});
			return { message: `Message sent: ${info.messageId}`, success: true };
		} catch (err) {
			return { message: err.toString(), success: false };
		}
	}
}
