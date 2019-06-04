import React, { Component } from 'react'

class UserInfo extends Component {
    render () {
        const UserInfoStyle = {
            width: '60%',
            border: '2px solid #eee',
            margin: '20px auto',
            padding: '10px',
            fontSize: '24px',
            backgroundColor: '#ffcc99',
            boxShadow: '1px 3px 3px #ccc'        
        }
        const { name, age, country } = this.props.view;
        return (
            <div style={UserInfoStyle}>
                <p>I'm {name}, about {age} years old,
                <br /> and i'm from {country}</p>
                <button onClick={this.props.personViewClose}>Close</button>
            </div>
        )    
    }
}

export default UserInfo;
