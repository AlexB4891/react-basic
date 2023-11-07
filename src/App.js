import React, { useState } from 'react';
import { analyzeImage } from './azure-image-analysis.js';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    analyzeImage(imageUrl).then((result) => {
      setLoading(false);
      if (result && result.description && result.description.captions && result.description.captions.length > 0) {
        setImageDescription(result.description.captions[0].text);
      } else {
        setImageDescription('No se pudo obtener una descripción de la imagen.');
      }
    }).catch((error) => {
      setLoading(false);
      setImageDescription('No se pudo obtener una descripción de la imagen.');
    });
  };

  return (
    <div>
      <h1>Aplicación para describir/generar imagenes</h1>
      <p>Aquí abajo puedes escribir tu prompt para generar imagenes o en su defecto puedes pegar un URL y la AI de Azure va a describir lo que está dentro de tu imagen</p>
      <div style={{ maxWidth: '600px' }}>
        <input type="text" placeholder="Escribe tu URL o prompt aquí" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        {imageUrl && <img src={imageUrl} alt="Imagen analizada" style={{ height: '200px', width: 'auto' }} />}
        {loading && <p>Cargando...</p>}
        {imageDescription && <p>{imageDescription}</p>}
        {!loading && !imageDescription && <p>No se pudo obtener una descripción de la imagen.</p>}
      </div>
      <button onClick={handleButtonClick}>Enviar</button>
    </div>
  );
}

export default App;