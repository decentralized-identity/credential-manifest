const fs = require('fs');
const assert = require('assert');

const ajv = require('../__fixtures__/ajv');

describe('Credential Manifest', function () {
  describe('JSON Schema', function () {
    it('should validate the basic example object using JSON Schema Draft 7', function () {
      const schema = JSON.parse(fs.readFileSync(__dirname + '/../../schemas/credential-manifest.json'));
      const data = JSON.parse(fs.readFileSync(__dirname + '/all_features.json'));
      const validate = ajv.compile(schema);
      const valid = validate(data);

      assert.equal(null, validate.errors);
      assert.equal(true, valid);
    });
  });
});
