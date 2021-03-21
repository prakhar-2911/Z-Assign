import { axiosInstance } from './utilities';
import { exportGetLocalStrageDetails } from '../Redux/action/userApp/UserAppAction';

const REQUEST_TIMEOUT = 30 * 1000; //30 sec

export var api = async function ({
  method = 'get',
  api,
  body,
  params = {},
  status = false,
  token = '',
  baseURL = 'normal',
  endPoint = 'customer_support',
  timeout = REQUEST_TIMEOUT,
  headersType,
}) {
  return await new Promise(async (resolve, reject) => {
    let APIInstance = axiosInstance;
    // setting token
    if (headersType && headersType.toLowerCase() === 'useraccesstoken') {
      await exportGetLocalStrageDetails('userAccessToken').then((data) => {
        // console.log("tokenData---->", data);
        APIInstance.defaults.headers.common['access-key'] = data;
      });
    } else {
      APIInstance.defaults.headers.common[
        'Authorization'
      ] = localStorage.getItem('AuthToken');
    }

    APIInstance.defaults.timeout = timeout;
    let arg = body ? [body, { params }] : [{ params }];
    // console.log("arg", arg);
    APIInstance[method](
      `${getMicroServiceURL(baseURL, endPoint)}${api}`,
      ...arg
    )
      .then((data) => {
        // debugger;
        resolve(statusHelper(status, data));
      })
      .catch((error) => {
        if (error?.response) {
          reject(statusHelper(status, error));
        } else {
          reject(error);
        }
      });
  });
};

const statusHelper = (status, data) => {
  try {
    if (status) {
      return {
        status: data?.status,
        ...data?.data,
      };
    } else {
      return data?.data;
    }
  } catch (e) {
    return e;
  }
};

let getMicroServiceURL = (baseURL, endPoint) => {
  let finalURL = '';
  // console.log(baseURL, "15s45ds5d4s5d");
  switch (baseURL) {
    case 'chat':
      finalURL = 'api/';
      break;
    case 'user':
      finalURL = 'user/';
      break;
    case 'engagement':
      finalURL = 'engagement/';
      break;
    case 'task':
      finalURL = 'tasks/';
      break;
    default:
      break;
  }

  return (
    (endPoint == 'octo'
      ? process.env.REACT_APP_OCTA_BACKEND
      : process.env.REACT_APP_CUSTOMER_SUPPORT_BACKEND) + finalURL
  );
};
