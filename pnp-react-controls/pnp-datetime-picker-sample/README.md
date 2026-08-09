# PnP DateTimePicker Control Sample

This SPFx web part demonstrates various configurations of the PnP DateTimePicker control from the @pnp/spfx-controls-react package.

## Features

This sample showcases the following DateTimePicker scenarios:

- **DateTime 12-hour Clock**: Date and time selection with AM/PM format
- **DateTime 24-hour Clock**: Date and time selection with 24-hour format
- **Date Only Mode**: Date selection without time component
- **Without Seconds**: Time selection without seconds field
- **Dropdown Time Controls**: Time selection using dropdowns instead of text input
- **With Min/Max Restrictions**: Restrict selectable dates to a specific range
- **With Default Value**: Pre-set date and time values
- **Disabled State**: Demonstrate disabled picker behavior

## Prerequisites

- Node.js v18.x or higher
- SharePoint Online tenant
- SPFx 1.23.0 or higher

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Trust the Development Certificate

If this is your first time using SPFx, trust the development certificate:

```bash
gulp trust-dev-cert
```

### 3. Serve the Web Part

```bash
gulp serve
```

This will open the SharePoint Workbench where you can add and test the web part.

### 4. Build for Production

```bash
gulp bundle --ship
gulp package-solution --ship
```

The solution package will be created in the `sharepoint/solution` folder.

## Key Features Demonstrated

- **DateConvention**: Switch between DateTime (date + time) and Date (date only)
- **TimeConvention**: Toggle between Hours12 (AM/PM) and Hours24 formats
- **TimeDisplayControlType**: Choose between Text input and Dropdown controls for time
- **showSeconds**: Control visibility of seconds field
- **minDate/maxDate**: Restrict selectable date ranges
- **value**: Set default or controlled date values
- **disabled**: Disable user interaction

## Key Files

- `src/webparts/dateTimePicker/components/DateTimePicker.tsx` - Main component with all control instances
- `src/webparts/dateTimePicker/DateTimePickerWebPart.ts` - Web part implementation
- `src/webparts/dateTimePicker/loc/` - Localization strings
- `DateTimePicker-blog-post.md` - Companion blog post explaining the implementation

## Blog Post

See the accompanying [DateTimePicker-blog-post.md](./DateTimePicker-blog-post.md) file for a detailed explanation of each scenario with code examples.

## Learn More

- [Official DateTimePicker Documentation](https://pnp.github.io/sp-dev-fx-controls-react/controls/DateTimePicker/)
- [PnP SPFx Controls](https://pnp.github.io/sp-dev-fx-controls-react/)
- [SharePoint Framework Overview](https://aka.ms/spfx)

## Version History

| Version | Date | Comments |
|---------|------|----------|
| 1.0.0 | July 2026 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

> Include any additional steps as needed.

Other build commands can be listed using `heft --help`.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [Heft Documentation](https://heft.rushstack.io/)