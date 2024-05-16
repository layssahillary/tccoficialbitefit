import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { db } from './db.js';
const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/Images');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const pacienteId = req.body.pacienteId;
  const file = req.file;

  if (!pacienteId || !file) {
    return res.status(400).json({ message: 'ID do paciente e arquivo são necessários.' });
  }

  db.query('UPDATE paciente SET paciente_img = ? WHERE paciente_id = ?', [file.buffer, pacienteId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao atualizar a imagem do paciente no banco de dados.' });
    }

    console.log('Imagem do paciente atualizada no banco de dados.');
    res.status(200).json({ message: 'Imagem do paciente atualizada com sucesso.' });
  });
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});