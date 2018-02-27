import React from 'react';
import styled from 'styled-components';

const buttonColor = {
    base: '#3498db',
    baseDark: '#0468bb',
    lightText: '#ffffff',
    disabled: '#555555'
};

const buttonTime = {
    animation: 400
    , showingDone: 1500
};

const BaseTitleStyle = styled.p`
    user-select: none;
    font-size:14px;
    line-height:1.0;
`;

const BaseWrapperStyle = styled.div`
    padding:10px 15px;
    border-radius: 5px;
    border:1px solid ${buttonColor.base};
    display:inline-block;
    color: ${buttonColor.base};
    cursor:default;
    position:relative;
    overflow:hidden;
    border-color: ${({ state }) => { (state.disabled) ? buttonColor.disabled : 'transparent'; }};
`;

const BaseOverlayStyle = styled.div`
    position: absolute;
    top:0px;
    left:0px;
    width:100%;
    height: 100%;
`;

const BaseOverlayInnerStyle = styled.div`
    position: relative;
    left:-25%;
    width: 150%;
    border-radius: calc(150% / 2);
    background: ${buttonColor.base};
    transform: translateY(calc(-50% + 16px)) scale(0.0);
    &:before {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
`;

// thank you!
// https://codepen.io/nuconeco/pen/ZXJOGK
const LoaderStyle = styled.div`
    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid white;
    border-radius: 50%;
    animation: QaLoadingButtonSpinAnimation 0.75s infinite linear;
    border-top-color: transparent;

    &:before,  &:after{
        left: -2px;
        top: -2px;
        display: none;
        position: absolute;
        content: "";
        width: inherit;
        height: inherit;
        border: inherit;
        border-radius: inherit;
    }
    &:after{
        display: block;
        left: -2px;
        top: -2px;
        border: inherit;
        transform: rotate(65deg);
    }

    @keyframes QaLoadingButtonSpinAnimation {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

const DoneImage = () => {
    return (
        <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </svg>
    );
};

export {
    buttonColor,
    buttonTime,
    BaseWrapperStyle,
    BaseOverlayStyle,
    BaseOverlayInnerStyle,
    BaseTitleStyle,
    LoaderStyle,
    DoneImage
};
