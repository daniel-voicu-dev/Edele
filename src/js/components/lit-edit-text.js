import {html } from 'lit-element';
const RenderEditingArea = ({value, cssclass}) => {

  const handleKeyDown = e =>{
    setTimeout(function(){
      e.target.style.cssText = 'height:auto; padding:0';
      // for box-sizing other than "content-box" use:
      // e.currentTarget.style.cssText = '-moz-box-sizing:content-box';
      e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
    },0);
  }
  const dispatchUpdateValue = (e) =>{   
    e.currentTarget.dispatchEvent(new CustomEvent("update-value", {bubbles: true, cancelable: true, detail:{value: e.target.value.split(/\r\n|\r|\n/gi)}}));
  }

  return html`<textarea @keyup=${e=>dispatchUpdateValue(e)} @keydown="${e=>handleKeyDown(e)}" class="editing ${cssclass}">${value}</textarea>`
}

export default RenderEditingArea;