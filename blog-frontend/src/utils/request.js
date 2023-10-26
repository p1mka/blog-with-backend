export const request = async (url, method, data) => {
	const res = await fetch(url, {
		headers: { "Content-Type": "application/json" },
		method: method || "GET",
		body: data ? JSON.stringify(data) : undefined,
	});
	return await res.json();
};
