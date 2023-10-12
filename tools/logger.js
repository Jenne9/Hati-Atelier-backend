const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: process.env.LOG_LEVEL,
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'book' },
    transports: [

        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/list.log' })
    ]
});


if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

module.exports = logger;