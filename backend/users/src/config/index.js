const dotEnv = require("dotenv");
dotEnv.config();
if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile, override: true });
} else {
  dotEnv.config();
}

module.exports = {
  USER_SERVICE_PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  APP_SECRET: process.env.APP_SECRET,
};
