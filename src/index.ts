import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
const damaged_system:any = {
  "navigation": "NAV-01",
  "communications": "COM-02",
  "life_support": "LIFE-03",
  "engines": "ENG-04",
  "deflector_shield": "SHLD-05"
}
let sistema_status = ''
// Ruta principal
app.get('/status', (req: Request, res: Response) => {
  const keys: string[] = Object.keys(damaged_system);
  const randomIndex = Math.floor(Math.random() * keys.length);
  const status = keys[randomIndex];

  sistema_status = damaged_system[status || ""]
  res.json({
  "damaged_system": sistema_status
  });
});
app.get('/repair-bay', (req: Request, res: Response) => {
 
  res.send(`
    <!DOCTYPE html>
<html>
<head>
    <title>Repair</title>
</head>
<body>
<div class="anchor-point">${sistema_status}</div>
</body>
</html>
    
    `);
});
// Ejemplo de endpoint: GET /api/users
app.post('/teapot', (req: Request, res: Response) => {
  res.status(418).send("I'm a teapot");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
