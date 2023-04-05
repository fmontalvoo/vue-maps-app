import { defineComponent, ref } from 'vue'

import type { Feature } from '@/models/places'

export default defineComponent({
    name: 'SearchResults',
    props: {
        results: {
            type: Array as () => Feature[],
            required: true
        }
    },
    emits: {
        'on-select': (place: Feature) => place,
    },
    setup(props, { emit }) {
        const selected = ref('')

        return {
            selected,
            results: props.results,
            selectPlace: (place: Feature) => {
                selected.value = place.id
                emit('on-select', place)
            }
        }
    }
})