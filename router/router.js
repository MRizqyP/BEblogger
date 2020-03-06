module.exports = function(app) {
  const verifySignUp = require("./verifySignUp");
  const authJwt = require("./verifyJwtToken");
  const authController = require("../controller/authController.js");
  const userController = require("../controller/userController.js");
  const artikelController = require("../controller/artikelController.js");
  const komentarController = require("../controller/komentarController");
  //   const orderController = require("../controller/orderController.js");
  //   const {
  //     bookValidationRules,
  //     userValidationRules,
  //     validate
  //   } = require("../controller/validator.js");
  const db = require("../app/db");
  const Book = db.book;
  const express = require("express");

  app.use(express.json());

  /* LOGIN & REGISTER */
  app.post(
    "/register",
    // [
    //   userValidationRules(),
    //   validate,
    //   verifySignUp.checkDuplicateUserNameOrEmail,
    //   verifySignUp.checkRolesExisted
    // ],
    authController.signup
  );
  app.post("/login", authController.signin);
  /* LOGIN & REGISTER */

  /* Peruseran */
  app.get("/api/users", [authJwt.verifyToken], userController.users);
  app.get("/api/user/:id", [authJwt.verifyToken], userController.userContent);
  app.put("/blockuser/:id", [authJwt.verifyToken], userController.blockUser);

  /* Peruseran */

  /*perartikelan*/
  app.post(
    "/buatartikel",
    [authJwt.verifyToken],
    artikelController.buatArtikel
  );

  app.get("/artikel", artikelController.showsArtikel);
  app.get("/artikel/:id", [authJwt.verifyToken], artikelController.showArtikel);
  app.put("/artikel/:id", [authJwt.verifyToken], artikelController.ubahArtikel);

  app.get("/artikell/:id", artikelController.showArtikelId);
  app.delete("/artikel", artikelController.hapusArtikel);

  /*perkomenan*/

  app.post("/komentar", komentarController.buatKomentar);
  app.delete("/komentar", komentarController.hapusKomentar);
  app.put("/komentar/:id", komentarController.blokKomentar);

  // app.post("/upload", )

  //   app.delete(
  //     "/books/:id",
  //     [authJwt.verifyToken, authJwt.isAdmin],
  //     bookController.hapusBuku
  //   );

  //   app.get("/orders", [authJwt.verifyToken], orderController.liatsemuaOrder);

  //   app.get("/orders/:id", [authJwt.verifyToken], orderController.liatOrder);

  //   app.post("/orders", [authJwt.verifyToken], orderController.buatOrder);
  //   app.get(
  //     "/api/test/pm",
  //     [authJwt.verifyToken, authJwt.isPmOrAdmin],
  //     userController.managementBoard
  //   );
  //   app.get(
  //     "/api/test/admin",
  //     [authJwt.verifyToken, authJwt.isAdmin],
  //     userController.adminBoard
  //   );
  // error handler 404
  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });
  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};
