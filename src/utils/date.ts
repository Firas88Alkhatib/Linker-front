/**
 * Expected output format example: "10 Jan 2023"
 */
export const getDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
}
