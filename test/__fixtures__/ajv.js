const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const schemas = {
  "https://identity.foundation/wallet-rendering/schemas/entity-styles.json": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Entity Styles",
    "type": "object",
    "definitions": {
      "image": {
        "type": "object",
        "properties": {
          "uri": {
            "type": "string",
            "format": "uri"
          },
          "alt": {
            "type": "string"
          }
        },
        "required": ["uri", "alt"]
      },
      "color": {
        "type": "object",
        "properties": {
          "color": {
            "type": "string",
            "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
          }
        },
        "required": ["color"]
      }
    },
    "properties": {
      "thumbnail": {
        "$ref": "#/definitions/image"
      },
      "hero": {
        "$ref": "#/definitions/image"
      },
      "background": {
        "$ref": "#/definitions/color"
      },
      "text": {
        "$ref": "#/definitions/color"
      }
    }
  },
  "https://identity.foundation/wallet-rendering/schemas/display-mapping-object.json": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Display Mapping Object",
    "oneOf": [
      {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "path": {
            "type": "array",
            "items": {"type": "string"}
          },
          "schema": {
            "oneOf": [
              {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": ["boolean", "number", "integer"]
                  }
                },
                "required": ["type"]
              },
              {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": ["string"]
                  },
                  "format": {
                    "type": "string",
                    "enum": ["date-time", "time", "date", "email", "idn-email", "hostname", "idn-hostname", "ipv4", "ipv6", "uri", "uri-reference", "iri", "iri-reference"]
                  }
                },
                "required": ["type"]
              }
            ]
          },
          "fallback": {
            "type": "string"
          }
        },
        "required": ["path", "schema"]
      },
      {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "text": {
            "type": "string"
          }
        },
        "required": ["text"]
      }
    ]
  },
  "https://identity.foundation/wallet-rendering/schemas/labeled-display-mapping-object.json": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Labeled Display Mapping Object",
    "oneOf": [
      {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "path": {
            "type": "array",
            "items": {"type": "string"}
          },
          "schema": {
            "oneOf": [
              {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": ["boolean", "number", "integer"]
                  }
                },
                "required": ["type"]
              },
              {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": ["string"]
                  },
                  "format": {
                    "type": "string",
                    "enum": ["date-time", "time", "date", "email", "idn-email", "hostname", "idn-hostname", "ipv4", "ipv6", "uri", "uri-reference", "iri", "iri-reference"]
                  }
                },
                "required": ["type"]
              }
            ]
          },
          "fallback": {
            "type": "string"
          },
          "label": {
            "type": "string"
          }
        },
        "required": ["path", "schema", "label"]
      },
      {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "text": {
            "type": "string"
          },
          "label": {
            "type": "string"
          }
        },
        "required": ["text", "label"]
      }
    ]
  },
}

const ajv = addFormats(new Ajv({allErrors: true}));

Object.keys(schemas).forEach((uri) => ajv.addSchema(schemas[uri], uri))

module.exports = ajv
