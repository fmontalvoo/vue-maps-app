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
        },
        searchPlaces: async (query: string = '') => {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=ec&proximity=-78.98515489632538%2C-2.893321958096948&language=es&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
            const response = await fetch(url)
            const data = await response.json()
            return data
        }
    }
})