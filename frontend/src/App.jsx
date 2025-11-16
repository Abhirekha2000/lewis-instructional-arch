import { useState } from "react";
import "./App.css";

function App() {
  const [helloMsg, setHelloMsg] = useState("");
  const [items, setItems] = useState([]);
  const [uploadResponse, setUploadResponse] = useState("");

  const callHello = async () => {
    try {
      const res = await fetch("http://localhost:7071/api/hello");
      const data = await res.json();
      setHelloMsg(JSON.stringify(data, null, 2));
    } catch {
      setHelloMsg("Error calling API");
    }
  };

  const loadItems = async () => {
    try {
      const res = await fetch("http://localhost:7071/api/items");
      const data = await res.json();
      setItems(data);
    } catch {
      setItems([{ error: "Failed to load items" }]);
    }
  };

  // Upload using base64 JSON -----------------------------------------
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const toBase64 = (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(file);
      });

    const base64 = await toBase64(file);

    const payload = {
      fileName: file.name,
      fileContent: base64,
    };

    try {
      const res = await fetch("http://localhost:7071/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setUploadResponse(JSON.stringify(data, null, 2));
    } catch {
      setUploadResponse("Upload failed");
    }
  };

  return (
    <div className="page">
      <h1 className="title">Lewis Architecture Demo</h1>

      <div className="card">
        <h2>Call Hello API</h2>
        <button className="btn" onClick={callHello}>Call Hello API</button>
        <pre className="output-box">{helloMsg}</pre>
      </div>

      <div className="card">
        <h2>Load Items</h2>
        <button className="btn" onClick={loadItems}>Load Items</button>
        <pre className="output-box">{JSON.stringify(items, null, 2)}</pre>
      </div>

      <div className="card">
        <h2>Upload a File</h2>
        <input type="file" onChange={handleUpload} className="file-input" />
        <pre className="output-box">{uploadResponse}</pre>
      </div>
    </div>
  );
}

export default App;
