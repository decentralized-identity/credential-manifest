Credential Manifest
==================

**Specification Status:** Strawman

**Latest Draft:**
  [identity.foundation/credential-manifest](https://identity.foundation/credential-manifest)

**Editors:**
~ [Daniel Buchner](https://www.linkedin.com/in/dbuchner/) (Microsoft)
~ [Brent Zundel](https://www.linkedin.com/in/bzundel/) (Evernym)
<!-- -->
**Participate:**
~ [GitHub repo](https://github.com/decentralized-identity/credential-manifest)
~ [File a bug](https://github.com/decentralized-identity/credential-manifest/issues)
~ [Commit history](https://github.com/decentralized-identity/credential-manifest/commits/master)

------------------------------------

## Abstract

For User Agents (e.g. wallets) and other service that wish to engage with Issuers to acquire credentials, there must exist a mechanism for assessing what inputs are required from a Subject to process a request for credential(s) issuance. The _Credential Manifest_ is a common data format for describing the inputs a Subject must provide to an Issuer for subsequent evaluation and issuance of the credential(s) indicated in the Credential Manifest.

_Credential Manifests_ do not themselves define the contents of the output credential(s), the process the Issuer uses to evaluate the submitted inputs, or the protocol Issuers, Subjects, and their User Agents rely on to negotiate credential issuance.

## Status of This Document

Credential Manifest is a draft specification being developed within the [Decentralized Identity Foundation](https://identity.foundation) (DIF), and intended for ratification as a DIF recommended data format. This spec will be updated to reflect relevant changes, and participants are encouraged to contribute at the following repository location: https://github.com/decentralized-identity/credential-manifest


## Terminology

[[def:Decentralized Identifiers, Decentralized Identifier, DID]]
~ Unique ID URI string and PKI metadata document format for describing the cryptographic keys and other fundamental PKI values linked to a unique, user-controlled, self-sovereign identifier in a target system (i.e. blockchain, distributed ledger).

[[def:Claim, Claims]]
~ An assertion made about a [[ref:Subject]]. Used as an umbrella term for
Credential, Assertion, Attestation, etc.

[[def:Issuer, Issuers]]
~ Issuers are entities that issue credentials to a [[ref:Holder]].

[[def:Holder, Holders]]
~ Holders are entities that recieve credentials from [[ref:Issuers]], possibly first submitting proofs the the Issuer to satisfy the requirements described in a Presentation Definition.

[[def:Output Descriptor, Output Descriptors]]
~ Output Descriptors are used by an Issuer to describe the credentials they are offering to a [[ref:Holder]]. See [Output Descriptor](#output-descriptor)

[[def:Output Descriptor Object, Output Descriptor Objects]]
~ Output Descriptor Objects are populated with properties describing the [[ref:Claims]] the [[ref:Issuer]] is offering the [[ref:Holder]]

[[def:Credential Submission, Credential Submissions]]
~ Credential Submission are objects embedded within target claim negotiation formats that pass information from the [[ref:Holder]] to the [[ref:Issuer]]. See [Credential Submission](#credential-submission)

[[def:Display Mapping Object, Display Mapping Objects]]
~ Display Mapping Objects are used to render UI based on information from and about a [[ref:Claim]]. See [Display Mapping Object](#display-mapping-object)

[[def:Labeled Display Mapping Object, Labeled Display Mapping Objects]]
~ ref:Labeled Display Mapping Objects extend from [[ref:Display Mapping Objects]]. See [Labeled Display Mapping Object](#labeled-display-mapping-object)

[[def:Credential Fulfillment, Credential Fulfillments]]
~ Credential Fulfillments are objects embedded within target claim negotiation formats that unify the presentation of [[ref:Claims]] to a [[ref:Holder]] in accordance with the output an [[ref:Issuer]] specified in a [[ref:Credential Manifest]]. See [Credential Fulfillment](#credential-fulfillment).

## Resource Definition

_Credential Manifests_ are a resource format that defines preconditional requirements, Issuer style preferences, and other facets User Agents utilize to help articulate and select the inputs necessary for processing and issuance of a specified credential.

::: example Credential Manifest - All features exercised
```json
{
  "id": "WA-DL-CLASS-A",
  "version": "0.1.0",
  "issuer": {
    "id": "did:example:123?linked-domains=3",
    "name": "Washington State Government",
    "styles": // Entity Styles object or URI,
  "output_descriptors": [
    {
      "schema": [{
        "uri": "http://washington-state-schemas.org/1.0.0/driver-license.json"
      }],
      "display": {
        "title": {
          "path": ["$.name", "$.vc.name"],
          "fallback": "Washington State Driver License"
        },
        "subtitle": {
          "path": ["$.class", "$.vc.class"],
          "fallback": "Class A, Commercial"
        },
        "description": {
          "text": "License to operate a vehicle with a gross combined weight rating (GCWR) of 26,001 or more pounds, as long as the GVWR of the vehicle(s) being towed is over 10,000 pounds."
        },
        "properties": [
          {
            "path": ["$.donor", "$.vc.donor"],
            "fallback": "Unknown",
            "label": "Organ Donor"
          }
        ]
      },
      "styles": // Entity Styles object or URI
    }
  ],
  "presentation_definition": {
    // As defined in the Presentation Exchange specification
  }
}
```
:::


### General Composition

_Credential Manifests_ are JSON objects composed as follows:

- The object ****MUST**** contain an `issuer` property, and its value ****MUST**** be an object composed as follows:
    - The object ****MUST**** contain a `id` property, and its value ****MUST**** be a valid URI string that identifies who the issuer of the credential(s) will be.
    - The object ****MAY**** contain a `name` property, and its value ****MUST**** be a string that ****SHOULD**** reflect the human-readable name the Issuer wishes to be recognized by.
    - The object ****MAY**** contain a `styles` property, and its value ****MUST**** be an object or URI, as defined by the Entity Styles specification.
- The object ****MUST**** contain an `output_descriptors` property. It's vault ****MUST**** be an array of Output Descriptor Objects, the composition of which are described in the [`Output Descriptor`](#output-descriptor) section below
- The [[ref:Credential Manifest]] ****MAY**** include a `format` property. If present, its value ****MUST**** be the same structure as [Presentation Definition's `format` property](https://identity.foundation/presentation-exchange/#presentation-definition). This property informs the [[ref:Holder]] of the [[ref:Calim]] format the [[ref:Issuer]] can issuer in.
    For example:

```json
{
  "credential_manifest": {
    "id": "WA-DL-CLASS-A",
    "output_descriptors": [],
    "format": {
      "jwt": {
        "alg": ["EdDSA", "ES256K", "ES384"]
      },
      "jwt_vc": {
        "alg": ["ES256K", "ES384"]
      },
      "jwt_vp": {
        "alg": ["EdDSA", "ES256K"]
      },
      "ldp_vc": {
        "proof_type": [
          "JsonWebSignature2020",
          "Ed25519Signature2018",
          "EcdsaSecp256k1Signature2019",
          "RsaSignature2018"
        ]
      },
      "ldp_vp": {
        "proof_type": ["Ed25519Signature2018"]
      },
      "ldp": {
        "proof_type": ["RsaSignature2018"]
      }
    }
  }
}
```

- The object ****MAY**** contain a `presentation_definition` object, and its value ****MUST**** be a [Presentation Definition](https://identity.foundation/presentation-exchange/#presentation-definition) object, as defined by the [DIF Presentation Exchange](https://identity.foundation/presentation-exchange) specification.


### Output Descriptor

[[ref:Output Descriptors]] are objects used to describe the [[ref:Claims]] a [[ref:Issuer]] if offering to a [[ref:Holder]].

[[ref:Output Descriptor Objects]] contain schema URI that links to the schema of the offered output data, and information about how to display the output to the Holder.

:::example
```json
{
  "output_descriptors": [
    {
      "id": "driver_license_output",
      "schema": "https://schema.org/EducationalOccupationalCredential",
      "display": {
        "title": {
          "path": ["$.name", "$.vc.name"],
          "fallback": "Washington State Driver License"
        },
        "subtitle": {
          "path": ["$.class", "$.vc.class"],
          "fallback": "Class A, Commercial"
        },
        "description": {
          "text": "License to operate a vehicle with a gross combined weight rating (GCWR) of 26,001 or more pounds, as long as the GVWR of the vehicle(s) being towed is over 10,000 pounds."
        },
        "properties": [
          {
            "path": ["$.donor", "$.vc.donor"],
            "fallback": "Unknown",
            "label": "Organ Donor"
          }
        ]
      },
      "styles": // Entity Styles Object or URI
    }
  ]
}
```
:::

#### Output Descriptor Object

[[ref:Output Descriptor Objects]] are composed as follows:

- The [[ref:Output Descriptor Object]] ****MUST**** contain an `id` property. The value of the `id` property ****MUST**** be a string that does not conflict with the `id` of another [[ref:Output Descriptor Object]] in the same [[ref:Credential Manifest]].
- The [[ref:Output Descriptor Object]] ****MUST**** contain a `schema` property, and its value ****MUST**** be an array composed of schema objects for the schema(s) of the credentials to be issued.
- The [[ref:Output Descriptor Object]] ****MAY**** contain a `name` property, and if present its value ****SHOULD**** be a human-friendly name that describes what the credential represents.
- The [[ref:Output Descriptor Object]] ****MAY**** contain a `description` property, and if present its value ****MUST**** be a string that describes what the credential is in greater detail.
- The [[ref:Output Descriptor Object]] ****MAY**** contain a `styles` property, and its value ****MUST**** be an object or URI, as defined by the Entity Styles specification.
- The [[ref:Output Descriptor Object]] ****MAY**** contain a `display` property, and its value ****MUST**** be an object composed as defined in the [`display` properties](#display-properties) section.

### `styles` properties

Within a `Credential Manifest`, there are two areas where styling affordances are provided: under the `issuer` property, where the Issuer may express styling information about themselves, and under the `credential` property, where the Issuer may express styling information about the credential itself. Under each of these areas, an implementer ****MAY**** include a `styles` property, and if present, its value ****MUST**** be an object or URI that conforms to the Entity Styles specification.

### `display` properties

[[ref:Output Descriptor Objects]] ****MAY**** contain a `display` property defining various content and data pointers for representation of a credential in UI. The properties in the object use _Display Mapping Objects_ to assign text and data about the credential to common UI presentation elements, either by selecting data from the credential itself or providing it directly. The `display` object is constructed as follows

- The object ****MAY**** contain a `title` property, and if present, its value ****MUST**** be a [[ref:Display Mapping Object]]. User Agents ****SHOULD**** render the data in an area of UI that conveys the general title of the credential being rendered.
- The object ****MAY**** contain a `subtitle` property, and if present, its value ****MUST**** be a [[ref:Display Mapping Object]]. User Agents ****SHOULD**** render the data in close proximity to the `title` value and ****SHOULD**** display the information in a way that is noticably less pronounced than that of the `title` value.
- The object ****MAY**** contain a `description` property, and if present, its value ****MUST**** be a [[ref:Display Mapping Object]]. User Agents ****SHOULD**** render the data in an area of UI that is appropreate for verbose, descriptive textual data.
- The object ****MAY**** contain a `properties` property, and if present, its value ****MUST**** be an array of [[ref:Labeled Display Mapping Objects]]. User Agents ****SHOULD**** render the data specified by each _Display Mapping Object_ in an area of UI that is appropreate for the rendering of a flat list of labeled values.

### Display Mapping Object

::: example Display Mapping Object
```json
{
  "display": {
    "title": {
      "path": ["$.name", "$.vc.name"],
      "fallback": "Washington State Driver License"
    },
    "properties": [
      {
        "path": ["$.issuanceDate", "$.vc.issuanceDate"],
        "schema": {
          "type": "string",
          "format": "date-time"
        },
        "label": "Issuance Date"
      },
      {
        "path": ["$.vision_aid", "$.vc.vision_aid"],
        "schema": {
          "type": "boolean"
        },
        "label": "Vision aid required"
      },
      {
        "path": ["$.donor", "$.vc.donor"],
        "schema": {
          "type": "boolean"
        },
        "label": "Organ Donor"
      }
    ]
  }
}
```
:::

[[ref:Display Mapping Objects]] can be used to either pull data from the target Claim with the `path` property OR display infomation about the target Claim with the `text` property

#### Using `path`

:::example Display Mapping Object with path
```json
{
  "title": {
    "path": ["$.name", "$.vc.name"],
    "schema": {
      "type": "string"
    },
    "fallback": "Washington State Driver License"
  },
  "subtitle": {
    "path": ["$.issuanceDate", "$.vc.issuanceDate"],
    "schema": {
      "type": "string",
      "format": "date-time"
    },
    "fallback": "Issuance Date Unknown"
  }
}
```
:::

- The object ****MUST**** contain a `path` property and its value must be an array of [JSONPath](https://goessner.net/articles/JsonPath/) string expressions.
- The object ****MUST**** contain a `schema` property and its value must be an object that is composed as follows:
  - The `schema` property ****MUST**** contain a `type` property and its value must be "string", "boolean", "number", or "integer". The `type` property ****MUST**** represent the type of the data found with the `path` property of the Display Mapping Object. [See below](#type-specific-configuration) for "type" specific configurations.
  - The `schema` property ****MAY**** contain a `format` property IF the `type` property is `"string"` and its value must be "date-time", "time", "date", "email", "idn-email", "hostname", "idn-hostname", "ipv4", "ipv6", "uri", "uri-reference", "iri", or "iri-reference". This property is to be used to transform the property in the rendered UI, for example tranforming an ISO Date string into a human readable string.
- The object ****MAY**** contain a `fallback` property and its value ****MUST**** be a string value. This value is to be used to rendered into the UI if all the `path` property's item's value is undefined OR optionally if when the [[ref:Holder]] processes the value and it does not comply with the [type specific configuration](#type-specific-configuration) below.
  - If the `path`'s value does not comply with the [type specific configuration](#type-specific-configuration) below the [[ref:Holder]] may use the raw value OR use the [[ref:Claim]] itself to help figure out the type of the value.

##### Type specific configuration

When `schema.type` is set to `"string"` the object ****MAY**** contain a format property. It's value can be one of the following:

| Value | Description | Spec |
| ----- | ----------- | ---- |
| "date-time" | Date and time together, for example, `2018-11-13T20:20:39+00:00` | [[spec:rfc3339]] |
| "time" | Time, for example `20:20:39+00:00` | [[spec:rfc3339]] |
| "date" | Date, for example `2018-11-13` | [[spec:rfc3339]] |
| "email" | Internet email address | [[spec:rfc5322]] |
| "idn-email" | The internationalized form of an Internet email address | [[spec:rfc6531]] |
| "hostname" | Internet host name | [[spec:rfc1034]] |
| "idn-hostname" | The internationalized form of an Internet host name | [[spec:rfc5890]] |
| "ipv4" | IPv4 address | [[spec:rfc2673]] |
| "ipv6" | IPv6 address | [[spec:rfc2373]] |
| "uri" | A universal resource identifier | [[spec:rfc3986]] |
| "uri-reference" | A URI reference | [[spec:rfc3986]] |
| "iri" | The internationalized equivalent of a "uri" | [[spec:rfc3987]] |
| "iri-reference" | The internationalized equivalent of a "uri-reference" | [[spec:rfc3987]] |

#### Using `text`

:::example Display Mapping Object with text
```json
{
  "title": {
    "text": "Washington State Driver License"
  }
}
```
:::

- The object ****MUST**** contain a `text` property and its value ****MUST**** be a string value

#### JSON Schema

The following JSON Schema Draft 7 definition summarizes the format-related rules above:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "schema": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "type": {
              "const": "string",
            },
            "format": {
              "type": "string",
              "enum": [
                "date-time",
                "time",
                "date",
                "email",
                "idn-email",
                "hostname",
                "idn-hostname",
                "ipv4",
                "ipv6",
                "uri",
                "uri-reference",
                "iri",
                "iri-reference"
              ]
            }
          },
          "required": ["type"],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["boolean", "number", "integer"]
            },
          },
          "required": ["type"],
          "additionalProperties": false
        }
      ]
    }
  },
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "path": {
          "type": "array",
          "items": { "type": "string" }
        },
        "schema": { "$ref": "#/definitions/schema" },
        "fallback": { "type": "string" }
      },
      "required": ["path", "schema"],
      "additionalProperties": false
    },
    {
      "type": "object",
      "properties": {
        "text": { "type": "string" }
      },
      "required": ["text"],
      "additionalProperties": false
    }
  ],
}
```

### Labeled Display Mapping Object

:::example Display Mapping Object with path
```json
{
  "properties": [
    {
      "label": "Organ Donor",
      "path": ["$.donor", "$.vc.donor"],
      "schema": {
        "type": "boolean"
      }
    }
  ]
}
```
:::

[[ref:Labeled Display Mapping Objects]] extend from [[ref:Display Mapping Objects]]. In addition to the base Display Mapping Objects they have the following extra fields:

- The object ****MUST**** include a `label` property and its value ****MUST**** be a string that is rendered in the UI where a labled display of the `path`/`fallback` or `text` value is appropriate.

#### JSON Schema

The following JSON Schema Draft 7 definition summarizes the format-related rules above:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "schema": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "type": {
              "const": "string",
            },
            "format": {
              "type": "string",
              "enum": [
                "date-time",
                "time",
                "date",
                "email",
                "idn-email",
                "hostname",
                "idn-hostname",
                "ipv4",
                "ipv6",
                "uri",
                "uri-reference",
                "iri",
                "iri-reference"
              ]
            }
          },
          "required": ["type"],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["boolean", "number", "integer"]
            },
          },
          "required": ["type"],
          "additionalProperties": false
        }
      ]
    }
  },
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "path": {
          "type": "array",
          "items": { "type": "string" }
        },
        "schema": { "$ref": "#/definitions/schema" },
        "fallback": { "type": "string" },
        "label": { "type": "string" }
      },
      "required": ["path", "schema", "label"],
      "additionalProperties": false
    },
    {
      "type": "object",
      "properties": {
        "text": { "type": "string" },
        "label": { "type": "string" }
      },
      "required": ["text", "label"],
      "additionalProperties": false
    }
  ],
}
```

## Resource Location

Credential Manifests ****SHOULD**** be retrievable at known, semantic locations that are generalized across all entities, protocols, and transports. This specification does not stipulate how Credential Manifests must be located, hosted, or retrieved, but does advise that Issuers ****SHOULD**** make their Credential Manifests available via an instance of the forthcoming semantic personal datastore standard being developed by DIF, W3C, and other groups (e.g. Identity Hubs).

## Credential Submission

Credential Submission are objects embedded within target claim negotiation formats that pass information from the [[ref:Holder]] to the [[ref:Issuer]]

- The [[ref:Credential Submission]] object ****MUST**** contain an `id` property. The value of this property ****MUST**** be a unique identifier, such as a UUID
- The [[ref:Credential Submission]] object ****MUST**** contain a `manifest_id` property. The value of this property ****MUST**** be the id of a valid Credential Manifest.
- The [[ref:Credential Submission]] ****MUST**** have a `format` property if the related [[ref:Credential Manifest]] specifies a `format` property. Its value ****MUST**** be an object with the following optional properties:
  - The `format` object ****MUST*** include a `format` property. The value of this property ****MUST**** be a _subset_ of the `format` property in the [[ref:Credential Manifest]] that this [[ref:Credential Submission]] is related to. This object informs the [[ref:Issuer]] which formats the [[ref:Holder]] wants to recieve the [[ref:Claims]] in.

```json
{
  "credential_submission": {
    "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "manifest_id": "WA-DL-CLASS-A",
    "format": {
      "ldp_vc": {
        "proof_type": [
          "JsonWebSignature2020",
          "EcdsaSecp256k1Signature2019"
        ]
      }
    }
  }
}
```

### Embed Targets

The following section details where the _Credential Submission_ is to be embedded within a target data structure.

#### Embed Locations

The following are the locations at which the `credential_submission` object ****MUST**** be embedded for known target formats. For any location besides the top level of the embed target, the location is described in JSONPath syntax.

Target | Location
------ | --------
       |

## Credential Fulfillment

[[ref:Credential Fulfillments]] are objects embedded within target [[ref:Claim]] negotiation formats that express how the outputs presented as proofs to a [[ref:Holder]] are provided in accordance with the outpus specified in a [[ref:Credential Manifest]]. Embedded [[ref:Credential Fulfillment]] objects ****MUST**** be located within target data format as the value of a `credential_fulfillment` property, which is composed and embedded as follows:

- The `credential_fulfillment` object ****MUST**** be included at the top-level of an Embed Target, or in the specific location described in the [Embed Locations table](#embed-locations) in the [Embed Target](#embed-target) section below.
- The `credential_fulfillment` object ****MUST**** contain an `id` property. The value of this property ****MUST**** be a unique identifier, such as a [UUID](https://tools.ietf.org/html/rfc4122).
- The `credential_fulfillment` object ****MUST**** contain a `manifest_id` property. The value of this property ****MUST**** be the `id` value of a valid [[ref:Credential Manifest]].
- The `credential_fulfillment` object ****MUST**** include a `descriptor_map` property. The value of this property ****MUST**** be an array of _Output Descriptor Mapping Objects_, just like [Presentation Submission's](https://identity.foundation/presentation-exchange/#presentation-submission) `descriptor_map` property.

::: example Basic Credential Fulfillment
```json
{
  // NOTE: VP, OIDC, DIDComm, or CHAPI outer wrapper properties would be here

  "credential_fulfillment": {
    "id": "a30e3b91-fb77-4d22-95fa-871689c322e2",
    "manifest_id": "32f54163-7166-48f1-93d8-ff217bdb0653",
    "descriptor_map": [
      {
        "id": "banking_output_2",
        "format": "jwt_vc",
        "path": "$.verifiableCredential[0]"
      },
      {
        "id": "employment_output",
        "format": "ldp_vc",
        "path": "$.verifiableCredential[1]"
      },
      {
        "id": "citizenship_output_1",
        "format": "ldp_vc",
        "path": "$.verifiableCredential[2]"
      }
    ]
  }
}
```
:::

### Embed Targets

The following section details where the _Credential Fulfillment_ is to be embedded within a target data structure, as well as how to formulate the [JSONPath](https://goessner.net/articles/JsonPath/) expressions to select the [[ref:Claims]] within the target data structure.

#### Embed Locations

The following are the locations at which the `credential_manifest` object ****MUST**** be embedded for known target formats. For any location besides the top level of the embed target, the location is described in JSONPath syntax.

Target     | Location
---------- | --------
VP         | top-level

### JSON Schema
The following JSON Schema Draft 7 definition summarizes the rules above:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Credential Fulfillment",
  "type": "object",
  "properties": {
    "credential_fulfillment": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "manifest_id": { "type": "string" },
        "descriptor_map": {
          "type": "array",
          "items": { "$ref": "#/definitions/descriptor" }
        }
      },
      "required": ["id", "manifest_id", "descriptor_map"],
      "additionalProperties": false
    }
  },
  "definitions": {
    "descriptor": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "path": { "type": "string" },
        "path_nested": {
          "type": "object",
            "$ref": "#/definitions/descriptor"
        },
        "format": {
          "type": "string",
          "enum": ["jwt", "jwt_vc", "jwt_vp", "ldp", "ldp_vc", "ldp_vp"]
        }
      },
      "required": ["id", "path", "format"],
      "additionalProperties": false
    }
  },
  "required": ["credential_fulfillment"],
  "additionalProperties": false
}
```

## Appendix

### Embed Target Examples

#### Credential Fulfillment

<tab-panels selected-index="0">

<nav>
  <button type="button">Verifiable Presentation</button>
</nav>

<section>

::: example Credential Fulfillment - Verifiable Presentation
```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://identity.foundation/credential-manifest/fulfillment/v1"
  ],
  "type": [
    "VerifiablePresentation",
    "CredentialFulfillment"
  ],
  "credential_fulfillment": {
    "id": "a30e3b91-fb77-4d22-95fa-871689c322e2",
    "manifest_id": "32f54163-7166-48f1-93d8-ff217bdb0653",
    "descriptor_map": [
      {
        "id": "banking_output_2",
        "format": "jwt_vc",
        "path": "$.verifiableCredential[0]"
      },
      {
        "id": "employment_output",
        "format": "ldp_vc",
        "path": "$.verifiableCredential[1]"
      },
      {
        "id": "citizenship_output_1",
        "format": "ldp_vc",
        "path": "$.verifiableCredential[2]"
      }
    ]
  },
  "verifiableCredential": [
    {
      "comment": "IN REALWORLD VPs, THIS WILL BE A BIG UGLY OBJECT INSTEAD OF THE DECODED JWT PAYLOAD THAT FOLLOWS",
      "vc": {
        "@context": "https://www.w3.org/2018/credentials/v1",
        "id": "https://eu.com/claims/DriversLicense",
        "type": ["EUDriversLicense"],
        "issuer": "did:example:123",
        "issuanceDate": "2010-01-01T19:73:24Z",
        "credentialSubject": {
          "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
          "accounts": [
            {
              "id": "1234567890",
              "route": "DE-9876543210"
            },
            {
              "id": "2457913570",
              "route": "DE-0753197542"
            }
          ]
        }
      }
    },
    {
      "@context": "https://www.w3.org/2018/credentials/v1",
      "id": "https://business-standards.org/schemas/employment-history.json",
      "type": ["VerifiableCredential", "GenericEmploymentCredential"],
      "issuer": "did:foo:123",
      "issuanceDate": "2010-01-01T19:73:24Z",
      "credentialSubject": {
        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
        "active": true
      },
      "proof": {
        "type": "EcdsaSecp256k1VerificationKey2019",
        "created": "2017-06-18T21:19:10Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "https://example.edu/issuers/keys/1",
        "jws": "..."
      }
    },
    {
      "@context": "https://www.w3.org/2018/credentials/v1",
      "id": "https://eu.com/claims/DriversLicense",
      "type": ["EUDriversLicense"],
      "issuer": "did:foo:123",
      "issuanceDate": "2010-01-01T19:73:24Z",
      "credentialSubject": {
        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
        "license": {
          "number": "34DGE352",
          "dob": "07/13/80"
        }
      },
      "proof": {
        "type": "RsaSignature2018",
        "created": "2017-06-18T21:19:10Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "https://example.edu/issuers/keys/1",
        "jws": "..."
      }
    }
  ],
  "proof": {
    "type": "RsaSignature2018",
    "created": "2018-09-14T21:19:10Z",
    "proofPurpose": "authentication",
    "verificationMethod": "did:example:ebfeb1f712ebc6f1c276e12ec21#keys-1",
    "challenge": "1f44d55f-f161-4938-a659-f8026467f126",
    "domain": "4jt78h47fh47",
    "jws": "..."
  }
}
```
:::

</section>

## References

[[spec]]
