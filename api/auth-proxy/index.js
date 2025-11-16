module.exports = async function (context, req) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    context.res = { status: 401, body: { error: "Missing Authorization header" } };
    return;
  }

  // Example: "Bearer <token>"
  const parts = authHeader.split(" ");
  const token = parts.length === 2 ? parts[1] : null;

  // In production: validate token with Azure AD B2C / Google / GitHub OIDC endpoints
  // Here we just echo back a stub for demonstration
  context.res = {
    status: 200,
    body: {
      tokenSnippet: token ? token.slice(0, 8) + "..." : null,
      message: "This is a placeholder — validate tokens in production"
    }
  };
};
