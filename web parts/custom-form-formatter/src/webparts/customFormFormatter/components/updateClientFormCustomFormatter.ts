import * as strings from "CustomFormFormatterWebPartStrings";

export default async function updateClientFormCustomFormatter(
	siteUrl: string,
	listId: string,
	contentTypeId: string,
	customFormatterScript: string
) {
	try {
		// Step 1: Get the Form Digest Value
		const formDigestValue = await _retrieveFormDigest(siteUrl);

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
					"X-RequestDigest": formDigestValue,
				},
				body: JSON.stringify(requestBody),
			}
		);

		if (!patchResponse.ok) {
			alert(strings.FailedToUpdateContentType);
			throw new Error(strings.FailedToUpdateContentType);
		}

		alert(strings.SuccessMessage);
	} catch (error) {
		alert(strings.GenericError);
		console.error(strings.GenericError, error);
	}
}

async function _retrieveFormDigest(siteUrl: string) {
	const contextInfoResponse = await fetch(`${siteUrl}/_api/contextinfo`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	if (!contextInfoResponse.ok) {
		throw new Error(strings.FailedToRetrieveFormDigest);
	}

	const contextInfo = await contextInfoResponse.json();
	const formDigestValue = contextInfo.FormDigestValue;

	return formDigestValue;
}
