# display-mode-copilot-app

## Summary

Sample SharePoint Copilot App that demonstrates the **inline** and **fullscreen** display modes of a SPFx Copilot Component. The component reads `this.hostContext.displayMode` on every render, exposes its own "expand to fullscreen" affordance (there is no built-in host button), and renders an extra detail panel that only appears in fullscreen mode.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.24.0--beta.3-yellow.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- SharePoint Framework v1.24 beta 2 or newer (SharePoint Copilot Apps are in public preview)
- No Microsoft 365 Copilot license is required to build and test locally in the Copilot Workbench during the preview

## Solution

| Solution                | Author(s)      |
| ------------------------ | -------------- |
| display-mode-copilot-app | Sample project |

## Version history

| Version | Date          | Comments        |
| ------- | ------------- | --------------- |
| 1.0     | August 2026   | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install`
  - `npm run start`
- Browse to `https://<your-tenant>.sharepoint.com/_layouts/15/CopilotWorkbench.aspx`
- Select **DisplayModeDemoCopilotComponent**, set a `message` property value, and select **Fire turn**
- Use the expand icon in the header to request fullscreen, and the Workbench's own control to collapse back to inline

## Features

This sample illustrates the following concepts:

- Reading `this.hostContext.displayMode` and `this.hostContext.availableDisplayModes` on every render
- Declaring `availableDisplayModes` in the component manifest capabilities
- Requesting fullscreen with `await this.requestDisplayModeAsync('fullscreen')`
- Rendering a custom "expand" affordance, since the host does not provide one
- Rendering fullscreen-only content that disappears automatically when the host collapses the component back to inline

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Build your first SharePoint Copilot App](https://learn.microsoft.com/sharepoint/dev/spfx/copilot/get-started/build-your-first-copilot-app)
- [Display modes in SharePoint Copilot components](https://learn.microsoft.com/sharepoint/dev/spfx/copilot/displaymode)
- [Overview of SharePoint Copilot Apps](https://learn.microsoft.com/sharepoint/dev/spfx/copilot/overview-copilot-apps)
- [Getting started with SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [Heft Documentation](https://heft.rushstack.io/)