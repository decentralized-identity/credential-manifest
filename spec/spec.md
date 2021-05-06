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
~ Unique ID URI string and PKI metadata document format for describing the
cryptographic keys and other fundamental PKI values linked to a unique,
user-controlled, self-sovereign identifier in a target system (i.e. blockchain,
distributed ledger).

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
    "styles": {
      "thumbnail": {
        "uri": "https://dol.wa.com/logo.png",
        "alt": "Washington State Seal"
      },
      "hero": {
        "uri": "https://dol.wa.com/people-working.png",
        "alt": "People working on serious things"
      },
      "background": {
        "color": "#ff0000"
      },
      "text": {
        "color": "#d4d400"
      }
    }
  },
  "output_descriptors": [
    {
      "schema": [{
        "uri": "http://washington-state-schemas.org/1.0.0/driver-license.json"
      }],
      "display": {
        "title": {
          "path": ["$.name", "$.vc.name"],
          "text": "Washington State Driver License"
        },
        "subtitle": {
          "path": ["$.class", "$.vc.class"],
          "text": "Class A, Commercial"
        },
        "description": {
          "text": "License to operate a vehicle with a gross combined weight rating (GCWR) of 26,001 or more pounds, as long as the GVWR of the vehicle(s) being towed is over 10,000 pounds."
        },
        "properties": [
          {
            "path": ["$.donor", "$.vc.donor"],
            "label": "Organ Donor"
          }
        ]
      },
      "styles": {
        "thumbnail": {
          "uri": "https://dol.wa.com/logo.png",
          "alt": "Washington State Seal"
        },
        "hero": {
          "uri": "https://dol.wa.com/happy-people-driving.png",
          "alt": "Happy people driving"
        },
        "background": {
          "color": "#ff0000"
        },
        "text": {
          "color": "#d4d400"
        }
      }
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
    - The object ****must**** contain a `id` property, and its value ****must**** be a valid URI string that identifies who the issuer of the credential(s) will be.
    - The object ****MAY**** contain a `name` property, and its value ****must**** be a string that ****SHOULD**** reflect the human-readable name the Issuer wishes to be recognized by.
    - The object ****MAY**** contain a `styles` property, and its value ****must**** be an object composed as defined in the [`styles` properties](#styles-properties) section.
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
      "schema": "https://schema.org/EducationalOccupationalCredential",
      "display": {
        "title": {
          "path": ["$.name", "$.vc.name"],
          "text": "Washington State Driver License"
        },
        "subtitle": {
          "path": ["$.class", "$.vc.class"],
          "text": "Class A, Commercial"
        },
        "description": {
          "text": "License to operate a vehicle with a gross combined weight rating (GCWR) of 26,001 or more pounds, as long as the GVWR of the vehicle(s) being towed is over 10,000 pounds."
        },
        "properties": [
          {
            "path": ["$.donor", "$.vc.donor"],
            "label": "Organ Donor"
          }
        ]
      },
      "styles": {
        "thumbnail": {
          "uri": "https://dol.wa.com/logo.png",
          "alt": "Washington State Seal"
        },
        "hero": {
          "uri": "https://dol.wa.com/happy-people-driving.png",
          "alt": "Happy people driving"
        },
        "background": {
          "color": "#ff0000"
        },
        "text": {
          "color": "#d4d400"
        }
      }
    }
  ]
}
```
:::

#### Output Descriptor Object

[[ref:Output Descriptor Objects]] are composed as follows:

- The [[ref:Output Descriptor Object]] ****MUST**** contain a `schema` property, and its value ****MUST**** be an array composed of schema objects for the schema(s) of the credentials to be issued.
- The [[ref:Output Descriptor Object]] ****MAY**** contain a `name` property, and if present its value ****SHOULD**** be a human-friendly name that describes what the credential represents.
- The [[ref:Output Descriptor Object]] ****MAY**** contain a `description` property, and if present its value ****MUST**** be a string that describes what the credential is in greater detail.
- The [[ref:Output Descriptor Object]] ****MAY**** contain a `styles` property, and its value ****must**** be an object composed as defined in the [`styles` properties](#styles-properties) section.
- The [[ref:Output Descriptor Object]] ****MAY**** contain a `display` property, and its value ****must**** be an object composed as defined in the [`display` properties](#display-properties) section.

### `styles` properties

Within a `Credential Manifest`, there are two areas where styling affordances are provided: under the `issuer` property, where the Issuer expresses information about themselves - including how a User Agent should style UI that represents the Issuer, and under the `credential` property, where the Issuer expresses information about the credntial itself - including how a User Agent should style UI for the credential itself. Under each of these areas an implementer ****MAY**** include a `styles` property, and if present, its value ****must**** be an object composed of the following properties:

- The object ****MAY**** contain a `thumbnail` property, and if present, its value ****MUST**** be an object with the following optional properties:
    - The object ****MUST**** contain a `uri` property, and if present its value ****MUST**** be a valid URI string to an image resource.
    - The object ****MAY**** contain an `alt` property, and if present its value ****MUST**** be a string that describes the alternate text for the logo image.
- The object ****MAY**** contain a `hero` property, and if present, its value ****MUST**** be an object with the following optional properties:
    - The object ****MUST**** contain a `uri` property, and if present its value ****MUST**** be a valid URI string to an image resource.
    - The object ****MAY**** contain an `alt` property, and if present its value ****MUST**** be a string that describes the alternate text for the logo image.
- The object ****MAY**** contain a `background` property, and if present, its value ****MUST**** be an object with the following optional properties:
    - The object ****MAY**** contain a `color` property, and if present its value ****MUST**** be a HEX string color value (e.g. #000000).
- The object ****MAY**** contain a `text` property, and if present, its value ****MUST**** be an object with the following optional properties:
    - The object ****MAY**** contain a `color` property, and if present its value ****MUST**** be a HEX string color value (e.g. #000000).

### `display` properties

The `credential` property of a `Credential Manifest` is an object that ****MAY**** contain a `display` property defining various content and data pointers for representation of a credential in UI. The properties in the object use _Display Mapping Objects_ to assign text and data about the credential to common UI presentation elements, either by selecting data from the credential itself or providing it directly. The `display` object is constructed as follows

- The object ****MAY**** contain a `title` property, and if present, its value ****MUST**** be a _Display Mapping Object_. User Agents ****SHOULD**** render the data in an area of UI that conveys the general title of the credential being rendered.
- The object ****MAY**** contain a `subtitle` property, and if present, its value ****MUST**** be a _Display Mapping Object_. User Agents ****SHOULD**** render the data in close proximity to the `title` value and ****SHOULD**** display the information in a way that is noticably less pronounced than that of the `title` value.
- The object ****MAY**** contain a `description` property, and if present, its value ****MUST**** be a _Display Mapping Object_. User Agents ****SHOULD**** render the data in an area of UI that is appropreate for verbose, descriptive textual data.
- The object ****MAY**** contain a `properties` property, and if present, its value ****MUST**** be an array of _Display Mapping Objects_. User Agents ****SHOULD**** render the data specified by each _Display Mapping Object_ in an area of UI that is appropreate for the rendering of a flat list of labeled values.

#### _Display Mapping Objects_

::: example Display Mapping Object
```json
{
  "display": {
    "title": {
      "path": ["$.name", "$.vc.name"],
      "text": "Washington State Driver License"
    },
    "properties": [
      {
        "path": ["$.vision_aid", "$.vc.vision_aid"],
        "label": "Vision aid required"
      },
      {
        "path": ["$.donor", "$.vc.donor"],
        "label": "Organ Donor"
      }
    ]
  }
}
```
:::

The _Display Mapping Objects_ are JSON objects constructed as follows:

- The object ****MAY**** contain a `path` property, and if present, its value ****MUST**** be a [JSONPath](https://goessner.net/articles/JsonPath/) string expression.
- The object ****MAY**** contain a `text` property, and if present, its value ****MUST**** be a string or numeric value that is rendered in the UI if no `path` property is specified within the object, or all of the `path` property's array of [JSONPath](https://goessner.net/articles/JsonPath/) string expressions fail to select data within the target credential.
- The object ****MAY**** contain a `label` property, and if present, its value ****MUST**** be a string that is rendered in the UI where a labled display of the `path` or `text` value is appropreate. If the property is intended for labeled display, the label ****SHOULD**** be shown in the UI and the value paired with the label ****SHOULD**** be either data selected from the processing of the `path` property's [JSONPath](https://goessner.net/articles/JsonPath/) string expressions, or the value specified by the `text` property. If neither is present, display of the label and any fallback value is at the election of the implementer.

## Resource Location

Credential Manifests ****should**** be retrievable at known, semantic locations that are generalized across all entities, protocols, and transports. This specification does not stipulate how Credential Manifests must be located, hosted, or retrieved, but does advise that Issuers ****SHOULD**** make their Credential Manifests available via an instance of the forthcoming semantic personal datastore standard being developed by DIF, W3C, and other groups (e.g. Identity Hubs).

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
