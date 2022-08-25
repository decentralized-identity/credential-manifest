const fs = require('fs');
const assert = require('assert');

const ajv = require('../__fixtures__/ajv');

describe('Credential Response', function () {
  describe('JSON Schema', function () {
    it('should validate the basic example object using JSON Schema Draft 7 for a fulfillment', function () {
      const schema = JSON.parse(fs.readFileSync(__dirname + '/../../schemas/credential-response.json'));
      const data = JSON.parse(fs.readFileSync(__dirname + '/sample-fulfillment.json'));
      const validate = ajv.compile(schema);
      const valid = validate(data);

      assert.equal(null, validate.errors);
      assert.equal(true, valid);
    });
    it('should validate the basic example object using JSON Schema Draft 7 for a denial', function () {
      const schema = JSON.parse(fs.readFileSync(__dirname + '/../../schemas/credential-response.json'));
      const data = JSON.parse(fs.readFileSync(__dirname + '/sample-denial.json'));
      const validate = ajv.compile(schema);
      const valid = validate(data);

      assert.equal(null, validate.errors);
      assert.equal(true, valid);
    });
  });
});
