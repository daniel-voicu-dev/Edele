import React from 'react';
import ReactDOM from 'react-dom'; 
import Tooltip from '../../../node_modules/tooltip.js/dist/esm/tooltip.js';
import './../../sass/components/quantity/quantity.sass';


class Option extends React.Component {  
  render() {
    if (this.props.value === 10) {
      return (
        <button key={this.props.value} onClick={() => this.props.onClick()} type="button" value={this.props.value}>{this.props.value}+</button>
      );
    } else {
      return (
        <button key={this.props.value} onClick={() => this.props.onClick()} type="button" value={this.props.value}>{this.props.value}</button>
      );
    }
    
  }
}
class Quantity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: parseFloat(props.value),     
      stock: parseFloat(props.stock),
      name: props.name,
      min: parseFloat(props.min),
      step: parseFloat(props.step),
      open: false,
      select: true 
    };    
  }  
  
  handleClick(e) {
    // ignore clicks on the component itself    
    if (this.node.contains(e.target)) {
      return;
    }
    this.setState({open: false});  
  }
  componentDidMount() {
    // add event listener for clicks
    document.addEventListener('click', this.handleClick.bind(this), false);  
    const referenceElement = this.node;
    this.instance = new Tooltip(referenceElement, {
      placement: 'top', // or bottom, left, right, and variations
      title: "Quantity unavailable",
      trigger: "manual"
    });     
  }

  componentWillUnmount() {
    // make sure you remove the listener when the component is destroyed
    document.removeEventListener('click', this.handleClick.bind(this), false);
  } 
  handleChange(evt) {      
    this.setState({value: parseFloat(evt.target.value)});   
    console.log(evt.target.value);
    if(parseFloat(evt.target.value) > this.state.stock) {
      this.instance.show();
    } else {
      this.instance.hide();
    }
  }
  handleBlur() {    
    // if(parseFloat(this.state.value) > parseFloat(this.state.stock)) {
    //   this.instance.show();
    // } else {
    //   this.instance.hide();
    // }
    if(this.state.value >=10 ) {
      this.setState({select: false});
    } else {
      this.setState({select: true});
    }
  }
  handleKeyPress(evt) {
    //allow only numbers
    let value = (Array.apply(null, {length: 10}).map(Number.call, Number)).reduce((result, v, k) => { 
      if((evt.key).includes(v.toString())) {
        result = [...result, true];
      }
      return result;
    },[]);
    if(value.length === 0) {
      evt.preventDefault();
    }    
  }
  updateValue(i) {
    // if(parseFloat(i) > parseFloat(this.state.stock)) {
    //   this.instance.show();
    // } else {
    //   this.instance.hide();
    
      
      this.setState({open: false});  
      if(parseFloat(i) >=10 ) {
        this.setState({value: i});
        this.setState({select: false});
      } else {
        this.setState({value: i});
        this.setState({select: true});
      }
    // }
  }
  toggleDropdown() {    
    this.setState({open: !this.state.open});
  }
  renderOption(i){
    return (
      <Option key={i} value={i} onClick={() => this.updateValue(i)} />
    )
  }
  renderWithStock(optionArray) {
    let dropdownClass = this.state.open === false ? "quantitySelectDropdown hidden" : "quantitySelectDropdown";
    let selectClass = this.state.select === true ?  "quantitySelectValue" : "quantitySelectValue hidden";
    let inputClass = this.state.select !== true ? "input-value" : "input-value hidden";
    return (
      <div className="eComQuantity"  ref={node => this.node = node}>
        <button className={selectClass} type="button" onClick={() => this.toggleDropdown()}><span className="value">{this.state.value}</span> <i className="fa fa-angle-down"></i></button>
        <div className={dropdownClass}>
          {optionArray.map(x => this.renderOption(x))}
        </div>
        <input className={inputClass} type="text" name={this.state.name} onKeyPress={(evt) => this.handleKeyPress(evt)} onBlur={()=>this.handleBlur()} onChange={(evt) => this.handleChange(evt)} value={this.state.value} />  
      </div>
    );
  }
  renderWithoutStock(optionArray) {
    return (
      <div className="eComQuantity" ref={node => this.node = node}>         
        <p>Unavailable</p>
      </div>
    );
  }
  render() {        
    let optionCount = this.state.stock > 10 ? 10 : this.state.stock;
    let optionArray = Array.from({length: optionCount}, (v, k) => k+1).filter(val => val >= this.state.min).filter(val => val % this.state.step === 0 || val === 10);     
    console.log(optionArray);
    if (optionCount === 0){
      return this.renderWithoutStock(optionArray);
    } else {
      return this.renderWithStock(optionArray);
    }
  }
}




var quantityCollection = document.querySelectorAll('.quantity-input')

quantityCollection.forEach(el => {  
  let stock = el.attributes["data-stock"] !== undefined ? el.attributes["data-stock"].value : "0";
  let value = el.attributes["data-value"] !== undefined ? el.attributes["data-value"].value : "1";
  let name = el.attributes["data-name"] !== undefined ? el.attributes["data-name"].value : "";
  let min = el.attributes["data-min"] !== undefined ? el.attributes["data-min"].value : "1";
  let step = el.attributes["data-step"] !== undefined ? el.attributes["data-step"].value : "1";
  ReactDOM.render(
    <Quantity stock={stock} value={value} name={name} min={min} step={step} />, el
  );

});