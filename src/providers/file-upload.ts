// import { S3 } from '@aws-sdk/client-s3';
import * as AWS from 'aws-sdk';

export const s3 = new AWS.S3({
  endpoint: `https://eu2.contabostorage.com/files`, // e.g. https://eu2.contabostorage.com/bucketname
  accessKeyId: '640fd538544bad0c7d60879d0193a00c',
  secretAccessKey: '312a91e1c8ca403d396a9e16d20883f6',
  s3BucketEndpoint: true,
});

// export const s3 = new S3({
//   region: 'eu',
//   credentials: {
//     accessKeyId: '640fd538544bad0c7d60879d0193a00c',
//     secretAccessKey: '312a91e1c8ca403d396a9e16d20883f6',
//   },
//   endpoint: `https://eu2.contabostorage.com/files`, // e.g. https://eu2.contabostorage.com/bucketname

//   // accessKeyId: '640fd538544bad0c7d60879d0193a00c',
//   // secretAccessKey: '312a91e1c8ca403d396a9e16d20883f6',
//   // s3BucketEndpoint: true,
// });
