import React, { Component } from 'react'
import { connect } from 'react-redux';

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
        return (
            <div style={UserInfoStyle}>
                <p>I'm {this.props.view.name}, about {this.props.view.age} years old,
                <br /> and i'm from {this.props.view.country}</p>
                <button onClick={this.props.personViewClose}>Close</button>
            </div>
        )    
    }
}
const mapStateToProps = state => {  
    return {
        view: state.personView,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        personViewClose: () => dispatch({type: "PERSON_VIEW_CLOSE"}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
