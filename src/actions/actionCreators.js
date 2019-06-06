import { DATA_LOADED } from './actions';

// const apiUrl = 'https://api.github.com/users/AregbesolaOJ';
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

export const fetchData = (data) => {
  return {
    type: DATA_LOADED,
    payload: data
  }
};

export const getData = () => {
    return async (dispatch) => {
      try {
        const response = await fetch(apiUrl);
        if(!response.ok) {
          throw Error(response.statusText)
        }
        const json = await response.json();
        dispatch(fetchData(json))
      } catch(error) {
        console.log(error)
      }
    }
}

// for data-POSTing cases:

// export const postData = (data) => {
//   return {
//     type: ADD_NEW_USER,
//     payload: data
//   }
// };
// *******************************
// export const postNewData = (user) => {
//   return async (dispatch) => {
//     const config = {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     }
//     try {
//       const response = await fetch(apiUrl, config);
//       if(!response.ok) {
//         throw Error(response.statusText)
//       }
//       const json = await response.json();
//       console.log(json, response);
//       dispatch(postData(json))
//     } catch(error) {
//       console.log(error)
//     }
//   }
// }
