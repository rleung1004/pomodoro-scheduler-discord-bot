import sql from "./db.js";

const Requests = function (request) {
  (this.route = request.route), (this.count = request.count);
};

Requests.getAll = (result) => {
  let query = "SELECT * FROM request";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    if (res.length) {
      console.log("found requests: ", res);
      result(null, res);
      return;
    }
    // else not found:
    result({ kind: "not_found" }, null);
  });
};

export default Requests;
