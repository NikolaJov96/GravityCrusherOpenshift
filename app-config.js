// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Global application settings.

var appConfig = {
    webAppProtocol: 'http',
    domainName: 'http://gravity-crusher-psi.193b.starter-ca-central-1.openshiftapps.com',
    httpServerPort: 8080,
    socketsServerPort: 8001,
    passwordHashAlgorithm: 'sha512',
    passwordSaltLengthInBytes: 128
};

module.exports = appConfig;
