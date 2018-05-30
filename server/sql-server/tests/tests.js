// Owner: Filip Mandic (mandula8)

// Summary: This file contains tests which are used to test database and all queries written to this date
// File will be used and modified only by the owner

var db = require('./../database-interface');

tests = {
    insertUser: function(){
        var fun = 'test Insert new user';
        var callbackTest = function(exprectedStatus){
            return function(status, email, username, confirmationCode) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log('email: ' + email);
                    console.log('username: ' + username);
                    console.log('confirmationCode: ' + confirmationCode);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['filipmandic80@gmail.com', 'Dragana', '545455454554', '656566566555', '545616616161614535'],
            ['MacOsmail@dd', 'Andrija', '454544545455', '848484848484', '5456166161542'],
            ['filipmandic26@gmail.com', 'Janko', '156164231515510', '54561661616161', '5656116151161']
        ]

        db.createNewUser('filipmandic80@gmail.com', 'Dragana', '545455454554', '656566566555', '54561661535',
                         callbackTest('EmailTaken'));
        db.createNewUser('MacOsmail@dd', 'Andrija', '454544545455', '848484848484', '5456166161542',
                         callbackTest('UsernameTaken'));
        db.createNewUser('filipmandic26@gmail.com', 'Janko', '156164231515510', '54561661616161', '5656116151161',
                         callbackTest('Success'));
    },
    getSaltUsername: function(){
        var fun = 'getting salt from user';
        var callbackTest = function(exprectedStatus){
            return function(status, salt) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log('salt: ' + salt);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['Marko'],
            ['Nikola'],
            ['Dragana']
        ]

        db.getSaltByUsername('Dragana', callbackTest('UserNotRegistered'));
        db.getSaltByUsername('Marko', callbackTest('Success'));
        db.getSaltByUsername('Nikola', callbackTest('Success'));
    },
    changePassword: function(){
        var fun = 'test change password';
        var callbackTest = function(exprectedStatus){
            return function(status) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['Dragana', '8461614611', '545455454554', '656566566555', '545616616161614535'],
            ['Andrija', '4561511111561', '454544545455', '848484848484', '5456166161542'],
            ['Andrija', '123456789123456789aaaffccddd', '0123456789abcdef', '5656116151161']
        ]

        db.changePassword('Perica', '156164231515510', '54561661616161', '848444644664464',
                          callbackTest('UserNotRegistered'));
        db.changePassword('Andrija', '156164231515510', '54561661616161', '848444644664464',
                          callbackTest('PasswordNoMatch'));
        db.changePassword('Andrija', '123456789aaaffccddd', '0123456789abcdef', '5656116151161',
                          callbackTest('Success'));
    },
    changeUsername: function(){
        var fun = 'test change username';
        var callbackTest = function(exprectedStatus){
            return function(status) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['Dragana', 'Dragan', '545455454554'],
            ['Andrija', 'Filip', '454544545455'],
            ['Andrija', 'Dajana', '4654564654644646'],
            ['Andrija', 'Dajana','123456789123456789aaaffccddd']
        ]

        db.changeUsername('Dragana', 'Dragan', callbackTest('UserNotRegistered'));
        db.changeUsername('Andrija', 'Filip', callbackTest('UsernameTaken'));
        db.changeUsername('Andrija', 'Dajana', callbackTest('Success'));
    },
    passwordRecovery: function(){
        var fun = 'password recovery request';
        var callbackTest = function(exprectedStatus){
            return function(status, salt) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log('salt: ' + salt);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['linux@etf.rs', 'linuxresetujesvojusifru'],
            ['jelena6@gmail.com', 'jelenaresetujesvojusifru'],
            ['milica6@gmail.com', 'milicaresetujesvojusifru']
        ]

        db.createPasswordRecoveryRequest('linux@etf.rs', 'linuxresetujesvojusifru',
                                         callbackTest('UserNotRegistered'));
        db.createPasswordRecoveryRequest('jelena6@gmail.com', 'jelenaresetujesvojusifru',
                                         callbackTest('Success'));
        db.createPasswordRecoveryRequest('milica6@gmail.com', 'milicaresetujesvojusifru',
                                         callbackTest('Success'));
    },
    getSaltEmail: function(){
        var fun = 'selecting salt by email';
        var callbackTest = function(exprectedStatus){
            return function(status, salt) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log('salt: ' + salt);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['Dragana6@gmail.com'],
            ['Nikola7@gmail.com'],
            ['Marko6@gmail.com']
        ]

        db.getSaltByEmail('Dragana6@gmail.com', callbackTest('UserNotRegistered'));
        db.getSaltByEmail('Nikola7@gmail.com', callbackTest('UserNotRegistered'));
        db.getSaltByEmail('Marko6@gmail.com', callbackTest('Success'));
    },
    verifyWithUsername: function(){
        var fun = 'verification of user with username';
        var callbackTest = function(exprectedStatus){
            return function(status, bannDate) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status + " " + bannDate);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log(bannDate);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['Dragana', 'tralalalalala'],
            ['jelena', 'tralalalalalala'],
            ['Nikola', 'aaaaaaaaafffffdddddcdccc']
        ]

        db.verifyUserByUsername('Dragana', 'tralalalalala', callbackTest('UserNotRegistered'));
        db.verifyUserByUsername('jelena', 'tralalalalalala', callbackTest('PasswordNoMatch'));
        db.verifyUserByUsername('jovan', 'dcdcdcdccdc4dc45d564', callbackTest('UserBanned'));
        db.verifyUserByUsername('Nikola', 'aaaaaaaaafffffdddddcdccc', callbackTest('Success'));
    },
    verifyWithEmail: function(){
        var fun = 'verification of user with email';
        var callbackTest = function(exprectedStatus){
            return function(status, bannDate) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status + " " + bannDate);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log(bannDate);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['Dragana6@gmail.com', 'tralalalalala'],
            ['jelena6@gmail.com', 'tralalalalalala'],
            ['Nikola6@gmail.com', 'aaaaaaaaafffffdddddcdccc']
        ]

        db.verifyUserByEmail('Dragana6@gmail.com', 'tralalalalala', callbackTest('UserNotRegistered'));
        db.verifyUserByEmail('jelena6@gmail.com', 'tralalalalalala', callbackTest('PasswordNoMatch'));
        db.verifyUserByEmail('jovan6@gmail.com', 'dcdcdcdccdc4dc45d564', callbackTest('UserBanned'));
        db.verifyUserByEmail('Nikola6@gmail.com', 'aaaaaaaaafffffdddddcdccc', callbackTest('Success'));
    },
    insertTokenUsername: function(){
        var fun = 'inserting token by username';
        var callbackTest = function(exprectedStatus){
            return function(status, flag) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status + " " + flag);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    if (flag) console.log("reactivated");
                    else console.log("without reactivating");
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['Dragana', 'mdiemdoemddoi'],
            ['Milica', 'aaabbbccccccc'],
            ['Jovan', 'aaabbbccccccd']
        ]

        db.assignTokenByUsername('Dragana', 'mdiemdoemddoi', callbackTest('UserNotRegistered'));
        db.assignTokenByUsername('Milica', 'aaabbbccccccc', callbackTest('Success'));
        db.assignTokenByUsername('Jovan', 'aaabbbccccccd', callbackTest('Success'));
    },
    insertTokenEmail: function(){
        var fun = 'inserting token by email';
        var callbackTest = function(exprectedStatus){
            return function(status, flag) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status + " " + flag);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    if (flag) console.log("reactivated");
                    else console.log("without reactivating");
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['Dragana6@gmail.com', 'mdiemdoemddoi'],
            ['Milica6@gmail.com', 'aaabbbaaacccc'],
            ['Jovan6@gmail.com', 'aaabbbaaacccd']
        ]

        db.assignTokenByEmail('Dragana6@gmail.com', 'mdiemdoemddoi', callbackTest('UserNotRegistered'));
        db.assignTokenByEmail('jelena6@gmail.com', 'aaabbbaaacccc', callbackTest('Success'));
        db.assignTokenByEmail('petar6@gmail.com', 'aaabbbaaacccz', callbackTest('Success'));
    },
    verifyRegWithUsername: function(){
        var fun = 'verifying registration with username';
        var callbackTest = function(exprectedStatus){
            return function(status) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['Dragana', '5656116151161'],
            ['Marko', '5181111818181818'],
            ['Marko', 'aapotvrdimarkosvojnalog686868'],
            ['Marko', 'aapotvrdimarkosvojnalog686868']
        ]

        db.verifyRegistrationByUsername('Dragana', '5656116151161', callbackTest('UserNotRegistered'));
        db.verifyRegistrationByUsername('Marko', '5181111818181818', callbackTest('UserNotConfirmed'));
        db.verifyRegistrationByUsername('Marko', 'aapotvrdimarkosvojnalog686868', callbackTest('Success'));
        db.verifyRegistrationByUsername('Jelena', 'aapotvrdimarkosvojnalog686868', callbackTest('Success'));
    },
    verifyRegWithEmail: function(){
        var fun = 'verifying registration with email';
        var callbackTest = function(exprectedStatus){
            return function(status) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['dragana6@gmailcom', '5656116151161'],
            ['marko6@gmailcom', '5181111818181818'],
            ['marko6@gmailcom', 'aapotvrdimarkosvojnalog686868'],
            ['jelena6@gmailcom', 'aapotvrdimarkosvojnalog686868']
        ]

        db.verifyRegistrationByEmail('dragana6@gmail.com', '5656116151161', callbackTest('UserNotRegistered'));
        db.verifyRegistrationByEmail('marko6@gmail.com', '5181111818181818', callbackTest('UserNotConfirmed'));
        db.verifyRegistrationByEmail('marko6@gmail.com', 'aapotvrdimarkosvojnalog686868', callbackTest('Success'));
        db.verifyRegistrationByEmail('jelena6@gmail.com', 'aapotvrdimarkosvojnalog686868', callbackTest('Success'));
    },
    gettingUsernameByToken: function(){
        var fun = 'getting token by username';
        var callbackTest = function(exprectedStatus){
            return function(status, username) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log('username: ' + username);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['5656116151161'],
            ['aaabbbcccdddb'],
            ['aaabbbcccdddb']
        ]

        db.getUsernameByToken('5656116151161', callbackTest('TokenNoMatch'));
        db.getUsernameByToken('aaabbbcccdddb', callbackTest('Success'));
        db.getUsernameByToken('aaabbbcccdddb', callbackTest('Success'));
    },
    removingToken: function(){
        var fun = 'removing token';
        var callbackTest = function(exprectedStatus){
            return function(status) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['5656116151161'],
            ['aaabbbcccdddb'],
            ['aaabbbcccdddb']
        ]

        db.removeToken('5656116151161', callbackTest('TokenNoMatch'));
        db.removeToken('aaabbbcccdddb', callbackTest('Success'));
        db.removeToken('aaabbbcccddde', callbackTest('Success'));
    },
    resetPasswordTest: function() {
        var fun = 'reset password';
        var callbackTest = function(exprectedStatus){
            return function(status, username) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['5656116151161', '1234554321', '6789009876'],
            ['jovanresetujesvojusifru', '1234554321', '6789009876'],
            ['jelenaresetujesvojusifru', 'aaabbbaaaccccaaa', 'aaabbbcccdddbbbbd']
        ]

        db.resetPassword('5656116151161',  '1234554321', '6789009876', callbackTest('RequestCodeNoMatch'));
        db.resetPassword('jovanresetujesvojusifru',  '1234554321', '6789009876', callbackTest('Success'));
        db.resetPassword('jelenaresetujesvojusifru', 'aaabbbaaaccccaaa', 'aaabbbcccdddbbbbd', callbackTest('Success'));
    },
    deactivateAccountTest: function() {
        var fun = 'deactivate account';
        var callbackTest = function(exprectedStatus){
            return function(status, userSessionTokens) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log(userSessionTokens);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['5656116151161'],
            ['aaabbbcccdddg'],
            ['aaabbbcccdddl']
        ]

        db.deactivateAccount('5656116151161', callbackTest('TokenNoMatch'));
        db.deactivateAccount('aaabbbcccdddf', callbackTest('Success'));
        db.deactivateAccount('aaabbbcccdddl', callbackTest('Success'));
    },
    checkUsername: function() {
        var fun = 'username check';
        var callbackTest = function(exprectedStatus){
            return function(status) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['Dragana'],
            ['Milica'],
            ['Jovan']
        ]

        db.checkIfUserExists('Dragana', callbackTest('UsernameNotExists'));
        db.checkIfUserExists('Milica', callbackTest('Success'));
        db.checkIfUserExists('Jovan', callbackTest('Success'));
    },
    selectingStatistics: function() {
        var fun = 'selecting statistics';
        var callbackTest = function(exprectedStatus, metric){
            return function(status, rows, maxRow) {
                if (status === exprectedStatus)
                    console.log('PASS  ' + fun + ': ' + status + ' ' + 'metric:' + metric + '\n');
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log();
                }
            };
        };

        var data1 = {
            mode: 'user',
            username: 'Jelena'
        }

        var data2 = {
            mode: 'user',
            username: 'Nemanja'
        }

        var data3 = {
            mode: 'user',
            username: 'Nikola'
        }

        var data4 = {
            mode: 'position',
            start: -2
        }

        var data5 = {
            mode: 'position',
            start: 3
        }

        var data6 = {
            mode: 'position',
            start: 12
        }


        var test_ulazi = [
            ['games_played_count', 10, data1],
            ['games_won_count', 10, data2],
            ['games_won_count', 10, data3]
        ]
        db.getStatisticsForUser('Games Won Percentage', 1, data1.username,
            callbackTest('Success', 'Games Won Percentage'));
        db.getStatisticsForUser('Games Won', 2, data2.username, callbackTest('Success', 'Games Won'));
        db.getStatisticsForUser('Games Won', 3, data3.username, callbackTest('Success', 'Games Won'));

        db.getStatisticsForPosition('Games Won Percentage', 4, data4.start,
            callbackTest('Success', 'Games Won Percentage'));
        db.getStatisticsForPosition('Games Played', 5, data5.start, callbackTest('Success', 'Games Played'));
        db.getStatisticsForPosition('Games Won', 5, data6.start, callbackTest('Success', 'Games Won'));
    },
    bannUser: function() {
        var fun = 'bann user';
        var callbackTest = function(exprectedStatus){
            return function(status) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['Dragana', new Date('2018-07-10T17:00:00')],
            ['Milica', new Date('2018-07-10T17:00:00')],
            ['Jovan', new Date('2018-07-10T17:00:00')]
        ]

        db.bannUser('Dragana', new Date('2018-07-10T17:00:00'), callbackTest('UserNotFound'));
        db.bannUser('Milica', new Date('2018-07-10T17:00:00'), callbackTest('Success'));
        db.bannUser('Jelena', new Date('2018-07-10T17:00:00'), callbackTest('Success'));
    },
    insertStatistics: function() {
        var fun = 'bann user';
        var callbackTest = function(exprectedStatus){
            return function(status) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                    console.log('expected status: ' + exprectedStatus);
                    console.log('status: ' + status);
                    console.log();
                }
            };
        };

        var test_ulazi = [
            ['Dragana', 'Won'],
            ['Milica', 'Won'],
            ['Jovan', 'Lost']
        ]

        db.insertStatisticsForPlayer('Dragana', 'Won', callbackTest('UserNotFound'));
        db.insertStatisticsForPlayer('Milica', 'Won', callbackTest('Success'));
        db.insertStatisticsForPlayer('Jelena', 'Lost', callbackTest('Success'));
    },
    removeOldBannsTest: function() {
        var fun = 'bann user';
        var callbackTest = function(exprectedStatus){
            return function(status) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                };
            };
        }
        db.removeOldBanns(callbackTest('Success'));
    },
    removeOldTokens: function() {
        var fun = 'bann user';
        var callbackTest = function(exprectedStatus){
            return function(status) {
                if (status === exprectedStatus) console.log('PASS  ' + fun + ': ' + status);
                else{
                    console.log('FAIL ' + fun);
                };
            };
        }
        db.removeOldTokens(callbackTest('Success'));
    }

};

// test all
// for (var test in tests){
//     tests[test]();
// }

// test specific
tests.removeOldTokens();
