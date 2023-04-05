<script lang="ts" src="./search-bar"></script>

<template>
    <div class="searchbar-container">
        <input class="form-control" type="text" placeholder="Buscar" v-model="search" />
        <SearchResults v-if="!isLoadingPlaces && places.length > 0" :results="places" @select="onSelect" @goto="goTo" />
    </div>
</template>

<style scoped>
.searchbar-container {
    position: fixed;
    top: 70px;
    left: 30px;
    z-index: 999;
    border-radius: 10px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    background-color: white;
    padding: 5px;
    width: 350px;
}
</style>