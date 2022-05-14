export default class Component {
    constructor($target, $props) {
        this.$state;
        this.$target = $target;
        this.$props = $props;
        this.setup();
        this.setEvent();
        this.render();
    }
    setup() {}
    setEvent() {}
    mounted() {}
    template() { return ''; }
    render() {
        this.$target.innerHTML = this.template();
        this.mounted();
    }
    setState(newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
    }
}