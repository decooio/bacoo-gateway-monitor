
export function parserStrToObj(str: any) {
  if (!str) {
    return null;
  } else {
    return JSON.parse(JSON.stringify(str));
  }
}

export const TextMatchingStrategy = {
  exact: 'exact',
  iexact: 'iexact',
  partial: 'partial',
  ipartial: 'ipartial',
};

export const PinObjectStatus = {
  queued: 'queued',
  pinning: 'pinning',
  pinned: 'pinned',
  failed: 'failed',
};


export const getEnv = (value: string, defaultValue: any): any => {
  return process.env[value] || defaultValue;
};

export function sleep(time: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export function queryToObj(queryRes: any) {
  return JSON.parse(JSON.stringify(queryRes));
}
