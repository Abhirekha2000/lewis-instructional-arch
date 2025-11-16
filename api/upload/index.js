import crypto from "crypto";
const crypto = require("crypto");
const { Buffer } = require("buffer");
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    context.log("Upload function triggered");

    const fileName = req.body?.fileName;
    const fileContent = req.body?.fileContent;

    if (!fileName || !fileContent) {
        context.res = {
            status: 400,
            body: { message: "fileName and fileContent are required." }
        };
        return;
    }

    try {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

        const blobServiceClient = BlobServiceClient.fromConnectionString(
            connectionString
        );

        const containerClient = blobServiceClient.getContainerClient("uploads");

        const buffer = Buffer.from(fileContent, "base64");

        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadData(buffer);

        context.res = {
            status: 200,
            body: {
                success: true,
                message: "File uploaded successfully!",
                fileUrl: blockBlobClient.url
            }
        };

    } catch (err) {
        context.log("Upload Error:", err.message);
        context.res = {
            status: 500,
            body: { error: "Upload failed", details: err.message }
        };
    }
};
