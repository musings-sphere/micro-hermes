import { readFileSync } from "fs";

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
	name: "Mobilities",
	description: appData.description,
	google: {
		clientID: process.env.GOOGLE_CLIENT_ID as string,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		callbackUrl: process.env.GOOGLE_CALLBACK_URL as string,
		refreshToken: process.env.GOOGLE_REFRESH_TOKEN as string,
		accessToken: process.env.GOOGLE_ACCESS_TOKEN as string,
		mailClientId: process.env.GOOGLE_MAIL_CLIENT_ID as string,
		mailClientSecret: process.env.GOOGLE_MAIL_CLIENT_SECRET as string,
		mailRefreshToken: process.env.GOOGLE_MAIL_REFRESH_TOKEN as string,
	},
	mail: {
		from: process.env.MAIL_FROM as string,
	},
	assetsPath: `${__dirname}/../assets`,
};
