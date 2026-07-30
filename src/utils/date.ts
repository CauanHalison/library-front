export function formatDate(dateArr: number[] | unknown): string {
  if (!Array.isArray(dateArr)) {
    if (typeof dateArr === 'string' || typeof dateArr === 'number') {
      try {
        const d = new Date(dateArr)
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('pt-BR')
        }
      } catch {}
      return String(dateArr)
    }
    return '-'
  }

  if (dateArr.length < 3) {
    return dateArr.join('/')
  }

  const [year, month, day] = dateArr
  const d = String(day).padStart(2, '0')
  const m = String(month).padStart(2, '0')
  const y = String(year)
  return `${d}/${m}/${y}`
}

export function formatPrice(price: number | unknown): string {
  if (typeof price !== 'number') return '-'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

export function formatDates(data: any) {
  if (Array.isArray(data)) {
    const [year, month, day] = data
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }
  return data
}
