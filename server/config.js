exports.db = {
  host: process.env.EXPERTS_DB_URL || 'localhost',
  port: process.env.EXPERTS_DB_PORT || 28015,
  db: 'expertsdb',
};

exports.auth = {
  passwordSalt: process.env.EXPERTS_AUTH_PASSALT ||
    '%0BPgs00dfvwY24zcW1EnsMiKr3hf@Mn%r6JMLS8Uyv8$NHB2*VvZoYDB6v9!nL!',
  sessionSecret: process.env.EXPERTS_AUTH_SESSECRET ||
    '#7DlQUP1GRh&yDJvO2gQYTHx@40yLd&^@BO!T&ZdKMO%ngHULBYbm3I@HJ5DE#2K',
  jwtSecret: process.env.EXPERTS_AUTH_JWTSECRET ||
    'JEdxGdcdsFjYsXQ9Szy&jjaYaqH8*lxlTDvY$nFRc135v!IP6UocfWoKfEs&OrUo',
};