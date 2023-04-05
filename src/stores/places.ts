import { ref, computed } from 'vue'

import { defineStore } from 'pinia'

import { searchPlaces } from '@/services'
import type { Feature } from '@/models/places'

export const usePlacesStore = defineStore('places', () => {
    const isLoading = ref(true)
    const places = ref<Feature[]>([])
    const isLoadingPlaces = ref(false)
    const userLocation = ref<[number, number] | undefined>()

    return {
        // state
        places,
        isLoading,
        userLocation,
        isLoadingPlaces,
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

            isLoadingPlaces.value = true

            const res = await searchPlaces(query, {
                params: {
                    proximity: userLocation.value?.join(','),
                }
            })

            places.value = res.features
            isLoadingPlaces.value = false
        }
    }
})