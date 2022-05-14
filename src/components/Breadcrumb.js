import Component from "../core/Component.js";

/**
 * $props
 * @typedef {Object} path
 * @property {string[]} id - 폴더 node id 로 된 경로 배열
 * @property {name[]} name - 폴더 이름으로 된 경로 배열
 * 
 * @typedef { (idx: number) => none } past - 선택한 과거 노드로 이동하는 함수
 */
export default class Breadcrumb extends Component {
  template() {
    return `
      <nav class="Breadcrumb">
      ${this.$props.path.name.map((el, i) => `
        <div class="path" id=${i}>${el}</div>
      `).join('')}
      </nav>
    `;
  }
  setEvent() {
    const len = this.$props.path.id.length;
    this.$target.addEventListener('click', (e) => {
      if(e.target.classList.contains('path')) {
        const idx = parseInt(e.target.id);
        if(idx !== len-1) this.$props.past(idx);
      }
    });
  }
}