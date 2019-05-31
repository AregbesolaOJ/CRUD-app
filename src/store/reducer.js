import * as actionTypes from '../actions/actions';

const defaultState = {
    formIsValid: false,
    persons: JSON.parse(localStorage.getItem('users')),
    personViewModal: false,
    isEditModal: false,
    editStateForm: {},
    addUserPanel: false
};

const reducer = (state = defaultState, action) => {
    switch( action.type ) {

        case actionTypes.ADD_NEW_USER:
            const formData = {};

            for (let formInputId in action.payload) {
              formData[formInputId] = action.payload[formInputId].value;
            }
            const myId = Math.random().toString(36).substr(2);
            formData.id = myId
            return {
                ...state,
                myForm: action.payload,
                persons: state.persons.concat(formData), 
                formIsValid: false, 
                addUserPanel: false                 
            }
        case actionTypes.VIEW_USER:
            const personView = state.persons.find(person => person.id === action.payload);
            return {
                ...state,
                personView: personView,
                personViewModal: true
            }
        case actionTypes.PERSON_VIEW_CLOSE:
            return {
                ...state,
                personViewModal: false
            }
        case actionTypes.EDIT_USER:
            const editedUser = state.persons.find(person => person.id === action.payload);
            return {
                ...state,
                editedUser: editedUser,
                isEditModal: true
            }
        case actionTypes.UPDATE_USER:
            const updatedFormData = {};
            for (let key in action.payload) {
              updatedFormData[key] = action.payload[key].value;
            }
            updatedFormData.id = state.editedUser.id;
            const updatedPersons = state.persons.map(person => {
              if(person.id === state.editedUser.id) {
                return person = updatedFormData;
              }
              return person;
            });
            return {
                ...state,
                persons: updatedPersons,
                isEditModal: false
            }
        case actionTypes.DELETE_USER:
            const filteredPersons = state.persons.filter(person => person.id !== action.payload)
            return {
                ...state,
                persons: filteredPersons
            }
        case actionTypes.ADD_USER_PANEL:
            return {
                ...state,
                addUserPanel: true,
            }

        default:
            return state;
        }
    
    };

export default reducer;