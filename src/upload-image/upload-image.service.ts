import { Injectable, OnModuleInit } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './upload-image.response';
import streamifier from 'streamifier'
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class UploadImageService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
                if (error) return reject(new Error(`Error uploading file to Cloudinary: ${error.message}`))
                if (!result) return reject(new Error('No result returned from Cloudinary'));
                resolve(result);
            });
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        })
    }
}