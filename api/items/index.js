module.exports = async function (context, req) {
  context.log("Items function triggered.");

  try {
    const method = req.method;

    // In-memory items array for demo
    const items = [
      { id: 1, name: "Keyboard" },
      { id: 2, name: "Mouse" }
    ];

    if (method === "GET") {
      context.res = {
        status: 200,
        body: items
      };
    }

    if (method === "POST") {
      const newItem = req.body;

      if (!newItem || !newItem.name) {
        context.res = {
          status: 400,
          body: { message: "Item requires a name." }
        };
        return;
      }

      newItem.id = items.length + 1;
      items.push(newItem);

      context.res = {
        status: 201,
        body: newItem
      };
    }
  } catch (err) {
    context.log("Error in items function:", err);

    context.res = {
      status: 500,
      body: {
        message: "Server error in items function.",
        error: err.message
      }
    };
  }
};
