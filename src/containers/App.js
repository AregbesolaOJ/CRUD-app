import React, { Component, Suspense } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faEdit, faInfoCircle, faTrashAlt, faCoffee } from '@fortawesome/free-solid-svg-icons'

import EditUser from '../components/EditUser';
import Input from '../components/Input/Input'

library.add(faCheckSquare, faEdit, faInfoCircle, faTrashAlt, faCoffee)
const Persons = React.lazy(() => import('../components/Persons/Persons'));
const UserInfo = React.lazy(() => import('../components/UserInfo'));

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
    personViewModal: false,
    isEditModal: false,
    editedUser: {},
    addUserPanel: false

  }

  addUserPanel = () => {
    this.setState({ addUserPanel: true })
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
    formData.id = myId;

    const newPersons = this.state.persons.concat(formData);

    const myForm = {...this.state.myForm};
    for (let formInputId in myForm) {
      myForm[formInputId].value = '';
    }

    this.setState({ 
      myForm: myForm, 
      formIsValid: false,
      persons: newPersons,
      addUserPanel: false 
    }, () => {
      localStorage.setItem('users', JSON.stringify(this.state.persons))    
    })
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

  viewUser = id => {
    const personView = this.state.persons.find(person => person.id === id);
    this.setState({ 
      personView: personView,                 
      personViewModal: true
    })

  }

  personViewClose = () => {
    this.setState({ personViewModal: false })
  }

  editUser = id => {
    const editedUser = this.state.persons.find(person => person.id === id);
    this.setState({
      editedUser: editedUser,
      isEditModal: true
    })
    console.log(id, this.state.editedUser);

  }

  updatedUser = data => {
      const updatedFormData = {};
      for (let key in data) {
        updatedFormData[key] = data[key].value;
      }
      updatedFormData.id = this.state.editedUser.id;
      const updatedPersons = this.state.persons.map(person => {
        if(person.id === this.state.editedUser.id) {
          return person = updatedFormData;
        }
        return person;
      });
      this.setState({ persons: updatedPersons, isEditModal: false }, () => {
        localStorage.setItem('users', JSON.stringify(this.state.persons));
      })
  }

  deleteUser = id => {
    const permission = window.confirm("Do you want to delete this item");

    if(permission) {
      const filteredPersons = this.state.persons.filter(person => person.id !== id);
      this.setState({
        persons: filteredPersons
      }, () => {
        localStorage.setItem('users', JSON.stringify(this.state.persons));
      })
    } else {
        return;
    }

  }

  componentDidMount() {
    this.setState({
      persons: JSON.parse(localStorage.getItem('users'))
    })
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

    return (
      <div className="App">
          <h1>React CRUD app with REDUX</h1>
          <p>Please click on the button below to add users...</p>
          <button onClick={this.addUserPanel}>Add a User</button>

          {this.state.addUserPanel ? 
            <React.Fragment>
              {form}
            </React.Fragment> 
            : 
            null
          }
          {this.state.persons.length ? 
            <Suspense fallback={<div>Loading...</div>}>
                <Persons 
                  persons={this.state.persons}
                  viewUser={this.viewUser}
                  editUser={this.editUser}
                  deleteUser={this.deleteUser}
                />
            </Suspense> 
            : 
            null
          }          
          {this.state.personViewModal ? 
            <Suspense fallback={<div>Loading...</div>}>
                <UserInfo 
                  view={this.state.personView} 
                  personViewClose={this.personViewClose} 
                /> 
            </Suspense> 
          : 
          null
          }          
          {this.state.isEditModal ? <EditUser editedUser={this.state.editedUser} updatedUser={this.updatedUser}/> : null}
      </div>
    );
  }
}


export default App;
