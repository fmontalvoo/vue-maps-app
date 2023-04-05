<script lang="ts">
import { defineComponent } from 'vue';

import { usePlaces } from '@/composables/usePlaces';

import MapView from '@/components/map-view/MapView.vue';
import LocationButton from '@/components/LocationButton.vue';
import SearchBar from '@/components/search-bar/SearchBar.vue';
import RouteDetails from '@/components/RouteDetails.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    MapView,
    SearchBar,
    RouteDetails,
    LocationButton,
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
  <SearchBar />
  <RouteDetails />
  <LocationButton />
</template>
