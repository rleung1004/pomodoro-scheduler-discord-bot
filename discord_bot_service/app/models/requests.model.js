import sql from "./db.js";

const Requests = function (request) {
  (this.route = request.route), (this.count = request.count);
};

Requests.getAll = (route, result) => {
  let query = "SELECT * FROM request";
  if (route) {
    query += `WHERE route LIKE '%${route}'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    if (res.length) {
      console.log("found requests: ", res[0]);
      result(null, res[0]);
      return;
    }
    // else not found:
    result({ kind: "not_found" }, null);
  });
};

export default Requests;
