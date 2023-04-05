import { defineComponent } from 'vue';

import SearchResults from '../search-results/SearchResults.vue';

export default defineComponent({
    name: 'SearchBar',
    components: {
        SearchResults,
    },
    setup() {
        return {}
    }
})