import React, { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);

  const triggerAction = (actionType) => {
    setLoading(true);

    try {
      let payload = {};

      if (actionType === 'print') {
        payload = {
          company: "Photon",
          place: "Sindagi",
          mobile: "9632367397",
          orderId: "ORD-" + Date.now(),
          amount: "450.00",
          action: "print"
        };
      } else if (actionType === 'sms') {
        const number = prompt("Enter Mobile Number (with country code if needed):");
        const message = prompt("Enter Message to Send:");

        if (!number || !message) {
          setLoading(false);
          return;
        }

        payload = {
          number: number,
          message: message,
          action: "sms"
        };
      }

      const encodedData = encodeURIComponent(JSON.stringify(payload));
      const url = `miterprint://${encodedData}`;

      console.log("Opening Deep Link:", url);
      window.location.href = url;

    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#111827', color: '#fff', minHeight: '100vh' }}>
      <h1>Miter Web Terminal</h1>
      <p style={{ marginBottom: 40 }}>Click buttons to Print or Send SMS via the Android Bridge App</p>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => triggerAction('print')}
          disabled={loading}
          style={{
            padding: '20px 40px',
            fontSize: '18px',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Processing...' : '🖨️ Print Latest Order'}
        </button>

        <button
          onClick={() => triggerAction('sms')}
          disabled={loading}
          style={{
            padding: '20px 40px',
            fontSize: '18px',
            backgroundColor: '#eab308',
            color: 'black',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          📱 Send SMS in Background
        </button>
      </div>

      <p style={{ marginTop: 50, fontSize: '14px', opacity: 0.7 }}>
        Note: Android app must be installed and printer connected for printing.<br />
        SMS permission must be granted once in the app.
      </p>
    </div>
  );
}

export default App;
