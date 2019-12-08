import React from 'react';
import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';
import axios from 'axios';
import Photo from './Photo';
import Spinner from './Spinner';
import { addBackToTop } from 'vanilla-back-to-top';
import { cloudCredentials } from '../API/CloudinaryService';

addBackToTop({
    backgroundColor: '#17aacf',
    scrollDuration: 400,
    zIndex: 100,
    showWhenScrollTopIs: 100
});

class ImageList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { spinnerShowing: true };
    }

    fetchPhotos = cloudName => {
        const url = (publicId, options) => {
            const scOptions = Util.withSnakeCaseKeys(options);
            const cl = CoreCloudinary.new();
            return cl.url(publicId, scOptions);
        };

        const options = {
            cloudName: cloudName,
            format: 'json',
            type: 'list'
        };

        const urlPath = url(this.props.tag, options);

        axios.get(urlPath).then(response => {
            let unsortedPhotos = response.data.resources;

            // sort list alphabetically
            const photos = [...unsortedPhotos].sort(function(a, b) {
                let keyA = a.public_id.toUpperCase();
                let keyB = b.public_id.toUpperCase();
                return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
            });
            this.props.updatePhotoList(photos);
        });
    };

    componentDidMount() {
        this.fetchPhotos(cloudCredentials.cloudName);
    }

    shouldComponentUpdate(prevProps, prevState) {
        return this.props.photos !== prevProps.photos || this.state.spinnerShowing !== prevState.spinnerShowing;
    }

    componentDidUpdate(prevProps) {
        if (this.props.photos !== prevProps.photos) {
            this.setState({ spinnerShowing: false });
        }
    }

    render() {
        return (
            <div className="container has-pt-11">
                <h3 className="has-mb-2">{this.props.tag} photos</h3>
                {this.props.photos.length} images found
                {this.props.photos.length > 0 && (
                    <div className="image-list row has-mt-6">
                        <Photo
                            photos={this.props.photos}
                            lightBoxState={bool => this.props.lightBoxState(bool)}
                            updatePhotoIndex={index => this.props.updatePhotoIndex(index)}
                        />
                    </div>
                )}
                {this.state.spinnerShowing && <Spinner />}
            </div>
        );
    }
}

export default ImageList;
