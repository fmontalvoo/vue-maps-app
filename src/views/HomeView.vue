<script lang="ts">
import { defineComponent } from 'vue';

import { usePlaces } from '@/composables/usePlaces';

import MapView from '@/components/map-view/MapView.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    MapView,
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
</template>
