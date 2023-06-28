# PortFolio-BillinApp
## WebApp para realizar facturas.
### Proyecto desarrollado a modo de portfolio para el control de clientes, articulos, y facturas. <br>   A traves de la web podemos gestionar el alta de clientes y articulos para posteriormente poder realizar las facturas correspondientes. <br> El sistema además permite la impresión de las mismas en formato pdf

## Caracteristicas del proyecto
### Proyecto web con registro de usuarios. <br>
### Cada usuario una vez registrado puede gestionar sus propios clientes, articulos y facturas.

## Tecnologias utilizadas
- REACT <br> Biblioteca de javascript utilizada para crear interfaces interactivas y reactivas.
- Google Firestore como sistema de base de datos. <br> Todas las peticiones se realizan sin backend a través de middelware utilizadon redux para persistir la información en toda la web 
- Google authentication como control de usuarios. <br> La autenticación se puede realizar tanto por email como a traves de cuenta de google. <br> La utenticacion permite permanecer logado en las diferentes visitas a la pagina mediante cookies o bien logarse por cada visita
- NEXT-UI <br> https://nextui.org/docs/components/modal <br> Biblioteca de componentes para dar un estilo visual mas atractivo
- CLOUDINARY <br> Servivio de alojamiento de imagenes en cloud
- PDFMAKE <br> Biblioteca para la generación de PDFS
- REDUX-THUNK <br> Libreria para controlar el estado de la aplicación
- REACT-ROUTER-DOM <br> Biblioteca de enrutamiento para aplicaciones web desarrolladas con React. Proporciona un enrutador que te permite gestionar la navegación entre diferentes componentes y páginas en una aplicación de React.
## Como hacer andar el proyecto.
### Descargar/clonar el proyectoy y ejecutar 
npm run dev -- --host <br>
Acceder a http://localhost:5173/



### Ejemplos de diseños
https://nextui-dashboard-template.vercel.app/accounts
https://github.com/Siumauricio/landing-template-nextui