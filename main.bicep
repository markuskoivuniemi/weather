param location string
param resourceNameFix string

var webAppName = 'app-${resourceNameFix}-01'

var appServicePlanName = toLower('AppServicePlan-${webAppName}')
var webSiteName = toLower('${webAppName}')
var webAppSku = 'F1' // F1=Free
var linuxFxVersion = 'node|18-lts' // Runtime stack

resource appServicePlan 'Microsoft.Web/serverfarms@2020-06-01' = {
  name: appServicePlanName
  location: location
  properties: {
    reserved: true
  }
  sku: {
    name: webAppSku
  }
  kind: 'linux'
}
resource appService 'Microsoft.Web/sites@2020-06-01' = {
  name: webSiteName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: linuxFxVersion
      appCommandLine: 'pm2 serve /home/site/wwwroot --no-daemon'
    }
  }
}
