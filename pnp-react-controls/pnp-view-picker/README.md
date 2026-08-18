# ViewPicker Sample

## Summary

This sample demonstrates the usage of the **ViewPicker** control from the PnP Reusable React Controls library. The control provides a dropdown interface for selecting SharePoint list views, with support for single/multiple selection, filtering, ordering, and default selections.

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
- A SharePoint list (for testing)

## Solution

| Solution | Author(s) |
| -------- | --------- |
| pnp-view-picker-sample | - |

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
   cd ViewPicker-sample/pnp-view-picker-sample
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
7. **Important**: Edit the web part properties and enter a SharePoint List GUID in the "List ID" field

## Configuration

### Getting a List GUID

1. Navigate to your SharePoint list
2. Click on **List Settings** in the gear menu
3. Look at the browser URL - the GUID is the value after `List=`
4. Copy this GUID (including the curly braces or not, both work)
5. Paste it into the web part's "List ID" property

Example URL:
```
https://contoso.sharepoint.com/sites/mysite/_layouts/15/listedit.aspx?List=%7B12345678-1234-1234-1234-123456789012%7D
```
GUID: `12345678-1234-1234-1234-123456789012`

## Features

This sample demonstrates the following scenarios:

### Scenario 1: Single View Selection
Basic usage with single view selection from a dropdown.

### Scenario 2: Multiple Views Selection
Multi-select functionality allowing users to choose multiple views simultaneously.

### Scenario 3: Ordered by Title
Views sorted alphabetically by title for easier navigation.

### Scenario 4: Filtered Views
OData filtering to show only specific views (e.g., public views only).

### Scenario 5: With Default Selection
Pre-selected default view for immediate usability.

### Scenario 6: Disabled State
Demonstrates the disabled state when view selection should be unavailable.

## Control Properties

The ViewPicker control accepts these key properties:

- **context**: WebPartContext - SPFx context for SharePoint API calls
- **listId**: string - GUID of the SharePoint list
- **label**: string - Label text above the picker
- **placeholder**: string - Hint text when no view is selected
- **onSelectionChanged**: callback - Fired when selection changes
- **multiSelect**: boolean - Enable multiple view selection
- **orderBy**: string - Field to sort views by (e.g., "Title")
- **filter**: string - OData filter expression
- **selectedView**: string - Pre-selected view title
- **disabled**: boolean - Disable the control

## Blog Post

For a detailed walkthrough of this implementation, see the accompanying blog post: [ViewPicker-blog-post.md](../ViewPicker-blog-post.md)

## References

- [PnP ViewPicker Documentation](https://pnp.github.io/sp-dev-fx-controls-react/controls/ViewPicker/)
- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)
