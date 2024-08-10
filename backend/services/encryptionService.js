const { KeyManagementServiceClient } = require('@google-cloud/kms');

const client = new KeyManagementServiceClient();
const projectId = 'tu-proyecto-id';
const locationId = 'global';
const keyRingId = 'tu-key-ring-id';
const keyId = 'tu-key-id';

async function encryptText(plainText) {
	const [result] = await client.encrypt({
		name: client.cryptoKeyPath(projectId, locationId, keyRingId, keyId),
		plaintext: Buffer.from(plainText),
	});

	return result.ciphertext.toString('base64');
}

async function decryptText(cipherText) {
	const [result] = await client.decrypt({
		name: client.cryptoKeyPath(projectId, locationId, keyRingId, keyId),
		ciphertext: Buffer.from(cipherText, 'base64'),
	});

	return result.plaintext.toString();
}

module.exports = { encryptText, decryptText };
