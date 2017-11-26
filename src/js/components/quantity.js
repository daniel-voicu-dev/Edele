import React from 'react';
import ReactDOM from 'react-dom';

import './../../sass/components/quantity/quantity.sass';


class Quantity extends React.Component {
  render() {    
    return (
      <div className="eComQuantity">
        <button className="quantitySelectValue" type="button"><span className="value">1</span> <i className="fa fa-angle-down"></i></button>
        <div className="quantitySelectDropdown hidden">
          <button type="button" value="1">1</button>
          <button type="button" value="2">2</button>
          <button type="button" value="3">3</button>
          <button type="button" value="4">4</button>
          <button type="button" value="5">5</button>
          <button type="button" value="6">6</button>
          <button type="button" value="7">7</button>
          <button type="button" value="8">8</button>
          <button type="button" value="9">9</button>
          <button type="button" value="10">10+</button>        
        </div>
        <input className="input-value hidden" type="text" name="TagToSend1" defaultValue="1" />        
      </div>
    );
  }
}




var quantityCollection = document.querySelectorAll('.quantity-input')

quantityCollection.forEach(el => {
  console.log(el.attributes["data-test"]);
  let stock = el.attributes["data-stock"] !== undefined ? el.attributes["data-stock"].value : "0";
  let value = el.attributes["data-value"] !== undefined ? el.attributes["data-value"].value : "1";
  ReactDOM.render(
    <Quantity stock={stock} value={value} />, el
  );

});




let quantitySelectValueButtons = document.querySelectorAll(".quantitySelectValue");
quantitySelectValueButtons.forEach(el => {
  el.addEventListener("click", (e) => {
    document.querySelectorAll(".quantitySelectDropdown").forEach(el => { el.classList.add("hidden")});
    let currentValue = e.currentTarget.value;
    let target =  e.currentTarget.parentNode.querySelector(".quantitySelectDropdown");
    target.classList.toggle("hidden"); 
    e.stopImmediatePropagation();  
  });  
});

let quantitySelectDropdownButtons = document.querySelectorAll(".quantitySelectDropdown button");
quantitySelectDropdownButtons.forEach(el => {
  el.addEventListener("click", (e) => {
    let currentValue = e.currentTarget.value;
    let target =  e.currentTarget.parentNode.parentNode.querySelector(".quantitySelectValue");
    let dropdown =  e.currentTarget.parentNode.classList.add("hidden");
    let realInput = e.currentTarget.parentNode.parentNode.querySelector(".input-value")
    realInput.innerHTML = currentValue;
    realInput.value = currentValue;
    target.querySelector(".value").innerHTML = currentValue;
    target.value = currentValue;   
    if (parseFloat(currentValue) > 9) {
      target.classList.add("hidden");
      realInput.classList.remove("hidden");
    }
  });
});
let quantityInput = document.querySelectorAll(".input-value");
quantityInput.forEach(el => {
  el.addEventListener("change",(e) => {
    let currentValue = e.currentTarget.value;
    let target =  e.currentTarget.parentNode.querySelector(".quantitySelectValue");
    let realInput = e.currentTarget;
    e.currentTarget.value = currentValue;
    e.currentTarget.innerHTML = currentValue;
    console.log(currentValue);
    if (parseFloat(currentValue) < 10) {
      target.querySelector(".value").innerHTML = currentValue;
      target.value = currentValue;
      target.classList.remove("hidden");
      realInput.classList.add("hidden");
    }
  });
});

document.addEventListener("click", (evt) => {   
  // document.querySelector(".quantitySelectDropdown").classList.add("hidden");
  const flyoutElement = document.querySelector(".quantitySelectDropdown");
  let targetElement = evt.target;
  // console.dir(flyoutElement, targetElement)
  do {
      if (targetElement == flyoutElement) { 
          return;
      }          
      targetElement = targetElement.parentNode;
  } while (targetElement);    
  
  
  document.querySelectorAll(".quantitySelectDropdown").forEach(el => { el.classList.add("hidden")});
  // console.log(flyoutElement);
});

