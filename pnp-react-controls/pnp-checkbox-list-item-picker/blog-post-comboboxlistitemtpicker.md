# Discover the ComboBoxListItemPicker control from the PnP reusable React controls

## Introduction

Continuing our exploration of the PnP React controls, today I want to talk about the ComboBoxListItemPicker control, a powerful component that combines the functionality of a combobox with SharePoint list item selection capabilities.

If you're interested, you can find the code of this sample [here](https://github.com/YourUsername/blog-samples/tree/main/pnp-react-controls/pnp-checkbox-list-item-picker).

The `ComboBoxListItemPicker` control allows users to select one or more items from a SharePoint list using a combobox interface. The control provides auto-suggestions based on user input and supports various configuration options for filtering, ordering, and customization.

This control is particularly useful when you need to:
- Allow users to select items from large SharePoint lists
- Provide type-ahead functionality for better user experience  
- Filter list items based on specific criteria
- Support both single and multiple item selection
- Integrate seamlessly with SharePoint Online environments

## Visual appearance

The ComboBoxListItemPicker control offers a wide range of configuration options. Let me showcase the various features and functionalities available.

### Basic Single Selection

Starting with the minimal configuration, this is how the control appears with basic single-item selection:

![Basic Single Selection](screenshots/basic-single-selection.png)

The control displays a clean combobox interface where users can type to search for items. As they type, matching items from the SharePoint list appear as suggestions.

### Multiple Selection Mode

When configured for multiple selections, the control allows users to select several items from the list:

![Multiple Selection](screenshots/multiple-selection.png)

Selected items are displayed as tags within the control, and users can easily remove them by clicking the X button on each tag.

### Filtered Results

The control supports OData filtering to show only specific items that match certain criteria:

![Filtered Results](screenshots/filtered-results.png)

In this example, the filter is applied to show only text files (.txt or .md extensions), demonstrating how you can restrict the available options based on your requirements.

### Ordered and Limited Results

You can configure the control to show a limited number of items and order them according to specific criteria:

![Limited and Ordered](screenshots/limited-ordered.png)

This example shows only the top 5 items ordered alphabetically, which is useful for large lists where you want to show only the most relevant options.

### Disabled State

The control also supports a disabled state for scenarios where interaction should not be allowed:

![Disabled State](screenshots/disabled-state.png)

## Show me the code

### Prerequisites

To use the PnP React controls, first you need to install the package:

```bash
npm install @pnp/spfx-controls-react --save --save-exact
```

After the installation of the package, you can proceed with the following instructions to use the ComboBoxListItemPicker component.

To use the control, you first need to import it:

```typescript
import { ComboBoxListItemPicker } from '@pnp/spfx-controls-react/lib/ComboBoxListItemPicker';
```

For this sample, the full import includes additional interfaces and types:

```typescript
import { ComboBoxListItemPicker } from '@pnp/spfx-controls-react/lib/ComboBoxListItemPicker';
import { SPHttpClient } from '@microsoft/sp-http';
```

Now that you understand how to install and import the component, let's explore the different usage scenarios.

### Basic Single Selection

The simplest implementation allows single item selection from a SharePoint list:

```typescript
<ComboBoxListItemPicker
  listId="your-list-guid"
  columnInternalName="Title"
  keyColumnInternalName="ID"
  onSelectedItem={this._onSelectionChanged}
  webUrl={this.props.context.pageContext.web.absoluteUrl}
  spHttpClient={this.props.context.spHttpClient}
  label="Select an item:"
  suggestionsHeaderText="Available items"
  noResultsFoundText="No items found"
/>
```

The callback function handles the selection change:

```typescript
private _onSelectionChanged = (items: any[]): void => {
  console.log('Selected items:', items);
  this.setState({ selectedItems: items });
};
```

### Multiple Selection Mode

Enable multiple selection by setting the `multiSelect` property to `true`:

```typescript
<ComboBoxListItemPicker
  listId="your-list-guid"
  columnInternalName="Title"
  keyColumnInternalName="ID"
  onSelectedItem={this._onMultipleSelectionChanged}
  webUrl={this.props.context.pageContext.web.absoluteUrl}
  spHttpClient={this.props.context.spHttpClient}
  multiSelect={true}
  label="Select multiple items:"
  suggestionsHeaderText="Choose items (multiple selection enabled)"
  noResultsFoundText="No matching items found"
/>
```

### With OData Filter

