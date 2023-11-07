import React, { useState } from 'react';
import { analyzeImage } from './azure-image-analysis.js';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [apiResult, setApiResult] = useState(null);

  const handleButtonClick = () => {
    analyzeImage(imageUrl).then((result) => {
      setApiResult(result); // Guarda el resultado completo de la API
      if (result && result.description && result.description.captions && result.description.captions.length > 0) {
        setImageDescription(result.description.captions[0].text);
      } else {
        setImageDescription('No se pudo obtener una descripción de la imagen.');
      }
    }).catch(() => {
      setImageDescription('No se pudo obtener una descripción de la imagen.');
    });
  };

  return (
    <div className="app">
      <h1 className="title">Aplicación para describir/generar imagenes</h1>
      <p className="description">Aquí abajo puedes escribir tu prompt para generar imagenes o en su defecto puedes pegar un URL y la AI de Azure va a describir lo que está dentro de tu imagen</p>
      <div className="input-container">
        <input className="input" type="text" placeholder="Escribe tu URL o prompt aquí" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <button className="submit-button" onClick={handleButtonClick}>Enviar</button>
      </div>
      {imageUrl && 
        <div className="image-container">
          <img className="image" src={imageUrl} alt="Imagen analizada" />
        </div>
      }
      <h3 className="title_2">Descripción general:</h3>
      <div className="text-container">
      {imageDescription && <p className="image-description">{imageDescription}</p>}
      {!imageDescription && <p className="error-message">No se pudo obtener una descripción de la imagen.</p>}
      </div>
      <h3 className="title_2">JSON:</h3>
      {apiResult && 
        <div className="json-container">
          <pre className="json-output">{JSON.stringify(apiResult, null, 2)}</pre>
        </div>
}
    </div>
  );
}

export default App;