import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
        // 共通
        const base = `&: hover{
            border-color: ${ colorBaseDark};
        }`;

        // disable
        if (props.disabled) {
            return `
            cursor:default ;
            border-color: ${ colorDisabled};
            `;
            // focus
        } else if (props.focus) {
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
        if (props.disabled) {
            return `
            color: ${colorDisabled};
            `;
        } else if (props.focus) {
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
    top: ${props => props.overlayTop}px;
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
        if (props.disabled) {
            return `
            `;
        } else if (props.focus) {
            return `
                animation-name: QaFocusButtonFocusAnimation;
                animation-duration: ${animationTime}ms;
                animation-fill-mode: forwards;
            `;
        } else if (props.blur) {
            return `
                animation-name: QaFocusButtonBlurAnimation;
                animation-duration: ${animationTime}ms;
                animation-fill-mode: forwards;
            `;
        }
    }}
`;

class QaButton extends Component {
    constructor(props) {
        super(props);
        this.state = { focus: false, blur: false, overlayTop: 0 };
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
        this._fixSize();
    }

    render() {
        return (
            <div>
                <Wrapper
                    disabled={this.props.disabled}
                    focus={this.state.focus}
                    onClick={this._onClick.bind(this)}>
                    <Overlay
                        innerRef={(el) => { this.overlayDom = el; }}
                        disabled={this.props.disabled}
                        focus={this.state.focus}>
                        <OverlayInner
                            overlayTop={this.state.overlayTop}
                            disabled={this.props.disabled}
                            focus={this.state.focus}
                            blur={this.state.blur}
                            innerRef={(el) => { this.overlayInnerDom = el; }}
                        />
                    </Overlay>
                    <Title
                        disabled={this.props.disabled}
                        focus={this.state.focus}
                    >{this.props.title}</Title>
                </Wrapper>
            </div>
        );
    }

    _fixSize() {
        const overlay = this.overlayDom;
        const overlayInner = this.overlayInnerDom;
        const width = overlayInner.clientWidth;
        const val = (-width + (overlay.clientHeight / 1.7)) / 2.0;

        this.setState({ 'overlayTop': val });
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

QaButton.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default QaButton;
