# Punto Aliado — Demo + CRM

Demo conceptual de **Punto Aliado**: seguros y crédito en un solo lugar.
Incluye un sitio público moderno (React + TypeScript + Vite + Tailwind CSS v4) y un
**CRM funcional** para administrar promociones, leads, contenido y ajustes del sitio.

> Los cambios hechos en el CRM se reflejan al instante en el sitio público. Todo se
> guarda en `localStorage` de este navegador, así que la demo funciona sin backend.

---

## Requisitos

- Node.js 20 o superior
- npm

## Cómo ejecutar

```bash
cd C:\Users\johan\Downloads\PA
npm install
npm run dev
```

Abre `http://localhost:5173` (o el puerto que indique Vite).

Para compilar la versión de producción:

```bash
npm run build
npm run preview
```

---

## Acceso al CRM

- Sitio público: `http://localhost:5173/`
- CRM: `http://localhost:5173/admin`
- Credenciales demo (ya vienen precargadas):
  - **Correo:** `admin@puntoaliado.com`
  - **Contraseña:** `demo123`

La sesión usa `sessionStorage`; los datos se guardan en
`localStorage` con la llave `punto-aliado-demo-v1`.

---

## Qué incluye

### Sitio público
- **Inicio:** hero con cotizador express (seguros/crédito), grid de 7 seguros,
  promociones activas, simulador de crédito, aliados (12 aseguradoras y 18 entidades
  financieras en marquesina animada), diferenciales, testimonios, FAQ y contacto.
- **Seguros:** catálogo completo, promociones, aliados y FAQ.
- **Crédito:** simulador con cuota mensual, pasos del proceso, requisitos y asesoría.
- **Nosotros:** historia, métricas y valores.
- **Contacto:** canales de atención + formulario que crea un lead real en el CRM.
- Modal de cotización global que registra leads desde cualquier página.
- Botón flotante de WhatsApp y enlaces reales de redes sociales.

### CRM (`/admin`)
- **Resumen:** KPIs de leads y pipeline, gráficas de leads por día y por producto,
  rendimiento de promociones (vistas, clics, CTR) y leads recientes.
- **Promociones:** crear, editar, pausar/activar, programar por fechas, elegir color
  y ubicación (barra superior, sección del sitio o ambas). Cada promoción muestra
  vistas, clics y CTR.
- **Leads:** búsqueda, filtros por estado y tipo, cambio de estado en línea,
  eliminación y **exportación a CSV**.
- **Contenido:** edición de textos del hero, datos de contacto, direcciones, métricas
  de confianza y preguntas frecuentes, con vista previa inmediata al guardar.
- **Ajustes:** parámetros del simulador de crédito, paleta de marca y restauración
  completa de la demo.

---

## Identidad de marca

La paleta se extrajo del logo real de Punto Aliado:

| Uso | Color |
| --- | --- |
| Cian principal | `#00A8C5` |
| Verde menta | `#00C08B` |
| Azul marino | `#0C1A2E` |
| Crema de fondo | `#F4FAFB` |

Los logos e imágenes reales del sitio (`logo`, aseguradoras y entidades financieras)
están descargados en `public/assets/`.

---

## Estructura del proyecto

```
src/
  components/
    admin/        UI compartida del CRM
    layout/       Header, footer, promo bar, WhatsApp
    quote/        Modal global de cotización
    sections/     Secciones del sitio público
    ui/           Logo, animaciones, toasts, page header...
  lib/            Store (localStorage), seed, tipos, formato y productos
  pages/          Páginas públicas
  pages/admin/    CRM (login, layout, dashboard, promociones, leads, contenido, ajustes)
public/assets/    Branding, aseguradoras, financieras e imágenes
```

---

## Notas

- Demo con fines de presentación: no procesa pagos ni créditos reales.
- El CRM está pensado como demostración local; para producción se conectaría a un
  backend/CRM real con autenticación y base de datos.
- Para volver al estado inicial: **CRM → Ajustes → Restaurar demo**.
