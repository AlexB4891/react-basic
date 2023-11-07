import React, { useState, useEffect } from 'react';
import { analyzeImage } from './azure-image-analysis.js';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [jsonResponse, setJsonResponse] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  const handleButtonClick = () => {
    analyzeImage(imageUrl).then((result) => {
      setImageDescription(result.description);
      setImageSrc(result.imageUrl);
      setJsonResponse(JSON.stringify(result.jsonResponse, null, 2));
    });
  };

  return (
    <div>
      <h1>Aplicación para describir/generar imagenes</h1>
      <p>Aquí abajo puedes escribir tu prompt para generar imagenes o en su defecto puedes pegar un URL y la AI de Azure va a describir lo que está dentro de tu imagen</p>
      <input type="text" placeholder="Escribe tu URL o prompt aquí" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <button onClick={handleButtonClick}>Enviar</button>
      <p>{imageDescription}</p>
      {imageSrc && <img src={imageSrc} alt="Imagen analizada" />}
      <pre>{jsonResponse}</pre>
    </div>
  );
}

export default App;