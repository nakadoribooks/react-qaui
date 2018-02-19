import React from 'react';
import styled from 'styled-components';

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

class DemoHome extends React.Component {
    render() {
        return (
            <Contents>
                <ContentsTitle>Button</ContentsTitle>
            </Contents>
        );
    }

}

DemoHome.propTypes = {
};

export default DemoHome;