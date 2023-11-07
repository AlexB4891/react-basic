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
      if (result) {
        setImageDescription(JSON.stringify(result, null, 2));
      } else {
        setImageDescription('Problema con Azure');
      }
    }).catch((error) => {
      setLoading(false);
      setImageDescription('Problema con Azure');
    });
  };

  return (
    <div>
      <h1>Aplicación para describir/generar imagenes</h1>
      <p>Aquí abajo puedes escribir tu prompt para generar imagenes o en su defecto puedes pegar un URL y la AI de Azure va a describir lo que está dentro de tu imagen</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input type="text" placeholder="Escribe tu URL o prompt aquí" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        {imageUrl && <img src={imageUrl} alt="Imagen analizada" style={{ height: '200px', width: 'auto' }} />}
        {imageDescription && <pre>{imageDescription}</pre>}
      </div>
      <button onClick={handleButtonClick}>Enviar</button>
    </div>
  );
}

export default App;