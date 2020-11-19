import { LitElement, html } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import RenderEditingArea from "./lit-edit-text"
import RenderOption from "./lit-option"

class LitHeading extends LitElement {
  static get properties() {
    return { 
      value: { type: String},
      config: { type:Boolean },
      tag: { type:String },
      styling: { type:String },
      cssclass: {type:String},
      weight:{type:String},
      color:{type:String}
    };
  }

  constructor() {
    super();
    this.value = 'Placeholder heading';
    this.config = false;
    this.tag = "h1";
    this.styling = "h1";
    this.weight = "";
    this.cssclass = "";
    this.color = "";
    this.addEventListener("update-value",e=>{      
      e.stopPropagation();
      this.value = e.detail.value;
    })
  }

 

 

  createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like
     * encapsulated CSS and slots are unavailable.
     */
      return this;
    }

  render() {  
    let stylingArray=["hr1","hr2","h1","h2","h3","h4","h5","h6"];
    let tagArray=["h1","h2","h3","h4","h5","h6"];   
    let weightArray=["default","superthin","thin","normal","bold","superbold"];
    let colorArray=["default", "brand","accent","light","dark","muted"]
    let markup = `<${this.tag} class="${this.styling} weight-${this.weight} ${this.cssclass} color-${this.color}">${this.value}</${this.tag}`;
    return this.config ? html`
    <div class="config relative">    
    <div class="absolute b-100 p-2 bg-light config__container">
      <button @click="${e=>this.config = !this.config}" type="button" class="btn-icon btn-xs absolute config__close z-2" data-role="close-config"><div class="ico"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg></div></button>
      <select @change="${e=>this.tag = e.currentTarget.value}">
        ${tagArray.map(el=>RenderOption({label:`Tag: ${el}`, value:el, selected:this.tag}))}             
      </select>
      <select @change="${e=>this.styling = e.currentTarget.value}">
        ${stylingArray.map(el=>RenderOption({label:`Styling: ${el}`, value:el, selected:this.styling}))}       
      </select>
      <select @change="${e=>this.weight = e.currentTarget.value}">
        ${weightArray.map(el=>RenderOption({label:`Weight: ${el}`, value:el, selected:this.weight}))}       
      </select> 
      <select @change="${e=>this.color = e.currentTarget.value}">
        ${colorArray.map(el=>RenderOption({label:`color: ${el}`, value:el, selected:this.color}))}       
      </select>      
    </div>
    
    </div>
    ${RenderEditingArea({value:this.value, cssclass: `${this.styling} weight-${this.weight} color-${this.color} ${this.cssclass} `})}
    </div>    
    ` : 
    html`
    <div class="relative">
      <button @click="${e=>this.config = !this.config}" type="button" class="btn-icon btn-icon--config absolute l-0 t-0 ${this.config ? "hidden":""}"><div class="ico"><svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 512 512'><path d='M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208z'/></svg></div></button>
       ${unsafeHTML(markup)}
    </div>
     
    `
  }
}

customElements.define('lit-heading', LitHeading);
