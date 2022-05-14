import Component from "../core/Component.js";

/**
 * $props 
 * @param {boolean} loading
 */
export default class Loading extends Component {
  template() {
    return `
      ${ this.$props.loading
      ? `
        <div class="Modal Loading">
          <div class="content">
              <img src="./assets/nyan-cat.gif"/>
          </div>
        </div>
        `
      : ''
      }
    `;
  }
  // 모든 클릭 이벤트가 위임으로 처리되어 있어 버블링으로 인한 예기치 못한 동작은 일어나지 않음
}