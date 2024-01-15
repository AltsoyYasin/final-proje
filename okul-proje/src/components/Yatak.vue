<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoomStore } from '../stores/roomStore';
const store = useRoomStore()

const props = defineProps({
    odaID: String,
    yatakSahibi: String,
    yatakBosMu: Boolean,
    id: String,
    yatakNumarasi: String,
    telefonNumarasi: String,
    okulNumarasi: String

})
let yatakSahibi = ref('')

let formuGoster = ref(false)
let telefonNumarasi = ref('')
let okulNumarasi = ref('')

async function yatagiKirala() {
    try {
        if (isNaN(Number(telefonNumarasi.value)) || isNaN(Number(okulNumarasi.value))) {
            alert("Girdiğiniz telefon veya okul numarası geçersiz.")
            return;
        }



        if (props.odaID) {
            const response = await axios.patch(`http://localhost:3000/odalar/${props.odaID}/yataklar/${props.id}`, {
                _yatakSahibi: yatakSahibi.value,
                _telefonNumarasi: telefonNumarasi.value,
                _okulNumarasi: okulNumarasi.value

            });
            console.log(response.data);
        } else {
            console.error('Room ID tanımsız');
        }
        store.getBeds(props.odaID)
    } catch (error) {
        console.error(error);
    }

    formuGoster.value = false;
}
</script>
 
<template>

<div @click="yatakBosMu ? formuGoster = !formuGoster : ''"
    :class="yatakBosMu ? 'bg-green-500 rounded-md p-6 cursor-pointer' : 'bg-red-500 rounded-md p-6'">
    <p class="text-white text-center">Yatak {{ yatakNumarasi }}</p>
    <p class="text-white text-center">{{ yatakBosMu ? 'Boş Yatak' : 'Dolu' }}</p>
    <!-- Container div for credential elements with conditional class -->
    <div v-if="!yatakBosMu" class="credentials-container">
        <p class="text-white text-center">{{props.yatakSahibi }} Tarafından Kiralandı</p>
        <p class="text-white text-center">Telefon numarası: {{props.okulNumarasi}}</p>
        <p class="text-white text-center">Okul numarası: {{props.telefonNumarasi}}</p>
    </div>
    <p v-else class="text-white text-center" style="margin-top: 30px;">Kiralamak için Tıklayınız</p>
</div>

    <transition name="modal-fade">
        <div v-if="formuGoster" class="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
            <div class="fixed inset-0 bg-black opacity-50"></div>

            <div class="relative bg-white rounded-lg p-8 max-w-md mx-auto">
                <button @click="formuGoster = !formuGoster"
                    class="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700">
                   Kapat
                </button>

                <h2 class="text-2xl font-bold mb-4">Yatağı Kirala</h2>

                <p class="text-gray-700 mb-6">
                    Yatağı kiralamak için lütfen aşşağıdaki bilgileri doldurun.
                </p>



                <form @submit.prevent="yatagiKirala">
                    <div class="mb-4">
                        <label for="username" class="block text-gray-700 font-bold mb-2">İsim:</label>
                        <input type="text" required v-model="yatakSahibi" placeholder="isminiz..." id="username" class="border rounded-md px-3 py-2 w-full" />
                    </div>
                    <div class="mb-4">
                        <label for="schoolId" class="block text-gray-700 font-bold mb-2">Okul numarası</label>
                        <input type="text" required v-model="okulNumarasi" placeholder="okul numaranız..." id="schoolId" class="border rounded-md px-3 py-2 w-full" />
                    </div>
                    <div class="mb-4">
                        <label for="telefonNumarasi" class="block text-gray-700 font-bold mb-2">Telefon numarası</label>
                        <input required type="text" id="telefonNumarasi" v-model="telefonNumarasi" placeholder="Telefon numaranız..." class="border rounded-md px-3 py-2 w-full" />

                    </div>
                    <div class="text-right">
                        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Kirala
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>
<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}


</style>