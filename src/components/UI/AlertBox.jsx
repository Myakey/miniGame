// src/components/AlertBox.jsx
import { useEffect, useState } from 'react';
import { EventBus } from '../../inGame/EventBus';

export default function AlertBox() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const showAlert = (msg) => {
      setMessage(msg);
      setVisible(true);

      // Auto-hide after 3 seconds
      setTimeout(() => setVisible(false), 3000);
    };

    EventBus.on('show-alert', showAlert);
    return () => EventBus.off('show-alert', showAlert);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#f87171',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
    }}>
      {message}
    </div>
  );
}
