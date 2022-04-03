import sql from "./db.js";

const NUM_OF_DAYS = 7;

const UserConfig = function (userConfig) {
  (this.userId = userConfig.userId),
    (this.start = userConfig.start),
    (this.end = userConfig.end),
    (this.breaks = userConfig.breaks),
    (this.blockSize = userConfig.blockSize),
    (this.interleaves = userConfig.interleaves);
};

UserConfig.getUserConfig = (userId, result) => {
  sql.query(
    `SELECT * FROM user_config WHERE userId = ?`,
    userId,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      if (res.length === NUM_OF_DAYS) {
        console.log("found user configs: ", res[0]);
        result(null, res);
        return;
      }
      // else not found:
      result(null, null);
    }
  );
};

UserConfig.createUserConfig = (userId, dayOfWeek, userConfig, result) => {
  sql.query(
    "INSERT INTO user_config(userId, dayOfWeek, start, end, breaks, blockSize, interleaves) " +
      "VALUES(?, ?, ?, ?, ?, ?, ?)",
    [
      userId,
      dayOfWeek,
      userConfig.start,
      userConfig.end,
      userConfig.breaks,
      userConfig.blockSize,
      userConfig.interleaves,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      if (res.affectedRows > 0) {
        console.log("created user config: ", res);
        result(null, res);
        return;
      }
      // else not found:
      result(null, null);
    }
  );
};

UserConfig.updateUserConfig = (userId, dayOfWeek, userConfig, result) => {
  sql.query(
    "UPDATE user_config SET start = ?, end = ?, breaks = ?, blockSize = ?, interleaves = ? WHERE userId = ? AND dayOfWeek = ?",
    [
      userConfig.start,
      userConfig.end,
      `[${userConfig.breaks}]`,
      userConfig.blockSize,
      userConfig.interleaves,
      userId,
      dayOfWeek,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      if (res.affectedRows === 0) {
        // not found:
        result(null, null);
        return;
      }
      console.log("updated user config: ", res);
      result(null, res);
    }
  );
};

export default UserConfig;
