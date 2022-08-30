const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const {
  validationBody,
  isValidId,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contactModel");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validationBody(schemas.joiAddContactSchema),
  ctrlWrapper(ctrl.add)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:id",
  authenticate,
  isValidId,
  validationBody(schemas.joiAddContactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validationBody(schemas.joiUpdateContactFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
