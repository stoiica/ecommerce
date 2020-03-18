function fetchProducts(connection, amount, category) {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from product where product_category = '${category}' order by id limit ${amount}`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

module.exports = {
  fetchProducts
};
