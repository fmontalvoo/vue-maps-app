import { ref, computed } from 'vue'

import Mapboxgl from 'mapbox-gl'
import { defineStore } from 'pinia'

import { getRoute } from '@/services'
import type { Feature } from '@/models/places'
import type { LngLat } from '@/models/route'

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
        const res = await getRoute({ start, end })
        console.table(res)
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
        getRouteBetweenSE,
        setMap(m: mapboxgl.Map) {
            map.value = m
        },
    }
})