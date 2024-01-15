<script setup>
import { useRoomStore } from '../stores/roomStore';

import Oda from '../components/Oda.vue'
const store = useRoomStore()
</script>


<template>
    <header class="bg-gray-900 text-white text-center py-4">
        <h1 class="text-3xl font-bold">Yurt yatak kiralama sistemi</h1>
        <p class="text-lg mt-2">Yatağınızı kolayca bulun ve kiralayın!</p>
    </header>

    <main class="container mx-auto my-8 px-4">
        <h2 class="text-2xl font-semibold mb-4">Hazır odalar</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           
          <Oda v-for="oda in store.odalar" :key="oda._id" :oda-numarasi="oda.odaNumarasi" :id="oda._id" :yataklar="oda.yataklar"></Oda>
           
        </div>
    </main>

    <footer class="bg-gray-200 text-gray-600 text-center py-4">
        <p>&copy; 2023 Yurt oda Kiralama Sistemi</p>
    </footer>

</template>