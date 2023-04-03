import { onMounted } from "vue";

import { storeToRefs } from "pinia";

import { usePlacesStore } from "@/stores/places";

export const usePlaces = () => {
    const store = usePlacesStore();
    const { getInitialLocation } = store;
    const { isUserLocationReady } = storeToRefs(store)

    onMounted(() => {
        console.log('HomeView mounted', isUserLocationReady.value);
        if (!isUserLocationReady.value)
          getInitialLocation();
      });

    return {

    }
}