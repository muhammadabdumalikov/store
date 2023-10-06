import { Injectable, InternalServerErrorException } from '@nestjs/common';
import ObjectID from 'bson-objectid';
import { s3 } from 'src/providers/file-upload';

@Injectable()
export class FileRouterService {
  async upload(file) {
    try {
      const {
        // originalname,
        // mimetype,
        // size,
        buffer,
      } = file;

      const fileContent = Buffer.from(buffer);

      const filename = ObjectID().toHexString();

      const data = s3
        .putObject({
          Body: fileContent, // The actual file content
          Bucket: 'files',
          Key: filename, // The name of the file
        })
        .promise();
      await data;

      return {
        sucess: true,
        file_id: filename,
        file_url: `https://eu2.contabostorage.com/edb0e731910e4caeb60bc740fa32e2b7:${'files'}/${filename}`,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // async download(file_id: string) {
  //   const params = {
  //     Bucket: 'files',
  //     Key: file_id,
  //   };

  //   const data = s3
  //     .getObject(params, (err, data) => {
  //       if (err) {
  //         console.error('Error downloading file:', err);
  //       } else {
  //         // Save the downloaded file to the local file system
  //         return data.Body;
  //       }
  //     })
  //     .promise();

  //   return await data;
  // }
}
