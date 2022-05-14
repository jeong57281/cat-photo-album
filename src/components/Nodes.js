import Component from "../core/Component.js";

/**
 * $props
 * @typedef {Object} path
 * @property {string[]} id - 폴더 node id 로 된 경로 배열
 * @property {name[]} name - 폴더 이름으로 된 경로 배열
 * 
 * @typedef {Object} data - api 결과를 node id 를 key 로 하여 저장
 * @property {string[]} id - 폴더 node id 로 된 경로 배열
 * @property {name[]} name - 폴더 이름으로 된 경로 배열 
 *
 * @typedef { ({id: string, name: string}) => none } next - 다음 노드로 이동하는 함수
 * @typedef { () => none } prev - 직전 노드로 이동하는 함수
 * 
 * @typedef { () => none } showImage
 */
export default class Nodes extends Component {
  template() {
    const path = this.$props.path;
    const len = path.id.length;
    return `
      <div class="Nodes">
        ${len !== 1
        ? `
          <div id="prev" class="Node">
              <img src="./assets/prev.png">
          </div>
          `
        : ''
        }
        ${Object.values(this.$props.data).map(el =>
          el.type === 'DIRECTORY'
            ? `
              <div id="${el.id}" class="Node">
                  <img src="./assets/directory.png">
                  <div>${el.name}</div>
              </div>
              `
            : `
              <div id="${el.id}" class="Node">
                  <img src="./assets/file.png">
                  <div>${el.name}</div>
              </div>
              `
        ).join('')}
      </div>
    `;
  }
  setEvent() {
    this.$target.addEventListener('click', (e) => {
      if(e.target.tagName === 'IMG') {
        const parent = e.target.parentElement;
        const id = parent.id;
        const data = this.$props.data[id];
        if(parent.id === 'prev') {
          this.$props.prev();
        }
        else {
          if(data.type === 'DIRECTORY') {
            this.$props.next({
              id: id,
              name: data.name
            });
          }
          else if(data.type === 'FILE') {
            this.$props.showImage(data.filePath);
          }
        }
      }
    })
  }
}