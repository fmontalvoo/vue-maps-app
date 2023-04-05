<script lang="ts">
import { computed, defineComponent } from 'vue';

import { useMap, usePlaces } from '@/composables';

export default defineComponent({
    name: 'LocationButton',
    setup() {
        const { map, isMapReady } = useMap()
        const { userLocation, isUserLocationReady } = usePlaces()

        return {
            isLocationReady: computed(() => isMapReady.value && isUserLocationReady.value),
            myLocation: () => {
                map.value?.flyTo({
                    center: userLocation.value,
                    zoom: 14
                })
            }
        }
    }
})
</script>

<template>
    <button v-if="isLocationReady" class="btn btn-primary" @click="myLocation">Mi ubicación</button>
</template>

<style scoped>
button {
    position: fixed;
    right: 30px;
    top: 70px;
}
</style>