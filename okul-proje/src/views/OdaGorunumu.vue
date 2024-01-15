<script setup>
import { RouterLink, useRoute } from 'vue-router';

import { useRoomStore } from '../stores/roomStore';
import { onMounted, ref, computed } from 'vue';
import Yatak from '../components/Yatak.vue';

const store = useRoomStore();
const route = useRoute();



const odaID = route.params.odaId;
let loading = ref(false)

store.yataklar = []
onMounted(async () => {
    // Yeni yatakları çekmeden önce mevcut yatakları temizleyelim
    loading.value = true
    store.yataklar = []

    try {
        await store.getBeds(odaID);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
});



const secilenOda = computed(() => {
    return store.odayiBul(odaID);
});




</script>

<template>
    <div v-if=loading class="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
        <div class="flex items-center">
            <span class="text-3xl mr-4">Yükleniyor...</span>
            <svg class="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
        </div>
    </div>

    <div v-else>
        <header class="bg-gray-900 text-white text-center py-4">
            <h1 class="text-3xl font-bold" v-if="secilenOda.odaNumarasi">
                <RouterLink to="/">Oda {{ secilenOda.odaNumarasi }} Yatak Düzeni </RouterLink>
            </h1>
        </header>

        <main class="flex justify-center space-x-4 flex-wrap mt-10">

            <Yatak v-for="(yatak, index) in store.yataklar" :key="yatak._id" :yatak-sahibi="yatak.yatakSahibi"
                :yatak-bos-mu="yatak.yatakBosMu" :id="yatak._id" :oda-i-d="secilenOda._id"
                :telefon-numarasi="yatak.telefonNumarasi" :okul-numarasi="yatak.okulNumarasi"
                :yatak-numarasi="`${index + 1}`"></Yatak>

        </main>
        <div class="mt-6 text-center">
            <RouterLink to="/" class="flex items-center justify-center text-blue-500 hover:text-blue-700">
                <i class="fas fa-home mr-2"></i>
                Anasayfaya Dön
            </RouterLink>
        </div>
    </div>
</template>
