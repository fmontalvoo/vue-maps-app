import { computed, defineComponent, ref } from 'vue'

import { usePlaces } from '@/composables'

import SearchResults from '../search-results/SearchResults.vue'

export default defineComponent({
    name: 'SearchBar',
    components: {
        SearchResults,
    },
    setup() {
        const query = ref('')
        const debounce = ref()

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
            })
        }
    }
})