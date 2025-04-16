const base64String = 'data:font/ttf;base64,';

export async function fetchFontAsBase64(fontUrl: string): Promise<string> {
  try {

		const fontString = await loadTTFAsString(fontUrl);
    const fontBase64 = btoa(fontString);
    return `${base64String}${fontBase64}`;

	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function loadTTFAsString(url: string): Promise<string> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch TTF file: ${response.statusText}`);
	}

	const array = (await response.body?.getReader().read())?.value;
  
	if (!array) {
		throw new Error("Failed to read TTF file");
	}

  let binaryString = "";
	for (let i = 0; i < array.length; i++) {
		binaryString += String.fromCharCode(array[i]);
	}

	return binaryString;
}