Apply filters to show only specific items using OData syntax:

```typescript
<ComboBoxListItemPicker
  listId="your-list-guid"
  columnInternalName="FileLeafRef"
  keyColumnInternalName="ID"
  filter="substringof('.txt', FileLeafRef) or substringof('.md', FileLeafRef)"
  onSelectedItem={this._onFilteredSelectionChanged}
  webUrl={this.props.context.pageContext.web.absoluteUrl}
  spHttpClient={this.props.context.spHttpClient}
  label="Select text files only (.txt or .md):"
  suggestionsHeaderText="Available text files"
  noResultsFoundText="No text files found matching your search"
/>
```

### With Default Selection

You can provide pre-selected items using the `defaultSelectedItems` property:

```typescript
<ComboBoxListItemPicker
  listId="your-list-guid"
  columnInternalName="Title"
  keyColumnInternalName="ID"
  defaultSelectedItems={[{ID: 1, Title: "Pre-selected Item"}]}
  onSelectedItem={this._onDefaultSelectionChanged}
  webUrl={this.props.context.pageContext.web.absoluteUrl}
  spHttpClient={this.props.context.spHttpClient}
  multiSelect={true}
  label="Pre-selected items example:"
  suggestionsHeaderText="Items (some may be pre-selected)"
  noResultsFoundText="No items available"
/>
```

### With Item Limit and Ordering

Limit the number of displayed items and control their order:

```typescript
<ComboBoxListItemPicker
  listId="your-list-guid"
  columnInternalName="Title"
  keyColumnInternalName="ID"
  itemLimit={5}
  orderBy="Title asc"
  onSelectedItem={this._onLimitedSelectionChanged}
  webUrl={this.props.context.pageContext.web.absoluteUrl}
  spHttpClient={this.props.context.spHttpClient}
  label="Limited selection (max 5 items shown, alphabetically sorted):"
  suggestionsHeaderText="Top 5 items (A-Z)"
  noResultsFoundText="No matching items in top 5"
/>
```

### Disabled State

Disable the control when interaction is not allowed:

```typescript
<ComboBoxListItemPicker
  listId="your-list-guid"
  columnInternalName="Title"
  keyColumnInternalName="ID"
  disabled={true}
  onSelectedItem={this._onDisabledSelectionChanged}
  webUrl={this.props.context.pageContext.web.absoluteUrl}
  spHttpClient={this.props.context.spHttpClient}
  label="Disabled picker:"
  suggestionsHeaderText="This picker is disabled"
  noResultsFoundText="Picker is disabled"
/>
```

### Advanced Configuration Options

The ComboBoxListItemPicker control supports many additional configuration options:

```typescript
<ComboBoxListItemPicker
  listId="your-list-guid"
  columnInternalName="Title"
  keyColumnInternalName="ID"
  onSelectedItem={this._onAdvancedSelectionChanged}
  webUrl={this.props.context.pageContext.web.absoluteUrl}
  spHttpClient={this.props.context.spHttpClient}
  
  // Appearance
  className="custom-picker-class"
  label="Advanced picker configuration:"
  
  // Behavior
  multiSelect={true}
  disabled={false}
  
  // Data configuration
  filter="Status eq 'Active'"
  orderBy="Modified desc"
  itemLimit={20}
  
  // User experience
  suggestionsHeaderText="Available options"
  noResultsFoundText="No results found for your search"
  
  // Events
  onInitialized={() => console.log('Picker initialized')}
/>
```

## Key Properties and Configuration

Here's a comprehensive overview of the most important properties:

### Required Properties

- **`listId`**: GUID or title of the SharePoint list
- **`columnInternalName`**: Internal name of the column to search and display values  
- **`onSelectedItem`**: Callback function that receives selected items
- **`webUrl`**: URL of the SharePoint web containing the list
- **`spHttpClient`**: SharePoint HTTP client for API calls

### Optional Configuration

- **`keyColumnInternalName`**: Column to use as unique key (default: 'Id')
- **`multiSelect`**: Enable multiple item selection (default: false)
- **`disabled`**: Disable the control (default: false)
- **`filter`**: OData filter string to limit available items
- **`orderBy`**: OData orderBy string for sorting items
- **`itemLimit`**: Maximum number of items to display (default: 100)
- **`defaultSelectedItems`**: Array of pre-selected items

### User Experience

