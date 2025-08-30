# This script updates the properties of the NotificationApplicationCustomizer using PnP PowerShell
# Usage example:
#   .\configureApplicationCustomizer.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/yoursite" -ClientSideComponentId "<GUID>" -ListId "<your-list-guid>"

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl,

    [Parameter(Mandatory=$true)]
    [string]$ClientSideComponentId,

    [Parameter(Mandatory=$true)]
    [string]$ListId
)

# Build the properties JSON for NotificationApplicationCustomizer
$properties = @{ listId = $ListId }
$propertiesJson = $properties | ConvertTo-Json -Compress

# Connect to the SharePoint site
Connect-PnPOnline -Url $SiteUrl -Interactive

# Get the custom action for the NotificationApplicationCustomizer
$customAction = Get-PnPCustomAction -Scope Site | Where-Object { $_.ClientSideComponentId -eq $ClientSideComponentId }

if ($null -eq $customAction) {
    Write-Error "Custom action with ClientSideComponentId $ClientSideComponentId not found."
    exit 1
}

# Update the properties
Set-PnPCustomAction -Identity $customAction.Id -Scope Site -ClientSideComponentProperties $propertiesJson

Write-Host "NotificationApplicationCustomizer properties updated successfully."
