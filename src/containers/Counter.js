import React from 'react';

import { connect } from 'react-redux';

class Counter extends React.Component {
    state = {
        name: this.props.name,
        age: this.props.age,
        country: this.props.country
    }

    personEditChange = (event) => {
        const {name, value} = event.target
    
        this.setState({
            [name]: value
        })
    
    }
    
    render() {
        return(
            <div className="">

                <form className="todolist_forms">
                    <input type="text" name="name" value={this.state.name} onChange={this.personEditChange}/> 

                    <input type="number" name="age" value={this.state.age} onChange={this.personEditChange}/> 

                    <select name="country" value={this.state.country} onChange={this.personEditChange}>
                        <option value="">{this.state.country}</option>
                        <option value="germany">Germany</option>
                        <option value="usa">USA</option>
                        <option value="ghana">Ghana</option>
                        <option value="peru">Peru</option>
                    </select>

                    <button onClick={(event) => this.props.update(event, this.state.name, this.state.age, this.state.country)}>Edit Item</button> 
                </form>
                {/* {this.props.children} */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.result
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrement: () => dispatch({type: 'INCREMENT'}),
        onDecrement: () => dispatch({type: 'DECREMENT'}),
        onAddition: () => dispatch({type: 'ADD'}),
        onSubtraction: () => dispatch({type: 'SUB'})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);


