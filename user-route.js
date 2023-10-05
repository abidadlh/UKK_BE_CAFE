const express = require(`express`)
const app = express()

app.use(express.json())

const userController = require(`../controllers/user-controller`)
const { authorize } = require(`../controllers/auth-controller`)

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
  

  
app.get(`/user`, userController.getUser)
app.get(`/user/:role`,[authorize], userController.roleUser)
app.post(`/user/find`,[authorize], userController.findUser)
app.post(`/user`,[authorize, isAdmin], userController.addUser)
app.put(`/user/:id_user`,[authorize], userController.updateUser)
app.delete(`/user/:id_user`,[authorize],userController.deleteUser)

module.exports = app