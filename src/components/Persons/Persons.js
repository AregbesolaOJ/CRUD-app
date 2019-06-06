import React, { Component } from 'react'
import './Persons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Persons extends Component {

    render () {
        const personList = this.props.persons.map((person, index) => (
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
                            <FontAwesomeIcon className="action-icon" onClick={() => this.props.deleteUser(person.id)} style={{color: 'red'}} icon="trash-alt" />
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


export default Persons;