import React from 'react';
import { ModuleCard } from '../types';
import { ModuleIcon } from './ModuleIcons';

export const modulesData: ModuleCard[] = [
  {
    id: 1,
    code: 'MÓDULO 01',
    category: 'ESTRUCTURA',
    title: 'Costo Fijo del Día',
    unit: '$/día',
    iconName: 'costo-fijo',
    description: 'Seguros, patente, chofer base, garage, técnica y amortización por tiempo.',
  },
  {
    id: 2,
    code: 'MÓDULO 02',
    category: 'ESTRUCTURA',
    title: 'Gasoil con y sin Carga',
    unit: '$/km · litros',
    iconName: 'gasoil',
    description: 'Consumo real absorbiendo el retorno en vacío y maniobras con motor en marcha.',
  },
  {
    id: 3,
    code: 'MÓDULO 03',
    category: 'ESTRUCTURA',
    title: 'Amortización del Equipo',
    unit: '$/km',
    iconName: 'amortizacion',
    description: 'Fondo de reposición de unidad y acoplado por km recorrido real.',
  },
  {
    id: 4,
    code: 'MÓDULO 04',
    category: 'ESTRUCTURA',
    title: 'Desgaste Programado',
    unit: '$/km · $/mes',
    iconName: 'desgaste',
    description: 'Cubiertas, recapados, cambios de aceite, filtros, frenos y mantenimiento.',
  },
  {
    id: 5,
    code: 'MÓDULO 05',
    category: 'OPERACIÓN',
    title: 'Costo Total del Viaje',
    unit: '$/km · $/viaje',
    iconName: 'costo-viaje',
    description: 'Suma consolidada de costos fijos por día y costos variables del recorrido.',
  },
  {
    id: 6,
    code: 'MÓDULO 06',
    category: 'OPERACIÓN',
    title: 'Peajes y Gastos de Ruta',
    unit: '$/viaje',
    iconName: 'peajes',
    description: 'Telepase, pesajes, estacionamientos y gastos operativos en tránsito.',
  },
  {
    id: 7,
    code: 'MÓDULO 07',
    category: 'OPERACIÓN',
    title: 'Viáticos del Chofer',
    unit: '$/viaje · $/km',
    iconName: 'viaticos',
    description: 'Comida, pernoctada y permanencia según CCT 40/89 Camioneros.',
  },
  {
    id: 8,
    code: 'MÓDULO 08',
    category: 'OPERACIÓN',
    title: 'Costo de la Hora de Espera',
    unit: '$/hora',
    iconName: 'espera',
    description: 'Lo que cuesta tener el camión parado en planta y cuánto cubre la estadía.',
  },
  {
    id: 9,
    code: 'MÓDULO 09',
    category: 'TARIFA',
    title: 'Tarifa del Viaje Eventual',
    unit: '$/viaje · $/tn',
    iconName: 'tarifa-eventual',
    description: 'Piso mínimo por viaje y por tonelada descontando comisión del dador.',
  },
  {
    id: 10,
    code: 'MÓDULO 10',
    category: 'TARIFA',
    title: 'Tarifa del Viaje Fijo',
    unit: '$/viaje · %',
    iconName: 'tarifa-fija',
    description: 'Cuánto descuento aguanta un cliente recurrente sin entrar a pérdida.',
  },
  {
    id: 11,
    code: 'MÓDULO 11',
    category: 'TARIFA',
    title: 'Tarifa por Bulto y Pallet',
    unit: '$/entrega · kg',
    iconName: 'bulto-pallet',
    description: 'Cálculo por metro cúbico, peso aforado y punto de entrega en paquetería.',
  },
  {
    id: 12,
    code: 'MÓDULO 12',
    category: 'TARIFA',
    title: 'Actualización por Índice',
    unit: '$ · %',
    iconName: 'actualizacion-indice',
    description: 'Ajuste polinómico por índice FADEEAC e inflación para renegociar contratos.',
  },
  {
    id: 13,
    code: 'MÓDULO 13',
    category: 'DECISIÓN',
    title: 'Punto de Indiferencia',
    unit: '$ · aceptar/rechazar',
    iconName: 'punto-indiferencia',
    description: 'Semáforo de decisión: si cubre el variable o conviene dejar el camión parado.',
  },
  {
    id: 14,
    code: 'MÓDULO 14',
    category: 'DECISIÓN',
    title: 'Equilibrio y Retiro Real',
    unit: '$/hora · viajes',
    iconName: 'equilibrio-retiro',
    description: 'Cuántos viajes o km necesitás al mes para que el chofer y el dueño cobren.',
  },
];

interface ModulesGridProps {
  onSelectModule?: (moduleId: number) => void;
  selectedModuleId?: number;
}

export const ModulesGrid: React.FC<ModulesGridProps> = ({
  onSelectModule,
  selectedModuleId,
}) => {
  return (
    <section id="modulos" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Title & subtitle replica */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-4xl sm:text-5xl font-black text-[#111827] tracking-tight mb-4">
          14 módulos. Un solo archivo.
        </h2>
        <p className="text-lg sm:text-xl text-[#3A4250] leading-relaxed">
          Abrís la planilla, tocás el ícono del cálculo que necesitás y cargás los datos de tu equipo. Nada más.
        </p>
      </div>

      {/* Grid: 2 cols mobile, 4 cols tablet, 7 cols desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5 sm:gap-4">
        {modulesData.map((module) => {
          const isSelected = selectedModuleId === module.id;
          return (
            <div
              key={module.id}
              id={`modulo-card-${module.id}`}
              onClick={() => onSelectModule && onSelectModule(module.id)}
              className={`group bg-white rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center justify-between border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 ${
                isSelected
                  ? 'border-[#F97316] ring-2 ring-[#F97316]/20 bg-[#F7F5F0]'
                  : 'border-[#DDD6CA] hover:border-[#F97316]/50'
              }`}
            >
              {/* Icon Container */}
              <div className="w-14 h-14 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ModuleIcon name={module.iconName} className="w-12 h-12" />
              </div>

              {/* Title */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-sm sm:text-base text-[#111827] leading-snug mb-1">
                  {module.title}
                </h3>
              </div>

              {/* Unit pill */}
              <div className="mt-2 text-xs font-mono font-medium text-[#6B7280] bg-[#F7F5F0] px-2 py-0.5 rounded-full">
                {module.unit}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footnote text below grid */}
      <div className="text-center mt-10 text-sm sm:text-base text-[#3A4250]">
        Cada módulo tiene cinco resultados adentro: en total, <strong className="font-bold text-[#111827]">más de 70 cálculos</strong> resueltos.
      </div>
    </section>
  );
};
