const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    //TODO: Check for the session cookie and
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];
    // verify
    if (!cookie) throw new Error('You must be signed in to continue');
    //its contents using jsonwebtoken,
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    // then assign the payload to req.user
    req.user = user;

    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};
