# Connect to the admin portal
Connect-PnPOnline -Url "https://{your-domain}-admin.sharepoint.com" -Credentials: (Get-Credential)

# Set the target URL to the tenant property
Set-PnPStorageEntity -Key Sample:Settings -Value '{ "targetUrl": "{your-target-url}"}'