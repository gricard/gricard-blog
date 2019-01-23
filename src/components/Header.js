import React from 'react';
import Link from 'gatsby-link'
import styled from '@emotion/styled';

import Avatar from './Avatar'
import MedalPic from '../../content/assets/medals.jpg'

const Header = styled('header')`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9001;
    background-color: #eee;
`;

const Nav = styled('nav')`
    position: relative;
    display: flex;
    justify-content: flex-start;
    margin: 0.5em;
    z-index: 5;

    a {
        color: #555;
    }
`;

const NavLink = styled(Link)`
    text-decoration: none;
    box-shadow: none;
    font-family: arial black;
    font-size: 1rem;
    line-height: 3.1;
    margin-left: 2em;
`;

const LogoLink = styled(Link)`
    text-decoration: none;
    box-shadow: none;

    img, h1 {
        margin-bottom: 0;
    }

    h1 {
        font-size: 1.5rem;
        line-height: 2;
    }
`;

const SiteHeader = props => (
    <Header role="banner">
        <Nav>
            <LogoLink to="/">
                <Avatar />
            </LogoLink>
            <LogoLink to="/">
                <h1
                    style={{
                        fontFamily: `Lobster, sans-serif`,
                        marginTop: 0,
                    }}
                >
                {props.title}
                </h1>
            </LogoLink>
            {window.location.pathname === '/' ? null : <NavLink to="/">Blog</NavLink>}
            {window.location.pathname === '/gear' ? null : <NavLink to="/gear">Gear</NavLink>}
        </Nav>
    </Header>
);

export default SiteHeader;