import { param, body, validationResult } from "express-validator";

const userIdPattern = /^.{3,32}#[0-9]{4}$/;
const dateTimePattern =
  /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;

export const getAllCommitmentsValidation = [
  param("userId").isString().matches(userIdPattern),
];

export const createCommitmentValidation = [
  param("userId").isString().matches(userIdPattern),
  body("location").isString(),
  body("name").isString(),
  body("notes").isString(),
  body("repeats").isArray(),
  body("repeats.*").isIn(["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"]),
  body("url").isString(),
  body("startTime").matches(dateTimePattern),
  body("endDate").matches(dateTimePattern),
  body("minutes").isInt(),
];

export const updateCommitmentValidation = [
  param("userId").isString().matches(userIdPattern),
  param("commitmentId").isString().isUUID(),
  body("location").isString(),
  body("name").isString(),
  body("notes").isString(),
  body("repeats").isArray(),
  body("repeats.*").isIn(["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"]),
  body("url").isString(),
  body("startTime").matches(dateTimePattern),
  body("endDate").matches(dateTimePattern),
  body("minutes").isInt(),
];

export const deleteCommitmentValidation = [
  param("userId").isString().matches(userIdPattern),
  param("commitmentId").isString().isUUID(),
];

export const getAllGoalsValidation = [
  param("userId").isString().matches(userIdPattern),
];

export const createGoalValidation = [
  param("userId").isString().matches(userIdPattern),
  body("location").isString(),
  body("notes").isString(),
  body("name").isString(),
  body("totalTime").isInt(),
  body("timeLeft").isInt(),
  body("priority").isInt(),
  body("endDate").isString().matches(dateTimePattern),
  body("minTaskTime").isInt(),
  body("ignoreDeadline").isBoolean(),
];

export const updateGoalValidation = [
  param("userId").isString().matches(userIdPattern),
  param("goalId").isString().isUUID(),
  body("location").isString(),
  body("notes").isString(),
  body("name").isString(),
  body("totalTime").isInt(),
  body("timeLeft").isInt(),
  body("priority").isInt(),
  body("endDate").isString().matches(dateTimePattern),
  body("minTaskTime").isInt(),
  body("ignoreDeadline").isBoolean(),
];

export const deleteGoalValidation = [
  param("userId").isString().matches(userIdPattern),
  param("goalId").isString().isUUID(),
];

export const createUserConfigValidation = [
  param("userId").isString().matches(userIdPattern),
  body("start").isInt(),
  body("end").isInt(),
];

export const updateUserConfigValidation = [
  param("userId").isString().matches(userIdPattern),
  param("dayOfWeek").isInt(),
  body("start").isInt(),
  body("end").isInt(),
  body("breaks").isArray(),
  body("breaks.*").isInt(),
  body("blockSize").isInt(),
  body("interleaves").isInt(),
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
