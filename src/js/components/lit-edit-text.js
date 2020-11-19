import { LitElement,html } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
// const RenderEditingArea = ({value, cssclass}) => {

//   const handleKeyDown = e =>{
//     setTimeout(function(){
//       e.target.style.cssText = 'height:auto; padding:0';
//       // for box-sizing other than "content-box" use:
//       // e.currentTarget.style.cssText = '-moz-box-sizing:content-box';
//       e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
//     },0);
//   }
//   const dispatchUpdateValue = (e) =>{   
//     e.currentTarget.dispatchEvent(new CustomEvent("update-value", {bubbles: true, cancelable: true, detail:{value: e.target.value.split(/\r\n|\r|\n/gi)}}));
//   }

//   return html`<textarea @keyup=${e=>dispatchUpdateValue(e)} @keydown="${e=>handleKeyDown(e)}" class="editing ${cssclass}">${unsafeHTML(value)}</textarea>`
// }

// export default RenderEditingArea;

class LitEdit extends LitElement {
  static get properties() {
    return {
      value: {type:String},
      cssclass: {type:String}
    };
  }

  constructor(){
    super();
    this.value="";
    this.cssclass = "";
  }

  createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like
     * encapsulated CSS and slots are unavailable.
     */
    return this;
  }
  async firstUpdated(){
    await new Promise((r) => setTimeout(r, 0));
    this.renderRoot.querySelector("textarea").style.cssText = 'height:auto; padding:0';
    this.renderRoot.querySelector("textarea").style.cssText = 'height:' + this.renderRoot.querySelector("textarea").scrollHeight + 'px';
    console.log(this.renderRoot)
  }

  handleKeyDown(e){
    setTimeout(function(){   
      e.target.style.cssText = 'height:auto; padding:0';  
      e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
    },0);
  }

  dispatchUpdateValue(e){   
    e.currentTarget.dispatchEvent(new CustomEvent("update-value", {bubbles: true, cancelable: true, detail:{value: e.target.value.split(/\r\n|\r|\n/gi)}}));
  }
  render() {
    return html`<textarea @keyup=${e=>this.dispatchUpdateValue(e)} @keydown="${e=>this.handleKeyDown(e)}" class="editing ${this.cssclass}">${unsafeHTML(this.value)}</textarea>`;
  }
}
customElements.define('lit-edit', LitEdit);