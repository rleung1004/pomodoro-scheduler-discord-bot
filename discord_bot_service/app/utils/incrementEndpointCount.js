import Requests from "../models/requests.model.js";

export const incrementEndpointCount = (req, res, next) => {
  const route = `${req.method} ${req.baseUrl}`;
  Requests.incrementRoute(route, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving the schedule.",
      });
      return;
    }
    next();
  });
};
