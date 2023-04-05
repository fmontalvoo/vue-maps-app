import axios from 'axios'

import type { LngLat, Route } from '@/models/route'

const api = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: import.meta.env.VITE_MAPBOX_TOKEN
    }
})

export const getRoute = async ({ start, end }: { start: LngLat, end: LngLat }) => {
    const { data } = await api.get<Route>(`/${start.join(',')};${end.join(',')}`)

    return data
}