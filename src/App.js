import Breadcrumb from "./components/Breadcrumb.js";
import Component from "./core/Component.js";
import Nodes from "./components/Nodes.js";
import Loading from "./components/Loading.js";
import { request } from "./api/index.js";
import ImageView from "./components/ImageView.js";

const cache = {};

export default class App extends Component {
  async setup() {
    /**
     * $state
     * @typedef {Object} path
     * @property {string[]} id - 폴더 node id 로 된 경로 배열
     * @property {name[]} name - 폴더 이름으로 된 경로 배열
     * 
     * @typedef {Object} data - api 결과를 node id 를 key 로 하여 저장
     * @property {string} id
     * @property {Object} node
     * 
     * @property {boolean} loading
     * 
     * @property {string} imgSrc - 선택된 이미지 파일 경로
     */
    this.$state = {
      path: {
        id: ['undefined'],
        name: [],
      },
      data: {},
      loading: false,
      imgSrc: ''
    };
    // cache
    if(cache.hasOwnProperty('undefined')){
      this.$state.data = cache.undefined;
      this.setState(this.$state);
      return;
    } 
    // request
    this.setState({
      ...this.$state,
      loading: true
    });
    const res = await request();
    for(let i of res){
      this.$state.data[i.id] = i;
    }
    cache.undefined = this.$state.data;
    this.$state.path.name.push('root'); // 처음 root 폴더가 나타나지 않게 데이터 불러온 이후에 추가
    this.$state.loading = false;
    this.setState(this.$state);
  }
  template() {
    return `
      <Breadcrumb data-component="breadcrumb"></Breadcrumb>
      <Nodes data-component="nodes"></Nodes>
      <ImageView data-component="imageView"></ImageView>
      <Loading data-component="loading"></Loading>
    `;
  }
  mounted() {
    const $breadcrumb = this.$target.querySelector('[data-component="breadcrumb"]');
    const $nodes = this.$target.querySelector('[data-component="nodes"]');
    const $loading = this.$target.querySelector('[data-component="loading"]');
    const $imageView = this.$target.querySelector('[data-component="imageView"]');
    new Breadcrumb($breadcrumb, {
      ...this.$state,
      data: {}, // Breadcrumb 에게 data 는 줄 필요가 업다.
      past: this.past.bind(this)
    });
    new Nodes($nodes, {
      ...this.$state,
      next: this.next.bind(this),
      prev: this.prev.bind(this),
      showImage: this.showImage.bind(this)
    });
    new Loading($loading, {
      loading: this.$state.loading
    });
    new ImageView($imageView, {
      imgSrc: this.$state.imgSrc,
      hideImage: this.hideImage.bind(this)
    });
  }
  /**
   * 다음 노드로 이동하는 함수
   * @param {Object} item 
   * @property {string} id
   * @property {string} name
   */
  async next(item) {
    // newState
    const {id, name} = item;
    const newState = {
      path: {
        name: [...this.$state.path.name],
        id: [...this.$state.path.id]
      },
      data: {},
      loading: false
    };
    newState.path.name.push(name);
    newState.path.id.push(id);
    // cache
    if(cache.hasOwnProperty(id)){
      newState.data = cache[id];
      this.setState(newState);
      return;
    }
    // request
    this.setState({
      ...this.$state,
      loading: true
    });
    const res = await request(id);
    for(let i of res){
      newState.data[i.id] = i;
    }
    cache[id] = newState.data;
    this.setState(newState);
  }
  // 직전 노드로 이동하는 함수
  async prev() {
    // newState
    const newState = {
      path: {
        name: [...this.$state.path.name],
        id: [...this.$state.path.id]
      },
      data: {},
      loading: false
    };
    newState.path.name.pop();
    newState.path.id.pop();
    const lastIdx = newState.path.name.length-1;
    const id = newState.path.id[lastIdx];
    // cache
    if(cache.hasOwnProperty(id)){
      newState.data = cache[id];
      this.setState(newState);
      return;
    }
    // request
    this.setState({
      ...this.$state,
      loading: true
    });
    const res = await request(id);
    for(let i of res){
      newState.data[i.id] = i;
    }
    cache[id] = newState.data;
    this.setState(newState);
  }
  // 선택한 과거 노드로 이동하는 함수
  async past(idx) {
    // 현재 폴더일 경우
    if(idx === this.$state.path.id.length-1) return;
    // newState
    const newState = {
      ...this.$state,
      data: {},
      loading: false
    };
    newState.path.name = [...this.$state.path.name].slice(0, idx+1);
    newState.path.id = [...this.$state.path.id].slice(0, idx+1);
    const lastIdx = newState.path.name.length-1;
    const id = newState.path.id[lastIdx];
    // cache
    if(cache.hasOwnProperty(id)){
      newState.data = cache[id];
      this.setState(newState);
      return;
    }
    // request
    this.setState({
      ...this.$state,
      loading: true
    });
    const res = await request(id);
    for(let i of res){
      newState.data[i.id] = i;
    }
    cache[id] = newState.data;
    this.setState(newState);
  }
  // 이미지 파일 열기
  showImage(imgSrc) {
    this.setState({
      ...this.$state,
      imgSrc: imgSrc
    });
  }
  // 이미지 파일 닫기
  hideImage() {
    this.setState({
      ...this.$state,
      imgSrc: ''
    });
  }
}