const schedule = require('node-schedule');
import {logger} from './logger';
import {unpinLocalFiles} from './service/index';


schedule.scheduleJob('0 0 */1 * * ?', async () => {
  logger.info('unpin schedule start');
  await unpinLocalFiles()
  logger.info('unpin schedule end');
});

