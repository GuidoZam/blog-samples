# ProgressStepsIndicator Sample

## Summary

This sample demonstrates the usage of the **ProgressStepsIndicator** control from the PnP Reusable React Controls library. The control provides a visual representation of multi-step processes with clear step indicators, descriptions, and navigation capabilities.

## Compatibility

![SPFx 1.23.0](https://img.shields.io/badge/SPFx-1.23.0-green.svg)
![Node.js v18 | v20](https://img.shields.io/badge/Node.js-v18%20%7C%20v20-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

- Node.js v18 or v20
- SharePoint Online tenant
- PnP Reusable React Controls: `@pnp/spfx-controls-react`

## Solution

| Solution | Author(s) |
| -------- | --------- |
| pnp-progress-steps-indicator-sample | - |

## Version history

| Version | Date | Comments |
| ------- | ---- | -------- |
| 1.0 | 2026-07-31 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

1. Clone this repository
2. Navigate to the sample folder:
   ```bash
   cd ProgressStepsIndicator-sample/pnp-progress-steps-indicator-sample
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Bundle and package the solution:
   ```bash
   gulp bundle --ship
   gulp package-solution --ship
   ```
5. Deploy the `.sppkg` file from the `sharepoint/solution` folder to your App Catalog
6. Add the web part to a SharePoint page

## Features

This sample demonstrates the following scenarios:

### Scenario 1: Basic 5-Step Process
A simple linear process with 5 steps showing basic usage of the ProgressStepsIndicator control.

### Scenario 2: 3-Step Wizard
A wizard-style interface with 3 steps, currently at step 2, demonstrating mid-process state.

### Scenario 3: 8-Step Workflow
A complex workflow with 8 steps at step 3, showing how the control handles longer processes.

### Scenario 4: Interactive Navigation
A 6-step process with Previous, Next, and Reset buttons, demonstrating full user interaction and state management.

## Control Properties

The ProgressStepsIndicator control accepts these key properties:

- **currentStep**: Number - The currently active step (1-based index)
- **steps**: IStep[] - Array of step objects with id, title, and description

Each step object contains:
- **id**: string - Unique identifier for the step
- **title**: string - Display title
- **description**: string - Optional detailed description

## Blog Post

For a detailed walkthrough of this implementation, see the accompanying blog post: [ProgressStepsIndicator-blog-post.md](../ProgressStepsIndicator-blog-post.md)

## References

- [PnP ProgressStepsIndicator Documentation](https://pnp.github.io/sp-dev-fx-controls-react/controls/ProgressStepsIndicator/)
- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)
