// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: Global application settings.

var appConfig = {
    webAppProtocol: 'http',
    domainName: 'localhost:8000',
    httpServerPort: 8000,
    socketsServerPort: 8001,
    passwordHashAlgorithm: 'sha512',
    passwordSaltLengthInBytes: 128
};

module.exports = appConfig;
