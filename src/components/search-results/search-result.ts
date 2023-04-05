import { defineComponent } from 'vue'

import type { Feature } from '@/models/places'

export default defineComponent({
    name: 'SearchResults',
    props: {
        results: {
            type: Array as () => Feature[],
            required: true
        }
    },
    setup(props) {
        return {
            results: props.results
        }
    }
})