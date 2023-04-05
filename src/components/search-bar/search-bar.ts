import { computed, defineComponent, ref } from 'vue'

import { useMap, usePlaces } from '@/composables'

import SearchResults from '../search-results/SearchResults.vue'
import type { Feature } from '@/models/places'

export default defineComponent({
    name: 'SearchBar',
    components: {
        SearchResults,
    },
    setup() {
        const query = ref('')
        const debounce = ref()

        const { map } = useMap()
        const { places, searchPlaces, isLoadingPlaces } = usePlaces()

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
            }
        }
    }
})