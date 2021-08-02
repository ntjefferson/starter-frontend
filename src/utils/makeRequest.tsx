import { API_URL } from '../config';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// const getAuthDetails = async () => {
//   const { uid } = await fire.auth().currentUser;
//   const token = await fire.auth().currentUser?.getIdToken(true);
//   return { uid, token };
// };

const handleHttpErrors = (fn: Function) => async (...args: any[]) => {
  try {
    const res = await fn(...args);
    if (!res.ok) {
      throw res;
    }
    return res.json();
  } catch (err) {
    const errJson = await err.json();
    if (!errJson.uiMessage) {
      switch (err.status) {
        case 400:
        case '400':
          errJson.uiMessage = 'Bad request to server.';
          break;
        case 401:
        case '401':
          errJson.uiMessage = 'Unauthorized for request. Need authentication.';
          break;
        case 403:
        case '403':
          errJson.uiMessage = 'You are not authorized for this request.';
          break;
        case 404:
        case '404':
          errJson.uiMessage = 'Server could not the requested source.';
          break;
        default:
          errJson.uiMessage = 'Internal server error. Please try again.';
      }
    }
    throw errJson;
  }
};

const getData = async (
  url: string,
  query: Record<string, any>,
  headers: Record<string, string> = defaultHeaders,
) => fetch(`${API_URL}/v1${url}`, {
  method: 'GET',
  headers: {
    ...headers,
  },
});

// const getDataAuth = async (
//   url: string,
//   query: Record<string, any>,
//   headers: Record<string, string> = defaultHeaders,
// ) => {
//   const { uid, token } = await getAuthDetails();
//   return fetch(`${API_URL}/v1/${uid}${url}`, {
//     method: 'GET',
//     headers: {
//       ...headers,
//       Authorization: token,
//     },
//   });
// };

const postData = async (
  url: string,
  query: Record<string, any>,
  body: Record<string, any> = {},
  headers: Record<string, string> = defaultHeaders,
) => fetch(`${API_URL}/v1${url}`, {
  method: 'POST',
  headers: {
    ...headers,
  },
  body: JSON.stringify(body),
});

const putData = async (
  url: string,
  query: Record<string, any>,
  body: Record<string, any> = {},
  headers: Record<string, string> = defaultHeaders,
) => fetch(`${API_URL}/v1${url}`, {
  method: 'PUT',
  headers: {
    ...headers,
  },
  body: JSON.stringify(body),
});

// const postDataAuth = async (
//   url: string,
//   query: Record<string, any>,
//   body: Record<string, any> = {},
//   headers: Record<string, string> = defaultHeaders,
// ) => {
//   const { uid, token } = await getAuthDetails();
//   return fetch(`${API_URL}/v1/${uid}${url}`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       Authorization: token,
//     },
//     body: JSON.stringify(body),
//   });
// };

// const putDataAuth = async (
//   url: string,
//   query: Record<string, any>,
//   body: Record<string, any> = {},
//   headers: Record<string, string> = defaultHeaders,
// ) => {
//   const { uid, token } = await getAuthDetails();
//   return fetch(`${API_URL}/v1/${uid}${url}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       Authorization: token,
//     },
//     body: JSON.stringify(body),
//   });
// };

module.exports = {
  getData: handleHttpErrors(getData),
  postData: handleHttpErrors(postData),
  putData: handleHttpErrors(putData),
  // getDataAuth: handleHttpErrors(getDataAuth),
  // postDataAuth: handleHttpErrors(postDataAuth),
  // putDataAuth: handleHttpErrors(putDataAuth),
};
