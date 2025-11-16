const axios = require("axios");

module.exports = async function (context, req) {
  context.log("Auth Proxy Triggered");

  try {
    const targetUrl = req.query.url;

    if (!targetUrl) {
      context.res = {
        status: 400,
        body: { error: true, message: "Missing 'url' parameter" }
      };
      return;
    }

    // Validate full URL
    let parsed;
    try {
      parsed = new URL(targetUrl);
    } catch (err) {
      context.log("Invalid URL received:", targetUrl);
      context.res = {
        status: 400,
        body: { error: true, message: "Invalid URL" }
      };
      return;
    }

    // Build axios forward config
    const axiosConfig = {
      method: req.method,
      url: parsed.toString(),
      headers: { ...req.headers },
      data: req.body || undefined,
      validateStatus: () => true
    };

    // ❗ Azure does not allow forwarding these headers
    delete axiosConfig.headers.host;
    delete axiosConfig.headers["x-forwarded-host"];
    delete axiosConfig.headers["x-ms-original-host"];

    const response = await axios(axiosConfig);

    context.res = {
      status: response.status,
      headers: { "Content-Type": "application/json" },
      body: response.data
    };
  } catch (err) {
    context.log("Proxy error:", err.message);
    context.res = {
      status: 500,
      body: { error: true, message: "Proxy failed", details: err.message }
    };
  }
};
