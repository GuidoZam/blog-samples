# Discover the FilePicker control from the PnP reusable React controls

## Introduction

Proceeding with the appointments with the PnP React controls today I want to talk about the FilePicker control.

If you're interested you can find the code of this sample [here](https://github.com/GuidoZam/blog-samples/tree/main/pnp-react-controls/pnp-filepicker).

The `FilePicker` control is a powerful and versatile component that allows users to browse and select files from various sources within your SharePoint Framework solutions. Whether you need to let users pick files from SharePoint document libraries, OneDrive, recent files, or even upload new files, the FilePicker control has you covered.

## Visual appearance

Let's start with the visual appearance of the sample solution.

The FilePicker control provides a clean and intuitive interface for file selection. When you click the button to open the file picker, a panel opens displaying multiple tabs that represent different file sources:

- **Recent**: Displays recently modified files based on search results
- **Web Search**: Uses Bing cognitive services to search for files (primarily images)
- **Stock Images**: Access to stock image libraries
- **OneDrive**: Select files from the user's OneDrive
- **Site Libraries**: Browse and select files from SharePoint document libraries
- **Upload**: Upload a single file from your local drive
- **Multi-Upload**: Upload multiple files at once
- **From a Link**: Paste a link to a file

The control supports three different display types:
- **List view**: A traditional list layout
- **Compact list**: A condensed list format
- **Tiles**: A visual tile view with file thumbnails

The control also includes breadcrumb navigation for easy folder traversal and implements paged data loading to ensure optimal performance even with large document libraries.

## Show me the code

### Prerequisites

To use the PnP React controls, first you need to install the package:

```bash
npm install @pnp/spfx-controls-react --save --save-exact
```

After the installation of the package you can proceed with the following instructions to use the FilePicker control.

To use the control you first need to import it:

```typescript
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
```

### Actual implementation

In this sample solution, I've created multiple examples to demonstrate different configurations and use cases of the FilePicker control. Let's explore each one:

#### Minimal Configuration

The most basic implementation requires only three properties:

```typescript
<FilePicker
  label="Select a file"
  onSave={(files) => this.setState({ selectedFile: files?.[0] })}
  context={this.props.context as any}
/>
```

**Key properties:**
- `label`: The text label displayed above the picker
- `onSave`: Handler called when a file is selected and saved
- `context`: The web part context

This minimal configuration gives you a fully functional file picker with all tabs enabled by default.

#### Custom Button Icon

Instead of a standard button, you can display an icon button using the `buttonIcon` property. You can further customize the icon appearance with `buttonIconProps`:

```typescript
<FilePicker
  label="Pick Document"
  buttonIcon="FabricFolder"
  buttonIconProps={{ 
    iconName: 'FabricFolder',
    styles: { root: { fontSize: 20, color: '#0078d4' } }
  }}
  onSave={(files) => this.setState({ selectedFile: files?.[0] })}
  context={this.props.context as any}
/>
```

**Key properties:**
- `buttonIcon`: Specifies which Fluent UI icon to display
- `buttonIconProps`: Additional properties for customizing the icon (size, color, etc.)

#### onChange Handler

The `onChange` handler is triggered whenever the file selection changes in the picker panel, even before the user clicks save. This is useful for real-time validation or preview:

```typescript
<FilePicker
  label="Select a file"
  buttonLabel="Browse Files"
  onSave={(files) => this.setState({ selectedFile: files?.[0] })}
  onChange={(files) => {
    console.log('File selection changed:', files);
    this.setState({ selectionChanged: true });
  }}
  context={this.props.context as any}
/>
```

**Use case**: Display a preview or validate file selection before the user commits to the selection.

#### onCancel Handler

The `onCancel` handler is called when the user closes the FilePicker panel without selecting a file:

```typescript
<FilePicker
  label="Select a file"
  buttonLabel="Browse Files"
  onSave={(files) => this.setState({ selectedFile: files?.[0] })}
  onCancel={() => {
    console.log('File picker cancelled');
    this.setState({ cancelled: true });
  }}
  context={this.props.context as any}
/>
```

**Use case**: Track analytics, show a message, or reset form state when users cancel the picker.

#### File Type Restrictions

Use the `accepts` property to restrict file selection to specific file types. This example only allows DOCX and PDF files:

```typescript
<FilePicker
  label="Select document (DOCX or PDF only)"
  buttonLabel="Browse Files"
  accepts={['.docx', '.pdf']}
  onSave={(files) => this.setState({ selectedFile: files?.[0] })}
  context={this.props.context as any}
/>
```

**Key property:**
- `accepts`: Array of file extensions (e.g., `['.docx', '.pdf', '.xlsx']`)

When this property is set, the file picker will only display files matching these extensions, and users won't be able to select other file types.

#### Required Field

The `required` property adds a visual indication that file selection is mandatory:

```typescript
<FilePicker
  label="Select a required file"
  buttonLabel="Browse Files"
  required={true}
  onSave={(files) => this.setState({ selectedFile: files?.[0] })}
  context={this.props.context as any}
/>
```

**Key property:**
- `required`: Boolean flag that adds an asterisk (*) to the label

This is particularly useful in forms where file upload is mandatory.

#### Disabled State

The `disabled` property prevents user interaction with the FilePicker:

```typescript
<FilePicker
  label="Disabled file picker"
  buttonLabel="Browse Files"
  disabled={true}
  onSave={(files) => this.setState({ selectedFile: files?.[0] })}
  context={this.props.context as any}
/>
```

**Use case**: Conditionally disable the picker based on form state, user permissions, or other business logic.

