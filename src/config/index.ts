import dotenv from "dotenv";
import { readFileSync } from "fs";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error && process.env.NODE_ENV === "production")
	throw new Error("⚠️  Couldn't find .env file  ⚠️");

const appPackage = readFileSync(`${__dirname}/../../package.json`, {
	encoding: "utf8",
});
const appData = JSON.parse(appPackage);

interface Config {
	logger: {
		level: string;
		transports?: any[];
	};
	isProduction: boolean;
	version: string;
	name: string;
	description: string;
	google: {
		clientID: string;
		clientSecret: string;
		callbackUrl: string;
		refreshToken: string;
		accessToken: string;
		mailClientId: string;
		mailClientSecret: string;
		mailRefreshToken: string;
	};
	mail: {
		from: string;
	};
	assetsPath: string;
}

export const config: Config = {
	logger: {
		level: process.env.LOG_LEVEL as string,
	},
	isProduction: process.env.NODE_ENV === "production",
	version: appData.version,
	name: "Musings",
	description: appData.description,
	google: {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackUrl: process.env.GOOGLE_CALLBACK_URL,
		refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
		accessToken: process.env.GOOGLE_ACCESS_TOKEN,
		mailClientId: process.env.GOOGLE_CLIENT_ID,
		mailClientSecret: process.env.GOOGLE_CLIENT_SECRET,
		mailRefreshToken: process.env.GOOGLE_MAIL_REFRESH_TOKEN,
	},
	mail: {
		from: process.env.MAIL_FROM as string,
	},
	assetsPath: `${__dirname}/../assets`,
};
