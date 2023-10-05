const express = require(`express`)
const app = express()

app.use(express.json())

const transaksiController = require(`../controllers/transaksi-controller`)
const { authorize } = require(`../controllers/auth-controller`)
const { post } = require("jquery")

// Middleware: authorize
const isKasir = (req, res, next) => {
    // Periksa peran pengguna dari objek request (misalnya: req.userRole)
    const userRole = req.userRole; // Anda harus mengatur userRole saat otentikasi
  
    // Jika peran pengguna bukan admin, kembalikan respons dengan pesan akses ditolak
    if (userRole !== 'kasir') {
      return res.status(403).json({ message: 'Akses ditolak. Hanya kasir yang diizinkan.' });
    }
  
    // Jika peran pengguna adalah admin, lanjutkan ke middleware atau fungsi berikutnya
    next();
  };

app.get(`/transaksi`, transaksiController.getTransaksi)
app.get(`/transaksi/:tgl_transaksi`, transaksiController.getTgl)
app.post(`/transaksi/findTransaksi`, transaksiController.findTransaksi)
app.post(`/transaksi/bulan`,[authorize], transaksiController.getBulan)
app.post(`/transaksi`,[authorize, isKasir], transaksiController.addTransaksi)
app.post(`/transaksi/tambah`,[authorize], transaksiController.addTransaksi)
app.put(`/transaksi/:id_transaksi`,[authorize], transaksiController.updateTransaksi)
app.put(`/transaksi/:id_transaksi/updateStatus`,[authorize, isKasir], transaksiController.updatestatus)
app.delete(`/transaksi/:id_transaksi`,[authorize], transaksiController.deleteTransaksi)

module.exports = app