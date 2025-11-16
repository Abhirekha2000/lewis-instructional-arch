import { useState } from "react";

function App() {
  const [helloMsg, setHelloMsg] = useState("");
  const [items, setItems] = useState([]);
  const [uploadResponse, setUploadResponse] = useState("");

  // -----------------------------
  // CALL HELLO API
  // -----------------------------
  const callHello = async () => {
    try {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setHelloMsg(JSON.stringify(data, null, 2));
    } catch (err) {
      setHelloMsg("Error calling API");
    }
  };

  // -----------------------------
  // LOAD ITEMS
  // -----------------------------
  const loadItems = async () => {
    try {
      const res = await fetch("/api/items");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setItems([{ error: "Failed to load items" }]);
    }
  };

  // -----------------------------
  // FILE UPLOAD (Base64 JSON)
  // -----------------------------
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert file → Base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const base64 = await toBase64(file);

    const payload = {
      fileName: file.name,
      fileContent: base64,
    };

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setUploadResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setUploadResponse("Upload failed");
    }
  };

  // ------------------------------------------------------
  // UI DESIGN
  // ------------------------------------------------------
  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial" }}>
      <h1>Lewis Architecture Demo</h1>

      {/* Hello API */}
      <div style={cardStyle}>
        <h2>Call Hello API</h2>
        <button style={btnStyle} onClick={callHello}>Call Hello API</button>
        <pre style={outputStyle}>{helloMsg}</pre>
      </div>

      {/* Load Items */}
      <div style={cardStyle}>
        <h2>Load Items</h2>
        <button style={btnStyle} onClick={loadItems}>Load Items</button>
        <pre style={outputStyle}>{JSON.stringify(items, null, 2)}</pre>
      </div>

      {/* Upload File */}
      <div style={cardStyle}>
        <h2>Upload a File</h2>
        <input type="file" onChange={uploadFile} />
        <pre style={outputStyle}>{uploadResponse}</pre>
      </div>
    </div>
  );
}

// -----------------------------
// STYLE OBJECTS
// -----------------------------
const cardStyle = {
  background: "white",
  padding: "30px",
  margin: "30px auto",
  borderRadius: "12px",
  width: "70%",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

const btnStyle = {
  background: "#4a4eff",
  color: "white",
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "15px"
};

const outputStyle = {
  background: "#f5f7ff",
  padding: "20px",
  borderRadius: "8px",
  marginTop: "20px",
  textAlign: "left",
  whiteSpace: "pre-wrap",
  overflowX: "auto"
};

export default App;
