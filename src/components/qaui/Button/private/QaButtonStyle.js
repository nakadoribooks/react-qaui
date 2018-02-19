import styled from 'styled-components';

const buttonColor = {
    base: '#3498db',
    baseDark: '#0468bb',
    lightText: '#ffffff',
    disabled: '#555555'
};

const buttonTime = {
    animation: 300
    , showingDone: 1500
};

const BaseTitleStyle = styled.p`
    user-select: none;
    font-size:14px;
`;

const BaseWrapperStyle = styled.div`
    padding:7px 15px;
    border-radius: 5px;
    border:1px solid ${buttonColor.base};
    display:inline-block;
    color: ${buttonColor.base};
    cursor:pointer;
    position:relative;
    overflow:hidden;
    
    ${props => {
        let state = props.state;

        // disable
        if (state.disabled) {
            return `
            cursor:default ;
            border-color: ${ buttonColor.disabled};
            `;
        }
    }}
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
    top: ${props => props.state.overlayTop}px;
    left:-20%;
    width: 140%;
    border-radius: calc(140% / 2);
    background: ${buttonColor.base};
    transform: scale(0.0);
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

export {
    buttonColor,
    buttonTime,
    BaseWrapperStyle,
    BaseOverlayStyle,
    BaseOverlayInnerStyle,
    BaseTitleStyle,
    LoaderStyle
};
