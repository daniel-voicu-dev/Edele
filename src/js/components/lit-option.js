import { html } from 'lit-element';

const RenderOption = ({label, value, selected}) => {
  let output = document.createElement("option");
  output.value = value;
  output.label = label;
  if(value===selected) {
    output.setAttribute("selected","selected");
  }  
  return html`${output}`;
}

export default RenderOption;