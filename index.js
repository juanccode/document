const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const app = express();
const upload = multer({ dest: 'documentos/' });

// Ruta para subir una imagen
app.post('/upload', upload.single('image'), (req, res) => {
   // La imagen se encuentra en req.file.path
   // Procesar la imagen con Sharp
   let nombreCortado = req.file['originalname'].split('.');
   let extension = nombreCortado[ nombreCortado.length - 1 ];

   sharp(req.file.path)
      .resize(200, 200)
      .toFile(`documentos/resized-${req.file.filename}.${extension}`, (err, info) => {
         if (err) {
         console.log(err);
         return res.status(500).send('Error al procesar la imagen');
         }
         // Devolver la URL de la imagen procesada
         const imageUrl = `https://document.neitor.com/documentos/resized-${req.file.filename}.${extension}`;
         return res.json({ imageUrl });
      });
});

// Ruta para entregar una imagen
// app.get('/image/:filename', (req, res) => {
//   const filename = req.params.filename;
//   res.sendFile(`documentos/${filename}`, { root: __dirname });
// });

// // Ruta para entregar un video
// app.get('/video/:filename', (req, res) => {
//   const filename = req.params.filename;
//   res.sendFile(`documentos/${filename}`, { root: __dirname });
// });

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
