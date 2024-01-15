<script setup>
import { computed, ref } from 'vue';
import { RouterLink, routerKey, useRouter } from 'vue-router';
import axios from 'axios'

let sifre = ref('')
let formuGoster = ref(false)
const props = defineProps({
    odaNumarasi: Number,
    id: String,
    yataklar: Array
})
const router = useRouter()

// yataklar dizisindeki yatakBosMu değeri true olan yatakların sayısını hesaplayalım
const bosYataklar = computed(() => {
   //bize bir dizi döndürecektir, .length yardımıyla boş yatakların sayısını bulabiliriz
    return props.yataklar.filter(yatak => yatak.yatakBosMu).length;
});


// Personel odasına giriş yapmak için şifre doğrulaması yapıyoruz
const sifreDogrulama = async () =>{
// Girilen şifreyi sunucumuza yolluyoruz. Girdiğimiz şifrenin doğruluğu sunucu tarafından bize tekrar dönüyor
const response = await axios.post("http://localhost:3000/sifre-dogrula", {sifre: sifre.value})
const sifreDogru = await response.data.sifreDogru

// Eğer şifre doğru ise kullanıcı odaya erişim sağlayabilir, aksi takdirde uyarı mesajı alır
sifreDogru ? router.push(`/odalar/${props.id}`) : alert("Hatalı şifre girdiniz!")

sifre.value = ""
}

// Eğer oda personel odası ise, kullanıcıdan şifre istenir. Diğer odalara erişim sağlanabilir.
const odaGirisi = async () =>{
 props.odaNumarasi >= 45 ? formuGoster.value = true : await router.push(`/odalar/${props.id}`);
}


</script>
<template>
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h3 class="text-2xl font-semibold text-gray-800">{{ odaNumarasi >= 45 && odaNumarasi <= 50 ? `Oda ${odaNumarasi}: Personel odası` : `Oda ${odaNumarasi}`  }}</h3>
          <p class="text-gray-600 text-sm">Boşta olan yataklar: {{ bosYataklar }}</p>
        </div>
        
      </div>
      <div class="border-t pt-4">
  <button
   @click="odaGirisi"
    class="block w-full bg-blue-600 text-white text-center py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none shadow-md"
   
  >
    Şimdi Kirala
  </button>
</div>
    </div>
    <transition name="modal-fade">
    <div v-if="formuGoster" class="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
        <div class="fixed inset-0 bg-black opacity-50"></div>

        <div class="relative bg-white rounded-lg p-8 max-w-md mx-auto">
            <button @click="formuGoster = !formuGoster"
                class="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700">
                Kapat
            </button>

            <h2 class="text-2xl font-bold mb-4">Personel odası</h2>

            <p class="text-gray-700 mb-6">
                Odaya erişim sağlamak için lütfen şifreyi girin
            </p>

            <form @submit.prevent="sifreDogrulama">
    
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 font-bold mb-2">Şifre:</label>
                    <input type="password" required v-model="sifre" placeholder="Şifreniz..." id="password" class="border rounded-md px-3 py-2 w-full" />
                </div>

                <div class="text-right">
                    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Giriş
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
  