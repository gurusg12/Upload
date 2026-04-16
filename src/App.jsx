import React, { useState } from 'react';

const SmsSyncPanel = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSyncSend = () => {
    if (!phoneNumber || !message) {
      alert("Please enter both number and message");
      return;
    }

    // This is the URL Scheme we defined in the Android Manifest
    // Format: miter-sms://send?number=XXXX&body=XXXX
    const scheme = "miter-sms://send";
    const params = `?number=${encodeURIComponent(phoneNumber)}&body=${encodeURIComponent(message)}`;
    const deepLink = scheme + params;

    console.log("Triggering Sync to App:", deepLink);

    // This line "jumps" the browser to the app
    // Because the app handles the SMS in the background, 
    // it will process the send immediately.
    window.location.href = deepLink;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Agent SMS Gateway</h2>
      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Receiver Number (e.g. +91...)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button style={styles.button} onClick={handleSyncSend}>
          Sync & Send Automatically
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  card: { background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' },
  header: { color: '#333' },
  input: { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '10px', height: '100px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};

export default SmsSyncPanel;
