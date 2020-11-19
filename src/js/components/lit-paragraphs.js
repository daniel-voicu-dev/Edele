import { LitElement, html } from 'lit-element';
import RenderEditingArea from "./lit-edit-text"
import RenderOption from "./lit-option"
class LitParagraps extends LitElement {
  static get properties() {
    return { 
      value: { type: String},
      config: { type:Boolean },     
      cssclass: {type:String},   
      color:{type:String},
      size: {type:String},
      weight:{type:String}
    };
  }
  constructor() {
    super();
    this.value = Array.from(this.children).map(el=>el.innerText);
    this.config = false;    
    this.cssclass = "";
    this.color = "";
    this.weight = "";
    this.size = "default"   
    this.addEventListener("update-value",e=>{     
      e.stopPropagation();
      this.value = e.detail.value.filter(v=>v!=="");
    })
  }

  createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like
     * encapsulated CSS and slots are unavailable.
     */
    return this;
  }

  updated() {
    console.log(this.value)
  }  

  render() {
    let colorArray=["default", "brand","accent","light","dark","muted"]
    let sizeArray=["default", "xs","sm","md","lg","xl"]
    let weightArray=["default","superthin","thin","normal","bold","superbold"];
    return this.config ?  html`
    <div class="config relative">    
    <div class="absolute b-100 p-2 bg-light config__container">
      <button @click="${e=>this.config = !this.config}" type="button" class="btn-icon btn-xs absolute config__close z-2" data-role="close-config"><div class="ico"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg></div></button>
      <select @change="${e=>this.size = e.currentTarget.value}">
        ${sizeArray.map(el=>RenderOption({label:`Size: ${el}`, value:el, selected:this.size}))}             
      </select> 
      <select @change="${e=>this.weight = e.currentTarget.value}">
        ${weightArray.map(el=>RenderOption({label:`Weight: ${el}`, value:el, selected:this.weight}))}       
      </select> 
      <select @change="${e=>this.color = e.currentTarget.value}">
        ${colorArray.map(el=>RenderOption({label:`Color: ${el}`, value:el, selected:this.color}))}       
      </select>      
    </div>
    
    </div>
    ${RenderEditingArea({value:this.value, cssclass: `weight-${this.weight} font-${this.size} color-${this.color} ${this.cssclass} `})}
    </div>    
    ` : html`
    <div class="relative">
      <button @click="${e=>this.config = !this.config}" type="button" class="btn-icon btn-icon--config absolute l-0 t-0 ${this.config ? "hidden":""}"><div class="ico"><svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 512 512'><path d='M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208z'/></svg></div></button>
      <div class="${this.color} weight-${this.weight} font-${this.size} ${this.cssclass} ">${this.value.map(el=>html`<p>${el}</p>`)}</div>
      </div>`
  }  

}

customElements.define('lit-paragraphs', LitParagraps);