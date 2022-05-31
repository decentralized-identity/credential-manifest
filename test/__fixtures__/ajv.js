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
  "https://identity.foundation/presentation-exchange/schemas/presentation-definition.json": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Presentation Definition",
    "definitions": {
      "status_directive": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "directive": {
            "type": "string",
            "enum": ["required", "allowed", "disallowed"]
          },
          "type": {
            "type": "array",
            "minItems": 1,
            "items": { "type": "string" }
          }
        }
      },
      "field": {
        "type": "object",
        "oneOf": [
          {
            "properties": {
              "id": { "type": "string" },
              "path": {
                "type": "array",
                "items": { "type": "string" }
              },
              "purpose": { "type": "string" },
              "filter": { "$ref": "http://json-schema.org/draft-07/schema#" }
            },
            "required": ["path"],
            "additionalProperties": false
          },
          {
            "properties": {
              "id": { "type": "string" },
              "path": {
                "type": "array",
                "items": { "type": "string" }
              },
              "purpose": { "type": "string" },
              "filter": { "$ref": "http://json-schema.org/draft-07/schema#" },
              "predicate": {
                "type": "string",
                "enum": ["required", "preferred"]
              }
            },
            "required": ["path", "filter", "predicate"],
            "additionalProperties": false
          }
        ]
      },
      "input_descriptor": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "purpose": { "type": "string" },
          "group": { "type": "array", "items": { "type": "string" } },
          "constraints": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "limit_disclosure": { "type": "string", "enum": ["required", "preferred"] },
              "statuses": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "active": { "$ref": "#/definitions/status_directive" },
                  "suspended": { "$ref": "#/definitions/status_directive" },
                  "revoked": { "$ref": "#/definitions/status_directive" }
                }
              },
              "fields": {
                "type": "array",
                "items": { "$ref": "#/definitions/field" }
              },
              "subject_is_issuer": { "type": "string", "enum": ["required", "preferred"] },
              "is_holder": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "field_id": {
                      "type": "array",
                      "items": { "type": "string" }
                    },
                    "directive": {
                      "type": "string",
                      "enum": ["required", "preferred"]
                    }
                  },
                  "required": ["field_id", "directive"]
                }
              },
              "same_subject": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "field_id": {
                      "type": "array",
                      "items": { "type": "string" }
                    },
                    "directive": {
                      "type": "string",
                      "enum": ["required", "preferred"]
                    }
                  },
                  "required": ["field_id", "directive"]
                }
              }
            }
          }
        },
        "required": ["id"]
      },
      "submission_requirement": {
        "type": "object",
        "oneOf": [
          {
            "properties": {
              "name": { "type": "string" },
              "purpose": { "type": "string" },
              "rule": {
                "type": "string",
                "enum": ["all", "pick"]
              },
              "count": { "type": "integer", "minimum": 1 },
              "min": { "type": "integer", "minimum": 0 },
              "max": { "type": "integer", "minimum": 0 },
              "from": { "type": "string" }
            },
            "required": ["rule", "from"],
            "additionalProperties": false
          },
          {
            "properties": {
              "name": { "type": "string" },
              "purpose": { "type": "string" },
              "rule": {
                "type": "string",
                "enum": ["all", "pick"]
              },
              "count": { "type": "integer", "minimum": 1 },
              "min": { "type": "integer", "minimum": 0 },
              "max": { "type": "integer", "minimum": 0 },
              "from_nested": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "$ref": "#/definitions/submission_requirement"
                }
              }
            },
            "required": ["rule", "from_nested"],
            "additionalProperties": false
          }
        ]
      }
    },
    "type": "object",
    "properties": {
      "id": { "type": "string" },
      "name": { "type": "string" },
      "purpose": { "type": "string" },
      "format": {
        "type": "object",
        "additionalProperties": false,
        "patternProperties": {
          "^jwt$|^jwt_vc$|^jwt_vp$": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "alg": {
                "type": "array",
                "minItems": 1,
                "items": { "type": "string" }
              }
            },
            "required": ["alg"]
          },
          "^ldp_vc$|^ldp_vp$|^ldp$": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "proof_type": {
                "type": "array",
                "minItems": 1,
                "items": { "type": "string" }
              }
            },
            "required": ["proof_type"]
          }
        }
      },
      "frame": {
        "type": "object",
        "additionalProperties": true
      },
      "submission_requirements": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/submission_requirement"
        }
      },
      "input_descriptors": {
        "type": "array",
        "items": { "$ref": "#/definitions/input_descriptor" }
      }
    },
    "required": ["id", "input_descriptors"],
    "additionalProperties": false
  },
  "https://identity.foundation/presentation-exchange/schemas/presentation-definition-format.json": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Presentation Definition Format",
    "type": "object",
    "additionalProperties": false,
    "patternProperties": {
      "^jwt$|^jwt_vc$|^jwt_vp$": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "alg": {
            "type": "array",
            "minItems": 1,
            "items": { "type": "string" }
          }
        }
      },
      "^ldp_vc$|^ldp_vp$|^ldp$": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "proof_type": {
            "type": "array",
            "minItems": 1,
            "items": { "type": "string" }
          }
        }
      }
    }
  }
}

const ajv = addFormats(new Ajv({allErrors: true}));

Object.keys(schemas).forEach((uri) => ajv.addSchema(schemas[uri], uri))

module.exports = ajv
