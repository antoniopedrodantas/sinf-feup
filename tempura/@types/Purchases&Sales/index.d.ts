type TopSupplier = {
  name: string,
  total_spent: number,
  numOrders: number,
  max_spent: number,
  id: string
}

type TopProduct = {
  name: string,
  total_sold: number,
  price: number,
  id: string
}

type SupplierCountry = {
  id: string,
  name: string,
  value: number,
}