import { createLogger, format, transports } from 'winston';
const { Console, File } = transports;

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new File({ filename: 'error.log', level: 'error' }),
    new File({ filename: 'combined.log' })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    ),
  }));
}

export default logger;
