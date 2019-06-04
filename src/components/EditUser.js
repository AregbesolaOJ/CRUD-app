import React from 'react';
import Input from './Input/Input';

class EditUser extends React.Component {
    state = {
        formIsValid: true,
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
            formIsValid = updatedForm[inputID].value !== '' && formIsValid;
        }
        this.setState({myForm: updatedForm, formIsValid: formIsValid})
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

    updatedUser = event => {
        event.preventDefault();
        this.props.updatedUser(this.state.myForm);
        localStorage.setItem('users', JSON.stringify(this.props.persons));
    }

    componentDidMount() {
        const formCopy = {...this.state.myForm};
        for (let key in formCopy) {
            formCopy[key].value = this.props.editedUser[key];
        }

        this.setState({ myForm : formCopy })

    }

    render() {
        const formEditArray = [];

        for (let key in this.state.myForm) {
            formEditArray.push({
                id: key,
                config: this.state.myForm[key]
            });            
        }

        const editForm = (
            <form onSubmit={this.updatedUser}>
                {formEditArray.map((formElement) => {
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
        return(
            <div className="">
                {editForm}
            </div>
        )
    }
}


export default EditUser;


