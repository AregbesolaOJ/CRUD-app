import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faEdit, faInfoCircle, faTrashAlt, faCoffee } from '@fortawesome/free-solid-svg-icons'

import Person from '../components/Persons/Person/Person';
import Counter from './Counter';
import Persons from '../components/Persons/Persons'
import Input from '../components/Input/Input'
import { connect } from 'react-redux';

library.add(faCheckSquare, faEdit, faInfoCircle, faTrashAlt, faCoffee)

class App extends Component {  
  state = {
    formIsValid: false,
    myForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your address'
        },
        value: '',
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      age: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Your age'
        },
        value: '',
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email address'
        },
        value: '',
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      number: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Your phone number'
        },
        value: '',
        touched: false,
        validation: {
          required: true,
          maxLength: 5
        },
        valid: false
      },
      country: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'germany', displayValue: 'Germany'},
            {value: 'usa', displayValue: 'USA'},
            {value: 'ghana', displayValue: 'Ghana'},
            {value: 'peru', displayValue: 'Peru'},
          ]
        },
        // validation: {},
        valid: false,
        value: 'germany',
        touched: false
      }
    },
    persons: [],
    personView: [],
    isShowing: true,
    personViewModal: false,
    isEditModal: false,
    editStateForm: {},
    formEditArray: [],
    activePerson: {},        
    addUserPanel: false
  }

  view = id => {
    const personView = this.state.persons.filter(person => person.id === id);
    this.setState({ personView: personView, personViewModal: true })
    console.log(id, this.state.personView);
  }

  edit = (id) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id
    })
    
    const person = {...this.state.persons[personIndex]}
    this.setState({ activePerson: person, isEditModal: true })
    
    // const person = this.state.activePerson;
    // const formEditArray = [];
    // const editStateForm = {...this.state.myForm};
    // for (let key in editStateForm) {
    //   // const formInput = this.state.myForm;
    //   editStateForm[key].value = person[key];
    //   formEditArray.push({
    //     id: key,
    //     config: editStateForm[key]
    //   })
    // }
    // this.setState({ editStateForm: editStateForm, formEditArray: formEditArray, activePerson: person, isEditModal: true })
    // console.log(formEditArray, editStateForm);
  }

  delete = (personIndex) => {
    if (window.confirm("Do you want to delete this item") === true) {
      const p = this.state.persons.filter(person => person.id !== personIndex)
      this.setState({
        persons: p
      }, () => {
        localStorage.setItem('users', JSON.stringify(this.state.persons));
      })  
    } else {
      return;
    }
  }

  closeModal = () => {
    this.setState({ personViewModal: false })
  }

  addUser = () => {
    this.setState({ addUserPanel: true })
  }

  // personEditOnChange = (event, inputID) => {
  //   const updatedForm = {
  //     ...this.state.editStateForm
  //   };
  //   console.log(event.target.value);
  //   const updatedFormElement = {...updatedForm[inputID]};
  //   updatedFormElement.value = event.target.value;
  //   updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
  //   updatedFormElement.touched = true;
  //   updatedForm[inputID] = updatedFormElement;

  //   let formIsValid = true;
  //   for(let inputID in this.state.editStateForm) {
  //     formIsValid = updatedForm[inputID].valid && formIsValid;
  //   }
  //   this.setState({editStateForm: updatedForm, formIsValid: formIsValid})
  // }

  personEditHandler = (event, name, age, country) => {
    event.preventDefault();
    const editedPerson = {...this.state.activePerson}
    editedPerson.name = name;
    editedPerson.age = age;
    editedPerson.country = country;
    const persons = this.state.persons;
    const personIndex = persons.findIndex( p => {
      return p.id === editedPerson.id
    })

    persons[personIndex] = editedPerson;
    name = '';
    age = '';
    country = '';
    this.setState({ persons: persons, isEditModal: false })
  }

  handleChange = (event, inputID) => {
    const updatedForm = {
      ...this.state.myForm
    };
    const updatedFormElement = {...updatedForm[inputID]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedForm[inputID] = updatedFormElement;

    let formIsValid = true;
    for(let inputID in this.state.myForm) {
      formIsValid = updatedForm[inputID].valid && formIsValid;
    }
    this.setState({myForm: updatedForm, formIsValid: formIsValid})
  }

  addUserHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (let formInputId in this.state.myForm) {
      formData[formInputId] = this.state.myForm[formInputId].value;
    }
    const myId = Math.random().toString(36).substr(2);
    formData.id = myId

    this.setState({ 
      persons: [...this.state.persons, formData], 
      formIsValid: false, 
      addUserPanel: false 
    }, () => {
      localStorage.setItem('users', JSON.stringify(this.state.persons));
    });
    

    for (let key in this.state.myForm) {
      const updatedFormElement = this.state.myForm[key];
      updatedFormElement.value = '';
      updatedFormElement.valid = false;
      updatedFormElement.touched = false;
      }
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  componentDidMount() {
    this.setState({
      persons: JSON.parse(localStorage.getItem('users')) || []
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.myForm) {
      formElementsArray.push({
        id: key,
        config: this.state.myForm[key]
      });
    }

    let form = (
      <form onSubmit={this.addUserHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input key={formElement.id}
            label={formElement.id} 
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event) => this.handleChange(event, formElement.id)} />
          )
          })}
        <button disabled={!this.state.formIsValid}>Submit</button>
      </form>
    )

    //******alternatively the ternary method also works but in cases like this, 
    // the variable-if-statement method is preferable and recommended******/ 

    // let editForm =  (
    //   <form onSubmit={this.personEditHandler}>
    //     {this.state.formEditArray.map((formElement) => {
    //       return (
    //         <Input key={formElement.id}
    //         label={formElement.id} 
    //         elementType={formElement.config.elementType}
    //         elementConfig={formElement.config.elementConfig}
    //         value={formElement.config.value}
    //         shouldValidate={formElement.config.validation}
    //         invalid={!formElement.config.valid}
    //         touched={formElement.config.touched}
    //         changed={(event) => this.personEditOnChange(event, formElement.id)} />
    //       )
    //       })}
    //     <button disabled={!this.state.formIsValid}>Submit</button>
    //   </form>
    // )

    const fullView = this.state.personView[0]
    return (
      <div className="App">
          <h1>Forms and Conditional Rendering with React!</h1>
          <h2>{this.props.res} millionares per country!</h2>
          {this.state.addUserPanel ? 
            <React.Fragment>
              {form}
            </React.Fragment> 
            : 
            null
          }

          <h2>Users Table List!</h2>
          <Persons 
              persons={this.state.persons} 
              delete={this.delete}
              fullView={this.view}
              edit={this.edit}
          />
          <button onClick={this.addUser}>Add a User</button>
          {this.state.personViewModal ? <Person personView={fullView} click={this.closeModal}/> : null}
          
          {/* {this.state.isEditModal ? <Counter>{editForm}</Counter> : null} */}
          {this.state.isEditModal ? <Counter name={this.state.activePerson.name} age={this.state.activePerson.age} country={this.state.activePerson.country} update={this.personEditHandler} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {  
  return {
    res: state.result
  };
};

export default connect(mapStateToProps)(App);
