const { BlobServiceClient } = require("@azure/storage-blob");
const { Buffer } = require("buffer");

module.exports = async function (context, req) {
    context.log("Upload function triggered");

    let body = req.body;

    // Azure sometimes provides rawBody instead of body
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
            body: { message: "fileName and fileContent are required." },
        };
        return;
    }

    try {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

        const blobServiceClient =
            BlobServiceClient.fromConnectionString(connectionString);

        const containerClient = blobServiceClient.getContainerClient("uploads");

        const buffer = Buffer.from(fileContent, "base64");

        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        await blockBlobClient.uploadData(buffer);

        context.res = {
            status: 200,
            body: {
                success: true,
                message: "File uploaded successfully!",
                url: blockBlobClient.url,
            },
        };
    } catch (err) {
        context.log("Upload Error:", err.message);
        context.res = {
            status: 500,
            body: { error: "Upload failed", details: err.message },
        };
    }
};
