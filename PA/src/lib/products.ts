import type { LucideIcon } from 'lucide-react'
import { Bike, Car, Heart, HeartPulse, Home, PawPrint, Plane } from 'lucide-react'
import type { ProductKey } from './types'

export interface Product {
  key: ProductKey
  name: string
  tagline: string
  description: string
  from: string
  icon: LucideIcon
  gradient: string
  benefits: string[]
}

export const PRODUCTS: Product[] = [
  {
    key: 'vehicular',
    name: 'Seguro vehicular',
    tagline: 'Tu carro protegido, tu tranquilidad intacta',
    description:
      'Comparamos las mejores aseguradoras del país para que elijas la cobertura que necesitas al mejor precio.',
    from: '$98.000/mes',
    icon: Car,
    gradient: 'from-[#00a8c5] to-[#00c08b]',
    benefits: ['Cobertura todo riesgo', 'Asistencia en carretera 24/7', 'Compare varias aseguradoras'],
  },
  {
    key: 'hogar',
    name: 'Seguro de hogar',
    tagline: 'Protege el lugar donde vive tu historia',
    description:
      'Cobertura para tu casa o apartamento, tus muebles y tu familia ante robos, incendios o inundaciones.',
    from: '$32.000/mes',
    icon: Home,
    gradient: 'from-[#0ea5e9] to-[#6366f1]',
    benefits: ['Daños por agua e incendio', 'Protección contra robo', 'Asistencia domiciliaria'],
  },
  {
    key: 'salud',
    name: 'Póliza de salud',
    tagline: 'Atención médica cuando más la necesitas',
    description:
      'Planes de salud con cobertura nacional, medicina prepagada y orientación médica permanente.',
    from: '$76.000/mes',
    icon: HeartPulse,
    gradient: 'from-[#f43f5e] to-[#f97316]',
    benefits: ['Red de clínicas nacional', 'Consultas y urgencias', 'Cobertura para tu familia'],
  },
  {
    key: 'viajes',
    name: 'Seguro de viajes',
    tagline: 'Viaja sin imprevistos, disfruta el destino',
    description:
      'Asistencia médica, equipaje y cancelación de viaje para tus aventuras dentro y fuera del país.',
    from: '$35.000/día',
    icon: Plane,
    gradient: 'from-[#06b6d4] to-[#3b82f6]',
    benefits: ['Asistencia médica internacional', 'Protección de equipaje', 'Cobertura por cancelación'],
  },
  {
    key: 'bici',
    name: 'Seguro de bici',
    tagline: 'Pedalea tranquilo por la ciudad',
    description:
      'Tu bicicleta y tú protegidos ante robos, accidentes y responsabilidad civil en cada recorrido.',
    from: '$18.000/mes',
    icon: Bike,
    gradient: 'from-[#22c55e] to-[#14b8a6]',
    benefits: ['Robo y daños', 'Asistencia en accidentes', 'Cobertura en competencias'],
  },
  {
    key: 'vida',
    name: 'Seguro de vida',
    tagline: 'El respaldo que tu familia merece',
    description:
      'Protege económicamente a quienes más quieres con planes flexibles y coberturas adicionales.',
    from: '$24.000/mes',
    icon: Heart,
    gradient: 'from-[#8b5cf6] to-[#ec4899]',
    benefits: ['Respaldo económico familiar', 'Coberturas adicionales', 'Sin exámenes complicados'],
  },
  {
    key: 'mascotas',
    name: 'Seguro de mascotas',
    tagline: 'Porque también son parte de la familia',
    description:
      'Veterinaria, urgencias y medicamentos para que tu peludo reciba la atención que necesita.',
    from: '$21.000/mes',
    icon: PawPrint,
    gradient: 'from-[#f59e0b] to-[#f97316]',
    benefits: ['Consultas veterinarias', 'Urgencias y cirugías', 'Medicamentos cubiertos'],
  },
]

export const productByKey = (key: ProductKey) =>
  PRODUCTS.find((product) => product.key === key) ?? PRODUCTS[0]
