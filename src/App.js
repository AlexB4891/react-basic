import React, { useState } from 'react';
import { analyzeImage } from './azure-image-analysis.js';

function App() {
  const [imageUrl, setImageUrl] = useState('');

  const handleButtonClick = () => {
    analyzeImage(imageUrl).then((result) => {
      setImageUrl(result.imageUrl);
    });
  };

  return (
    <div>
      <h1>Aplicación para describir/generar imagenes</h1>
      <p>Aquí abajo puedes escribir tu prompt para generar imagenes o en su defecto puedes pegar un URL y la AI de Azure va a describir lo que está dentro de tu imagen</p>
      <input type="text" placeholder="Escribe tu URL o prompt aquí" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <button onClick={handleButtonClick}>Enviar</button>
      {imageUrl && <img src={imageUrl} alt="Imagen analizada" />}
    </div>
  );
}

export default App;