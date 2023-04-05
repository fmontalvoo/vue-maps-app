<script lang="ts">
import { defineComponent } from 'vue';

import { usePlaces } from '@/composables/usePlaces';

import MapView from '@/components/map-view/MapView.vue';
import LocationButton from '@/components/LocationButton.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    MapView,
    LocationButton
  },
  setup() {

    usePlaces();

    return {

    };
  },
});
</script>

<template>
  <MapView />
  <LocationButton />
</template>
