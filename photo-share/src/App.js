import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/Navbar';
import ImageList from './components/ImageList';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import ImageLightbox from './components/Lightbox';
import PhotosUploader from './components/PhotosUploader';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: [],
            photoIndex: 0,
            isOpen: false,
            menuIsOpen: false
        };
    }

    updatePhotoList = photos => {
        this.setState({ photos });
    };

    updatePhotoIndex = photoIndex => {
        this.setState({ photoIndex });
    };

    lightBoxState = bool => {
        this.setState({ isOpen: bool });
    };

    toggleMenu = bool => {
        this.setState({ menuIsOpen: bool });
    };

    render() {
        return (
            <div className="App">
                <HashRouter>
                    <NavBar menuIsOpen={this.state.menuIsOpen} toggleMenu={bool => this.toggleMenu(bool)} />

                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={props => <Home {...props} lightBoxState={bool => this.lightBoxState(bool)} />}
                        />
                        <PrivateRoute
                            path="/professional/"
                            exact
                            render={props => (
                                <ImageList
                                    {...props}
                                    updatePhotoList={photos => this.updatePhotoList(photos)}
                                    photos={this.state.photos}
                                    tag={'professional'}
                                    lightBoxState={bool => this.lightBoxState(bool)}
                                    updatePhotoIndex={index => this.updatePhotoIndex(index)}
                                />
                            )}
                        />
                        <PrivateRoute
                            path="/party/"
                            exact
                            render={props => (
                                <ImageList
                                    {...props}
                                    updatePhotoList={photos => this.updatePhotoList(photos)}
                                    photos={this.state.photos}
                                    tag={'party'}
                                    lightBoxState={bool => this.lightBoxState(bool)}
                                    updatePhotoIndex={index => this.updatePhotoIndex(index)}
                                />
                            )}
                        />
                        <PrivateRoute
                            path="/other/"
                            exact
                            render={props => (
                                <ImageList
                                    {...props}
                                    updatePhotoList={photos => this.updatePhotoList(photos)}
                                    photos={this.state.photos}
                                    tag={'others'}
                                    lightBoxState={bool => this.lightBoxState(bool)}
                                    updatePhotoIndex={index => this.updatePhotoIndex(index)}
                                />
                            )}
                        />
                        <PrivateRoute
                            path="/upload/"
                            exact
                            render={props => <PhotosUploader {...props} tag={'Party'} />}
                        />
                    </Switch>
                </HashRouter>
                <ImageLightbox
                    isOpen={this.state.isOpen}
                    photoIndex={this.state.photoIndex}
                    photos={this.state.photos}
                    updatePhotoIndex={index => this.updatePhotoIndex(index)}
                    lightBoxState={bool => this.lightBoxState(bool)}
                />
            </div>
        );
    }
}

export default App;
