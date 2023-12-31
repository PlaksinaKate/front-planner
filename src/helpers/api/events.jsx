import {DEV_BACKEND_URL_API} from '../const'

async function getPublicEvents() {
    try {
        const response = await fetch(`${DEV_BACKEND_URL_API}/events?populate=*&filter[date][$gte]=2022-10-14T14:00:00.000Z&filter[date][$lte]=2024-10-14T14:00:00.000Z`);
        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error(error)
    }
}

async function getEventById(id) {
    try {
        const response = await fetch(`${DEV_BACKEND_URL_API}/events/${id}`);
        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error(error)
    }
}

async function getUploadFile(img) {
    try {
        const bodyData = {
            files: img
        }

        const token = sessionStorage.getItem('token')
        const response = await fetch(`${DEV_BACKEND_URL_API}/upload`,
            {
                method: 'POST',
                body: JSON.stringify(bodyData),
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

async function getUploadFileById(id) {
    try {
        const token = sessionStorage.getItem('token')
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

async function joinEvent(eventId) {
    try {
        const token = sessionStorage.getItem('token')
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

async function leaveEvent(eventId) {
    try {
        const token = sessionStorage.getItem('token')
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

async function createEvent(event) {
    try {
        const bodyData = {
            title: event.title,
            description: event.description,
            dateStart: event.dateStart,
            location: event.location,
            participants: event.participants
        }

        const token = sessionStorage.getItem('token')
        const response = await fetch(`${DEV_BACKEND_URL_API}/events`,
            {
                method: 'POST',
                body: JSON.stringify(bodyData),
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            });
        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error(error)
    }
}

async function createEventPhotos(eventId, event) {
    try {
        const bodyData = {
            title: event.title,
            description: event.description,
            dateStart: event.dateStart,
            location: event.location,
            owner: event.owner,
            participants: event.participants,
            photos: event.photos
        }

        const token = sessionStorage.getItem('token')
        const response = await fetch(`${DEV_BACKEND_URL_API}/events/${eventId}`,
            {
                method: 'PUT',
                body: JSON.stringify(bodyData),
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            });
        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error(error)
    }
}

export const events = {
    getPublicEvents,
    getEventById,
    getUploadFile,
    getUploadFileById,
    joinEvent,
    leaveEvent,
    createEvent,
    createEventPhotos,
}
