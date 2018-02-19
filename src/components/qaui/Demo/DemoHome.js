import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Contents = styled.div`
    padding:10px 20px;
`;
const ContentsTitle = styled.h2`
    color: #2c3e50;
    font-size:25px;
    border-bottom:1px solid #2c3e50;
    padding-bottom:10px;
    font-weight:normal;
`;

const MenuLink = styled(NavLink) `
    color: #3498db;
    text-decoration:none;
    font-size:16px;
    padding:3px;
    &:hover{
        border-bottom:1px solid #3498db
    }
`;
const MenuList = styled.li`
    margin:10px 10px;
`;

class DemoHome extends React.Component {
    render() {
        return (
            <Contents>
                <ContentsTitle>QaUI index</ContentsTitle>
                <ul>
                    <MenuList><MenuLink to='/button'>Button</MenuLink></MenuList>
                </ul>
            </Contents>
        );
    }

}

DemoHome.propTypes = {
};

export default DemoHome;