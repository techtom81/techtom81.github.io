import { Cloudinary as Util } from 'cloudinary-core';

export const openUploadWidget = (options, callback) => {
    const scOptions = Util.withSnakeCaseKeys(options);
    window.cloudinary.openUploadWidget(scOptions, callback);
};

// set your Cloudinary cloud name here
export const cloudCredentials = {
    cloudName: 'democloudname',
    uploadPreset: 'm6xedmg5'
};
