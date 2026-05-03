# ListView Command Set Grouping Sample - IT Office Edition

## Summary

This sample demonstrates SharePoint Framework ListView Command Set grouping functionality with commands designed for an IT office scenario. It showcases two-level command hierarchies using the `group` property introduced in SPFx v1.23.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.23.0--rc.0-yellow.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- SharePoint Framework v1.23+ (required for ListView Command Set grouping support)
- SharePoint Online environment

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| command-set-grouping | IT Office ListView Command Set Grouping Sample |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 2.0     | April 19, 2026   | Updated to use command grouping with IT office commands |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install -g @rushstack/heft`
  - `npm install`
  - `heft start`

Other build commands can be listed using `heft --help`.

## Features

This ListView Command Set extension demonstrates:

### Two-Level Command Grouping Structure
- **Hardware Management** group containing hardware-related commands
- **Software Management** group containing software-related commands  
- **User Support** subgroup (nested under Software Management) for support operations

### IT Office Commands with Smart Visibility

#### Hardware Management Group
- **Install Hardware**: Initiates hardware installation workflow (always visible)
- **Retire Hardware**: Processes hardware retirement (visible when items are selected)
- **Request Repair**: Creates repair requests (visible when exactly one item is selected)

#### Software Management Group  
- **Install Software**: Opens software catalog for installation (always visible)
- **Update Software**: Schedules software updates (visible when items are selected)

#### User Support Subgroup (under Software Management)
- **Create Support Ticket**: Redirects to support ticket system (always visible)
- **Remote Assistance**: Initiates remote assistance session (visible when exactly one item is selected)

### Technical Features
- SharePoint Framework ListView Command Set grouping
- Dynamic command visibility based on item selection state
- Localized strings for internationalization
- Custom SVG icons for professional appearance
- Configurable properties for IT office integration

## Configuration

The command set accepts the following properties:
- `itHelpDeskEmail`: IT help desk email address
- `assetManagementSystem`: Asset management system URL  
- `supportTicketUrl`: Support ticket system URL

## Command Visibility Logic

Commands intelligently show/hide based on user selection:
- **Always visible**: Install Hardware, Install Software, Create Support Ticket
- **Visible when items selected**: Retire Hardware, Update Software
- **Visible when exactly one item selected**: Request Repair, Remote Assistance

This extension illustrates the following concepts:

- ListView Command Set grouping (SPFx v1.23+ feature)
- Two-level command hierarchy with groups and subgroups
- Dynamic command visibility based on selection state
- IT office workflow integration
- Localized command strings
- Custom SVG icons and professional styling

## References

- [Grouping support with ListView Command Set extension](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/guidance/list-view-command-set-grouping)
- [Build your first ListView Command Set extension](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/building-simple-cmdset-with-dialog-api)
- [Getting started with SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [Heft Documentation](https://heft.rushstack.io/)