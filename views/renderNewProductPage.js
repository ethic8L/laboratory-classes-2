const fileSystem = require("fs");
const path = require("path");

const renderNewProductPage = (response) => {
  fileSystem.readFile(path.join(__dirname, "../product.txt"), "utf-8", (err, data) => {
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>Shop - Newest product</title></head>");
    response.write("<body>");
    response.write("<h1>Newest product</h1>");
    response.write(
      "<nav><a href='/'>Home</a><br /><a href='/product/add'>Add product</a><br /><a href='/logout'>Logout</a></nav>"
    );

    if (err || !data) {
      response.write("<br /><div>No new products available.</div>");
    } else {
      response.write(`<br /><div>New product data - ${data}</div>`);
    }

    response.write("</body>");
    response.write("</html>");
    return response.end();
  });
};

module.exports = { renderNewProductPage };
