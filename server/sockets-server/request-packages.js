// Owner: Andrija Cicovic (cicovic-andrija)

// Summary: The list of all request packages IDs.

requestPackages = [
    {
        id:'updateAccount',
        file:'./update-account-handler.js',
    },
    {
        id:'passwordRecovery',
        file:'./password-recovery-handler.js',
    },
    {
        id:'pageInit',
        file:'./page-init-handler.js',
    },
    {
        id:'signIn',
        file:'./sign-in-handler.js',
    },
    {
        id:'signOut',
        file:'./sign-out-handler.js',
    },
    {
        id:'signUp',
        file:'./sign-up-handler.js',
    },
    {
        id:'passwordReset',
        file:'./password-reset-handler.js',
    },
    {
        id:'createGameRoom',
        file:'./create-game-room-handler.js',
    },
    {
        id:'selectGameRoom',
        file:'./select-game-room-handler.js',
    },
    {
        id:'sendMessage',
        file:'./send-message-handler.js',
    },
    {
        id:'gameCommand',
        file:'./game-commands-receiver.js',
    }
];

module.exports = requestPackages;
