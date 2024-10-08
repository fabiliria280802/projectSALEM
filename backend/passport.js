/*const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const User = require('./models/User');

passport.use(new OIDCStrategy({
    identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
    clientID: process.env.AZURE_CLIENT_ID,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: 'http://localhost:3000/auth/azure/callback',
    allowHttpForRedirectUrl: true,
    scope: ['email', 'profile', 'offline_access', 'User.Read'],
    loggingLevel: 'info',
  },
  async (iss, sub, profile, accessToken, refreshToken, done) => {
    try {
      let user = await User.findOne({ email: profile._json.email });
      if (!user) {
        user = new User({
          username: profile.displayName,
          email: profile._json.email,
          password: '',
          role: 'Sin Asignar',
        });
        await user.save();

        sendPasswordCreationEmail(user);
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
*/