<script setup lang="ts">
import { useMap } from '@/composables';

const { distance, duration } = useMap()
</script>

<template>
    <div v-if="distance && duration" class="detail-container column">
        <div class="col">Distancia: <strong>{{ distance }} kilometro{{ distance! > 1 ? 's' : '' }}</strong></div>
        <div class="col">Duración: <strong>{{ duration }} minuto{{ duration! > 1 ? 's' : '' }}</strong></div>
    </div>
</template>

<style scoped>
.detail-container {
    background-color: #fff;
    border-radius: 10px;
    bottom: 35px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    font-size: 14px;
    left: 30px;
    padding: 10px;
    position: fixed;
    width: 350px;
    z-index: 999;
}
</style>