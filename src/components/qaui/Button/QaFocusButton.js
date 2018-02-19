import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QaButtonHelper from './private/QaButtonHelper';

const colorBase = '#3498db';
const colorWhite = '#ffffff';
const colorDisabled = '#555555';
const colorBaseDark = '#1478cb';

const animationTime = 300;

const Wrapper = styled.div`
    padding:5px 10px;
    border-radius: 5px;
    border:1px solid ${colorBase};
    display:inline-block;
    color: ${colorBase};
    cursor:pointer;
    position:relative;
    overflow:hidden;

    ${props => {
        let state = props.state;

        // 共通
        const base = `&: hover{
            border-color: ${ colorBaseDark};
        }`;

        // disable
        if (state.disabled) {
            return `
            cursor:default ;
            border-color: ${ colorDisabled};
            `;
            // focus
        } else if (state.focus) {
            return `${base}
            `;
            // default
        } else {
            return `${base}
            `;
        }
    }}
`;


const Title = styled.p`
    position:relative;
    user-select: none;
    
    @keyframes QaFocusButtonTitleFocusAnimation{
        0% { transform: scale(1.0); color:${colorBase}; } 
        100% { transform: scale(0.98); color:${colorWhite}; }
    }

    ${ props => {
        let state = props.state;
        if (state.disabled) {
            return `
            color: ${colorDisabled};
            `;
        } else if (state.focus) {
            return `
                animation-name: QaFocusButtonTitleFocusAnimation;
                animation-duration: ${animationTime}ms;
                animation-fill-mode: forwards;
            `;
        }
    }}
`;

const Overlay = styled.div`
    position: absolute;
    top:0px;
    left:0px;
    width:100%;
    height: 100%;
`;

const OverlayInner = styled.div`
    position: relative;
    top: ${props => props.state.overlayTop}px;
    left:-20%;
    width: 140%;
    border-radius: calc(140% / 2);
    background: ${colorBase};
    transform: scale(0.0);
    &:before {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
    @keyframes QaFocusButtonFocusAnimation{
        0% { transform: scale(0.0); opacity:0.0; } 
        100% { transform: scale(1.0); opacity:1.0 }
    }
    @keyframes QaFocusButtonBlurAnimation{
        0% { transform: scale(1.0); opacity:1.0; } 
        100% { transform: scale(1.0); opacity:0.0 }
    }

    ${ props => {
        let state = props.state;
        if (state.disabled) {
            return `
            `;
        } else if (state.focus) {
            return `
                animation-name: QaFocusButtonFocusAnimation;
                animation-duration: ${animationTime}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.blur) {
            return `
                animation-name: QaFocusButtonBlurAnimation;
                animation-duration: ${animationTime}ms;
                animation-fill-mode: forwards;
            `;
        }
    }}
`;

class QaFocusButton extends Component {
    constructor(props) {
        super(props);
        this.state = { disabled: props.disabled, focus: false, blur: false, overlayTop: 0 };
        this.overlayInner = null;
    }

    // interface

    focus() {
        this._focus();
    }

    blur() {
        this._blur();
    }

    // lifeCycle

    componentDidMount() {
        QaButtonHelper.fixOverlay.apply(this);
    }

    render() {
        return (
            <div>
                <Wrapper
                    state={this.state}
                    onClick={this._onClick.bind(this)}>
                    <Overlay
                        innerRef={(el) => { this.overlayDom = el; }}
                        state={this.state}>
                        <OverlayInner
                            state={this.state}
                            innerRef={(el) => { this.overlayInnerDom = el; }}
                        />
                    </Overlay>
                    <Title
                        state={this.state}
                    >{this.props.title}</Title>
                </Wrapper>
            </div>
        );
    }

    _onClick() {
        if (this.state.focus) { return; }
        if (this.props.onClick != null) this.props.onClick.apply(this, arguments);
        this._focus();
    }

    _focus() {
        this.setState({ focus: true });
    }

    _blur() {
        if (!this.state.focus) { return; }

        this.setState({ blur: true, focus: false });

        setTimeout(() => {
            this.setState({ focus: false, blur: false });
        }, animationTime);
    }
}

QaFocusButton.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default QaFocusButton;
