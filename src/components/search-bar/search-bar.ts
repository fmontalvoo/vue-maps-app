import { computed, defineComponent, ref } from 'vue'

import SearchResults from '../search-results/SearchResults.vue'

export default defineComponent({
    name: 'SearchBar',
    components: {
        SearchResults,
    },
    setup() {
        const query = ref('')
        const debounce = ref()

        return {
            query,
            search: computed({
                get: () => query.value,
                set: (value) => {
                    clearTimeout(debounce.value)
                    debounce.value = setTimeout(() => {
                        query.value = value
                    }, 500)
                }
            })
        }
    }
})