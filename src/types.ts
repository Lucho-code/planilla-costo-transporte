export interface ModuleCard {
  id: number;
  code: string;
  category: 'ESTRUCTURA' | 'OPERACIÓN' | 'TARIFA' | 'DECISIÓN';
  title: string;
  unit: string;
  iconName: string;
  description: string;
}

export interface ShowcaseCase {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  moduleCode: string;
  formula: string;
  takeaway: {
    highlight: string;
    text: string;
  };
  fadeeacNote: string;
}

export interface OrderBumpItem {
  id: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  promoPrice: number;
  badge: string;
  icon: string;
}
