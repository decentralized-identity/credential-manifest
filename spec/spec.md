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
  "credential": {
    "name": "Washington State Class A Commercial Driver License",
    "description": "License to operate a vehicle with a gross combined weight rating (GCWR) of 26,001 or more pounds, as long as the GVWR of the vehicle(s) being towed is over 10,000 pounds.",
    "schema": "ipfs:QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwAWT",
  },
  "locale": "en-US",
  "presentation_definition": {
    // As defined in the Presentation Exchange specification
  },
  "issuer_styles": {
    "logo": {
      "uri": "https://dol.wa.com/logo.png",
      "alt": "Washington State Seal"
    },
    "background": {
      "color": "#ff0000"
    },
    "text": {
      "color": "#d4d400"
    }
  }
}
```
:::

_Input Descriptors_ are objects that describe what type of input data/credential, or sub-fields thereof, is required for submission to the Verifier. _Input Descriptor Objects_ are composed as follows:

  - The object ****MUST**** contain an `issuer` property, and its value ****MUST**** be a valid URI string that identifies who the issuer of the credential will be.
  - The object ****MUST**** contain a `credential` property, and its value ****MUST**** be an object composed as follows:
      - The object ****MUST**** contain a `schema` property, and its value ****MUST**** be a valid URI string for the schema of the credential that is available for issuance via the containing Credential Manifest.
      - The object ****MAY**** contain a `name` property, and if present its value ****SHOULD**** be a human-friendly name that describes what the credential represents.
      - The object ****MAY**** contain a `description` property, and if present its value ****MUST**** be a string that describes what the credential is in greater detail.
  - The object ****MAY**** contain a `presentation_definition` object, and its value ****MUST**** be a [Presentation Definition](https://identity.foundation/presentation-exchange/#presentation-definition) object, as defined by the [DIF Presentation Exchange](https://identity.foundation/presentation-exchange) specification.
  - The object ****MAY**** contain an `issuer_styles` property, and its value ****MUST**** be an object composed as follows: 
      - The object ****MAY**** contain a `logo` property, and if present, its value ****MUST**** be an object with the following optional properties:
          - The object ****MAY**** contain a `uri` property, and if present its value ****MUST**** a valid URI string to an image resource.
          - The object ****MAY**** contain an `alt` property, and if present its value ****MUST**** a string that describes the alternate text for the logo image.
      - The object ****MAY**** contain a `background` property, and if present, its value ****MUST**** be an object with the following optional properties:
          - The object ****MAY**** contain a `color` property, and if present its value ****MUST**** a HEX string color value (e.g. #000000).
      - The object ****MAY**** contain a `text` property, and if present, its value ****MUST**** be an object with the following optional properties:
          - The object ****MAY**** contain a `color` property, and if present its value ****MUST**** a HEX string color value (e.g. #000000).

## Resource Location

Credential Manifests ****should**** be retrievable at known, semantic locations that are generalized across all entities, protocols, and transports. This specification does not stipulate how Credential Manifests must be located, hosted, or retrieved, but does advise that Issuers ****SHOULD**** make their Credential Manifests available via an instance of the forthcoming semantic personal datastore standard being developed by DIF, W3C, and other groups (e.g. Identity Hubs).