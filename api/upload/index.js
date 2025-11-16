const { BlobServiceClient } = require("@azure/storage-blob");
const crypto = require("crypto");
const { Buffer } = require("buffer");

module.exports = async function (context, req) {
    context.log("Upload function triggered");

    const fileName = req.body?.fileName;
    const fileContent = req.body?.fileContent; // base64 string

    if (!fileName || !fileContent) {
        context.res = {
            status: 400,
            body: { message: "fileName and fileContent are required." },
        };
        return;
    }

    try {
        const AZURE_STORAGE_CONNECTION_STRING =
            process.env.AZURE_STORAGE_CONNECTION_STRING;

        const blobServiceClient = BlobServiceClient.fromConnectionString(
            AZURE_STORAGE_CONNECTION_STRING
        );

        const containerClient = blobServiceClient.getContainerClient("uploads");

        // Convert base64 → Buffer
        const buffer = Buffer.from(fileContent, "base64");

        // Upload blob
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadData(buffer);

        context.res = {
            status: 200,
            body: {
                success: true,
                message: "File uploaded successfully!",
                fileUrl: blockBlobClient.url,
            },
        };
    } catch (err) {
        context.log("Error:", err);
        context.res = {
            status: 500,
            body: { error: "Upload failed", details: err.message },
        };
    }
};
