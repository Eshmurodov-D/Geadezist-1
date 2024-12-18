import axios from 'axios'
import { BASE_URL } from './api'

const token =
	'Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJub3JtdXJvZG92YW1pcmJlazNAZ21haWwuY29tIiwiaWF0IjoxNzM0NDU3OTg0LCJleHAiOjE3MzQ1NDQzODR9.E5zrJaxBiXMTdhKmK085CFrgZMWon7tsZWV9Q1hnMnETdn7mn3EagrWaYP62BPp7PZgJF_Gq96k_ewkSJJOxGA'

const axiosConfiguration = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: token,
	},
})

export default axiosConfiguration
