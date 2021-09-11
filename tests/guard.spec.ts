import { Guard } from "../src/common/Guard";

describe("Guard clauses", () => {
	const nullValue = null;
	const undefinedValueInObject = { prop1: "String" };
	const arrayValue = [];
	const objectValue = {};

	it("should against with 'null' values in againstNullOrUndefined()", () => {
		expect(Guard.againstNullOrUndefined(nullValue, "nullValue")).toEqual({
			_value: undefined,
			error: "nullValue is null or undefined",
			isFailure: true,
			isSuccess: false,
		});
	});

	it("should against with 'undefined' values in againstNullOrUndefined()", () => {
		delete undefinedValueInObject.prop1;
		expect(
			Guard.againstNullOrUndefined(undefinedValueInObject.prop1, "prop1")
		).toEqual({
			_value: undefined,
			error: "prop1 is null or undefined",
			isFailure: true,
			isSuccess: false,
		});
	});

	it("should in favor of string values in againstNullOrUndefined() ", () => {
		expect(Guard.againstNullOrUndefined(arrayValue, "arrayValue")).toEqual({
			_value: [],
			error: undefined,
			isFailure: false,
			isSuccess: true,
		});
	});

	it("should in favor of object values in againstNullOrUndefined() ", () => {
		expect(Guard.againstNullOrUndefined(objectValue, "objectValue")).toEqual({
			_value: {},
			error: undefined,
			isFailure: false,
			isSuccess: true,
		});
	});
});
