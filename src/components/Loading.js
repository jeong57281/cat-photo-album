import Component from "../core/Component.js";

export default class Loading extends Component {
  /**
   * $props 
   * @param {boolean} loading
   */
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
  // 로딩 화면은 버블링으로 인한 오류가 있나?
}