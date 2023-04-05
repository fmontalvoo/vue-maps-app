import { defineComponent, onMounted, ref, watch } from 'vue'

import Mapboxgl from 'mapbox-gl'

import { useMap, usePlaces } from '@/composables'

export default defineComponent({
    name: 'MapView',
    setup() {
        const mapElement = ref<HTMLDivElement>()
        const { setMap } = useMap()
        const { isLoading, userLocation, isUserLocationReady } = usePlaces()

        const initMap = async () => {
            if (!userLocation.value) throw new Error('No user location')

            await Promise.resolve() // wait for the DOM to update

            const map = new Mapboxgl.Map({
                container: mapElement.value!, // container ID
                style: 'mapbox://styles/mapbox/dark-v10', // style URL
                center: userLocation.value, // starting position [lng, lat]
                zoom: 14, // starting zoom
            })

            const popup = new Mapboxgl.Popup({ offset: 25 })
                .setLngLat(userLocation.value)
                .setHTML(`
                <h3>Hola Mundo!</h3>
                <p>${userLocation.value.join(', ')}</p>
                `)

            const marker = new Mapboxgl.Marker()
                .setLngLat(userLocation.value)
                .setPopup(popup)
                .addTo(map)

            setMap(map)
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