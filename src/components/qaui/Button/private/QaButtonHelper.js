export default class QaButtonHelper {

    static fixOverlay() {
        const overlay = this.overlayDom;
        const overlayInner = this.overlayInnerDom;
        const width = overlayInner.clientWidth;
        const val = (-width + (overlay.clientHeight / 1.7)) / 2.0;

        this.setState({ 'overlayTop': val });
    }
}