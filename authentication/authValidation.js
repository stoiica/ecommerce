function validateLogin(connection, username, password) {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from users where username = '${username}' and password = '${password}';`,
      (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          if (rows.length == 1) {
            return resolve(1);
          } else {
            return resolve(0);
          }
        }
      }
    );
  });
}

function validateRegister(connection, username, password) {
  return new Promise((resolve, reject) => {
    connection.query(
      `insert into users values(NULL, '${username}', '${password}');`,
      (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          return resolve();
        }
      }
    );
  });
}

module.exports = {
  validateLogin,
  validateRegister
};
