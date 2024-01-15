const mongoose = require('mongoose')

const yatakSemasi = new mongoose.Schema({
    yatakSahibi: { type: String, required: false },
    yatakBosMu: { type: Boolean, required: true },
    telefonNumarasi: { type: String, required: false },
    okulNumarasi: { type: String, required: false }
});

const odaSemasi = mongoose.Schema({
    odaNumarasi: {type: Number, required: true},
    yataklar: [yatakSemasi]
})

const Oda = mongoose.model('room', odaSemasi);

module.exports = Oda
