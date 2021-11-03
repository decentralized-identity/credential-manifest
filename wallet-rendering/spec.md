
Wallet Rendering
==================

**Specification Status:** Strawman

**Latest Draft:**
  [identity.foundation/credential-manifest](https://identity.foundation/credential-manifest)

**Editors:**
~ [Daniel Buchner](https://www.linkedin.com/in/dbuchner/) (Microsoft)
~ [Brent Zundel](https://www.linkedin.com/in/bzundel/) (Evernym)
~ [Jace Hensley](https://www.linkedin.com/in/jacehensley/) (Bloom)
~ [Daniel McGrogan](https://www.linkedin.com/in/dtmcgrogan/) (Workday)

<!-- -->
**Participate:**
~ [GitHub repo](https://github.com/decentralized-identity/credential-manifest)
~ [File a bug](https://github.com/decentralized-identity/credential-manifest/issues)
~ [Commit history](https://github.com/decentralized-identity/credential-manifest/commits/master)

------------------------------------

## Abstract

Styling the visual presentation of various entities types and data (e.g. credentials) is a common need that runs across many different use cases. In order to provide a predictable set of styling and data display hints to User Agents, Issuers, Verifiers, and other participants who render UI associated with entities and data, this specification endeavors to standardize a common data model to describe generic style and data display hints that can be used across any formulation of UI elements.

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

[[def:Display Mapping Object, Display Mapping Objects]]
~ Display Mapping Objects are used to render UI based on information from and about a [[ref:Claim]]. See [Display Mapping Object](#display-mapping-object)

[[def:Labeled Display Mapping Object, Labeled Display Mapping Objects]]
~ ref:Labeled Display Mapping Objects extend from [[ref:Display Mapping Objects]]. See [Labeled Display Mapping Object](#labeled-display-mapping-object)

## Entity Styles

_Entity Style Descriptors_ are a resource format that defines a set of suggested visual styling elements that a consuming party ****MAY**** apply to their presentation of associated entities.

::: example Credential Manifest - All features exercised
```json
{
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
```
:::

 
An _Entity Style Descriptor_ ****must**** be an object composed of the following properties:

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

## Data Display

A _Data Display Descriptor_ ****must**** be an object composed of the following properties:

- The object ****MAY**** contain a `title` property, and if present, its value ****MUST**** be a [[ref:Display Mapping Object]]. User Agents ****SHOULD**** render the data in an area of UI that conveys the general title of the credential being rendered.
- The object ****MAY**** contain a `subtitle` property, and if present, its value ****MUST**** be a [[ref:Display Mapping Object]]. User Agents ****SHOULD**** render the data in close proximity to the `title` value and ****SHOULD**** display the information in a way that is noticeably less pronounced than that of the `title` value.
- The object ****MAY**** contain a `description` property, and if present, its value ****MUST**** be a [[ref:Display Mapping Object]]. User Agents ****SHOULD**** render the data in an area of UI that is appropriate for verbose, descriptive textual data.
- The object ****MAY**** contain a `properties` property, and if present, its value ****MUST**** be an array of [[ref:Labeled Display Mapping Objects]]. User Agents ****SHOULD**** render the data specified by each _Display Mapping Object_ in an area of UI that is appropriate for the rendering of a flat list of labeled values.

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