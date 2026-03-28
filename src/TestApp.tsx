import React from 'react';

function TestApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test App - Healthcare SaaS</h1>
      <p>If you can see this, the basic React setup is working!</p>
      <div style={{ 
        background: '#f0f0f0', 
        padding: '10px', 
        borderRadius: '5px',
        marginTop: '10px'
      }}>
        <strong>Status:</strong> Application is rendering correctly
      </div>
    </div>
  );
}

export default TestApp;
