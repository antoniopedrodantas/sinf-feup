export type SVCNumberProp = {
  type: 'money' | 'percentage' | 'unit' | 'date';
  title: string;
  value: number;
  supplierID?: string;
};

export type SVCTextProp = {
  type: 'text';
  title: string;
  value: string;
  supplierID?: string;
};
