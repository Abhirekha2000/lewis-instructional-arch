const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    context.log("Upload function triggered");

    try {
        const { fileName, fileContent } = req.body || {};

        if (!fileName || !fileContent) {
            context.res = {
                status: 400,
                body: { message: "fileName and fileContent are required." }
            };
            return;
        }

        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

        const blobServiceClient = BlobServiceClient.fromConnectionString(
            connectionString
        );

        const containerClient = blobServiceClient.getContainerClient("uploads");

        const buffer = Buffer.from(fileContent, "base64");

        const blobClient = containerClient.getBlockBlobClient(fileName);
        await blobClient.uploadData(buffer);

        context.res = {
            status: 200,
            body: {
                success: true,
                message: "File uploaded successfully!",
                fileUrl: blobClient.url
            }
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: { error: err.message }
        };
    }
};
