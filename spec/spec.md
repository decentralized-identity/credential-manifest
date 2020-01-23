Credential Manifest
==================

**Specification Status:** Strawman

**Latest Draft:**
  [identity.foundation/proof-presentation/spec](https://identity.foundation/credential-manifest)

**Editors:**
~ [Daniel Buchner](https://www.linkedin.com/in/dbuchner/) (Microsoft)
~ [Brent Zundel](https://www.linkedin.com/in/bzundel/) (Evernym)
<!-- -->
**Participate:**
~ [GitHub repo](https://github.com/decentralized-identity/credential-manifest)
~ [File a bug](https://github.com/decentralized-identity/credential-manifest/issues)
~ [Commit history](https://github.com/decentralized-identity/credential-manifestn/commits/master)

------------------------------------

## Abstract

For User Agents (e.g. wallets) and other service that wish to engage with Issuers to acquire credentials, there must exist a mechanism for assessing what inputs are required from a Subject to process a request for credential issuance. The Credential Manifest is a common data format for describing the inputs a Subject must provide to an Issuer for subsequent evaluation and issuance of the credential indicated in the Credential Manifest.

Credential Manifests DO NOT define the contents of the output credential, the process the Issuer uses to evaluate the submitted inputs, or the protocol Issuers, Subjects, and their User Agents rely on to negotiate credential issuance.
     
## Status of This Document

Credential Manifest is a draft specification being developed within the [Decentralized Identity Foundation](https://identity.foundation)(DIF), and intended for ratification as a DIF recommended data format. This spec will be updated to reflect relevant changes, and participants are encouraged to contribute at the following repository location: https://github.com/decentralized-identity/credential-manifest
     

## Terminology

Term | Definition
:--- | :---------
Decentralized Identifier (DID) | Unique ID string and PKI metadata document format for describing the cryptographic keys and other fundamental PKI values linked to a unique, user-controlled, self-sovereign identifier in a target system (i.e. blockchain, distributed ledger).
Issuer | An entity that issues a credential to a Subject.
Subject | The entity that submits proofs to a Verifier to satisfy the requirements described in a Proof Definition
Verifier | The entity that defines what proofs they require from a Subject (via a Proof Definition) in order to proceed with an interaction.
Proof Definition | An object that describes proof requirements, formatted in accordance with the Proof Presentation specification.
Input Selection Rules | Syntax for describing input selection optionality among the list of specified inputs an Issuers encodes in a Credential Manifest.

## `Resource Definition`

A Credential Manifest is a JSON document that contains preconditional requirements, Issuer style preferences, and other facets User Agents utilize to help articulate and select the inputs necessary for processing and issuance of a specified credential.

::: example Credential Manifest - All features exercised
```json
{
  "issuer": "did:example:123",
  "credential_schema": "ipfs:QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwAWT",
  "proof_definition": {
    "selection_rules": [
      {
        "rule": "all",
        "from": ["A"]
      },
      {
        "rule": "pick",
        "count": 1,
        "from": ["B"]
      }
    ],
    "inputs": [
      {
        "type": "data",
        "group": ["A"],
        "field": "routing_number",
        "value": {
            "type": "string",
            "maxLength": 9
        }
      },
      {
        "type": "data",
        "group": ["A"],
        "field": "account_number",
        "value": {
          "type": "integer",
          "maxLength": 17,
          "required": true
        }
      },
      {
        "type": "idtoken",
        "group": ["A"],
        "redirect": "https://acmebank.com/oauth",
        "parameters": {
          "client_id": "dhfiuhsdre",
          "scope": "openid+profile"
        }
      },
      {
        "type": "vc",
        "group": ["B"],
        "schema": "https://eu.com/claims/IDCard",
        "constraints": {
          "issuers": ["did:foo:gov1", "did:bar:gov2"]
        }
      },
      {
        "type": "vc",
        "group": ["B"],
        "schema": "hub://did:foo:123/Collections/schema.us.gov/Passport",
        "constraints": {
          "issuers": ["did:foo:gov1", "did:bar:gov2"]
        }  
      }
    ]
  },
  "issuer_styles": {
    "logo": {
      "url": "https://acme.com/logo.png",
    },
    "background": {
      "color": [247, 247, 247]
    },
    "form_label": {
      "color": [180, 55, 20]
    },
    "form_input_border": {
      "color": [200, 180, 10]
    }
  }
}
```
:::

### Top-Level Properties

The following properties are defined for use at the top-level of the resource - all other properties that are not defined below MUST be ignored:

Property | Type | Description
:--- | :---------
`issuer` | _string_ | MUST be populated, and MUST be a valid Decentralized Identifier URI.
`credential_schema` | _string_ | MUST be populated, and MUST be a valid URI for the credential schema the Credential Manifest is associated with.
`proof_definition` | _object_ | MUST be present, and its value MUST conform to the `Proof Definition` format and requirements specified in the `Proof Presentation` specification.
`issuer_styles` | _object_ | Optional, MAY be populated with supported Issuer Style Properties.

### Issuer Styles

Issuers may desire to express stylistic preferences to User Agents for skinning forms and other UI views rendered based on the contents of a Credential Manifest. These optional stylistic preferences are intended to provide a common means to achieve basic experiential differentiation tailored to the Issuer's brand or recognizable styles. This section defines the supported style properties Issuers MAY utilize within the issuer_styles property of a Credential Manifest.

::: example issuer_styles - all style options
```json
"issuer_styles": {
  "logo": {
    "url": "https://acme.com/logo.png",
  },
  "background": {
    "color": [247, 247, 247]
  },
  "form_label": {
    "color": [180, 55, 20]
  },
  "form_input_border": {
    "color": [200, 180, 10]
  }
}
```
:::

#### `logo` property

#### `background` property

#### `form_label` property

#### `form_input_border` property

## Resource Location

Credential Manifests should be retrievable at known, semantic locations that are generalized across all entities, protocols, and transports. This specification does not stipulate how Credential Manifests must be located, hosted, or retrieved, but does advise that Issuers SHOULD make their Credential Manifests available via an instance of the forthcoming semantic personal datastore standard being developed by DIF, W3C, and other groups (e.g. Identity Hubs).