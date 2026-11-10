import type { DemoState, Lead, LeadStatus, LeadType, Promo, SiteContent } from './types'

const uid = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 9)}`

const dateAt = (daysAgo: number, hour = 10) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  date.setHours(hour, 15, 0, 0)
  return date.toISOString()
}

const dayAt = (daysFromNow: number) => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().slice(0, 10)
}

interface LeadSeed {
  name: string
  email: string
  phone: string
  type: LeadType
  product: string
  status: LeadStatus
  value: number
  daysAgo: number
  message?: string
  source?: string
}

const leadSeeds: LeadSeed[] = [
  { name: 'Dangond Londoño', email: 'dangond.londono@gmail.com', phone: '310 442 8891', type: 'Crédito', product: 'Crédito vehicular', status: 'cerrado', value: 68_000_000, daysAgo: 1, message: 'Quiere financiar una camioneta familiar.', source: 'Sitio web' },
  { name: 'Andrés Galeano', email: 'andres.galeano@hotmail.com', phone: '312 778 2043', type: 'Seguro', product: 'Seguro vehicular', status: 'contactado', value: 2_340_000, daysAgo: 1, message: 'Renovación de póliza todo riesgo.', source: 'Sitio web' },
  { name: 'Luis Rincón', email: 'luis.rincon@gmail.com', phone: '301 665 1120', type: 'Crédito', product: 'Crédito vehicular', status: 'negociacion', value: 92_000_000, daysAgo: 2, message: 'Está comparando tres entidades.', source: 'Referido' },
  { name: 'Héctor Hugo Arbelaez', email: 'hector.arbelaez@outlook.com', phone: '315 220 7745', type: 'Seguro', product: 'Seguro de hogar', status: 'nuevo', value: 780_000, daysAgo: 2, message: 'Necesita cubrir apartamento arrendado.', source: 'Instagram' },
  { name: 'María Camila Ospina', email: 'mc.ospina@gmail.com', phone: '300 918 4432', type: 'Seguro', product: 'Seguro de mascotas', status: 'contactado', value: 420_000, daysAgo: 3, message: 'Tiene dos perros y quiere cobertura de urgencias.', source: 'Sitio web' },
  { name: 'Julián Esteban Mejía', email: 'julian.mejia@gmail.com', phone: '311 506 9087', type: 'Crédito', product: 'Crédito vehicular', status: 'nuevo', value: 54_000_000, daysAgo: 3, source: 'Sitio web' },
  { name: 'Valentina Restrepo', email: 'valen.restrepo@hotmail.com', phone: '304 771 3312', type: 'Seguro', product: 'Seguro de viajes', status: 'cerrado', value: 260_000, daysAgo: 4, message: 'Viaje a Europa en diciembre.', source: 'Sitio web' },
  { name: 'Santiago Cárdenas', email: 'santiago.cardenas@gmail.com', phone: '313 998 2201', type: 'Seguro', product: 'Póliza de salud', status: 'negociacion', value: 1_560_000, daysAgo: 4, source: 'Google' },
  { name: 'Catalina Henao', email: 'catalina.henao@gmail.com', phone: '318 430 7712', type: 'Seguro', product: 'Seguro vehicular', status: 'nuevo', value: 1_980_000, daysAgo: 5, message: 'Acaba de comprar carro nuevo.', source: 'Facebook' },
  { name: 'Sebastián Zapata', email: 'sebas.zapata@outlook.com', phone: '320 112 5540', type: 'Crédito', product: 'Crédito vehicular', status: 'perdido', value: 40_000_000, daysAgo: 6, message: 'Prefirió la oferta de un concesionario.', source: 'Sitio web' },
  { name: 'Natalia Gómez', email: 'natalia.gomez@gmail.com', phone: '305 771 0092', type: 'Seguro', product: 'Seguro de vida', status: 'contactado', value: 690_000, daysAgo: 7, source: 'Referido' },
  { name: 'Juan David López', email: 'jd.lopez@gmail.com', phone: '316 220 4478', type: 'Crédito', product: 'Crédito vehicular', status: 'cerrado', value: 81_500_000, daysAgo: 8, message: 'Desembolso aprobado con Finandina.', source: 'Sitio web' },
  { name: 'Andrea Salazar', email: 'andrea.salazar@gmail.com', phone: '302 913 7710', type: 'Seguro', product: 'Seguro de bici', status: 'nuevo', value: 216_000, daysAgo: 9, source: 'Instagram' },
  { name: 'Carlos Mario Uribe', email: 'cmuribe@hotmail.com', phone: '310 998 3321', type: 'Seguro', product: 'Seguro vehicular', status: 'contactado', value: 2_760_000, daysAgo: 10, message: 'Flota de dos vehículos.', source: 'Sitio web' },
  { name: 'Manuela Ríos', email: 'manuela.rios@gmail.com', phone: '304 220 1187', type: 'Seguro', product: 'Seguro de hogar', status: 'cerrado', value: 840_000, daysAgo: 11, source: 'Google' },
  { name: 'Felipe Montoya', email: 'felipe.montoya@gmail.com', phone: '312 441 9080', type: 'Crédito', product: 'Crédito vehicular', status: 'nuevo', value: 63_000_000, daysAgo: 12, message: 'Consulta por tasa y plazo.', source: 'Sitio web' },
  { name: 'Laura Vélez', email: 'laura.velez@gmail.com', phone: '300 771 4423', type: 'Seguro', product: 'Póliza de salud', status: 'contactado', value: 1_320_000, daysAgo: 13, source: 'Facebook' },
  { name: 'Daniel Quintero', email: 'daniel.quintero@outlook.com', phone: '317 220 5531', type: 'Seguro', product: 'Seguro de viajes', status: 'nuevo', value: 180_000, daysAgo: 14, source: 'Sitio web' },
  { name: 'Paula Andrea Muñoz', email: 'paula.munoz@gmail.com', phone: '313 661 2290', type: 'Crédito', product: 'Crédito vehicular', status: 'cerrado', value: 47_000_000, daysAgo: 16, source: 'Referido' },
  { name: 'Tomás Echeverri', email: 'tomas.echeverri@gmail.com', phone: '311 998 7712', type: 'Seguro', product: 'Seguro de mascotas', status: 'perdido', value: 252_000, daysAgo: 18, source: 'Instagram' },
  { name: 'Sara Duque', email: 'sara.duque@gmail.com', phone: '305 441 0098', type: 'Seguro', product: 'Seguro de vida', status: 'negociacion', value: 960_000, daysAgo: 19, source: 'Sitio web' },
  { name: 'Alejandro Castaño', email: 'alejandro.castano@gmail.com', phone: '320 771 6612', type: 'Crédito', product: 'Crédito vehicular', status: 'contactado', value: 75_000_000, daysAgo: 21, source: 'Google' },
  { name: 'Isabella Torres', email: 'isabella.torres@gmail.com', phone: '302 445 9981', type: 'Seguro', product: 'Seguro vehicular', status: 'cerrado', value: 2_100_000, daysAgo: 23, source: 'Sitio web' },
  { name: 'Mateo Herrera', email: 'mateo.herrera@gmail.com', phone: '316 771 3340', type: 'Seguro', product: 'Seguro de hogar', status: 'nuevo', value: 720_000, daysAgo: 26, source: 'Facebook' },
]

const leads: Lead[] = leadSeeds.map((seed, index) => ({
  id: `lead_seed_${index + 1}`,
  name: seed.name,
  email: seed.email,
  phone: seed.phone,
  type: seed.type,
  product: seed.product,
  message: seed.message ?? '',
  status: seed.status,
  value: seed.value,
  source: seed.source ?? 'Sitio web',
  createdAt: dateAt(seed.daysAgo, 8 + (index % 9)),
}))

const promos: Promo[] = [
  {
    id: 'promo_vehicular_20',
    title: '20% de descuento en tu seguro vehicular',
    description: 'Cotiza con nosotros y recibe un descuento especial en la prima de tu póliza todo riesgo. Aplica para vehículos particulares.',
    badge: 'Oferta del mes',
    ctaLabel: 'Cotizar mi carro',
    ctaHref: '#seguros',
    theme: 'brand',
    placement: 'both',
    active: true,
    startDate: dayAt(-18),
    endDate: dayAt(28),
    views: 4820,
    clicks: 612,
  },
  {
    id: 'promo_credito_24h',
    title: 'Tu crédito vehicular aprobado en 24 horas',
    description: 'Un solo formulario, más de 20 entidades financieras comparando por ti. Radica hoy y recibe respuesta mañana.',
    badge: 'Rápido y digital',
    ctaLabel: 'Simular mi crédito',
    ctaHref: '#credito',
    theme: 'mint',
    placement: 'section',
    active: true,
    startDate: dayAt(-10),
    endDate: dayAt(45),
    views: 3110,
    clicks: 428,
  },
  {
    id: 'promo_viajes',
    title: 'Seguro de viajes desde $35.000 por día',
    description: 'Asistencia médica internacional, equipaje protegido y cancelación de viaje. Disfruta tu próximo destino sin preocupaciones.',
    badge: 'Para viajeros',
    ctaLabel: 'Quiero viajar tranquilo',
    ctaHref: '#seguros',
    theme: 'navy',
    placement: 'bar',
    active: true,
    startDate: dayAt(-25),
    endDate: dayAt(15),
    views: 2210,
    clicks: 190,
  },
  {
    id: 'promo_combo',
    title: 'Combo hogar + vida: ahorra 15%',
    description: 'Protege tu casa y a tu familia en un solo plan. Asesoría personalizada y descuento por contratación conjunta.',
    badge: 'Combo inteligente',
    ctaLabel: 'Armar mi combo',
    ctaHref: '#seguros',
    theme: 'violet',
    placement: 'section',
    active: false,
    startDate: dayAt(-40),
    endDate: dayAt(-5),
    views: 1640,
    clicks: 148,
  },
]

const content: SiteContent = {
  heroBadge: 'Más de 12 aseguradoras y 20 entidades financieras',
  heroTitle: 'Seguros y crédito',
  heroHighlight: 'en un solo lugar',
  heroSubtitle:
    'Compara las mejores aseguradoras del país y solicita tu crédito vehicular con un solo formulario. Rápido, seguro y con asesoría humana de principio a fin.',
  phone: '323 254 0207',
  whatsapp: '573232540207',
  email: 'contacto@puntoaliado.com',
  addressMedellin: 'Calle 26 sur No. 48-41, Of. 607 · Edificio Ayurá Center',
  addressBogota: 'Calle 26 # 92-32, piso 5, oficina 108 · Edificio G2G3 WeWork',
  schedule: 'Lunes a viernes · 8:00 a.m. a 6:00 p.m.',
  stats: [
    { id: 'stat_1', value: '+12', label: 'Aseguradoras aliadas' },
    { id: 'stat_2', value: '+20', label: 'Entidades financieras' },
    { id: 'stat_3', value: '+8.500', label: 'Clientes acompañados' },
    { id: 'stat_4', value: '4.9/5', label: 'Calificación promedio' },
  ],
  faqs: [
    {
      id: 'faq_1',
      question: '¿Cuánto cuesta comparar seguros con Punto Aliado?',
      answer:
        'Nada. Comparar y cotizar con nosotros es completamente gratis. Nuestros aliados nos remuneran cuando contratas, así que tú siempre recibes asesoría sin costo.',
    },
    {
      id: 'faq_2',
      question: '¿Puedo solicitar un crédito si estoy reportado en centrales de riesgo?',
      answer:
        'Cada entidad tiene sus propios criterios. Al radicar un solo formulario, varias entidades evalúan tu perfil y te damos opciones reales según tu situación.',
    },
    {
      id: 'faq_3',
      question: '¿Qué necesito para solicitar un crédito vehicular?',
      answer:
        'Documento de identidad, certificado laboral o soporte de ingresos, extractos bancarios de los últimos 3 meses y los documentos del vehículo o proforma del concesionario.',
    },
    {
      id: 'faq_4',
      question: '¿En cuánto tiempo me responden?',
      answer:
        'Los seguros se cotizan el mismo día. Para crédito vehicular, la mayoría de las entidades responden en 24 a 72 horas hábiles después de radicar la solicitud completa.',
    },
    {
      id: 'faq_5',
      question: '¿Puedo cambiar o cancelar mi póliza después?',
      answer:
        'Sí. Te acompañamos en renovaciones, cambios de cobertura y cancelaciones. Escríbenos por WhatsApp y un asesor te ayuda con el proceso.',
    },
  ],
  testimonials: [
    {
      id: 'test_1',
      name: 'Dangond Londoño',
      role: 'Familia · Crédito vehicular',
      quote:
        'Con Punto Aliado nuestra experiencia fue maravillosa: ágil, seguro, cómodo y lo más importante, encontramos las mejores condiciones para nuestro crédito sin estar de banco en banco.',
      rating: 5,
    },
    {
      id: 'test_2',
      name: 'Andrés Galeano',
      role: 'Cliente de crédito',
      quote:
        'Muy satisfecho con la atención durante todo el proceso. Respuestas oportunas, información eficiente y expectativas claras que dan tranquilidad.',
      rating: 5,
    },
    {
      id: 'test_3',
      name: 'Luis Rincón',
      role: 'Cliente de seguros',
      quote:
        'Excelente asesoría y manejo de los productos para satisfacer todas las necesidades de nosotros como clientes.',
      rating: 5,
    },
    {
      id: 'test_4',
      name: 'Héctor Hugo Arbelaez',
      role: 'Cliente de crédito',
      quote:
        'El servicio fue ágil, rápido y me dieron varias opciones. Elegimos la que mejor se acomodó a nuestro perfil y a las cuotas que podíamos pagar.',
      rating: 5,
    },
  ],
  simulator: {
    annualRate: 16.5,
    minAmount: 10_000_000,
    maxAmount: 120_000_000,
    step: 1_000_000,
    minMonths: 12,
    maxMonths: 84,
    defaultAmount: 45_000_000,
    defaultMonths: 60,
  },
}

export const createSeed = (): DemoState => ({
  promos: promos.map((promo) => ({ ...promo })),
  leads: leads.map((lead) => ({ ...lead })),
  content: {
    ...content,
    stats: content.stats.map((stat) => ({ ...stat })),
    faqs: content.faqs.map((faq) => ({ ...faq })),
    testimonials: content.testimonials.map((testimonial) => ({ ...testimonial })),
    simulator: { ...content.simulator },
  },
})

export const newId = uid
