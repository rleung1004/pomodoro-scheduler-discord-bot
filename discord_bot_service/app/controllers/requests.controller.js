import Requests from "../models/requests.model.js";

export default function getAll(req, res) {
  Requests.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "An error occured while retrieving the requests.",
      });
    } else {
      res.send(data);
    }
  });
}
