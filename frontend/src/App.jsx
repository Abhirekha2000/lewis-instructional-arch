import { useState } from "react";

function App() {
  const [helloMsg, setHelloMsg] = useState("");
  const [items, setItems] = useState([]);
  const [uploadResponse, setUploadResponse] = useState("");

  // Your Azure Function Proxy URL
  const PROXY = "https://lewis-api-abhirekha.azurewebsites.net/api/auth-proxy";

  // -----------------------------
  // HELLO API THROUGH PROXY
  // -----------------------------
  const callHello = async () => {
    const target = encodeURIComponent(
      "https://lewis-api-abhirekha.azurewebsites.net/api/hello"
    );

    const res = await fetch(`${PROXY}?url=${target}`);
    const data = await res.json();
    setHelloMsg(JSON.stringify(data, null, 2));
  };

  // -----------------------------
  // LOAD ITEMS THROUGH PROXY
  // -----------------------------
  const loadItems = async () => {
    const target = encodeURIComponent(
      "https://lewis-api-abhirekha.azurewebsites.net/api/items"
    );

    const res = await fetch(`${PROXY}?url=${target}`);
    const data = await res.json();
    setItems(data);
  };

  // -----------------------------
  // UPLOAD FILE THROUGH PROXY
  // -----------------------------
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const payload = {
      fileName: file.name,
      fileContent: base64
    };

    const target = encodeURIComponent(
      "https://lewis-api-abhirekha.azurewebsites.net/api/upload"
    );

    const res = await fetch(`${PROXY}?url=${target}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setUploadResponse(JSON.stringify(data, null, 2));
  };

  // ------------------------------------------------------
  // UI
  // ------------------------------------------------------
  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial" }}>
      <h1>Lewis Architecture Demo</h1>

      {/* Hello API */}
      <div style={cardStyle}>
        <h2>Call Hello API</h2>
        <button style={btnStyle} onClick={callHello}>
          Call Hello API
        </button>
        <pre style={outputStyle}>{helloMsg}</pre>
      </div>

      {/* Load Items */}
      <div style={cardStyle}>
        <h2>Load Items</h2>
        <button style={btnStyle} onClick={loadItems}>
          Load Items
        </button>
        <pre style={outputStyle}>{JSON.stringify(items, null, 2)}</pre>
      </div>

      {/* Upload */}
      <div style={cardStyle}>
        <h2>Upload a File</h2>
        <input type="file" onChange={uploadFile} />
        <pre style={outputStyle}>{uploadResponse}</pre>
      </div>
    </div>
  );
}

// Styles
const cardStyle = {
  background: "white",
  padding: "30px",
  margin: "30px auto",
  borderRadius: "12px",
  width: "70%",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
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
