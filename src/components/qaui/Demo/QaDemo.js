import React from 'react';
import ButtonDemo from './ButtonDemo';
import DemoHome from './DemoHome';
import styled from 'styled-components';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Route, NavLink, Redirect } from 'react-router-dom';

const menuWidth = 200;
const colorGrey = '#ecf0f1';
const colorMidnight = '#2c3e50';
const colorLightText = '#ecf0f1';
const colorText = '#333333';

const SiteTitle = styled.h1`
    background: ${colorMidnight};
    color: ${colorLightText};
    font-size:25px;
    font-weight:normal;
    padding:10px;
`;

const Menu = styled.div`
    position:fixed;
    width: ${menuWidth}px;
    background:${colorGrey};
    height: calc(100vh);
`;

const MenuLink = styled(NavLink) `
    display:block;
    padding:10px 10px;
    cursor:pointer;
    border-bottom:1px solid #9da3a7;
    color: ${colorText};
    transition: padding-left 200ms ease, background 200ms ease;
    text-decoration:none;
    &:hover{
        background:#bdc3c7;
        padding-left: 15px;
    }
    &.active{
        background:#bdc3c7;
        padding-left: 15px;
    }
`;

const Contents = styled.div`
    padding-left: ${menuWidth}px;
`;


class QaDemo extends React.Component {
    render() {
        return (
            <div>
                {/* <Router> */}
                <Menu>
                    <SiteTitle>QaUI</SiteTitle>
                    <ul>
                        {/* <li><NavLink to='/button'>Button</NavLink></li> */}
                        <li><MenuLink to='/home'>Home</MenuLink></li>
                        <li><MenuLink to='/button'>Button</MenuLink></li>
                    </ul>
                </Menu>

                <Contents>
                    <Route exact path='/' component={DemoHome} />
                    <Route path='/button' component={ButtonDemo} />
                    <Route exact path="/" render={() => (
                        <Redirect to="/home" />
                    )} />
                </Contents>
                {/* </Router> */}
            </div>
        );
    }

}

export default QaDemo;