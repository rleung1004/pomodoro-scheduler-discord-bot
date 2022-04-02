import { checkSchema, validationResult } from "express-validator";

const createCommitmentValidation = () => {
  return checkSchema({
    userId: {
      in: "query",
      errorMessage: "User ID is not valid UUID",
      isString: true,
      isUUID: true,
    },
    location: {
      in: "body",
      errorMessage: "Location is not provided",
    },
    name: {
      in: "body",
      errorMessage: "Name is not provided",
    },
    notes: {
      in: "body",
      errorMessage: "Notes is not provided",
    },
    repeats: {
      in: "body",
      errorMessage: "Repeats must be provided",
      isArray: true,
      isIn: {
        options: [["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"]],
        errorMessage: "Invalid repeat found in repeats list",
      },
    },
    url: {
      in: "body",
      errorMessage: "URL is not provided",
    },
    startTime: {
      in: "body",
      errorMessage: "Invalid start time provided",
      isDate: true,
    },
    endTime: {
      in: "body",
      errorMessage: "Invalid end time provided",
      isDate: true,
    },
  });
};

const updateCommitmentValidation = () => {
  return checkSchema({
    userId: {
      in: "query",
      errorMessage: "User ID is not valid UUID",
      isString: true,
      isUUID: true,
    },
    commitmentId: {
      in: "query",
      errorMessage: "Commitment ID is not valid UUID",
      isString: true,
      isUUID: true,
    },
    location: {
      in: "body",
      errorMessage: "Location is not provided",
    },
    name: {
      in: "body",
      errorMessage: "Name is not provided",
    },
    notes: {
      in: "body",
      errorMessage: "Notes is not provided",
    },
    repeats: {
      in: "body",
      errorMessage: "Repeats must be provided",
      isArray: true,
      isIn: {
        options: [["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"]],
        errorMessage: "Invalid repeat found in repeats list",
      },
    },
    url: {
      in: "body",
      errorMessage: "URL is not provided",
    },
    startTime: {
      in: "body",
      errorMessage: "Invalid start time provided",
      isDate: true,
    },
    endTime: {
      in: "body",
      errorMessage: "Invalid end time provided",
      isDate: true,
    },
  });
};

const createGoalValidation = () => {
  return checkSchema({
    userId: {
      in: "query",
      errorMessage: "User ID is not valid UUID",
      isString: true,
      isUUID: true,
    },
    location: {
      in: "body",
      errorMessage: "Location is not provided",
    },
    name: {
      in: "body",
      errorMessage: "Name is not provided",
    },
    notes: {
      in: "body",
      errorMessage: "Notes is not provided",
    },
    url: {
      in: "body",
      errorMessage: "URL is not provided",
    },
    priority: {
      in: "body",
      errorMessage: "Priority integer must be provided",
      isInt: true,
    },
    totalTimeInMinutes: {
      in: "body",
      errorMessage: "Total time of the goal as an integer must be provided",
      isInt: true,
    },
    deadline: {
      in: "body",
      errorMessage: "Deadline date of goal must be provided",
      isDate: true,
    },
  });
};

const updateGoalValidation = () => {
  return checkSchema({
    userId: {
      in: "query",
      errorMessage: "User ID is not valid UUID",
      isString: true,
      isUUID: true,
    },
    goalId: {
      in: "query",
      errorMessage: "Goal ID is not valid UUID",
      isString: true,
      isUUID: true,
    },
    location: {
      in: "body",
      errorMessage: "Location is not provided",
    },
    name: {
      in: "body",
      errorMessage: "Name is not provided",
    },
    notes: {
      in: "body",
      errorMessage: "Notes is not provided",
    },
    url: {
      in: "body",
      errorMessage: "URL is not provided",
    },
    priority: {
      in: "body",
      errorMessage: "Priority integer must be provided",
      isInt: true,
    },
    totalTimeInMinutes: {
      in: "body",
      errorMessage: "Total time of the goal as an integer must be provided",
      isInt: true,
    },
    deadline: {
      in: "body",
      errorMessage: "Deadline date of goal must be provided",
      isDate: true,
    },
  });
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array.map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  createCommitmentValidation,
  updateCommitmentValidation,
  createGoalValidation,
  updateGoalValidation,
  validate,
};
