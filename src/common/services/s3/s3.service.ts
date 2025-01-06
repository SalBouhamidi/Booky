// import { Injectable } from '@nestjs/common';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// @Injectable()
// export class S3Service {
//   private s3Client: S3Client;

//   constructor() {
//     this.s3Client = new S3Client({
//       region: process.env.AWS_REGION,
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//       },
//     });
//   }

//   async uploadFile(fileBuffer: Buffer, filename: string, mimetype: string): Promise<string> {
//     const fileName = `${Date.now()}-${filename}`;

//     const command = new PutObjectCommand({
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: `book-covers/${fileName}`,
//       Body: fileBuffer,
//       ContentType: mimetype,
//     });

//     try {
//       await this.s3Client.send(command);
//       return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/book-covers/${fileName}`;
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       throw error;
//     }
//   }
// }sudo yum remove nodejs npm -y

