import { defineComponent, onMounted, ref } from 'vue'

import { usePlaces } from '@/composables/usePlaces'

export default defineComponent({
    name: 'MapView',
    setup() {
        const mapElement = ref<HTMLDivElement>()
        const { isLoading, userLocation, isUserLocationReady } = usePlaces()

        onMounted(() => {
            console.log('mapElement', mapElement.value)
        })

        return {
            isLoading,
            mapElement,
            userLocation,
            isUserLocationReady,
        }
    }
})