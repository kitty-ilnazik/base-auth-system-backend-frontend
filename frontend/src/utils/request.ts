import axios, { AxiosError } from 'axios'

import { LINKS } from '@/config/links'

const BASE_API_URL = LINKS.api.base

export const request = async (
	endpoint: string,
	method: string = 'GET',
	data?: any,
	version: string = 'v1'
) => {
	try {
		const response = await axios({
			url: `${BASE_API_URL}/${version}/${endpoint}`,
			method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			data: data ? JSON.stringify(data) : undefined,
		})

		return response
	} catch (error) {
		throw error as AxiosError
	}
}
