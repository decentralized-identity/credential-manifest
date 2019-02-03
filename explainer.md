# DID Credential Manifest

## Overview

Creating trust between DIDs and gaining access to products, services, and systems with DIDs requires the acquisition, generation, and inspection of credentials (DID-signed data objects).

The DID Credential Manifest is a format that aims to normalize the process of credential acquisition, wherein the issuer is able to describe the requirements the subject or participant in the credential generation process must meet for the issuer to generate the desired credential.

## Scope of Initial Version

## Assumptions

- Credential Manifests should not be bound to a particular credential output format, and should be able to support all reasonable credential types in its input descriptors.

## Glossary of Terms (WIP)

We are accepting terminology nominations. 

- Using **Credential** Manifest at this point (open for discussion)
- `client`: holder/subject in this relationship
- `group`: a variety of proofs/prerequisites can be accepted.
- `preconditions` / `ProofSet`: the prerequisite combination of credentials and inputs needed for issuance 
- `data` vs `credential`: raw ad hoc inputs captured from the user vs a verifiable, signed, and well-formatted credential that complies with supported standards
- `issuers`: accepted credentials issuers

## Functional Requirements

A Credential Manifest should be able to fulfill the following functional requirements: 

- Specify a unique identification for the credential or a set of credentials that will be issued for that manifest (e.g. AcmeLoanAuthorization)
- Specify proof section that allows the issuer to determine the requested credential can be issued to a Subject identity:
    - Unverified data elements "input": Data that has not been previously verified by another (trusted) party, but is used by the validator to either verify independently OR use it as input for the credential(s) that are to be issued.
    - Verifiable Claims elements "credential": Previously verified credential(s) by a (trusted) third party that is required as an input for issuing the new credential(s). (**Note**: The request format for existing credentials should be reused in a verifier-subject relationship.)
- Defined credentials are identified by unique URIs or (prefixed) DIDs
- Provided credentiala within the ProofSet can be optional or only a subset is required. (Modeled by a Group Abstraction)
    - Use Case: Step-Up Verification. 
- Provide UI/UX definitions that standardize the visual and dynamic validation process for the Subject. This can contain:
    - Logos, Layouts, Color and Fonts
- Specify a JSON-LD Context for the Credential Manifest schema
- (Optionally): Provide Proof of Payment. E.g. tokens in escrow, or payment reference to supported payment service.

## Credential Manifest Example

```javascript
{
    "@context": "https://identity.foundation/schemas/credentials",
    "@type": "CredentialManifest",
    "credential": "AcmeLoanAuthorization", // Standard type or custom - how should we differentiate?
    "preconditions": {
        "@type": "ProofSet",
        // Groups are arbitrary, issuer-specified, string desigations that
        // can be treated as classes or IDs (if there's just one match).
        // 
        // The following 'group' expression would mean:
        // - All from A & B
        // - One from Group B
        "groups": [
          {
            "rule": "all",
            "from": ["A", "B"]
          },
          {
            "rule": "pick",
            "count": 1,
            "from": ["C"]
          }
        ],
        "inputs": [
            // JSON Schema standard descriptions to support
            // all the required value types and properties.   
            {
                "type": "data",
                "group": ["A"],
                "field": "routing_number",
                "value": { // JSON Schema
                    "type": "string",
                    "maxLength": 9
                }
            },
            {
                "type": "data",
                "group": ["A"],
                "field": "account_number",
                "value": {
                    "maxLength": 17,
                    "required": true
                }
            },
            {
                "type": "data",
                "group": ["A"],
                "field": "current_residence_duration",
                "value": {
                    "type": "number",
                    "maximum": 100
                }
            },
            {
                "type": "credential",
                "group": ["C"],
                "schema": "https://eu.com/claims/IDCard",
                "constraints": {
                    "subset": ["prop1", "prop2.foo.bar"],
                    "issuers": ["did:foo:gov1", "did:bar:gov2"]
                }
            },
            {
                "type": "credential",
                "group": ["C"],
                "schema": "hub://did:foo:123/Collections/schema.us.gov/Passport",
                "constraints": {
                    "issuers": ["did:foo:gov1", "did:bar:gov2"]
                }
                
            },
            {
                "type": "credential",
                "group": ["B"],
                "schema": ["https://claims.linkedin.com/WorkHistory", "https://about.me/WorkHistory"],
                "constraints": {
                    "issuers": ["did:foo:auditor1", "did:bar:auditor2"]
                }
                
            },
            {
                "type": "credential",
                "group": ["B"],
                "schema": "https://claims.fico.org/CreditHistory",
                "constraints": {
                    "issuers": ["did:foo:bank1", "did:bar:bank2"]
                }
            },
            {
                "type": "openid",
                "group": ["A"],
                "redirect": "https://login.microsoftonline.com/oauth/"
                "parameters": {
                    "client_id": "dhfiuhsdre",
                    "scope": "openid+profile",
                    
                }
            }
        ]
    },
    "issuer_options": {
        "styles": {
            "logo": {
                "url": "https://acme.com/logo.png", // Link or Base 64 image. Can be a hashlink if integrity proof is required
            },
            "background": {
                "color": [247, 247, 247]
            },
            "formLabel": {
                "color": [180, 55, 20] // Assume colors are RGB or HSL values?
            },
            "formInputBorder": {
                "color": [200, 180, 10]
            }
        }
    }
}
```

## Known Limitations
- The Credential Manifest does not model a dynamic or multi-step process for the communication with an issuer to obtain a defined credential. E.g. a Credential manifest cannot ask for a Phone Number AND a Validation code (sent to a specified phone number), because the data elements could not be provided independently. Higher level use cases could be implemented by providing multiple Credential Manifests.

