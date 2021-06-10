const fs = require('fs');
const assert = require('assert');
const ajv = require('ajv');


describe('Display Mapping', function () {
  describe('JSON Schema', function () {
    it('should validate the basic example object using JSON Schema Draft 7', function () {
      const schema = JSON.parse(fs.readFileSync(__dirname + '/schema.json'));
      const data = JSON.parse(fs.readFileSync(__dirname + '/simple.json'));
      const jv = new ajv({allErrors: true});
      const validate = jv.compile(schema);
      const valid = validate(data);

      assert.equal(null, validate.errors);
      assert.equal(true, valid);
    });
  });

  it('should validate the path example object using JSON Schema Draft 7', function () {
    const schema = JSON.parse(fs.readFileSync(__dirname + '/schema.json'));
    const data = JSON.parse(fs.readFileSync(__dirname + '/with_path.json'));
    const jv = new ajv({allErrors: true});
    const validate = jv.compile(schema);
    const valid = validate(data);

    assert.equal(null, validate.errors);
    assert.equal(true, valid);
  });
});