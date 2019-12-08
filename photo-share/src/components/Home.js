import React, { useEffect } from 'react';
import { useAuth0 } from '../react-auth0-wrapper';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const Home = props => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const lightBoxState = props.lightBoxState;
    const { loading } = useAuth0();

    useEffect(() => {
        lightBoxState(false);
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            {isAuthenticated && (
                <section className="home has-pt-10">
                    <header className="header-with-title-block has-mb-6">
                        <div className="header-image is-d-flex is-align-end">
                            <div className="container header-content">
                                <h1 className="has-text-uppercase has-text-white has-text-center has-mb-2 has-mb-md-0">
                                    <span className="is-d-block is-d-sm-inline">Our</span> wedding photos
                                </h1>
                                <hr className="is-in-header" />
                                <p className="header-sub-title has-text-center has-text-gray-0 has-mt-2 has-mt-md-3"></p>
                            </div>
                        </div>
                    </header>
                    <div className="container">
                        <p className="has-text-center has-pt-3 has-pb-6">
                            You can view or download our wedding photos and also upload yours from the party{' '}
                            <Link to="/upload" className="has-font-size-body has-text-secondary has-font-weight-bold">
                                here
                            </Link>
                            .
                        </p>
                        <div className="row is-d-flex is-justify-center">
                            <div className="col-sm-4 has-text-center">
                                <h3>
                                    <Link to="/professional" className="has-text-secondary">
                                        Professional Photos
                                    </Link>
                                </h3>
                            </div>
                            <div className="col-sm-4 has-text-center">
                                <h3>
                                    <Link to="/party" className="has-text-secondary">
                                        Party Photos
                                    </Link>
                                </h3>
                            </div>
                            <div className="col-sm-4 has-text-center">
                                <h3>
                                    <Link to="/other" className="has-text-secondary">
                                        Other Photos
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {!isAuthenticated && (
                <section className="login-hero is-d-flex is-justify-center is-align-center">
                    <div className="container has-text-center">
                        <h2 className="has-mb-3">Tom &amp; Laura's wedding album</h2>
                        <p className="sub-title has-mt-0 has-mb-5">Login below to view, download and share photos</p>
                        <button className="btn is-primary" onClick={() => loginWithRedirect({})}>
                            Log in
                        </button>
                    </div>
                </section>
            )}
        </>
    );
};

export default Home;
