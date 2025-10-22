import { v2 as cloudinary } from 'cloudinary';
import { envs } from 'src/config/envs';

export const UploadImageProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary.config({
            cloud_name: envs.cloudinaryName,
            api_key: envs.cloudinaryApiKey,
            api_secret: envs.cloudinaryApiSecret
        });
    }
}