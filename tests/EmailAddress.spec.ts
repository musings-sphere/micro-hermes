import { Result } from "../src/common/Result";
import { EmailAddress } from "../src/models/EmailAddress";
import { Mail } from "../src/models/Mail";

let emailAddress: EmailAddress;
let emailAddressOrError: Result<EmailAddress>;

describe("#EmailAddress", () => {
	beforeEach(() => {
		emailAddress = null;
		emailAddressOrError = null;
	});

	test("Can create an email address", () => {
		emailAddressOrError = EmailAddress.create("khalilstemmler@gmail.com");
		expect(emailAddressOrError.isSuccess).toBeTruthy();
		emailAddress = emailAddressOrError.getValue();
		expect(emailAddress.value).toBe("khalilstemmler@gmail.com");
	});

	test("Should fail to create an invalid email address", () => {
		emailAddressOrError = EmailAddress.create("khalilstemmler");
		expect(emailAddressOrError.isSuccess).toBeFalsy();
	});
});
