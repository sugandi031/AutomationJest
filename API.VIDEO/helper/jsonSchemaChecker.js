const ajv = require('ajv')
const initiateAJV = new ajv()

exports.jsonSchemaChecker = (response, jsonSchema)=>{
    const compileAJV = initiateAJV.compile(jsonSchema)
    const isValidSchema = compileAJV(response)
    return isValidSchema
}

exports.checkRegex = (data,regex) => {
    const isValidValue = regex.test(data)
    return isValidValue
}