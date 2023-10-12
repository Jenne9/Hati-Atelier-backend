const jwt = require('jsonwebtoken');

// Récupère la clé secrète et la durée de validité du token depuis les variables d'environnement ou utilise des valeurs par défaut.
const secret = process.env.JWT_SECRET || "secret";
const expiry = process.env.JWT_EXPIRY || "7d";

// Fonction pour générer un token JWT en fonction des informations de l'utilisateur.
let getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        username: user.username
    }, secret, {
        expiresIn: expiry
    });
}

// Fonction middleware pour vérifier un token JWT dans l'en-tête de la requête.
let checkToken = (req, res, next) => {
    let token = req.headers.authorization; 

    if (token) {
        token = token.replace("Bearer ", "") 

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return next(new Error("Invalid token"));
            }
            req.decoded = decoded;
            next();
        });
    } else {
        res.status(403).json({
            message: "No token provided"
        });
    }
}

module.exports = {
    getToken,
    checkToken
} 