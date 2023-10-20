import { DEV_BACKEND_URL_API } from '../const'

export async function isUserExist(email) {
  try {
    const response = await fetch(`${DEV_BACKEND_URL_API}/taken-emails/${email}`);
    return response;
  } catch (error) {
    throw new Error(error)
  }
}

export async function loginUser(email, pass) {
  try {
    const data = {
      identifier: email,
      password: pass
    }

    const response = await fetch(`${DEV_BACKEND_URL_API}/auth/local`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      });

    return response;
  } catch (error) {
    throw new Error(error)
  }
}

export async function registerUser(username, email, pass) {
  try {
    const bodyData = {
      username: username,
      email: email,
      password: pass
    }

    const response = await fetch(`${DEV_BACKEND_URL_API}/auth/local/register`,
      {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: {
          'Content-Type': 'application/json',
        }
      });

    return response;
  } catch (error) {
    throw new Error(error)
  }
}

export async function getMe() {
  try {
    const token = sessionStorage.getItem('token')
    const response = await fetch(`${DEV_BACKEND_URL_API}/users/me`,
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const data = await response.json()
      return data
    } catch (error) {
    throw new Error(error)
  }
}

export async function getUsers() {
  try {
    const token = sessionStorage.getItem('token')
    const response = await fetch(`${DEV_BACKEND_URL_API}/users`,
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const data = await response.json()
      return data
    } catch (error) {
    throw new Error(error)
  }
}
