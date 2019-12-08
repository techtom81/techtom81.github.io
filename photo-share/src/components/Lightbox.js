import React from 'react';
import Lightbox from 'react-image-lightbox';
import cloudinary from 'cloudinary-core';
import 'react-image-lightbox/style.css';
import { cloudCredentials } from '../API/CloudinaryService';

const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: cloudCredentials.cloudName });

export default class ImageLightbox extends React.Component {
    shouldComponentUpdate(prevProps) {
        return this.props.photoIndex !== prevProps.photoIndex || this.props.isOpen !== prevProps.isOpen;
    }

    render() {
        const { isOpen, photos, photoIndex } = this.props;

        const images = photos.map(image => {
            return cloudinaryCore.url(image.public_id, {
                quality: 'auto:best',
                width: 800,
                height: 800,
                crop: 'fit'
            });
        });

        const downloadUrl = photos.map(image => {
            return cloudinaryCore.url(image.public_id, {
                quality: '100',
                flags: 'attachment'
            });
        });

        return (
            <div>
                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        imageTitle={
                            <a
                                href={downloadUrl[photoIndex]}
                                download="Photo"
                                target="_blank"
                                rel="noopener noreferrer">
                                <span className="icon-download has-mr-2" />
                                Download
                            </a>
                        }
                        onCloseRequest={() => this.props.lightBoxState(false)}
                        onMovePrevRequest={() => {
                            this.props.updatePhotoIndex((photoIndex + images.length - 1) % images.length);
                        }}
                        onMoveNextRequest={() => {
                            this.props.updatePhotoIndex((photoIndex + 1) % images.length);
                        }}
                        animationDuration={600}
                    />
                )}
            </div>
        );
    }
}
