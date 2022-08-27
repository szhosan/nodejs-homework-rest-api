const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contactModel");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  validationBody(schemas.joiAddContactSchema),
  ctrlWrapper(ctrl.add)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:id",
  isValidId,
  validationBody(schemas.joiAddContactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validationBody(schemas.joiUpdateContactFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
