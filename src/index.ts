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
//Presion
function interpolarVolumen(v1: number, p1: number, v2: number, p2: number, pressure: number): number {
  const resultado = v1 + ((pressure - p1) * (v2 - v1)) / (p2 - p1);
  return Math.round(resultado * 10000) / 10000;
}
app.get('/phase-change-diagram', (req: Request, res: Response) => {
 
  const pressure = Number(req.query.pressure as string) || 0;
  console.log(pressure);
  let vc = 0.0035
  let pc = 10

  let sllv = 0.00105
  let sllp = 0.05

  let svlv = 30
  let svlp = 0.05

  let ecuacion_sat_liq =  interpolarVolumen(sllv, sllp, vc, pc, pressure)
  let ecuacion_sat_vap = interpolarVolumen(vc, pc, svlv, svlp, pressure);
  //y(y2-y1) = x(x2-x1)
  //y es presion
  // x es Volumen
  res.json({
     "specific_volume_liquid": ecuacion_sat_liq,
     "specific_volume_vapor": ecuacion_sat_vap
  });
});



// Ruta principal
app.get('/status', (req: Request, res: Response) => {
  const keys: string[] = Object.keys(damaged_system);
  const randomIndex = Math.floor(Math.random() * keys.length);
  const status = keys[randomIndex];

  sistema_status = damaged_system[status || ""]
  res.json({
  "damaged_system": status
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
