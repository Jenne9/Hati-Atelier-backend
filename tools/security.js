function checkPassword(req, res, next)  {
    if(req.query.token === '$2b$10$RYeEHG2pX4Jydjl/o9N7kOW2WQD4ubB.XUdROqRoNgIRg6D0renMi') {
        next()
    } else {
        res.status(403).json({
            message: 'Access denied!'
        })
    }
};


module.exports = checkPassword; 