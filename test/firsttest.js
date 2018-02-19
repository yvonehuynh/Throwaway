var assert = require("chai").assert;
var initialTest = require("./initial-test");
var username = require("./username");
var password = require("./password");

describe("inital test", function(){
    it("first should return hello world", function(){
        assert.equal(initialTest(), "hello world");
    });
});

describe("arrays", function () {
    it("username should return array", function () {
        assert.equal(username("array"), "array");
    });
});

describe("strings", function () {
    it("username should return a string", function () {
        assert.typeOf(username("array"), "string");
    });
    it("password should return a string greater than 8 characters", function () {
        assert.typeOf(password(), "string");
    });
    it("password should return a string greater than 8 characters", function () {
        assert.lengthOf(password(), 11);
    });
});
