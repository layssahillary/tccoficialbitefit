import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientImage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const pacienteId = localStorage.getItem('paciente_id');
      try {
        const response = await axios.get(`http://localhost:3001/paciente/${pacienteId}/imagem`, {
          responseType: 'blob', 
        });
        const url = URL.createObjectURL(response.data);
        setImageUrl(url);
      } catch (error) {
        console.error('Erro ao recuperar a imagem do paciente:', error);
      }
    };
    fetchImage();
  }, []);

  return imageUrl ? <img src={imageUrl} alt="Foto do paciente" /> : <div>Carregando...</div>;
};

export default PatientImage;