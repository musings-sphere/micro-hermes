import "dotenv/config";
import "reflect-metadata";
import main from "./app.dispatcher";
import { AppLogger } from "./app.logger";

const logger = new AppLogger("Index");
logger.log(`Start`);

main()
	.then(() => logger.log("Hermes has started running..."))
	.catch((e) => logger.error(e.message, e.stack));
