const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  GATEWAY_SERVICE_PORT: process.env.GATEWAY_SERVICE_PORT,
  COURSE_SERVICE_PORT: process.env.COURSE_SERVICE_PORT,
  CUSTOMER_SERVICE_PORT: process.env.CUSTOMER_SERVICE_PORT,
  ENROLLMENT_SERVICE_PORT: process.env.ENROLLMENT_SERVICE_PORT,
  USER_SERVICE_PORT: process.env.USER_SERVICE_PORT,
  GATEWAY_SERVICE_END_POINT: process.env.GATEWAY_SERVICE_END_POINT,
  COURSE_SERVICE_END_POINT: process.env.COURSE_SERVICE_END_POINT,
  CUSTOMER_SERVICE_END_POINT: process.env.CUSTOMER_SERVICE_END_POINT,
  ENROLLMENT_SERVICE_END_POINT: process.env.ENROLLMENT_SERVICE_END_POINT,
  USER_SERVICE_END_POINT: process.env.USER_SERVICE_END_POINT,
};
