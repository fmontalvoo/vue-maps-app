<script lang="ts">
import { defineComponent } from 'vue';

import { usePlaces } from '@/composables/usePlaces';

export default defineComponent({
  name: 'HomeView',
  setup() {

    usePlaces();

    return {

    };
  },
});
</script>

<template>
  <main>
    <h1>Home</h1>
  </main>
</template>
