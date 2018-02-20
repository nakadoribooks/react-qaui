import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    buttonColor
    , buttonTime
    , BaseWrapperStyle
    , BaseOverlayStyle
    , BaseOverlayInnerStyle
    , BaseTitleStyle
} from './private/QaButtonStyle';

const Wrapper = BaseWrapperStyle.extend`
// default
cursor:pointer;
&: hover{
    border-color: ${ buttonColor.baseDark};
}
`;

const Title = BaseTitleStyle.extend`
    
    @keyframes QaButtonTitleFocusAnimation{
        0% { transform: scale(1.0); } 
        50% { transform: scale(0.98); } 
        100% { transform: scale(1.0); }
    }

    ${ props => {
        if (props.state.disabled) {
            return `
            color: ${buttonColor.disabled};
            `;
        } else if (props.state.focus) {
            return `
                animation-name: QaButtonTitleFocusAnimation;
                animation-duration: ${buttonTime.animation}ms;
            `;
        }
    }}
`;

const Overlay = BaseOverlayStyle.extend``;

const OverlayInner = BaseOverlayInnerStyle.extend`
    
    @keyframes QaButtonFocusAnimation{
        0% { transform: translateY(calc(-50% + 16px)) scale(0.0); opacity:0.8; } 
        100% { transform: translateY(calc(-50% + 16px)) scale(1.0); opacity:0.1 }
    }

    ${ props => {

        let state = props.state;

        if (state.disabled) {
            return `
            `;
        } else if (state.focus) {
            return `
                animation-name: QaButtonFocusAnimation;
                animation-duration: ${buttonTime.animation}ms;
            `;
        }
    }}
`;

class QaButton extends Component {
    constructor(props) {
        super(props);
        this.state = { disabled: props.disabled, focus: false, overlayTop: 0 };
        this.overlayInner = null;
    }

    // interface

    disable() { this._disable(); }

    enable() { this._enable(); }

    // lifeCycle

    // componentDidMount() { }
    // componentWillMount() { }
    // componentWillUpdate(nextProps, nextState) { }
    // componentDidUpdate(prevProps, prevState) { }
    // shouldComponentUpdate() { return true; }
    // componentWillUnmount() { }

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
            <div>
                <Wrapper
                    state={this.state}
                    onClick={this.onClick.bind(this)}>
                    <Overlay
                        innerRef={(el) => { this.overlayDom = el; }}
                        state={this.state}>
                        <OverlayInner
                            state={this.state}
                            overlayTop={this.state.overlayTop}
                            disabled={this.props.disabled}
                            innerRef={(el) => { this.overlayInnerDom = el; }}
                        />
                    </Overlay>
                    <Title
                        disabled={this.props.disabled}
                        state={this.state}
                    >{this.props.title}</Title>
                </Wrapper>
            </div>
        );
    }

    onClick() {
        if (this.state.focus) return;
        if (this.props.onClick != null) this.props.onClick.apply(this, arguments);
        this.setState({ focus: true });
        setTimeout(() => {
            this.setState({ focus: false });
        }, buttonTime.animation);
    }

    _disable() {
        this.setState({
            disabled: true,
            focus: false
        });
    }

    _enable() {
        this.setState({
            disabled: false,
            focus: false
        });
    }
}

QaButton.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default QaButton;
