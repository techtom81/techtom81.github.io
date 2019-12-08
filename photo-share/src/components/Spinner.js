import React from 'react';

const Spinner = props => {
    return (
        <div className="spinner-container">
            <span className="spinner">
                <span className="left">
                    <span className="anim"></span>
                </span>
                <span className="right">
                    <span className="anim"></span>
                </span>
            </span>
        </div>
    );
};

export default Spinner;
