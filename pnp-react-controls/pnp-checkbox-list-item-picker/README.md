# ComboBoxListItemPicker Sample - PnP React Controls

## Summary

This sample demonstrates how to use the **ComboBoxListItemPicker** control from the [PnP Reusable React Controls](https://pnp.github.io/sp-dev-fx-controls-react/) library in a SharePoint Framework (SPFx) web part.

The ComboBoxListItemPicker is a powerful control that allows users to select one or more items from a SharePoint list using a combobox interface with auto-suggestion capabilities.

![ComboBoxListItemPicker Sample](./assets/sample-overview.png)

## Features Demonstrated

This sample showcases the following features of the ComboBoxListItemPicker control:

1. **Basic Single Selection** - Simple item selection from a SharePoint list
2. **Multiple Selection Mode** - Selecting multiple items with tag-based display
3. **OData Filtering** - Filtering items based on specific criteria (e.g., file types)
4. **Default Selection** - Pre-selecting items when the control loads
5. **Item Limiting & Ordering** - Limiting displayed items and controlling sort order
6. **Disabled State** - Showing the control in a disabled state
7. **Custom Labels & Messages** - Customizing user-facing text and messages

## Key Properties Highlighted

- `listId` - Target SharePoint list identifier
- `columnInternalName` - Column to display and search
- `keyColumnInternalName` - Unique identifier column
- `multiSelect` - Enable multiple item selection
- `filter` - OData filter for limiting available items
- `orderBy` - Sorting configuration
- `itemLimit` - Maximum items to display
- `disabled` - Control enabled/disabled state
- `label`, `suggestionsHeaderText`, `noResultsFoundText` - User experience customization

## Prerequisites

- SharePoint Framework 1.22.1 or later
- Node.js 22.14.0 or later
- A SharePoint Online environment
- Documents library (or modify the code to use a different list)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.22.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

| Solution | Author(s) |
| -------- | --------- |
| pnp-checkbox-list-item-picker | [Your Name](https://github.com/yourusername) |

## Version history

| Version | Date | Comments |
| ------- | ---- | -------- |
| 1.0 | March 21, 2026 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Minimal Path to Awesome

1. Clone this repository
2. Ensure that you are at the solution folder
3. In the command-line run:
   - **`npm install`**
   - **`npm run serve`**
4. Add the web part to a SharePoint page
5. Ensure you have a Documents library in your site (or modify the code to use a different list)

## Features

### 1. Basic Single Selection
Demonstrates the simplest configuration for selecting a single item from a list.

### 2. Multiple Selection Mode
Shows how to enable multiple item selection with the `multiSelect` property.

### 3. OData Filtering
Uses OData filter syntax to show only specific items (e.g., text files only).

### 4. Default Selection
Demonstrates how to pre-select items using the `defaultSelectedItems` property.

### 5. Item Limiting & Ordering
Shows how to limit the number of displayed items and control their sort order.

### 6. Disabled State
Displays the control in a disabled state to show the user experience when interaction is not allowed.

## Code Structure

```
src/
├── webparts/
│   └── checkboxListItemPickerSample/
│       ├── CheckboxListItemPickerSampleWebPart.ts     # Main web part file
│       └── components/
│           ├── CheckboxListItemPickerSample.tsx       # React component with examples
│           ├── CheckboxListItemPickerSample.module.scss # Styling
│           └── ICheckboxListItemPickerSampleProps.ts  # Props interface
└── blog-post-comboboxlistitemtpicker.md              # Blog post content
```

## Key Implementation Details

### SharePoint Context Setup
The web part passes the SharePoint context to the React component to provide access to `spHttpClient` and `webUrl`:

```typescript
// In the web part
context: this.context

// In the React component
webUrl={this.props.context.pageContext.web.absoluteUrl}
spHttpClient={this.props.context.spHttpClient}
```

### Event Handling
Each example demonstrates proper event handling:

```typescript
private _onSelectionChanged = (items: any[]): void => {
  console.log('Selected items:', items);
  this.setState({ selectedItems: items });
};
```

### Error Handling
The sample includes error handling for common scenarios like missing lists:

```typescript
private _getOrCreateSampleList = async (): Promise<void> => {
  try {
    // Check if list exists and handle accordingly
  } catch (error) {
    this.setState({ error: `Error: ${error}` });
  }
};
```

## Customization Options

You can customize this sample by:

1. **Changing the target list**: Modify the `listId` and column references
2. **Adding more examples**: Create additional scenarios in the component
3. **Styling**: Update the SCSS file to match your branding
4. **Adding validation**: Implement additional validation logic
5. **Error handling**: Enhance error handling and user feedback

## Learn More

- [ComboBoxListItemPicker Documentation](https://pnp.github.io/sp-dev-fx-controls-react/controls/ComboBoxListItemPicker/)
- [PnP Reusable React Controls](https://pnp.github.io/sp-dev-fx-controls-react/)
- [SharePoint Framework Overview](https://aka.ms/spfx)
- [Microsoft 365 Developer Community](https://aka.ms/m365pnp)

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development