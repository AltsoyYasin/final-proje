import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
/*datamızı saklayıp organize ettiğimiz store,
burada yurt odalarını databaseden çekip. Onları sitemizin herhangi bir yerinde rahatça kullanacağız.
*/
export const useRoomStore = defineStore("rooms", {
  state: () => ({
    odalar: ref([]),
    yataklar: ref([]),
  }),
  actions: {
    //getData fonksiyonu odalarımızı servere GET isteği yollayıp çekmemize yarayacak.
    async getData() {
      const URL = "http://localhost:3000/odalar";
    

      try {
        
        const response = await axios.get(URL);
        this.odalar = response.data;
        
      } catch (error) {
        console.error("Data çekilirken hata oluştu: ", error);
        
      }
    },
    async getBeds(odaID){
      const URL = `http://localhost:3000/odalar/${odaID}/yataklar`
     
      try {
        const response = await axios.get(URL);
        this.yataklar = response.data.yatakVerisi
        
      } catch (error) {
      
        console.error("Data çekilirken hata oluştu: ", error);
        
      }
    },
  },
  getters: {
    // Verilen id ile istenilen odayı bulup döndürelim
    odayiBul: (state) => (odaID) => {
      return state.odalar.find((oda) => oda._id === odaID);
    },
  }
});
