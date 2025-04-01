const express = require("express");
const path = require("path");
const fs = require("fs");
const { STATUS_CODE } = require("../constants/statusCode");
const { renderNewProductPage } = require("../views/renderNewProductPage");

const router = express.Router();


router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "add-product.html"));
});


router.post("/add", (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const formData = parsedBody.split("&").map((entry) => {
      const [key, value] = entry.split("=");
      return `${key}: ${decodeURIComponent(value)}`;
    });


    fs.writeFile("product.txt", formData.join(", "), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Error writing file.");
        return;
      }


      res.status(STATUS_CODE.FOUND);
      res.setHeader("Location", "/product/new");
      res.end();
    });
  });
});


router.get("/new", (req, res) => {
  fs.readFile(path.join(__dirname, "../product.txt"), "utf-8", (err, data) => {
    if (err || !data) {
      res.send("<h1>No new products available.</h1>");
      return;
    }


    renderNewProductPage(res, data);
  });
});

module.exports = router;
