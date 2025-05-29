const requestPayload = require("../../requestPayload/Auth/createToken.json")
const jsonSchema = require("../../jsonSchemas/Auth/createToken.json")
const invalidJsonSchema = require("../../jsonSchemas/Auth/createTokenInvalid.json")
const service = require("../../services/request")
const helper = require("../../helper/jsonSchemaChecker")


describe('PWA-5 Create new Bearer token authorization with valid API-KEY', () => {
    let response

    test('User create new Bearer token and check http status', async() => {
        let requestValid = requestPayload.validRequestToken
        response = await service.generateToken(requestValid)
        expect(response.status).toBe(200);
    });
    test('check jsonschema and regex', () => {
        const regex = /[0-9]+$/
        const accessTokenRegex = /^eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9\.[^.]+\.[^.]+$/
        const isValidSchema = helper.jsonSchemaChecker(response.data, jsonSchema)
        const isValudRegex = helper.checkRegex(response.data.expires_in, regex)
        const isValidRegexAccessToken = helper.checkRegex(response.data.access_token,accessTokenRegex)
        expect(response.data.token_type).toBe("Bearer");
        expect(isValudRegex).toBe(true);
        expect(isValidSchema).toBe(true);
        expect(isValidRegexAccessToken).toBe(true);
    });
    
});
describe('PWA-1 Create new Bearer token authorization with invalid API-KEY', () => {
    let invalidResponse
    test('User create new token bearer with invalid data', async() => {
        try {
            
            let requestInvalid = requestPayload.invalidRequestToken
            console.log("yudistira" + JSON.stringify(requestInvalid))
            await service.generateToken(requestInvalid)
            throw new Error("Expected 401 error was not thrown");

        } catch (error) { 
            console.log("Error response: " + JSON.stringify(error.response?.data));
            invalidResponse = error.response.data
            // Assert status 401 dari error.response
            expect(error.response.status).toBe(401);
        }
    });
    test('check jsonSchema and regex', () => {
        const isValidSchema = helper.jsonSchemaChecker(invalidResponse, invalidJsonSchema)
        expect(isValidSchema).toBe(true);

    });
    
     
});