import { ref, computed } from 'vue'

import Mapboxgl from 'mapbox-gl'
import { defineStore } from 'pinia'

import { getRoute } from '@/services'
import type { LngLat } from '@/models/route'
import type { Feature } from '@/models/places'

export const useMapStore = defineStore('map', () => {
    const map = ref<mapboxgl.Map | undefined>()
    const markers = ref<mapboxgl.Marker[]>([])
    const distance = ref<number | undefined>()
    const duration = ref<number | undefined>()

    const setMarkers = (places: Feature[]) => {
        markers.value.forEach(m => m.remove()) // remove all markers

        markers.value = [] // reset markers

        if (!places.length) return

        markers.value = places.map(p => {
            const [lng, lat] = p.center

            const popup = new Mapboxgl.Popup({ offset: 25 })
                .setLngLat([lng, lat])
                .setHTML(`<h6>${p.text_es}</h6><p>${p.place_name_es}</p>`)

            const marker = new Mapboxgl.Marker()
                .setLngLat([lng, lat])
                .setPopup(popup)

            return marker
        })
        markers.value.forEach(m => m.addTo(map.value!))
    }

    const getRouteBetweenSE = async (start: LngLat, end: LngLat) => {
        return await getRoute({ start, end })
    }

    const setRoutePolyline = (coords: number[][]) => {
        const start = coords[0]
        
        const bounds = new Mapboxgl.LngLatBounds(
            [start[0], start[1]],
            [start[0], start[1]],
        )

        coords.forEach(c => bounds.extend([c[0], c[1]]))

        map.value?.fitBounds(bounds, {
            padding: 100,
        })

        const sourceData: Mapboxgl.AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords,
                        }
                    }
                ]
            }
        }

        if (map.value?.getLayer('RouteString')) {
            map.value?.removeLayer('RouteString')
            map.value?.removeSource('RouteString')
        }

        map.value?.addSource('RouteString', sourceData)

        map.value?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-width': 8,
                'line-color': '#3b82f6',
            }
        })
    }

    return {
        // state
        map,
        markers,
        distance,
        duration,
        // getters
        isMapReady: computed(() => !!map.value),
        // actions
        setMarkers,
        setRoutePolyline,
        getRouteBetweenSE,
        setMap(m: mapboxgl.Map) {
            map.value = m
        },
    }
})