#### Hidden Control with Programmatic Panel Control

The `hidden` property hides the picker button while still allowing you to control the panel visibility programmatically using `isPanelOpen`:

```typescript
// In your render method
<DefaultButton
  text="Toggle Picker Visibility"
  onClick={() => this.setState({ panelOpen: !this.state.panelOpen })}
/>
<FilePicker
  label="Hidden file picker (controlled programmatically)"
  buttonLabel="Browse Files"
  hidden={true}
  isPanelOpen={this.state.panelOpen}
  onSave={(files) => {
    this.setState({ selectedFile: files?.[0], panelOpen: false });
  }}
  onCancel={() => this.setState({ panelOpen: false })}
  context={this.props.context as any}
/>
```

**Key properties:**
- `hidden`: Hides the picker button
- `isPanelOpen`: Controls whether the picker panel is open

**Use case**: Create custom UI for opening the file picker, or integrate it into a workflow where you control when the picker appears.

#### Check If File Exists

When allowing users to provide file links, the `checkIfFileExists` property validates that the linked file actually exists:

```typescript
<FilePicker
  label="Select file with validation"
  buttonLabel="Browse Files"
  checkIfFileExists={true}
  onSave={(files) => this.setState({ selectedFile: files?.[0] })}
  context={this.props.context as any}
/>
```

**Key property:**
- `checkIfFileExists`: When true, validates that file links point to existing files

This helps prevent broken links and ensures data integrity.

### Working with IFilePickerResult

All the handlers receive an array of `IFilePickerResult` objects. Here's what information is available:

```typescript
interface IFilePickerResult {
  fileName: string;                           // Full file name with extension
  fileNameWithoutExtension: string;           // File name without extension
  fileAbsoluteUrl: string;                    // Full URL to the file (null for uploads)
  fileSize: number;                           // Size in bytes (for uploads)
  downloadFileContent: () => Promise<File>;   // Method to download file content
}
```

### Displaying Selected File Information

Here's how to display information about the selected file:

```typescript
private _renderFileInfo = (file: IFilePickerResult | undefined): JSX.Element | null => {
  if (!file) {
    return <MessageBar>No file selected</MessageBar>;
  }

  return (
    <div>
      <div>
        <strong>File Name:</strong> {file.fileName}
      </div>
      {file.fileAbsoluteUrl && (
        <div>
          <strong>File URL:</strong>{' '}
          <a href={file.fileAbsoluteUrl} target="_blank" rel="noopener noreferrer">
            {file.fileAbsoluteUrl}
          </a>
        </div>
      )}
      {file.fileSize && (
        <div>
          <strong>File Size:</strong> {this._formatFileSize(file.fileSize)}
        </div>
      )}
    </div>
  );
}
```

### Additional Configuration Options

The FilePicker control offers many more customization options:

**Tab Visibility**
Control which tabs are displayed:
```typescript
<FilePicker
  hideRecentTab={false}
  hideWebSearchTab={false}
  hideStockImages={false}
  hideOrganisationalAssetTab={false}
  hideOneDriveTab={false}
  hideSiteFilesTab={false}
  hideLocalUploadTab={false}
  hideLocalMultipleUploadTab={false}
  hideLinkUploadTab={false}
  // ... other props
/>
```

**Tab Ordering and Default Selection**
```typescript
<FilePicker
  tabOrder={[FilePickerTab.Site, FilePickerTab.OneDrive, FilePickerTab.Upload]}
  defaultSelectedTab={FilePickerTab.Site}
  // ... other props
/>
```

**Default Folder Location**
```typescript
<FilePicker
  defaultFolderAbsolutePath="https://contoso.sharepoint.com/sites/siteName/Shared Documents/Folder1"
  // ... other props
/>
```

**Bing Search Integration**
```typescript
<FilePicker
  bingAPIKey="your-bing-api-key"
  // ... other props
/>
```

### Localization

All text in the sample is properly localized. The localization strings are defined in the `mystrings.d.ts` file and translations in `en-us.js`:

```typescript
// mystrings.d.ts
declare interface IFilePickerSampleWebPartStrings {
  PageTitle: string;
  PageDescription: string;
  SelectFile: string;
  PickDocument: string;
  // ... additional strings
}
```

```javascript
// en-us.js
define([], function() {
  return {
    "PageTitle": "FilePicker Control Demo",
    "PageDescription": "This sample demonstrates various configurations...",
    "SelectFile": "Select a file",
    "PickDocument": "Pick Document",
    // ... additional translations
  }
});
```

## Conclusions

The `FilePicker` control is an incredibly powerful and flexible solution for file selection scenarios in SharePoint Framework applications. As we've seen through these ten examples, the control offers:

1. **Minimal setup** - Get started with just three required properties
2. **Extensive customization** - From button appearance to file type restrictions
3. **Multiple file sources** - SharePoint, OneDrive, uploads, web search, and more
4. **Programmatic control** - Handle changes, cancellations, and control panel visibility
5. **Data validation** - File type restrictions and existence checking
6. **Rich event handling** - Track user interactions at every step
7. **Flexible tab control** - Show or hide specific file sources based on your needs

Whether you need a simple file picker or a complex file selection workflow with custom validation and UI, the FilePicker control provides all the tools you need. The comprehensive feature set, combined with minimal required code, makes it an essential component for any SharePoint Framework developer working with files.

By leveraging the different configuration options shown in these examples, you can create exactly the file selection experience your users need, while maintaining clean, maintainable code through proper localization and separation of concerns.

Hope this helps!
