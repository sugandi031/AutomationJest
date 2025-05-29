const requestPayload = require("../../requestPayload/Auth/createToken.json")
const jsonSchema = require("../../jsonSchemas/Auth/createToken.json")
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
        const isValidSchema = helper.jsonSchemaChecker(response.data, jsonSchema)
        expect(isValidSchema).toBe(true);
        const isValudRegex = helper.checkRegex(response.data.expires_in, regex)
        expect(isValudRegex).toBe(true);
    });
    
});