import React, { Component } from 'react'
import './Person.css'

class Person extends Component {    
    render () {
        return (
            <div className="Person">
                <p>I'm {this.props.personView.name}, about {this.props.personView.age} years old,
                <br /> and i'm from {this.props.personView.country}</p>
                <button onClick={this.props.click}>Close</button>
            </div>
        )    
    }
}
export default Person