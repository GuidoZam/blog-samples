# FilePicker Control Sample

## Summary

This sample demonstrates how to use the **FilePicker** control from the PnP reusable React controls library in a SharePoint Framework (SPFx) web part.

The FilePicker control is a powerful component that allows users to browse and select files from various sources including SharePoint libraries, OneDrive, recent files, web search, stock images, and local uploads. The sample showcases the control's features including file selection, file information display, and programmatic file content download.

![FilePicker Control Demo](./assets/filepicker-demo.png)

## Features

This sample demonstrates:

- ✅ Basic FilePicker implementation
- ✅ All available tabs and file sources (Recent, Web Search, Stock Images, OneDrive, Site Libraries, Upload, Multi-Upload, Link)
- ✅ File information display (name, URL, size)
- ✅ Downloading file content programmatically
- ✅ Proper localization of all strings
- ✅ Responsive UI with Fluent UI components
- ✅ Error handling and loading states

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.23.0--rc.0-yellow.svg)

## Used PnP Controls

- [FilePicker](https://pnp.github.io/sp-dev-fx-controls-react/controls/FilePicker/)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- SharePoint Online
- Node.js v22.14.0 or higher

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- Node.js v22.14.0 or higher
- SharePoint Online environment
- PnP SPFx Controls React library (installed automatically via npm)

## Solution

| Solution       | Author(s)                         |
| -------------- | --------------------------------- |
| pnp-filepicker | Your Name (Your Company, @handle) |

## Version history

| Version | Date          | Comments        |
| ------- | ------------- | --------------- |
| 1.0     | May 17, 2026  | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository (or download the sample folder)
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install`
  - `npm start`
- Open SharePoint Workbench in your SharePoint site:
  ```
  https://<your-tenant>.sharepoint.com/_layouts/15/workbench.aspx
  ```
- Add the **FilePickerSample** web part to the page

## Building and Deploying

To build and deploy the solution:

```bash
# Build the solution
npm run build

# The package will be created at:
# sharepoint/solution/pnp-filepicker.sppkg
```

Then deploy the .sppkg file to your SharePoint App Catalog.

## Implementation Details

### Key Files

- **FilePickerSample.tsx**: Main component implementing the FilePicker control
- **IFilePickerSampleProps.ts**: Component properties interface
- **FilePickerSample.module.scss**: Component styles
- **en-us.js**: English localization strings
- **mystrings.d.ts**: Localization interface

### Code Highlights

#### FilePicker Usage

```typescript
<FilePicker
  label={strings.FilePickerLabel}
  buttonLabel={strings.FilePickerButtonLabel}
  buttonIcon="OpenFile"
  onSave={this._onFilePickerSave}
  onChange={this._onFilePickerChange}
  context={this.props.context as any}
  hideRecentTab={false}
  hideWebSearchTab={false}
  hideStockImages={false}
  hideOrganisationalAssetTab={false}
  hideOneDriveTab={false}
  hideSiteFilesTab={false}
  hideLocalUploadTab={false}
  hideLocalMultipleUploadTab={false}
  hideLinkUploadTab={false}
/>
```

#### Handling File Selection

```typescript
private _onFilePickerSave = (filePickerResult: IFilePickerResult[]): void => {
  if (filePickerResult && filePickerResult.length > 0) {
    this.setState({ 
      filePickerResult: filePickerResult[0],
      fileContent: undefined
    });
  }
}
```

#### Downloading File Content

```typescript
private _downloadFile = async (): Promise<void> => {
  const { filePickerResult } = this.state;
  if (!filePickerResult) return;

  this.setState({ isDownloading: true });
  try {
    const fileContent = await filePickerResult.downloadFileContent();
    this.setState({ fileContent, isDownloading: false });
  } catch (error) {
    console.error('Error downloading file:', error);
    this.setState({ isDownloading: false });
  }
}
```

## Localization

All user-facing strings are properly localized. The sample includes English strings in `en-us.js`. To add additional languages:

1. Create a new file in `src/webparts/filePickerSample/loc/` (e.g., `de-de.js` for German)
2. Copy the structure from `en-us.js`
3. Translate all strings to the target language

## Customization Options

The FilePicker control supports extensive customization:

- **Tab visibility**: Show/hide specific tabs using properties like `hideRecentTab`, `hideOneDriveTab`, etc.
- **File type filtering**: Restrict file types using the `accepts` property (e.g., `[".pdf", ".docx", ".xlsx"]`)
- **Default location**: Set a starting folder with `defaultFolderAbsolutePath`
- **Button appearance**: Customize with `buttonLabel`, `buttonIcon`, `buttonIconProps`
- **Tab ordering**: Control tab display order with `tabOrder`
- **Default tab**: Set the initially selected tab with `defaultSelectedTab`
- **Bing Search**: Enable web search by providing a `bingAPIKey`

## Resources

- [PnP SPFx Controls React](https://pnp.github.io/sp-dev-fx-controls-react/)
- [FilePicker Control Documentation](https://pnp.github.io/sp-dev-fx-controls-react/controls/FilePicker/)
- [SharePoint Framework Documentation](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Blog Post](./BLOG_POST.md) - Detailed walkthrough of this sample
- [Microsoft 365 Developer Community](https://aka.ms/m365pnp)

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