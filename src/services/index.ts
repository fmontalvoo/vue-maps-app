import axios, { type AxiosRequestConfig } from 'axios'

import type { Place } from '@/models/places'

const api = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 7,
        country: 'ec',
        language: 'es',
        access_token: import.meta.env.VITE_MAPBOX_TOKEN
    }
})

export const searchPlaces = async (query: string = '', options: AxiosRequestConfig) => {
    const response = await api.get<Place>(`/${query}.json`, options)
    return response.data
}