import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import * as multerS3 from 'multer-s3'
import { S3Client } from "@aws-sdk/client-s3";

export const multerOptionsFactory = (
) : MulterOptions => {
    const s3 = new S3Client({
        region: 'ap-northeast-2',
        credentials: {
            accessKeyId: process.env.ACCESSKEY,
            secretAccessKey: process.env.SECRETACCESSKEY,     
        },
        forcePathStyle: true
    });

    return {
        storage: multerS3({
            s3 : s3,
            bucket: process.env.BUCKETNAME,
            acl: 'public-read',
            key: function(req, file, cb) {
                cb(null, Date.now() + '.' + file.originalname.split('.').pop());
            }
        }),
    }
}