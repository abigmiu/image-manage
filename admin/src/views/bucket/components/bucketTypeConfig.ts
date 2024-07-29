const qiniuConfig = [
  {
    name: 'accessKey',
    field: 'accessKey',
    type: 'input',
  },
  {
    name: 'secretKey',
    field: 'secretKey',
    type: 'input',
  },
];

const types = {
  qiniu: 1,
};

export const typeOptions = {
  [types.qiniu]: qiniuConfig,
};
