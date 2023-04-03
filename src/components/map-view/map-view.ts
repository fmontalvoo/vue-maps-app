import { defineComponent } from 'vue'

import { usePlaces } from '@/composables/usePlaces'

export default defineComponent({
    name: 'MapView',
    setup() {
        const { isLoading, userLocation, isUserLocationReady } = usePlaces()

        return {
            isLoading,
            userLocation,
            isUserLocationReady,
        }
    }
})