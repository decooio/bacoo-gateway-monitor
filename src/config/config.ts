const {getEnv} = require('../common/commonUtils');
const _ = require('lodash');

export const configs = {
  ipfs: {
    gateWayUrl: getEnv('GATEWAY_URL', 'http://localhost:5001'),
    NUM_PROVIDERS: _.parseInt(getEnv('NUM_PROVIDERS', 200)),
    IPFS_AUTH_USERNAME: getEnv('IPFS_AUTH_USERNAME', 'ghost'),
    IPFS_AUTH_PASSWORD: getEnv('IPFS_AUTH_PASSWORD', 'ghost'),
    IPFS_HTTP_TIMEOUT: _.parseInt(getEnv('IPFS_HTTP_TIMEOUT', 180000)),
    CACHE_TTL: _.parseInt(getEnv('CACHE_TTL', 60 * 60 * 24)),
  },
  crust: {
    chainWsUrl: getEnv('WS_ENDPOINT', 'wss://rpc.crust.network'),
    defaultFileSize: _.parseInt(getEnv('DEFAULT_FILE_SIZE', 2147483648)),
    tips: getEnv('CRUST_TIPS', 0),
    expireBlockNumber: getEnv('EXPIRE_BLOCK_NUMBER', 10 * 60 * 24 * 30),
    validFileSize: _.parseInt(getEnv('VALID_FILE_REPLICAS', 30)),
    orderTimeAwait: _.parseInt(getEnv('ORDER_TIME_AWAIT', 3000)),
    loopTimeAwait: _.parseInt(getEnv('LOOP_TIME_AWAIT', 20000)),
    checkAmountTimeAwait: _.parseInt(getEnv('CHECK_AMOUNT_TIME_AWAIT', 120000)),
    checkAmountRetryTimes: _.parseInt(getEnv('CHECK_AMOUNT_RETRY_TIMES', 3)),
    orderRetryTimes: _.parseInt(getEnv('ORDER_RETRY_TIMES', 3)),
    minimumAmount: _.parseInt(getEnv('MINIMUM_AMOUNT', 1)),
    warningAccessToken: getEnv(
      'WARNING_ACCESSTOKEN',
      ''
    ),
    transactionTimeout: _.parseInt(getEnv('TRANSACTION_TIMEOUT', 60 * 1000)),
  },
  server: {
    port: 3000,
    name: getEnv('NODE_ENV', 'prod'),
  },
};
