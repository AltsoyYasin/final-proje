const express = require("express");
const router = express.Router();
const Oda = require("../models/oda");

module.exports = router;


//Belirli bir odadaki yatağın verisini değiştirmek için PATCH metodu kullanıyoruz
router.patch('/:odaID/yataklar/:yatakID', async (req, res) => {

  
    try {
        const { odaID, yatakID } = req.params;
        const { _yatakSahibi, _telefonNumarasi, _okulNumarasi } = req.body;
    
        // mongoose paketinin findById metoduyla id si eşleşen odayı buluyoruz 
        const eslesenOda = await Oda.findById(odaID);
        
        // Eğer öyle bir oda yoksa hata mesajı döndürüyoruz
        if (!eslesenOda) {
          return res.status(404).json({ message: 'Oda Bulunamadı' });
        }
        
        // bulduğumuz odanın yataklar dizisinde güncelleyeceğimiz yatağı arıyoruz 
        const guncellenecekYatak = eslesenOda.yataklar.id(yatakID);
        
        // Eğer odada böyle bir yatak yoksa hata mesajı döndürelim
        if (!guncellenecekYatak) {
          return res.status(404).json({ message: 'Yatak bulunamadı' });
        }
    
        // Eğer gönderilen bilgiler tanımlı ise yatağı güncelleyebiliriz
        if (_yatakSahibi !== undefined && _telefonNumarasi !== undefined && _okulNumarasi !== undefined ) {
          guncellenecekYatak.yatakSahibi = _yatakSahibi;
          guncellenecekYatak.yatakBosMu = false // Güncellenen yatağın durumunu dolu yapalım
          guncellenecekYatak.telefonNumarasi = _telefonNumarasi
          guncellenecekYatak.okulNumarasi = _okulNumarasi
        }
    
        // Güncelledikten sonra yaptığımız değişiklikleri veritabanımıza kaydedelim
        await eslesenOda.save();
        
        // Cevap olarak kullanıcıya "işlem başarılı", yani 200 durum kodunu gönderiyoruz 
        res.status(200).json({ message: 'Yatak başarı ile güncellendi', guncellenenYatak: guncellenecekYatak });
      } catch (error) {
        // Bir hata çıkması durumunda bunuda kullanıcıya gönderelim
        console.error('Yatak güncellenirken hata oluştu: ', error);
        res.status(500).json({ message: 'Sunucuda hata meydana geldi' });
      }
    });

   // Gelen GET isteğini kontrol edelim 
router.get("/", async (req, res) => {
  try {
    // Veritabanımızdaki tüm odaları cevap olarak yollayalım
    const tumOdalar = await Oda.find({});
    res.json(tumOdalar);
  } catch (error) {
    console.log(error);
  }
});
 
// Seçilen odanın yatak verilerine gelen GET isteğini kontrol edelim
router.get("/:id/yataklar", async (req,res) =>{
  
  try {
    //id yi yollanan url üzerindeki parametreden alalım
    const {id} = req.params

    // Odayı bulalım
    const bulunanOda = await Oda.findById(id);
    
    if (!bulunanOda) {
      return res.status(404).json({ message: 'Oda bulunamadı' });
    }

    // Odadaki yatak verilerini tutalım ve isteğe cevap olarak yollayalım
    const yatakVerisi = bulunanOda.yataklar;
    
    res.status(200).json({ yatakVerisi});
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
})