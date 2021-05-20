Entity Style Descriptors
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

Styling the visual presentation of various entities types is a common need that runs across many different use cases. In order to provide a predictable set of styling directives and hints to User Agents, Issuers, Verifiers, and other participants who render UI associated with the representations and objects exchanged by these entities, this specification endeavors to standardize a common data model to describe the union of generic style and UI elements.

## Terminology

Term | Definition
:--- | :---------
Decentralized Identifier (DID) | Unique ID string and PKI metadata document format for describing the cryptographic keys and other fundamental PKI values linked to a unique, user-controlled, self-sovereign identifier in a target system (i.e. blockchain, distributed ledger).
Issuer | An entity that issues a credential to a Subject.
Holder | The entity that submits proofs to a Verifier to satisfy the requirements described in a Proof Definition
Verifier | The entity that defines what proofs they require from a Subject (via a Proof Definition) in order to proceed with an interaction.

## Resource Definition

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

 

An _Entity Style Descriptor_, value ****must**** be an object composed of the following properties:

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