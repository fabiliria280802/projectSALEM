const axios = require('axios');

exports.getSharePointFiles = async (siteUrl, listName, accessToken) => {
  try {
    const response = await axios.get(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json;odata=verbose'
      }
    });

    const files = response.data.d.results;
    return files.map(file => ({
      fileName: file.File.Name,
      fileUrl: file.File.ServerRelativeUrl,
    }));
  } catch (error) {
    throw new Error('Error al obtener archivos de SharePoint: ' + error.message);
  }
};

