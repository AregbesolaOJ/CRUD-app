import React, { Component } from 'react'
import './Persons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import * as actionTypes from '../../actions/actions';

class Persons extends Component {

    deleteUser = id => {
        const permission = window.confirm("Do you want to delete this item");

        if(permission) {
            this.props.deleteUser(id);
            localStorage.setItem('users', JSON.stringify(this.props.myState));
        } else {
            return;
        }
    }

    render () {
        const personList = this.props.myState.map((person, index) => (
                    <tr key={person.id}>
                        <td>
                            {index + 1}.
                        </td>

                        <td>
                            {person.name}
                        </td>

                        <td>
                            {person.age}
                        </td>

                        <td>
                            {person.country}
                        </td>
                        <td>
                            <FontAwesomeIcon className="action-icon" onClick={() => this.props.viewUser(person.id)} style={{color: 'lightblue'}} icon="info-circle" />
                            <FontAwesomeIcon className="action-icon" onClick={() => this.props.editUser(person.id)} style={{color: 'grey'}} icon="edit" />
                            <FontAwesomeIcon className="action-icon" onClick={() => this.deleteUser(person.id)} style={{color: 'red'}} icon="trash-alt" />
                        </td>
                    </tr>
                  ));

        return (
            <div className="personsTable">
                <h2>Users Table List!</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Country</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personList}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {  
  return {
    myState: state.persons,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      viewUser: (userId) => dispatch({type: actionTypes.VIEW_USER, payload: userId}),
      editUser: (userId) => dispatch({type: actionTypes.EDIT_USER, payload: userId}),
      deleteUser: (userId) => dispatch({type: actionTypes.DELETE_USER, payload: userId})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);