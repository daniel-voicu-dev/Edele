import React from 'react';
import ReactDOM from 'react-dom';

import './../../sass/components/quantity/quantity.sass';


// class Quantity extends React.Component {
//   render() {    
//     return (
//       <h1>EDELE</h1>
//     );
//   }
// }





// ReactDOM.render(
//   <Quantity />,
//   document.getElementById('quantity-input')
// );



let quantitySelectValueButtons = document.querySelectorAll(".quantitySelectValue");
quantitySelectValueButtons.forEach(el => {
  el.addEventListener("click", (e) => {
    document.querySelectorAll(".quantitySelectDropdown").forEach(el => { el.classList.add("hidden")});
    var target =  e.currentTarget.parentNode.querySelector(".quantitySelectDropdown");
    target.classList.toggle("hidden"); 
    e.stopImmediatePropagation();
    
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

