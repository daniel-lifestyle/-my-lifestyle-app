# My Lifestyle by Deniel

Esta es tu app real, conectada a tu base de datos de Supabase.

## Que ya funciona de verdad

- El formulario de "Aplicar" guarda los datos en tu tabla `aplicaciones` de Supabase.
  Puedes verlos entrando a Supabase -> Table Editor -> aplicaciones.
- El "Panel coach" (Admin) carga los clientes reales desde tu tabla `clientes`.
  Como todavia no tienes clientes cargados, va a aparecer un mensaje diciendo
  que no hay clientes todavia. Eso es normal.

## Que sigue siendo de ejemplo (por ahora)

- El "Portal cliente" todavia muestra datos de ejemplo. El siguiente paso es
  agregar el login de clientes para que cada uno entre con su propio usuario
  y vea su propia informacion real. Lo hacemos en la siguiente sesion.

## Como instalar Node.js en tu Mac (si no lo tienes)

1. Ve a https://nodejs.org
2. Descarga la version "LTS" (la recomendada, no la "Current")
3. Abre el archivo descargado y sigue los pasos del instalador (Continuar,
   Aceptar, Instalar) como cualquier programa de Mac
4. Cuando termine, abre la app "Terminal" (buscala con Cmd+Espacio y escribe
   "Terminal")
5. Escribe esto y presiona Enter para confirmar que se instalo:
   ```
   node --version
   ```
   Deberia mostrarte algo como `v22.x.x`

## Como correr esta app en tu Mac

1. Abre la Terminal
2. Entra a la carpeta del proyecto (arrastra la carpeta a la Terminal despues
   de escribir `cd ` con un espacio, o escribe la ruta completa):
   ```
   cd ruta/a/my-lifestyle-app
   ```
3. Instala las dependencias (solo la primera vez, tarda 1-2 minutos):
   ```
   npm install
   ```
4. Corre la app:
   ```
   npm run dev
   ```
5. Te va a mostrar algo como:
   ```
   Local: http://localhost:5173/
   ```
   Copia esa direccion (`http://localhost:5173/`) y pegala en tu navegador
   (Chrome, Safari, etc.)
6. Ya deberias ver tu app funcionando, conectada a tu base de datos real.

Para detenerla, vuelve a la Terminal y presiona `Ctrl + C`.

## Probar que la conexion real funciona

1. Con la app corriendo, ve a la pestaña "Aplicar"
2. Llena el formulario completo con datos de prueba
3. Envialo
4. Ve a tu proyecto de Supabase -> Table Editor -> tabla "aplicaciones"
5. Deberias ver la fila nueva con los datos que acabas de enviar

Si la ves ahi, significa que la conexion real esta funcionando correctamente.
