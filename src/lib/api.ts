export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function detectPest(formData: FormData) {
	const res = await fetch(`${API_BASE_URL}/detect`, {
		method: 'POST',
		body: formData,
	});
	if (!res.ok) throw new Error('Detection failed');
	return res.json();
}

export async function fetchWeather(payload: { latitude: number; longitude: number }) {
	const res = await fetch(`${API_BASE_URL}/weather`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error('Weather fetch failed');
	return res.json();
}

export async function fetchSatellite(payload: { latitude: number; longitude: number }) {
	const res = await fetch(`${API_BASE_URL}/satellite`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error('Satellite fetch failed');
	return res.json();
}

export async function sendAlert(payload: { to_phone: string; message: string }) {
	const res = await fetch(`${API_BASE_URL}/alert`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error('Alert failed');
	return res.json();
}

export async function submitFeedback(payload: {
	image_id?: string;
	predicted_label?: string;
	correct_label?: string;
	comments?: string;
}) {
	const res = await fetch(`${API_BASE_URL}/feedback`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error('Feedback failed');
	return res.json();
}