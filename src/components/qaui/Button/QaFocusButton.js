import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QaButtonHelper from './private/QaButtonHelper';
import {
    buttonColor
    , buttonTime
    , BaseWrapperStyle
    , BaseOverlayStyle
    , BaseOverlayInnerStyle
    , BaseTitleStyle
} from './private/QaButtonStyle';

const Wrapper = BaseWrapperStyle.extend`

    ${props => {
        let state = props.state;

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

    @keyframes QaFocusButtonTitleFocusAnimation{
        0% { transform: scale(1.0); color:${buttonColor.base}; } 
        100% { transform: scale(0.98); color:${buttonColor.lightText}; }
    }
    @keyframes QaFocusButtonTitleBlurAnimation{
        0% { transform: scale(0.98); color:${buttonColor.lightText}; } 
        100% { transform: scale(1.0); color:${buttonColor.base}; }
    }

    ${ props => {
        let state = props.state;
        if (state.disabled) {
            return `
            color: ${buttonColor.disabled};
            `;
        } else if (state.focus) {
            return `
                animation-name: QaFocusButtonTitleFocusAnimation;
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.blur) {
            return `
                animation-name: QaFocusButtonTitleBlurAnimation;
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        }
    }}
`;

const Overlay = BaseOverlayStyle.extend``;

const OverlayInner = BaseOverlayInnerStyle.extend`
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
                animation-duration: ${buttonTime.animation}ms;
                animation-fill-mode: forwards;
            `;
        } else if (state.blur) {
            return `
                animation-name: QaFocusButtonBlurAnimation;
                animation-duration: ${buttonTime.animation}ms;
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
        }, buttonTime.animation);
    }
}

QaFocusButton.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default QaFocusButton;
