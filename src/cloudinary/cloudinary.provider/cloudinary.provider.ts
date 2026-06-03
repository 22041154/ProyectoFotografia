import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dmbd9ccik',
      api_key: '629111568688329',
      api_secret: 'Dm6WCmYCqZ2DTEXCBgF4JXWC5yM',
    });
  },
};