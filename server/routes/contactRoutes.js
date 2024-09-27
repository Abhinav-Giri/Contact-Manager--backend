const express = require("express");
const app = express();
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const {
  getContacts,
  getContact,
  postContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");

router.use(validateToken);

router.route("/").get(getContacts).post(postContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
