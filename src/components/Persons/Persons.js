import React, { Component } from 'react'
import './Persons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Persons extends Component {
    render () {
        const personList = this.props.persons.map((person, index) => {

            return  <tbody key={person.id}>
                        <tr>
                            <td>
                            {index + 1}.
                            </td>

                            <td>
                            {person.name}
                            </td>

                            <td>
                            {person.age}
                            </td>

                            <td>{person.country}</td>
                            <td>
                                <FontAwesomeIcon className="action-icon" onClick={() => this.props.fullView(person.id)} style={{color: 'lightblue'}} icon="info-circle" />
                                <FontAwesomeIcon className="action-icon" onClick={() => this.props.edit(person.id)} style={{color: 'grey'}} icon="edit" />
                                <FontAwesomeIcon className="action-icon" onClick={() => this.props.delete(person.id)} style={{color: 'red'}} icon="trash-alt" />
                            </td>
                        </tr>
                    </tbody>
            // return <Person 
            // key={person.id} 
            // name={person.name} 
            // age={person.age} 
            // city={person.city}
            // change={(event) => this.props.changed(event, person.id)} 
            // click={() => this.props.clicked(index)} />
        })
        return (
            <div className="personsTable">
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

                    {personList}
                </table>
            </div>
        )
    }
}

export default Persons;