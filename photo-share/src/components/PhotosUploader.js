import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import UploadedPhotoStatus from './UploadedPhotosStatus';
import { cloudCredentials } from '../API/CloudinaryService';

class PhotosUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedPhoto: {}
        };
        this.photoId = 1;
    }

    render() {
        return (
            <div className="container has-pt-11">
                <Dropzone
                    id="direct-upload-dropzone"
                    disableClick={true}
                    multiple={false}
                    accept="image/*"
                    style={{ position: 'relative' }}
                    onDrop={files => this.onPhotoSelected(files)}>
                    {({ getRootProps, getInputProps }) => (
                        <div id="direct-upload" className="outline-none" {...getRootProps()}>
                            <h3>Share Photo</h3>
                            <p>Add a photo from the party by clicking Upload.</p>
                            <p>You can also drag and drop an image file into the dashed area.</p>
                            <p>
                                After Your photo has been uploaded it will be available on the Party Photos page in less
                                than 2 minutes.
                            </p>
                            <form>
                                <div className="is-d-flex is-align-center">
                                    <label className="is-d-block has-mr-6">Image:</label>
                                    <div className="upload_button_holder">
                                        <label className="btn is-secondary" htmlFor="fileupload">
                                            <span className="icon-upload has-mr-2"></span>Upload
                                        </label>
                                        <input
                                            {...getInputProps()}
                                            type="file"
                                            id="fileupload"
                                            accept="image/*"
                                            multiple="multiple"
                                            ref={fileInputEl => (this.fileInputEl = fileInputEl)}
                                            onChange={() => this.onPhotoSelected(this.fileInputEl.files)}
                                        />
                                    </div>
                                </div>
                            </form>
                            <p>Status</p>
                        </div>
                    )}
                </Dropzone>
                {this.state.uploadedPhoto.progress && <UploadedPhotoStatus uploadedPhoto={this.state.uploadedPhoto} />}
                <Link className="back_link has-text-primary is-d-block has-mt-6" exact="true" to="/party">
                    <span className="icon-back has-mr-2"></span>Back to photos
                </Link>
            </div>
        );
    }

    onPhotoSelected(files) {
        const url = `https://api.cloudinary.com/v1_1/${cloudCredentials.cloudName}/upload`;

        for (let file of files) {
            const photoId = this.photoId++;
            const fileName = file.name;
            request
                .post(url)
                .field('upload_preset', cloudCredentials.uploadPreset)
                .field('file', file)
                .field('multiple', true)
                .field('tags', this.props.tag)
                .field('context', '')
                .on('progress', progress => this.onPhotoUploadProgress(photoId, fileName, progress))
                .end((error, response) => {
                    this.onPhotoUploaded(response);
                });
        }
    }

    onPhotoUploadProgress(id, fileName, progress) {
        this.setState({
            uploadedPhoto: {
                id: id,
                fileName: fileName,
                progress: progress
            }
        });
    }

    onPhotoUploaded(response) {
        this.setState({
            uploadedPhoto: {
                ...this.state.uploadedPhoto,
                response: response
            }
        });
    }
}

export default PhotosUploader;
