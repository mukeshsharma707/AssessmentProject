export function exportToCsv(filename: string, rows: any[]) {
    if (!rows || !rows.length) return
    const header = Object.keys(rows[0]).join(',') + '\n'
    const body = rows.map((r) => Object.values(r).join(',')).join('\n')
    const csv = header + body
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
}