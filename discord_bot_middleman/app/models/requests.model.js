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

Requests.createEntry = (route, result) => {
  sql.query(
    "INSERT INTO request(route, count) VALUES(?, 1)",
    route,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      console.log("created route: ", res);
      result(null, res);
    }
  );
};

Requests.incrementRoute = (route, result) => {
  sql.query(
    "UPDATE request SET count = count + 1 WHERE route = ?",
    route,
    (err, res) => {
      if (res.affectedRows === 0) {
        Requests.createEntry(route, (err, res) => {
          result(null, res);
        });
        return;
      }
      result(null, res);
    }
  );
};

export default Requests;
