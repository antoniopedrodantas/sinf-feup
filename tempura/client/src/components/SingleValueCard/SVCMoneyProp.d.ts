export type SVCNumberProp = {
  type: 'money' | 'percentage' | 'unit' | 'date';
  title: String;
  value: Number;
  supplierID?: String;
};

export type SVCTextProp = {
  type: 'text';
  title: String;
  value: String;
  supplierID?: String;
};
