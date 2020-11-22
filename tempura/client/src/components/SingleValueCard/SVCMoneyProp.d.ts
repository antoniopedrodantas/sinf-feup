export type SVCNumberProp = {
  type: 'money' | 'percentage' | 'unit';
  title: String;
  value: Number;
};
export type SVCDateProp = {
  type: 'date';
  title: String;
  value: Date;
};

export type SVCTextProp = {
  type: 'text';
  title: String;
  value: String;
};
