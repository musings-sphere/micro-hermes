import { Result } from "../src/common/Result";
import { EmailAddress } from "../src/models/EmailAddress";

let emailAddress: EmailAddress;
let emailAddressOrError: Result<EmailAddress>;

describe("#EmailAddress", () => {
	beforeEach(() => {
		emailAddress = null;
		emailAddressOrError = null;
	});

	test("Can create an email address", () => {
		emailAddressOrError = EmailAddress.create("blahblah@gmail.com");
		expect(emailAddressOrError.isSuccess).toBeTruthy();
		emailAddress = emailAddressOrError.getValue();
		expect(emailAddress.value).toBe("blahblah@gmail.com");
	});

	test("Should fail to create an invalid email address", () => {
		emailAddressOrError = EmailAddress.create("blahblah.com");
		expect(emailAddressOrError.isSuccess).toBeFalsy();
	});
});
