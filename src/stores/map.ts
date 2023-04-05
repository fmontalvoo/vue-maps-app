import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
    const map = ref<mapboxgl.Map | undefined>()
    const markers = ref<mapboxgl.Marker[]>([])
    const distance = ref<number | undefined>()
    const duration = ref<number | undefined>()


    return {
        // state
        map,
        markers,
        distance,
        duration,
        // getters
        isMapReady: computed(() => !!map.value),
        // actions
        setMap(m: mapboxgl.Map) {
            map.value = m
        }
    }
})