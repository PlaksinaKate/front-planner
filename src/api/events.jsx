import { DEV_BACKEND_URL_API } from '../const'

export async function getPublicEvents() {
  try {
    const response = await fetch(`${DEV_BACKEND_URL_API}/events?populate=*&filter[date][$gte]=2022-10-14T14:00:00.000Z&filter[date][$lte]=2024-10-14T14:00:00.000Z`);
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error(error)
  }
}

export async function getEventById(id) {
  try {
    const response = await fetch(`${DEV_BACKEND_URL_API}/events/${id}`);
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error(error)
  }
}

export async function getUploadFileById(id) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${DEV_BACKEND_URL_API}/upload/files/${id}`,
    {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    );
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error(error)
  }
}

export async function joinEvent(eventId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${DEV_BACKEND_URL_API}/events/${eventId}/join`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error(error)
  }
}

export async function leaveEvent(eventId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${DEV_BACKEND_URL_API}/events/${eventId}/leave`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error(error)
  }
}