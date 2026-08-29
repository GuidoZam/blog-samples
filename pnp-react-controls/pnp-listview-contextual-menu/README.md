# ListView with Contextual Menu Sample

## Summary

This sample demonstrates how to enhance the **ListView** control from the PnP Reusable React Controls library with contextual menus (ECB - Edit Control Block). The implementation shows how to integrate Fluent UI's ContextualMenu with ListView to provide row-level actions like View, Edit, Share, and Delete.

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
- Fluent UI React: `@fluentui/react`

## Solution

| Solution | Author(s) |
| -------- | --------- |
| pnp-listview-contextual-menu-sample | - |

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
   cd ListViewContextualMenu-sample/pnp-listview-contextual-menu-sample
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

### Scenario 1: Basic Contextual Menu
A standard contextual menu with common actions including View Details, Edit Item, and Delete.

### Scenario 2: Menu with Submenus
Demonstrates nested menu items with a Share submenu containing Email and Teams options.

### Scenario 3: Conditional Menu Items
Shows dynamic menu behavior where the Delete action is disabled for items with "Completed" status.

## Key Components

### ECB Component
The Edit Control Block component wraps Fluent UI's IconButton and ContextualMenu to provide the "three dots" menu for each row.

**Features:**
- Icon-based menu trigger
- Submenu support
- Conditional item disabling
- Click handlers for each action
- Dividers for visual grouping

### ListView Integration
The ListView control is configured with a custom column that renders the ECB component using the ViewField `render` method.

## Blog Post

For a detailed walkthrough of this implementation, see the accompanying blog post: [ListViewContextualMenu-blog-post.md](../ListViewContextualMenu-blog-post.md)

## References

- [PnP ListView Documentation](https://pnp.github.io/sp-dev-fx-controls-react/controls/ListView/)
- [Fluent UI ContextualMenu](https://developer.microsoft.com/en-us/fluentui#/controls/web/contextualmenu)
- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)
