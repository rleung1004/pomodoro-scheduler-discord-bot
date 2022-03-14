import mysql from "mysql";
import dbConfig from "../config/db.config.js";

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

const dbConnect = () => {
  connection.connect((error) => {
    if (error) throw error;
    console.log("Successfully connected to the database");
  });

  connection.on("error", (err) => {
    console.log("[SQL Error]: ", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      dbConnect();
    }
  });
};

dbConnect();

export default connection;
