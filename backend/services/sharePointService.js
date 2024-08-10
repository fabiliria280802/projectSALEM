const fetch = require('node-fetch');

async function getSharePointData(siteUrl, listName, accessToken) {
	const response = await fetch(
		`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json;odata=verbose',
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching data from SharePoint: ${response.statusText}`,
		);
	}

	const data = await response.json();
	return data.d.results;
}

async function addSharePointData(siteUrl, listName, item, accessToken) {
	const response = await fetch(
		`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json;odata=verbose',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(item),
		},
	);

	if (!response.ok) {
		throw new Error(`Error adding data to SharePoint: ${response.statusText}`);
	}

	const data = await response.json();
	return data.d;
}

async function updateSharePointData(
	siteUrl,
	listName,
	itemId,
	item,
	accessToken,
) {
	const response = await fetch(
		`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`,
		{
			method: 'MERGE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json;odata=verbose',
				'Content-Type': 'application/json',
				'IF-MATCH': '*',
			},
			body: JSON.stringify(item),
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error updating data in SharePoint: ${response.statusText}`,
		);
	}

	return response.status === 204; // No content status indicates success
}

async function deleteSharePointData(siteUrl, listName, itemId, accessToken) {
	const response = await fetch(
		`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json;odata=verbose',
				'IF-MATCH': '*',
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error deleting data from SharePoint: ${response.statusText}`,
		);
	}

	return response.status === 204; // No content status indicates success
}

module.exports = {
	getSharePointData,
	addSharePointData,
	updateSharePointData,
	deleteSharePointData,
};
