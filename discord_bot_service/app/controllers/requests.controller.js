import Requests from "../models/requests.model.js";

let getAll = (req, res) => {
    const route = req.query.route;
    Requests.getAll(route, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occured while retrieving the requests."
            });
        } else {
            res.send(data);
        }
    })
};

export default getAll(req, res);