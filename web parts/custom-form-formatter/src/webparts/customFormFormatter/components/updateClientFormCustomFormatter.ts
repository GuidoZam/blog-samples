export default async function updateClientFormCustomFormatter(
	siteUrl: string,
	listId: string,
	contentTypeId: string,
	customFormatterScript: string
) {
	try {
		// Step 1: Get the Form Digest Value (CSRF Token)
		const contextInfoResponse = await fetch(`${siteUrl}/_api/contextinfo`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		if (!contextInfoResponse.ok) {
			throw new Error("Failed to get form digest value.");
		}

		console.log("contextInfoResponse", contextInfoResponse);

		const contextInfo = await contextInfoResponse.json();
		console.log("contextInfo", contextInfo);
		const formDigestValue = contextInfo.FormDigestValue;
		console.log("formDigestValue", formDigestValue);

		// Step 2: Prepare the request body for updating the content type
		const requestBody = {
			ClientFormCustomFormatter: customFormatterScript,
		};

		// Step 3: Make the PATCH request to update the content type
		const patchResponse = await fetch(
			`${siteUrl}/_api/web/lists(guid'${listId}')/contenttypes('${contentTypeId}')`,
			{
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"X-RequestDigest": formDigestValue, // Include the form digest value
				},
				body: JSON.stringify(requestBody),
			}
		);

		console.log("patchResponse", patchResponse);

		if (!patchResponse.ok) {
			throw new Error("Failed to update the content type.");
		}

		const updatedContentType = await patchResponse.json();
		console.log("Content type updated successfully:", updatedContentType);
	} catch (error) {
		console.error("Error updating content type:", error);
	}
}
