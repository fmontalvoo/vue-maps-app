import { storeToRefs } from 'pinia'

import { useMapStore } from "@/stores/map"

export const useMap = () => {
    const store = useMapStore()
    const { setMap, setMarkers } = store
    const {
        map,
        markers,
        distance,
        duration,
        isMapReady } = storeToRefs(store)

    return {
        map,
        markers,
        distance,
        duration,
        setMap,
        setMarkers,
        isMapReady,
    }
}