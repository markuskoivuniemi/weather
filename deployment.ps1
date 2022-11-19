#REMEMBER TO RUN "npm run build" BEFORE DEPLOYMENT

#Variables
$rgName = 'rg-mk-weather'
$location = 'northeurope'
$resourceNameFix = 'mk-weather'


#SCRIPT EXECUTION BEGINS HERE
$azCtx = Get-AzContext

if ($azCtx.Tenant.Id -ne '580e44e4-3c09-4663-b356-04029d29206b')
{
    Write-Host 'No valid Azure context found, connecting.'
    Connect-AzAccount -TenantId '580e44e4-3c09-4663-b356-04029d29206b' -SubscriptionId 'fb47d756-ad0c-4f3a-b36b-f24cac24b0e3' -UseDeviceAuthentication
}

$rg = Get-AzResourceGroup -Name $rgName -ErrorVariable rgNotPresent -ErrorAction SilentlyContinue

if ($rgNotPresent)
{
    Write-Host f"$rgName doesn't exist, creating it to location: $location."
    New-AzResourceGroup -Name $rgName -Location $location
}

$bicepParameters = @{
    location = $location
    resourceNameFix = $resourceNameFix
}

$bicepDeployment = New-AzResourceGroupDeployment -ResourceGroupName $rgName `
    -TemplateFile ./main.bicep `
    -TemplateParameterObject $bicepParameters

Compress-Archive -Path /Users/markusk/git/weather/weatherapp/build/* -DestinationPath /Users/markusk/git/weather/weatherapp/build/weatherapp.zip

Publish-AzWebApp -ResourceGroupName $rgName -Name app-mk-weather-01 -ArchivePath /Users/markusk/git/weather/weatherapp/build/weatherapp.zip
