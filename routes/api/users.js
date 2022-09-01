const express = require("express");

const ctrl = require("../../controllers/users");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/userModel");

const router = express.Router();

router.post(
  "/signup",
  validationBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validationBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.current));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/",
  authenticate,
  validationBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
