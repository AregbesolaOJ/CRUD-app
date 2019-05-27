
const defaultState = {
    result: 2,
};

const reducer = (state = defaultState, action) => {
    if(action.type === 'INCREMENT') {
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if(action.type === 'DECREMENT') {
        return {
            ...state,
            counter: state.counter - 1
        }
    }
    if(action.type === 'ADD') {
        return {
            ...state,
            counter: state.counter + 15
            
        }
    }
    if(action.type === 'SUB') {
        return {
            ...state,
            counter: state.counter - 10
        }
    }
    if(action.type === 'ADD_NEW_POST') {
        const newPost = {
            Id: state.results.length + 1, 
            Title: action.payload.title, 
            Body: action.payload.content, 
            Author: action.payload.author
        }
        return {
            ...state,
            results: state.results.concat( newPost )
        }
    }
    if(action.type === 'ADD_NEW') {
        return {
            ...state,
            counter: state.counter + action.payload
        }
    }
    if(action.type === 'SELECTED_POST') {
        const post = state.results.filter(result => result.Id === action.postId);
        return {
            ...state,
            selectedPost: post
        }
    }
    return state
};

export default reducer;