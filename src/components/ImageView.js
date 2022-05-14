import Component from "../core/Component.js";

/**
 * $prpos
 * @param {string} imgSrc
 * @typedef { () => none } hideImage
 */
export default class ImageView extends Component {
  template() {
    const baseUrl = "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";
    const imgSrc = this.$props.imgSrc;
    return `
      ${ imgSrc !== ''
        ? `
          <div class="Modal ImageViewer" tabindex="0">
            <div class="content">
                <img src="${baseUrl}${imgSrc}"/>
            </div>
          </div>
        `
        : ''
      }
    `;
  }
  mounted() {
    if(this.$props.imgSrc === '') return;
    const $modal = this.$target.querySelector('.Modal');
    $modal.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') this.$props.hideImage();
    });
    $modal.focus();
  }
  setEvent() {
    this.$target.addEventListener('click', (e) => {
      if(e.target.tagName !== 'IMG') this.$props.hideImage();
      e.stopPropagation();
    });
  }
}