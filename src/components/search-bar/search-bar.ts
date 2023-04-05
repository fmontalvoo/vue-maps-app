import { computed, defineComponent, ref, watch } from 'vue'

import type { Feature } from '@/models/places'
import { useMap, usePlaces } from '@/composables'
import SearchResults from '../search-results/SearchResults.vue'
import type { LngLat } from '@/models/route'

export default defineComponent({
    name: 'SearchBar',
    components: {
        SearchResults,
    },
    setup() {
        const query = ref('')
        const debounce = ref()

        const { map, setMarkers, getRouteBetweenSE } = useMap()
        const { places, searchPlaces, isLoadingPlaces, userLocation } = usePlaces()

        watch(places, (plcs: Feature[]) => setMarkers(plcs))

        return {
            query,
            places,
            isLoadingPlaces,
            search: computed({
                get: () => query.value,
                set: (value) => {
                    clearTimeout(debounce.value)
                    debounce.value = setTimeout(() => {
                        query.value = value
                        searchPlaces(value)
                    }, 500)
                }
            }),
            onSelect: (place: Feature) => {
                const [lng, lat] = place.center
                map.value?.flyTo({
                    center: [lng, lat],
                    zoom: 14,
                })
            },
            goTo: async (place: Feature) => {
                const [lng, lat] = place.center

                const start: LngLat = [...userLocation.value!]
                const end: LngLat = [lng, lat]

                await getRouteBetweenSE(start, end)
            }
        }
    }
})