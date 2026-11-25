export interface FilterOption {
  id: string;
  label: string;
  count: number;
  subOptions?: FilterOption[]; // Add this for nested filters
}

export type UserRole = string; // Adjust this if you have specific roles
