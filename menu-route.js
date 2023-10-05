const express = require(`express`)
const app = express()

const menuController = require(`../controllers/menu-controller`)
const { authorize } = require(`../controllers/auth-controller`)

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
  

app.get(`/menu`, menuController.getMenu)
app.post(`/menu`,[authorize], menuController.addMenu)
app.post(`/menu/tambah`,[authorize, isKasir], menuController.addMenu)
app.post(`/menu/find`,[authorize], menuController.filterMenu)
app.put(`/menu/:id_menu`,[authorize], menuController.updateMenu)
app.delete(`/menu/:id_menu`,[authorize],menuController.deleteMenu)

module.exports = app