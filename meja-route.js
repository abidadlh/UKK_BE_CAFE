const express = require(`express`)
const app = express()

app.use(express.json())

const { authorize } = require(`../controllers/auth-controller`)
const mejaController = require(`../controllers/meja-controller`)

// Middleware: authorize
const isAdmin = (req, res, next) => {
    // Periksa peran pengguna dari objek request (misalnya: req.userRole)
    const userRole = req.userRole; // Anda harus mengatur userRole saat otentikasi
  
    // Jika peran pengguna bukan admin, kembalikan respons dengan pesan akses ditolak
    if (userRole !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang diizinkan.' });
    }
  
    // Jika peran pengguna adalah admin, lanjutkan ke middleware atau fungsi berikutnya
    next();
  };
  
app.get(`/meja`, mejaController.getMeja)
app.get(`/status/:status`,[authorize], mejaController.statusMeja)
app.post(`/meja`,[authorize, isAdmin], mejaController.addMeja)
app.post(`/meja`,[authorize], mejaController.addMeja)
app.put(`/meja/:id_meja`, [authorize],mejaController.updateMeja)
app.delete(`/meja/:id_meja`,[authorize], mejaController.deleteMeja)

module.exports = app