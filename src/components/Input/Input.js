import React from 'react'
import './Input.css'

const Input = (props) => {
    let InputElement = null;
    const inputClasses = ["InputElement"];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("invalid");
    }

    if (props.elementType === 'input') {
        InputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
    } else if (props.inputType === 'textarea') {
        InputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
    } else {
        InputElement = (
            <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>
        );
    }
    return(
        <div className="Input">
            <label className="Label">{props.label}:</label>
            { InputElement } 
            <br /> 
        </div>
    )
}


export default Input