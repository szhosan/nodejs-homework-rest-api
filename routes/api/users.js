const express = require("express");

const ctrl = require("../../controllers/users");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, authenticate } = require("../../middlewares");

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
module.exports = router;
