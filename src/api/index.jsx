import { DEV_BACKEND_URL, LOCAL_BACKEND_URL } from '../const'

export async function getPublicEvents() {
  try {
    const response = await fetch(`${DEV_BACKEND_URL}/events?populate=*&filter[date][$gte]=2022-10-14T14:00:00.000Z&filter[date][$lte]=2024-10-14T14:00:00.000Z`);
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error(error)
  }
}

export async function isUserExist(email) {
  try {
    const response = await fetch(`${DEV_BACKEND_URL}/taken-emails/${email}`);
    return response;
  } catch (error) {
    throw new Error(error)
  }
} 