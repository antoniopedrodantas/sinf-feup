

function formatDateString(date: string): string {
	return (new Date(date)).toISOString().slice(0, -1).replace('T', ' ')
}

function formatDate(date: Date): string {
	return date.toISOString().slice(0, -1).replace('T', ' ')
}


export { formatDateString, formatDate}