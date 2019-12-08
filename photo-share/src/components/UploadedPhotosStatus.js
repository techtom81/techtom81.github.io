import React, { Component } from 'react';

class UploadedPhotoStatus extends Component {
    render() {
        const uploadedPhoto = this.props.uploadedPhoto;
        const response = uploadedPhoto.response;
        const percent = Math.floor(uploadedPhoto.progress.percent);

        return (
            <div>
                <h3>{uploadedPhoto.fileName}</h3>

                <div className="status">
                    {!response && <div>Uploading... {percent}%</div>}
                    {!response && <div>In progress</div>}
                    {response && <div className="status-code">Upload completed {response.statusText}</div>}
                </div>
                <div className="progress-bar has-mt-6">
                    <div className="progress" role="progressbar" style={{ width: percent + '%' }} />
                </div>
            </div>
        );
    }
}

export default UploadedPhotoStatus;
