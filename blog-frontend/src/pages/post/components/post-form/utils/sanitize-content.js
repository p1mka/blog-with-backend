export const sanitizeContent = (content) =>
	content
		.replaceAll("&nbsp;", " ")
		.replaceAll("&amp", " ")
		.replace(/ +/, " ")
		.replaceAll("<div><br></div>", "\n")
		.replaceAll("<div>", "\n")
		.replaceAll("</div>", " ");
