import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlacesStore = defineStore('places', () => {
    const isLoading = ref(true)
    const userLocation = ref<[number, number] | undefined>()

    return {
        // state
        isLoading,
        userLocation,
        // getters
        isUserLocationReady: computed(() => !!userLocation.value),
        // actions
        getInitialLocation() {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    const { latitude, longitude } = coords
                    userLocation.value = [longitude, latitude]
                    isLoading.value = false
                },
                (err) => {
                    console.error(err)
                    isLoading.value = false
                    throw new Error('Could not get user location')
                }
            )
        }
    }
})