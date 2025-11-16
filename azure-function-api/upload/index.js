const { BlobServiceClient } = require("@azure/storage-blob");
const { Buffer } = require("buffer");
const crypto = require("crypto"); // important for Node 20 env

module.exports = async function (context, req) {
    context.log("Upload function triggered");

    let body = req.body;

    // Azure sometimes sends rawBody instead of body
    if (!body && req.rawBody) {
        try {
            body = JSON.parse(req.rawBody.toString());
        } catch (err) {
            context.log("Body parse error:", err);
        }
    }

    const fileName = body?.fileName;
    const fileContent = body?.fileContent;

    if (!fileName || !fileContent) {
        context.res = {
            status: 400,
            body: { message: "fileName and fileContent are required." }
        };
        return;
    }

    try {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        if (!connectionString) {
            throw new Error("AZURE_STORAGE_CONNECTION_STRING is missing.");
        }

        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient("uploads");

        // Make sure container exists
        await containerClient.createIfNotExists();

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
        context.log("Upload Error:", err);
        context.res = {
            status: 500,
            body: { error: "Upload failed", details: err.message }
        };
    }
};
