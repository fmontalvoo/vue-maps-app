<script lang="ts" src="./search-result">
</script>

<template>
    <ul class="list-group mt-1">

        <li v-if="results.length > 0" v-for="result of results" :key="result.id" @click="selectPlace(result)"
            :class="{ 'active': result.id === selected }"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto text-truncate">
                <div class="fw-bold">{{ result.text_es }}</div>
                {{ result.place_name_es }}
            </div>
            <button class="badge btn btn-secondary rounded-pill" @click="$emit('goto', result)"><i
                    class="fa-solid fa-route"></i></button>
        </li>

    </ul>
</template>

<style scoped>
li {
    cursor: pointer;
}
</style>