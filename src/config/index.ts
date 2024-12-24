export const configuration = () => ({
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: parseInt(process.env.PORT, 10) || 8000,
  database: {
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    name: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expired: process.env.JWT_EXPIRE_TIME,
  },
  graphql_config: {
    path: process.env.GRAPHQL_TYPE_PATHS || './**/*.graphql',
  },
  mail: {
    host: process.env.MAIL_HOST,
    service: process.env.MAIL_SERVICE,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
  },
});
