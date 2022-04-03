import { param, body, validationResult } from "express-validator";

const userIdPattern = /^.{3,32}#[0-9]{4}$/;
const dateTimePattern =
  /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;

export const createCommitmentValidation = [
  param("userId").exists().matches(userIdPattern),
  body("location").exists(),
  body("name").exists(),
  body("notes").exists(),
  body("repeats").isArray(),
  body("repeats.*").isIn(["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"]),
  body("url").exists(),
  body("startTime").matches(dateTimePattern),
  body("endDate").matches(dateTimePattern),
  body("minutes").isInt(),
];

export const updateCommitmentValidation = [
  param("userId").exists().matches(userIdPattern),
  param("commitmentId").exists().isUUID(),
  body("location").exists(),
  body("name").exists(),
  body("notes").exists(),
  body("repeats").isArray(),
  body("repeats.*").isIn(["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"]),
  body("url").exists(),
  body("startTime").matches(dateTimePattern),
  body("endDate").matches(dateTimePattern),
  body("minutes").isInt(),
];

export const createGoalValidation = [
  param("userId").exists().matches(userIdPattern),
  body("location").exists(),
  body("name").exists(),
  body("notes").exists(),
  body("url").exists(),
  body("priority").isInt(),
  body("totalTimeInMinutes").isInt(),
  body("deadline").isDate(),
];

export const updateGoalValidation = [
  param("userId").exists().matches(userIdPattern),
  param("goalId").exists().isUUID(),
  body("location").exists(),
  body("name").exists(),
  body("notes").exists(),
  body("url").exists(),
  body("priority").isInt(),
  body("totalTimeInMinutes").isInt(),
  body("deadline").matches(dateTimePattern),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
