import React, { Component, Suspense } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faEdit, faInfoCircle, faTrashAlt, faCoffee } from '@fortawesome/free-solid-svg-icons'
import * as actionTypes from '../actions/actions';

import UserInfo from '../components/UserInfo';
import EditUser from '../components/EditUser';
import Input from '../components/Input/Input';
import Post from '../components/Post';
import { connect } from 'react-redux';

library.add(faCheckSquare, faEdit, faInfoCircle, faTrashAlt, faCoffee)
const Persons = React.lazy(() => import('../components/Persons/Persons'));

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
    }
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
    this.props.addUser(this.state.myForm);
    const myForm = {...this.state.myForm};
    for (let formInputId in myForm) {
      myForm[formInputId].value = '';
    }
    this.setState({ myForm: myForm, formIsValid: false })
    localStorage.setItem('users', JSON.stringify(this.props.myState.persons))    
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
          <button onClick={this.props.addUserPanel}>Add a User</button>

          {this.props.myState.addUserPanel ? 
            <React.Fragment>
              {form}
            </React.Fragment> 
            : 
            null
          }
          {this.props.myState.persons.length ? 
            <Suspense fallback={<div>Loading...</div>}>
                <Persons />
            </Suspense> 
            : 
            null
          }          
          {this.props.myState.personViewModal ? <UserInfo /> : null}          
          {this.props.myState.isEditModal ? <EditUser /> : null}
          <Post />
      </div>
    );
  }
}

const mapStateToProps = state => {  
  return {
    myState: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
      addUserPanel: () => dispatch({type: actionTypes.ADD_USER_PANEL}),
      addUser: (user) => dispatch({type: actionTypes.ADD_NEW_USER, payload: user}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
