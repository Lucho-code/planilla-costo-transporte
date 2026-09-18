export const fullProductionPrompt = `# PROMPT DE INGENIERÍA: RÉPLICA COMPLETA DE "PLATAFORMA LOGÍSTICA & LANDING PLANILLA DE TARIFA Y COSTO DE TRANSPORTE 2026"

## 1. ROL Y OBJETIVO DEL PROYECTO
Eres un desarrollador Full-Stack Senior y Diseñador UI/UX especializado en aplicaciones de comercio electrónico y software de optimización logística. Tu objetivo es construir desde cero una plataforma web réplica funcional, moderna, optimizada para SEO y ultra-rápida de "Planilla de Tarifa & Costo de Transporte 2026", correspondiente a la marca "Criterio Logístico" (https://logistica.calmapura.shop/).

La aplicación se compone de:
1. Una Landing Page de Venta Directa y Conversión de alta fidelidad, con micro-interacciones, diseño visual de alta gama y copy persuasivo enfocado al transportista argentino.
2. Un simulador interactivo web embebido (o modal de prueba rápida) que replique la lógica de cálculo central de los 14 módulos de la planilla (Gasoil con retorno vacío, Costo Fijo, Amortización, Esperas, Tarifa Spot y Punto de Indiferencia).
3. Conexión de Checkout y Embudo de Ventas con persistencia de UTMs, soporte para pasarelas (Mercado Pago / Stripe / Checkout personalizado) y entrega automatizada del activo digital.

---

## 2. STACK TECNOLÓGICO Y ARQUITECTURA
- **Frontend Framework:** React 19 + TypeScript o Next.js 15 (App Router).
- **Estilos y Diseño:** Tailwind CSS (v4) configurado con el sistema de tokens y paleta exacta definida abajo.
- **Tipografía:** Inter (Display & Body) + Roboto Mono (Cifras y Datos numéricos) vía @fontsource o Google Fonts.
- **Animaciones:** Motion (motion/react) para transiciones fluidas de entrada, estados de hover y apertura de modales/acordeones.
- **Iconografía:** lucide-react combinada con los SVGs ilustrativos específicos de transporte.
- **Backend / API (si aplica):** Node.js / Express o Next.js Server Actions para:
  - Manejo seguro de Webhooks de pago de Mercado Pago.
  - API de envío de correo de bienvenida y entrega del archivo Excel/Sheets vía Resend o SendGrid.
  - Endpoint de suscripción y persistencia de eventos de analítica.

---

## 3. SISTEMA DE TOKENS DE DISEÑO (CSS / TAILWIND)
Configurar las siguientes variables de color y tokens exactos:
- \`--color-primary-dark: #15181E\` (Verde/Gris carbón profundo)
- \`--color-secondary-dark: #3A4250\` (Pizarra oscuro)
- \`--color-accent-rust: #C2410C\` (Naranja brote terracota)
- \`--color-accent-orange: #F97316\` (Naranja brillante de alta conversión)
- \`--color-accent-yellow: #F5B301\` (Dorado de acento)
- \`--color-accent-light-yellow: #FFCE4D\` (Foco y micro-destacados)
- \`--color-bg-base: #F7F5F0\` (Bone / marfil suave de fondo)
- \`--color-bg-surface: #EDE9E0\` (Bone-2 para tarjetas e inputs)
- \`--color-text-main: #111827\` (Negro carbón de lectura nítida)
- \`--color-text-muted: #6B7280\` (Gris para notas y descripciones)
- \`--color-border-subtle: #DDD6CA\` (Líneas sutiles de tarjeta)

Reglas de accesibilidad:
- Todo botón de llamado a la acción debe contar con un foco visible de 3px (\`outline: 3px solid #FFCE4D; outline-offset: 3px\`).
- Soporte para \`@media (prefers-reduced-motion: reduce)\`.
- El padding vertical y horizontal de los botones debe mantener una proporción 1:2 (ej. 19px y 42px).

---

## 4. ESTRUCTURA Y CONTENIDO DE CADA SECCIÓN

### Sección 1: Header y Hero Section
- **Brandbar:** Logo SVG de Criterio Logístico (volante técnico con mirilla en naranja #F97316 y centro dorado #F5B301) + texto "CRITERIO LOGÍSTICO".
- **Eyebrow:** "VERSIÓN 2026 · 14 MÓDULOS · +70 FUNCIONES" en píldora destacada.
- **H1 Titular:** "Cuánto te deja cada viaje, en un solo archivo."
- **Lead Text:** "El costo real de tu kilómetro con el retorno en vacío adentro, la amortización y las cubiertas que no te factura nadie, lo que te cuesta la hora de espera, la tarifa mínima del viaje eventual, hasta dónde aguanta el descuento del viaje fijo y en qué punto conviene rechazar. Cargás los datos de tu camión y sale el número. Sin suscripción y sin internet."
- **CTA Principal:** Botón ancho con gradiente de #F97316 a #C2410C:
  - Texto principal: "Quiero la planilla"
  - Subtexto: "Acceso inmediato · Descarga al instante"
  - Nota de seguridad: Ícono de escudo, "Compra segura con Mercado Pago · Garantía de 7 días".
- **Badges de Confianza:** "Excel y Google Sheets", "Funciona sin internet", "Pago único, no suscripción", "Acceso de por vida".
- **Hero Image:** Captura mockeada del Menú Principal de la Planilla (planilla-menu.webp) con marco de ventana y sombra difusa.

### Sección 2: El Problema Real (Agitación del Dolor)
- **Eyebrow:** "EL PROBLEMA REAL"
- **H2:** "No es que no sepas cobrar. Es que el precio salió del grupo de WhatsApp."
- **Cuerpo:** Explicar cómo el camión del colega tiene otro consumo, otro desgaste y otra financiación. Contrastar por qué el índice de FADEEAC (que mide 11 rubros y sube mensualmente) solo da un porcentaje general para el país, pero jamás el costo en pesos del viaje individual del usuario.
- **Punto de quiebre:** Demostrar cómo en viajes de ida y vuelta, el ~47,5% de los kilómetros recorridos en vacío no se facturan pero el gasoil y las cubiertas se pagan en su totalidad.

### Sección 3: Los 14 Módulos (Grid Interactivo)
Crear una cuadrícula responsiva (2 columnas en mobile, 4 en tablet, 7 en desktop) con tarjetas que contengan el ícono SVG, nombre y unidad de medida de cada módulo:
1. Costo Fijo del Día (\`$/día\`)
2. Gasoil con y sin Carga (\`$/km · litros\`)
3. Amortización del Equipo (\`$/km\`)
4. Desgaste Programado (\`$/km\`)
5. Costo Total del Viaje (\`$/km · $/viaje\`)
6. Peajes y Gastos de Ruta (\`$/viaje\`)
7. Viáticos del Chofer (\`$/km · $/día\`)
8. Costo de la Hora de Espera (\`$/hora\`)
9. Tarifa del Viaje Eventual (\`$/viaje · $/ton\`)
10. Tarifa del Viaje Fijo (\`$/mes · $/viaje\`)
11. Tarifa por Bulto y Pallet (\`$/bulto · m³\`)
12. Actualización por Índice (\`%\`)
13. Punto de Indiferencia (\`Semáforo rechazo\`)
14. Equilibrio y Retiro Real (\`$/mes · km eq.\`)

### Sección 4: Showcase en Profundidad ("Así se ve cuando la usás")
Implementar 6 tarjetas destacadas con selector o scroll continuo:
- **01. El kilómetro de vuelta también lo pagás vos:**
  - Tip clave: "Mirando sólo el consumo cargado el km da $778,24. Con la vuelta vacía adentro, el km que realmente facturás cuesta $1.329,68 (+70,9% más). El 47,5% de los kilómetros no se cobran."
- **02. Abajo de qué número el viaje eventual no se toma:**
  - Tip clave: "A tarifa de referencia deja $346.084. Al 70% que suele pagar el mercado, el mismo viaje deja -$226.489 (pérdida neta)."
- **03. Cuándo conviene rechazar el viaje (Punto de indiferencia):**
  - Identifica si el viaje cubre al menos el gasto de gasoil y viáticos o si es preferible dejar el camión parado.
- **04. Lo que te cuesta esperar que te carguen:**
  - Cálculo de la hora de estadía ($/hora) para reclamar al dador de carga o integrarlo en la tarifa base.
- **05. Lo que vale hoy la tarifa que cerraste en enero:**
  - Actualización polinómica mes a mes frente a la inflación real.
- **06. El viático del convenio, que es por kilómetro:**
  - Desglose según CCT 40/89 Camioneros (comida, pernoctada, permanencia).

### Sección 5: Comparativa "FADEEAC vs. Esta Planilla"
Tabla comparativa visual de dos columnas:
| Criterio | Índice FADEEAC / Ref. Oficial | Planilla de Tarifa & Costo 2026 |
| :--- | :--- | :--- |
| **Qué te da** | % de incremento promedio del sector | $ exacto de tu viaje según tu camión |
| **De quién es el camión** | Un camión estándar hipotético | Tu camión (tu consumo, tu seguro, tu deuda) |
| **Retorno en vacío** | No lo calcula (es solo ida) | Módulo propio con absorción de km vacíos |
| **Hora de espera** | Tabla orientativa genérica | Costo real por hora según costo fijo propio |
| **Toma de decisiones** | Informativo / macroeconómico | Ejecutivo: aceptar, negociar o rechazar |

### Sección 6: La Oferta Completa & Caja de Precios
- Desglose de beneficios:
  - 14 módulos sin bloqueos ni versiones "Pro".
  - Navegación interna con botones directos hacia el menú.
  - Fórmulas abiertas y 100% auditables (sin cajas negras).
  - Advertencias operativas en cada módulo.
  - Guía rápida en PDF de 1 página.
  - Compatible con Excel y Google Sheets (Android / iOS / Desktop).
- **Price Box:**
  - Modalidad: PAGO ÚNICO
  - Precio tachado: $49.990 ARS
  - Precio de oferta: **$22.990 ARS**
  - Micro-copia: "Lo pagás una vez. Menos que un service, menos que media cubierta."
  - Botón CTA: "Descargar la planilla ahora".

### Sección 7: Order Bumps / Complementos en Checkout
Presentar tres productos opcionales con precio especial para checkout:
1. **Cuadros de Ruta — Tablas del Transportista:** Láminas plastificadas imprimibles para contestar fletes en ruta (De $25.990 a $15.990 ARS).
2. **500 Preguntas y Respuestas del Transporte de Cargas:** Manual de 10 capítulos (CNRT, RUTA, seguros, CCT, pesos y dimensiones) (De $29.990 a $19.990 ARS).
3. **Del Volante a la Empresa:** Guía práctica para dar el salto de chofer a dueño de flota (monotributo vs SRL, contratos, segundo camión) (De $19.990 a $9.990 ARS).

### Sección 8: Prueba Social y Humanización
- **Historia de Origen:** Hernán Sosa (transportista de Zárate, corredor de Ruta 9). "La armé para mí porque me cansé de descubrir a fin de mes que había hecho un montón de viajes y quedado en cero."
- **Mensajes Reales de WhatsApp:** 3 tarjetas estilo chat con capturas/diálogos de colegas validando el impacto (descubrimiento de km real, reclamo de horas de espera y rechazo de fletes a pérdida).

### Sección 9: Garantía y FAQ
- **Garantía Incondicional de 7 Días:** Reembolso sin fricción si el usuario considera que la herramienta no refleja su operación.
- **Acordeones de Preguntas Frecuentes (HTML <details> con accesibilidad):**
  1. ¿Necesito saber Excel para usarla? (No, celdas amarillas editables, resto automático).
  2. ¿Sirve para un utilitario o es sólo para camión? (Sirve para ambos, incluye módulo de paquetería y peso volumétrico).
  3. ¿Reemplaza al índice de FADEEAC? (No, se complementan).
  4. ¿De dónde salen los valores de referencia? (FADEEAC auditado por FCE-UBA y CCT 40/89).
  5. ¿La tarifa de referencia es obligatoria? (No, es orientativa de mercado).
  6. ¿Cómo se entrega? (Descarga inmediata tras confirmación de pago).

### Sección 10: Cierre Final & Footer
- Cierre contundente: "Los viajes van a seguir apareciendo. El precio lo vas a poner igual. La única decisión es si lo ponés adivinando o con el número real en la mano."
- Repetición de Price Box y CTA.
- Footer con copyright y disclaimer de propiedad intelectual.

---

## 5. LÓGICA DE NEGOCIO Y MOTOR DE CÁLCULO (INTERACTIVE SIMULATOR)
Implementar en código (TypeScript puro) un simulador interactivo para la sección de prueba o modal de demo:

\`\`\`typescript
export interface TripCostInputs {
  fuelPricePerLiter: number;       // Precio del gasoil en $/litro
  loadedConsumptionPer100Km: number; // Consumo cargado (L/100km)
  emptyConsumptionPer100Km: number;  // Consumo vacío (L/100km)
  billedDistanceKm: number;          // Km facturados (ida)
  emptyReturnDistanceKm: number;     // Km de retorno en vacío
  dailyFixedCost: number;            // Costo fijo diario del camión
  tripDays: number;                  // Días que insume la vuelta completa
  tollsAndExpenses: number;          // Peajes y pesajes de ruta
  driverTripViatics: number;         // Viáticos del chofer del viaje
  amortizationAndTiresPerKm: number; // Costo por km de cubiertas y desgaste
  targetMarginPercentage: number;    // Margen pretendido (ej. 20%)
}

export interface TripCostOutputs {
  totalKmTraveled: number;
  emptyKmPercentage: number;
  totalFuelLiters: number;
  totalFuelCost: number;
  fuelCostPerBilledKm: number;
  totalVariableCost: number;
  totalFixedCost: number;
  totalTripCost: number;
  breakEvenTariff: number;           // Tarifa piso para no perder
  suggestedTariffWithMargin: number; // Tarifa con margen deseado
}

export function calculateTripCost(input: TripCostInputs): TripCostOutputs {
  const totalKm = input.billedDistanceKm + input.emptyReturnDistanceKm;
  const emptyPercentage = totalKm > 0 ? (input.emptyReturnDistanceKm / totalKm) * 100 : 0;

  const loadedLiters = (input.billedDistanceKm / 100) * input.loadedConsumptionPer100Km;
  const emptyLiters = (input.emptyReturnDistanceKm / 100) * input.emptyConsumptionPer100Km;
  const totalLiters = loadedLiters + emptyLiters;
  const totalFuelCost = totalLiters * input.fuelPricePerLiter;

  const fuelCostPerBilledKm = input.billedDistanceKm > 0 
    ? totalFuelCost / input.billedDistanceKm 
    : 0;

  const maintenanceWearCost = totalKm * input.amortizationAndTiresPerKm;
  const totalVariableCost = totalFuelCost + maintenanceWearCost + input.tollsAndExpenses + input.driverTripViatics;
  const totalFixedCost = input.dailyFixedCost * input.tripDays;
  const totalTripCost = totalVariableCost + totalFixedCost;

  const breakEvenTariff = totalTripCost;
  const suggestedTariffWithMargin = totalTripCost * (1 + (input.targetMarginPercentage / 100));

  return {
    totalKmTraveled: totalKm,
    emptyKmPercentage: emptyPercentage,
    totalFuelLiters: totalLiters,
    totalFuelCost: totalFuelCost,
    fuelCostPerBilledKm: fuelCostPerBilledKm,
    totalVariableCost: totalVariableCost,
    totalFixedCost: totalFixedCost,
    totalTripCost: totalTripCost,
    breakEvenTariff: breakEvenTariff,
    suggestedTariffWithMargin: suggestedTariffWithMargin,
  };
}
\`\`\`

---

## 6. ESPECIFICACIÓN DE TRACKING, ANALÍTICA Y CHECKOUT
1. **Captura de UTMs al aterrizar:**
   - Script al inicio del ciclo de vida que extraiga de la URL: \`utm_source\`, \`utm_medium\`, \`utm_campaign\`, \`utm_content\`, \`utm_term\`, \`fbclid\`, \`gclid\`.
   - Persistir en \`sessionStorage\` o cookies temporales de 30 días.
2. **Propagación a los Botones CTA:**
   - Todos los enlaces a la pasarela de pago deben concatenar automáticamente los parámetros UTM capturados:
     \`https://pay.hvpage.com/c/criteriotransporte?utm_source=...&utm_medium=...\`
3. **Eventos de Conversión (Meta Pixel / GTM):**
   - Disparar \`fbq('track', 'PageView')\` en carga inicial.
   - En click de cualquier CTA disparar \`fbq('track', 'InitiateCheckout', { currency: 'ARS', value: 22990 })\`.
4. **Integración de Webhook de Compra (Backend):**
   - Escuchar evento \`payment.created\` o \`order.completed\` de Mercado Pago o HVPage.
   - Validar firma HMAC del webhook.
   - Disparar correo al comprador con enlace seguro temporal firmado para descarga de los archivos \`.xlsx\` y acceso al enlace de Google Sheets.

---

## 7. ESTRATEGIA DE TESTING Y VERIFICACIÓN
- **Pruebas de Cálculo Unitarias:** Verificar que el costo de combustible absorba con exactitud matemática el kilometraje en vacío y que los márgenes de tarifa concuerden con las cifras exhibidas en la landing (ej. $778,24 cargado vs. $1.329,68 total con vuelta vacía).
- **Pruebas de Responsive & Layout Shift:**
  - Asegurar que todas las imágenes incluyan atributos \`width\` y \`height\` nativos junto con \`img { max-width: 100%; height: auto; }\` para garantizar un CLS (Cumulative Layout Shift) igual a 0.
  - Verificar que el contenedor deslizable horizontal (\`.swipe\`) permita explorar las capturas de cálculo en pantallas de 320px a 414px sin desbordar el body.
- **Compatibilidad Offline / PWA (Opcional recomendado):**
  - Proveer Service Worker con caché \`CacheFirst\` para que la landing y la calculadora funcionen en cabina sin señal de internet en ruta.

---

## 8. ENTREGABLES ESPERADOS
1. Código fuente completo y modularizado (\`src/components/Hero.tsx\`, \`src/components/ModulesGrid.tsx\`, \`src/components/Showcase.tsx\`, \`src/components/Faq.tsx\`, \`src/components/PricingBox.tsx\`, \`src/logic/calculator.ts\`).
2. Archivo \`tailwind.config.js\` o reglas \`@import "tailwindcss";\` con los tokens de color especificados.
3. Assets optimizados en formato WebP con dimensiones pre-reservadas.
4. Documentación clara en un archivo \`README.md\` con instrucciones de configuración de variables de entorno (\`CHECKOUT_URL\`, \`META_PIXEL_ID\`, etc.) y despliegue en Vercel, Netlify o Cloud Run.
`;
