const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv")
const odaRouter = require("./routes/odaRouter");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
dotenv.config()

/* /odalar uzantısına yapılan istekleri OdaRouter ile kontrol edeceğiz
    "http://localhost:3000/odalar" şeklinde
*/


let odasifresi = process.env.ODA_SIFRESI
app.use("/odalar", odaRouter);

// Kullanıcı personel odasına erişim isterse şifre doğrulama işlemi yapılır.
app.post('/sifre-dogrula', (req, res) => {
  const { sifre } = req.body;

  if (sifre === odasifresi) {
    res.json({ sifreDogru: true });
  } else {
    res.json({ sifreDogru: false });
  }
});


app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.URL)
    .then(console.log("Veritabanına bağlandı"))
    .catch((err) => console.log(err));
    console.log("Port izleniyor", process.env.PORT);
});

