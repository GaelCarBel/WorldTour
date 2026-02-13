const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { authMiddleware } = require("@/middlewares/auth.js");
const modelUser = require("@/models/users.js");

// Ruta GET /me
// Verifica si existe un token válido (authMiddleware lo decodifica).
// Si el token es válido, devuelve la información del usuario autenticado.
// Si no hay token o no es válido, responde con usuario = null.
router.get("/me", authMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ authenticated: false, user: null });
  }
  res.json({
    authenticated: true,
    user: req.user,
  });
});

// Permite el logout eliminando la coockie del navegador
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });
  req.session.destroy();
  if (req.session) req.session.destroy();
  res.json({ message: "Sesión cerrada correctamente" });
});

// Ruta GET /auth/:provider
// Crea la URL de autenticación del proveedor (solo Google).
// Genera un 'state' aleatorio para prevenir ataques CSRF (nos da igual a nosotros)
// El state lo guarda en una cookie temporal y redirige al usuario a Google.
router.get("/:provider", (req, res) => {
  const { provider } = req.params;
  let authorizationUrl;
  const state = crypto.randomBytes(20).toString('hex');

  if (provider === "google") {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Permisos para acceder a información del usuario de Google (nombre, email) 
    const scopes = [
      "openid",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ];

    authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
      state: state,
    });

    // Guardar el state en una cookie temporal para validar callback
    res.cookie("oauth_state", state, { httpOnly: true, secure: false, sameSite: "lax" });
  } else {
    return res.status(400).send("Proveedor de autenticación no soportado.");
  }
  res.redirect(authorizationUrl);
});

// Ruta GET /auth/:provider/callback
// Gestiona la respuesta del proveedor (en este caso Google) después de la autenticación.
// 1. Comprueba que el parámetro 'state' recibido coincide con el guardado en la cookie (prevención de CSRF).
// 2. Intercambia el código de autorización recibido por los tokens de Google.
// 3. Decodifica el id_token para obtener los datos del usuario (nombre, email, foto).
// 4. Busca el usuario en la base de datos o lo crea si no existe.
// 5. Genera un JWT con los datos básicos del usuario y lo devuelve al frontend mediante redirección.
router.get("/:provider/callback", async (req, res) => {
  const state = req.query.state;
  const savedState = req.cookies.oauth_state;

  if (!state || state !== savedState) {
    return res.status(400).send("Estado inválido. Posible ataque CSRF.");
  }

  const code = req.query.code;
  const { provider } = req.params;

  if (provider === "google") {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const decoded = jwt.decode(tokens.id_token);
      const email = decoded.email;
      const name = decoded.name;
      const picture = decoded.picture;

      let user = await modelUser.findOne({ email });
      if (!user) {
        user = await modelUser.create({
          nombre: name,
          email: email,
          fotoPerfil: picture,
        });
      }

      const payload = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        fotoPerfil: user.fotoPerfil
      };
      // Generar JWT
      const token = jwt.sign(payload, process.env.SESSION_SECRET, { expiresIn: "1h" });
      // Redirigir al frontend
      res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error autenticando con Google.");
    }
  } else {
    res.status(400).send("Proveedor de autenticación no soportado.");
  }
});

module.exports = router;
