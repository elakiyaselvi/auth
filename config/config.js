module.exports = {
  environment: {
    port: process.env.PORT || 5000,
  },
  RefExpiresIn: "30 days",
  AccExipresIn: "15 days",
  Algorithm: "HS256",
  secret: "SJEWebdev",
  refreshTokenSecret: "SJEWebdev",
};
