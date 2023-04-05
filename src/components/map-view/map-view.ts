import { defineComponent, onMounted, ref, watch } from 'vue'

import Mapboxgl from 'mapbox-gl'

import { usePlaces } from '@/composables/usePlaces'

export default defineComponent({
    name: 'MapView',
    setup() {
        const mapElement = ref<HTMLDivElement>()
        const { isLoading, userLocation, isUserLocationReady } = usePlaces()

        const initMap = async () => {
            await Promise.resolve() // wait for the DOM to update

            const map = new Mapboxgl.Map({
                container: mapElement.value!, // container ID
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: userLocation.value, // starting position [lng, lat]
                zoom: 14, // starting zoom
            })
        }

        onMounted(() => {
            console.log('mapElement', mapElement.value)
            if (isUserLocationReady.value) initMap()
        })

        watch(isUserLocationReady, (isReady) => {
            if (isReady) initMap()
        })

        return {
            isLoading,
            mapElement,
            userLocation,
            isUserLocationReady,
        }
    }
})