- **`label`**: Text label for the control
- **`className`**: CSS class for custom styling
- **`suggestionsHeaderText`**: Header text in the suggestions dropdown
- **`noResultsFoundText`**: Text shown when no results are found

### Event Handling

- **`onInitialized`**: Called when the component is ready
- **`onSelectedItem`**: Called when selection changes

## Real-world Use Cases

The ComboBoxListItemPicker control is particularly useful in several scenarios:

### 1. Document Selection Interface
```typescript
// Select documents from a document library
<ComboBoxListItemPicker
  listId="documents-library-id"
  columnInternalName="FileLeafRef"
  filter="FSObjType eq 0" // Files only
  multiSelect={true}
  label="Select documents for processing:"
/>
```

### 2. User Assignment Interface
```typescript
// Select items assigned to specific users
<ComboBoxListItemPicker
  listId="tasks-list-id"
  columnInternalName="Title"
  filter="AssignedTo/Title eq 'Current User'"
  label="Select your assigned tasks:"
/>
```

### 3. Category-based Selection
```typescript
// Select items from specific categories
<ComboBoxListItemPicker
  listId="products-list-id"
  columnInternalName="ProductName"
  filter="Category eq 'Electronics'"
  orderBy="ProductName asc"
  label="Select electronic products:"
/>
```

## Best Practices and Tips

### Performance Considerations
- Use filters to limit the data retrieved from large lists
- Set appropriate `itemLimit` values to improve performance
- Consider the network impact when working with large datasets

### User Experience
- Provide clear labels and placeholder text
- Use meaningful `suggestionsHeaderText` and `noResultsFoundText`
- Consider the context when enabling single vs. multiple selection

### Error Handling
- Always handle cases where the specified list might not exist
- Provide fallback messages for network connectivity issues
- Validate that required columns exist in the target list

### Security and Permissions
- Ensure users have appropriate permissions to read from the target list
- Consider item-level security when implementing filters
- Test with different user permission levels

## Troubleshooting Common Issues

### List Not Found
```typescript
// Always validate list existence
private async validateList(listId: string): Promise<boolean> {
  try {
    const list = await this.props.context.spHttpClient.get(
      `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists('${listId}')`,
      SPHttpClient.configurations.v1
    );
    return list.ok;
  } catch (error) {
    console.error('List validation failed:', error);
    return false;
  }
}
```

### Column Not Found
Ensure the specified `columnInternalName` exists in the target list and is accessible to the current user.

### Performance Issues
- Implement appropriate filtering to reduce data volume
- Use pagination for very large lists
- Consider caching strategies for frequently accessed data

## Conclusions

In my opinion, the ComboBoxListItemPicker control is an excellent solution for scenarios requiring SharePoint list item selection with a modern, user-friendly interface. It effectively combines the familiarity of a combobox with powerful SharePoint integration capabilities.

The control excels in several areas:
- **Ease of Use**: Simple integration with minimal configuration required
- **Flexibility**: Extensive customization options for various scenarios  
- **Performance**: Built-in optimization with filtering and limiting capabilities
- **User Experience**: Intuitive interface with type-ahead functionality
- **SharePoint Integration**: Seamless integration with SharePoint lists and libraries

Whether you're building simple item selection interfaces or complex multi-criteria selection scenarios, the ComboBoxListItemPicker provides the functionality and flexibility needed for professional SharePoint Framework solutions.

The control's support for filtering, ordering, and multiple selection modes makes it suitable for a wide range of business applications. Its clean API and comprehensive configuration options ensure that it can adapt to most requirements while maintaining good performance and user experience.

If you're interested in learning more, you can check the official documentation [here](https://pnp.github.io/sp-dev-fx-controls-react/controls/ComboBoxListItemPicker/).

Hope this helps!

---

## Additional Resources

- [Official ComboBoxListItemPicker Documentation](https://pnp.github.io/sp-dev-fx-controls-react/controls/ComboBoxListItemPicker/)
- [PnP Reusable React Controls](https://pnp.github.io/sp-dev-fx-controls-react/)
- [SharePoint Framework Overview](https://aka.ms/spfx)
- [Microsoft 365 Developer Community](https://aka.ms/m365pnp)
- [Sample Source Code](https://github.com/YourUsername/blog-samples/tree/main/pnp-react-controls/pnp-checkbox-list-item-picker)

**Tags:** SharePoint Framework, SPFx, PnP Controls, React, ComboBoxListItemPicker, Microsoft 365, SharePoint Online