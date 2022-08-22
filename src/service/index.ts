import { ApiPromise } from '@polkadot/api';
import { configs } from '../config/config';
import {api} from '../service/crust/api';
const axios = require('axios');

export async function unpinLocalFiles() {
  const pin=await getLocalIpfsFiles();
  for(const key in pin.Keys){   
    const res = await getOrderState(api, key);
    if (res) {
      if (
        res.meaningfulData.reported_replica_count >=
        configs.crust.validFileSize
      ) {
        await rm(key);
      }
    } 
  }
}

async function getLocalIpfsFiles() {
  const url = `${configs.ipfs.gateWayUrl}/api/v0/pin/ls?type=recursive`;
  const config = getConfig();
  const res = await axios.post(url, null, config);
  const providerList = res.data;
  return providerList
}

function getConfig() {
  return {
    auth: {
      username: configs.ipfs.IPFS_AUTH_USERNAME,
      password: configs.ipfs.IPFS_AUTH_PASSWORD,
    },
    timeout: configs.ipfs.IPFS_HTTP_TIMEOUT,
  };
}

async function rm(cid: string) {
  const url = `${configs.ipfs.gateWayUrl}/api/v0/pin/rm?arg=${cid}`;
  const config = {
    auth: {
      username: configs.ipfs.IPFS_AUTH_USERNAME,
      password: configs.ipfs.IPFS_AUTH_PASSWORD,
    },
    timeout: configs.ipfs.IPFS_HTTP_TIMEOUT,
  };
  const res = await axios.post(url, null, config);
}

interface IFileInfo {
  file_size: number;
  expired_at: number;
  calculated_at: number;
  amount: number;
  prepaid: number;
  reported_replica_count: number;
  replicas: any;
}

export async function getOrderState(api: ApiPromise, cid: string) {
  await api.isReadyOrError;
  const res = await api.query.market.filesV2(cid);
  const data = res ? JSON.parse(JSON.stringify(res)) : null;
  if (data) {
    try {
      const { replicas, ...meaningfulData } = data as IFileInfo;
      return {
        meaningfulData,
        replicas,
      };
    } catch (e) {
      return null;
    }
  }
  return null;
}
