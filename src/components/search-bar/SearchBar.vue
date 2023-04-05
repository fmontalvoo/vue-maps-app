<script lang="ts" src="./search-bar"></script>

<template>
    <div class="searchbar-container">
        <input class="form-control" type="text" placeholder="Buscar" />

        <!-- <ul class="list-group mt-1">
            <li class="list-group-item list-group-item-action">Lugar</li>
            <li class="list-group-item list-group-item-action">Lugar</li>
            <li class="list-group-item list-group-item-action">Lugar</li>
            <li class="list-group-item list-group-item-action">Lugar</li>
        </ul> -->
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
}

li {
    cursor: pointer;
}
</style>