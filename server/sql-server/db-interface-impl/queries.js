// Owner: Filip Mandic (mandula8)

// Summary: All the mySQL queries used in application\

module.exports = {

    //input username, email, password_hash, password_salt
    insertUser : "INSERT INTO user(username, email, password_hash, password_salt) VALUES (?, ?, ?, ?)",

    //input username, confirm_code
    insertNotConfirmedUser : "INSERT INTO user_not_confirmed(id_not_confirmed, confirm_code) VALUES ((SELECT id FROM user WHERE username = ?), ?)",

    //input email
    checkIfEmailExists : "SELECT * FROM user WHERE email = ?",

    //input username
    checkIfUsernameExists : "SELECT * FROM user WHERE username = ?",

    //input id from user
    checkIsNotConfirm : "SELECT * FROM user_not_confirmed WHERE id_not_confirmed = ?",

    //input id from user
    getConfirmCode: "SELECT * FROM user_not_confirmed WHERE id_not_confirmed = ?",

    //input id
    deleteFromUserNotConfirmed: "DELETE FROM user_not_confirmed WHERE id_not_confirmed = ?",

    //input username
    getUserSalt: "SELECT * FROM user WHERE username = ?",

    //input password_hash, password_salt
    setNewPasswordAndSalt: "UPDATE user SET password_hash = ?, password_salt = ? WHERE id = ?",

    //input username, bann date
    bannUser : "INSERT INTO user_banned(id_bann, bann_date) VALUES ((select id FROM user WHERE username = ?), ?)",

    //input username
    disableUser : "INSERT INTO user_disabled(id) VALUES ((select id FROM user WHERE username = ?))",

    //input username
    getIdFromUsername : "SELECT id from user WHERE username = ?",

    //input username
    checkIfUserCanSignIn : "SELECT id from user WHERE username = ?",

}

//osmisliti i ispisati sql za jos dosta user-a

//osmisliti i ispisati sql za jos dosta user-a
