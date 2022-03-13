const sql = require("./db.js");

const Commitment = function(commitment) {
    this.title = commitment.title,
    this.date = commitment.date,
    this.info = commitment.info
};

Commitment.create = (newCommitment, result) => {

    sql.query('UPDATE requests SET count = count + 1 WHERE route = "commitment/create";', (err, res) => {
        if (err) {
            throw err;
        }
    })

    sql.query("INSERT INTO commitment SET ?", newCommitment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created commitment: ", {
            id: res.insertId,
            ...newCommitment
        });
        result(null, {id: res.insertId, ...newCommitment});
    })
}

Commitment.findById = (id, result) => {

    sql.query('UPDATE requests SET count = count + 1 WHERE route = "commitment/findById";', (err, res) => {
        if (err) {
            throw err;
        }
    })

    sql.query(`SELECT * FROM commitments WHERE id = ${id}`, (err, res) =>{
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            console.log("found commitment: ", res[0]);
            result(null, res[0]);
            return;
        }
        // else not found:
        result({kind: "not_found"}, null);
    });
}

Commitment.getAll = (title, result) => {
    let query = "SELECT * FROM commitments";
    if (title) {
        query += `WHERE title LIKE '%${title}'`;
    }

    sql.query('UPDATE requests SET count = count + 1 WHERE route = "commitment/getAll";', (err, res) => {
        if (err) {
            throw err;
        }
    })

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            console.log("found commitment: ", res[0]);
            result(null, res[0]);
            return;
        }
        // else not found:
        result({kind: "not_found"}, null);
    });
}

module.exports = Commitment;
