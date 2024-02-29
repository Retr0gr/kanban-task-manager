const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  deleteSingleUser,
  getSingleUser,
  showCUrrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router
  .route("/")
  .get(
    authenticateUser,
    authorizePermissions("admin", "moderator"),
    getAllUsers
  );

router
  .route("/deleteUser/:id")
  .delete(authenticateUser, authorizePermissions("admin"), deleteSingleUser);

router.route("/showMe").get(authenticateUser, showCUrrentUser);

router.route("/updateUser").patch(authenticateUser, updateUser);

router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
