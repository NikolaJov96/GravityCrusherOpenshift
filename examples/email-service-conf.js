// Summary: E-mail sender configuration.

// Important note: Since this file contains the configuration of the mail
// service, which includes an e-mail address and a password, this file will
// not be stored in an online repository, but distributed between the team
// members via other means. The owner of the file will sync. with other team
// members each time this file is updated.
// This solution will be at power until the owner thinks of a better one.

// If you are a team member, put this file in:
// <project_root>/server/sockets-server/

var emailServiceConfiguration = {
    service: 'email_service_name', // example: gmail
    auth: {
        user: 'email_address@email_service.domain',
        pass: 'some_password',
    },
};

module.exports = emailServiceConfiguration;

