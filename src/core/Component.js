export default class Component {
    $state;
    $props;
    $target;
    constructor($target, $props) {
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