const fetch = require('node-fetch');

async function getSharePointData(siteUrl, listName, accessToken) {
  const response = await fetch(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json;odata=verbose'
    }
  });

  const data = await response.json();
  return data.d.results;
}

module.exports = { getSharePointData };
