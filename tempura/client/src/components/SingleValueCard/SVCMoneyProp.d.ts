export type SVCNumberProp = {
  type: 'money' | 'percentage' | 'unit' | 'date';
  title: String;
  value: Number;
};

export type SVCTextProp = {
  type: 'text';
  title: String;
  value: String;
};
