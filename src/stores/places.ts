import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { searchPlaces } from '@/services'

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
        searchPlaces: async (query: string) => {
            if (!query?.length) return []
            const res = await searchPlaces(query, {
                params: {
                    proximity: userLocation.value?.join(','),
                }
            })

            console.log('res', res.features)
        }
    }
})