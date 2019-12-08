import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { cloudCredentials } from '../API/CloudinaryService';

const Photo = props => {
    const clickHandler = event => {
        const photoIndex = parseInt(event.currentTarget.id);
        props.lightBoxState(true);
        props.updatePhotoIndex(photoIndex);
    };

    return props.photos.map((photo, index) => (
        <div key={photo.public_id} className="photo col-4 col-md-3 col-xl-2">
            <div className="aspect-ratio-container is-1x1 has-mb-6">
                <div className="aspect-ratio-content has-zoom">
                    <button onClick={e => clickHandler(e)} id={index}>
                        <Image
                            className="media-cover"
                            cloudName={cloudCredentials.cloudName}
                            publicId={photo.public_id}
                            width="200"
                            height="200"
                            crop="thumb"
                            quality="auto">
                            <Transformation quality="auto" fetchFormat="auto" />
                        </Image>
                    </button>
                </div>
            </div>
        </div>
    ));
};

export default Photo;
