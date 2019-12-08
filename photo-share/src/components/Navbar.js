import React from 'react';
import { useAuth0 } from '../react-auth0-wrapper';
import { Link } from 'react-router-dom';

const NavBar = props => {
    const { isAuthenticated, logout } = useAuth0();

    const menuToggle = () => {
        props.toggleMenu(!props.menuIsOpen);
    };

    return (
        <>
            {isAuthenticated && (
                <div className="nav-container">
                    <div className="mobile-nav container is-d-md-none has-py-3">
                        <div className="is-d-flex is-justify-between is-align-center">
                            <Link to="/upload" className="btn is-secondary has-text-white">
                                <span className="icon-upload has-mr-2"></span>Upload
                            </Link>
                            <div>
                                <button
                                    className={'mobile-menu-button ' + (props.menuIsOpen ? 'is-active' : '')}
                                    onClick={menuToggle}
                                    aria-label="Toggle menu"
                                    aria-expanded="false"
                                    aria-haspopup="true">
                                    <span className="burger-icon" aria-hidden="true">
                                        <span></span>
                                    </span>
                                    Menu
                                </button>
                            </div>
                        </div>

                        <nav className={props.menuIsOpen ? 'is-open' : ''}>
                            <ul className="is-list-unstyled">
                                <li>
                                    <Link to="/" onClick={menuToggle}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/professional" onClick={menuToggle}>
                                        Professional Photos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/party" onClick={menuToggle}>
                                        Party Photos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/other" onClick={menuToggle}>
                                        Other Photos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/upload" onClick={menuToggle}>
                                        Upload Photos
                                    </Link>
                                </li>
                                <li className="has-text-center">
                                    <button className="btn is-primary" onClick={() => logout()}>
                                        Log out
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="desktop-nav container is-d-none is-d-md-block has-py-3">
                        <nav className="is-d-flex is-justify-end">
                            <ul className="is-list-unstyled is-d-flex is-align-center">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/professional">Professional Photos</Link>
                                </li>
                                <li>
                                    <Link to="/party">Party Photos</Link>
                                </li>
                                <li>
                                    <Link to="/other">Other Photos</Link>
                                </li>
                                <li>
                                    <Link to="/upload">Upload Photos</Link>
                                </li>
                                <li>
                                    <button className="btn is-primary" onClick={() => logout()}>
                                        Log out
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavBar;
