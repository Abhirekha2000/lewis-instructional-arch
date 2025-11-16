module.exports = async function (context, req) {
  context.log('Hello function processed a request.');
  context.res = {
    status: 200,
    body: {
      ok: true,
      message: "Hello from Lewis Instructional API",
      timestamp: new Date().toISOString()
    }
  };
};
