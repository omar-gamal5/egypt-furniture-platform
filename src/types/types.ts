export type UserRole = 
  | 'designer' 
  | 'producer' 
  | 'supplier' 
  | 'retailer' 
  | 'educational' 
  | 'government' 
  | 'student' 
  | 'development';

export type UserStatus = 'active' | 'pending' | 'inactive';

export type Language = 'en' | 'ar';

export type MaterialType = 
  | 'wood' 
  | 'metal' 
  | 'fabric' 
  | 'leather' 
  | 'glass' 
  | 'plastic' 
  | 'fiberglass' 
  | 'other';

export type WoodType =
  | 'oak'
  | 'beech'
  | 'walnut'
  | 'mdf'
  | 'plywood'
  | 'pine'
  | 'maple'
  | 'mahogany'
  | 'other_wood';

export type MetalType =
  | 'stainless_steel'
  | 'mild_steel'
  | 'aluminum'
  | 'cast_iron'
  | 'brass'
  | 'copper'
  | 'other_metal';

export type GlassType =
  | 'tempered'
  | 'laminated'
  | 'frosted'
  | 'tinted'
  | 'other_glass';

export type PlasticType =
  | 'polycarbonate'
  | 'acrylic'
  | 'pvc'
  | 'abs'
  | 'other_plastic';

export type FabricType =
  | 'linen'
  | 'cotton'
  | 'leather'
  | 'synthetic'
  | 'velvet'
  | 'other_fabric';

export type MaterialGrade =
  | 'premium'
  | 'standard'
  | 'economy';

export type MaterialFinish =
  | 'raw'
  | 'polished'
  | 'painted'
  | 'galvanized'
  | 'varnished'
  | 'laminated'
  | 'other_finish';

export type MaterialForm =
  | 'sheet'
  | 'rod'
  | 'tube'
  | 'block'
  | 'roll'
  | 'other_form';

export interface MaterialSpecs {
  thickness?: number;
  width?: number;
  length?: number;
  grade?: MaterialGrade;
  finish?: MaterialFinish;
  form?: MaterialForm;
  color?: string;
  minOrderQuantity?: number;
  leadTime?: string;
  inStock?: boolean;
}

export interface MaterialFilter {
  type: MaterialType;
  subType?: WoodType | MetalType | GlassType | PlasticType | FabricType;
  specs?: Partial<MaterialSpecs>;
}

export type DesignerSpecialty =
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'traditional'
  | 'modern'
  | 'custom';

export type ProducerType =
  | 'mass_production'
  | 'custom_made'
  | 'artisanal'
  | 'industrial';

export type RetailerType =
  | 'showroom'
  | 'online'
  | 'department_store'
  | 'specialty_store';

export interface FilterOption {
  id: string;
  label: string;
  count: number;
  type: 'role' | 'material' | 'specialty' | 'producerType' | 'retailerType' | 'materialSpec';
  subOptions?: FilterOption[];
  specs?: {
    thickness?: number[];
    width?: number[];
    length?: number[];
    grade?: MaterialGrade[];
    finish?: MaterialFinish[];
    form?: MaterialForm[];
    inStock?: boolean;
    minOrderQuantity?: number[];
    leadTime?: string[];
  };
}