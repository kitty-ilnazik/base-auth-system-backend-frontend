export const getInitials = (
	first_name?: string | null,
	last_name?: string | null
) => {
	return `${first_name?.[0] || ''}${last_name?.[0] || ''}`.toUpperCase()
}
