import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keyframes } from 'styled-components';
import {
    buttonColor
    , buttonTime
    , BaseWrapperStyle
    , BaseOverlayStyle
    , BaseOverlayInnerStyle
    , BaseTitleStyle
} from './private/QaButtonStyle';

const TitleFocusAnimation = keyframes`
    0% { transform: scale(1.0); color:${buttonColor.base}; } 
    100% { transform: scale(0.98); color:${buttonColor.lightText}; }
`;
const TitleBlurAnimation = keyframes`
    0% { transform: scale(0.98); color:${buttonColor.lightText}; } 
    100% { transform: scale(1.0); color:${buttonColor.base}; }
`;
const OverlayFocusAnimation = keyframes`
    0% { transform: translateY(calc(-50% + 16px)) scale(0.0); opacity:0.0; } 
    100% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:1.0 }
`;
const OverlayBlurAnimation = keyframes`
    0% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:1.0; } 
    100% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:0.0 }
`;

const Wrapper = BaseWrapperStyle.extend`

    ${({ state }) => {

        // disable
        if (state.disabled) {
            return `
            cursor:default ;
            border-color: ${buttonColor.disabled};
            `;

        } else if (!state.focus && !state.blur) {
            // default
            return `
            cursor:pointer;
            &: hover{
                border-color: ${ buttonColor.baseDark};
            }`;
        }

    }}
`;

const Title = BaseTitleStyle.extend`

    ${ ({ state }) => {
        if (state.disabled) {
            return `
            color: ${buttonColor.disabled};
            `;
        } else if (state.focus) {
            return `
                animation-name: ${TitleFocusAnimation};
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.blur) {
            return `
                animation-name: ${TitleBlurAnimation};
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        }
    }}
`;

const Overlay = BaseOverlayStyle.extend``;

const OverlayInner = BaseOverlayInnerStyle.extend`

    ${ ({ state }) => {
        if (state.disabled) {
            return '';
        } else if (state.focus) {
            return `
                animation-name: ${OverlayFocusAnimation};
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.blur) {
            return `
                animation-name: ${OverlayBlurAnimation};
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        }
    }}
`;

class QaFocusButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled
            , focus: false
            , blur: false
            , overlayTop: 0
        };
        this.overlayInner = null;
    }

    // interface

    focus() { this._focus(); }

    blur() { this._blur(); }

    disable() { this._disable(); }

    enable() { this._enable(); }

    // lifeCycle

    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled == this.state.disabled) return;

        if (nextProps.disabled) {
            this._disable();
        } else {
            this._enable();
        }
    }

    render() {
        return (
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
        }, buttonTime.animation);
    }

    _disable() {
        this.setState({
            disabled: true,
            focus: false,
            blur: false
        });
    }

    _enable() {
        this.setState({
            disabled: false,
            focus: false,
            blur: false
        });
    }
}

QaFocusButton.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default QaFocusButton;
