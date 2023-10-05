/** load library express */
const express = require (`express`)
/** initiate object that instance of express */
const app = express()
/** allow to read 'request' with json type */
app.use(express.json())

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
  
/** load function authentcation from auth's controller */
const { authenticate } = require(`../controllers/auth-controller`)
/** create route for authentication */
app.post(`/`, authenticate)
/** export app in order to load in another file */
module.exports = app

// const express = require(`express`)
// const app = express()
// app.use(express.json())
// const {authenticate} = require(`../controllers/auth-controller.js`)
// app.post(`/auth`, authenticate)
// module.exports = app 