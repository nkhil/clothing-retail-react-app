export function formatPrice(pence) {
  return (pence / 100).toLocaleString("en-UK", {
    style: "currency",
    currency: "GBP",
  })
}
