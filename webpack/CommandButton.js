import React, { useState } from 'react';
import { useKBar } from 'kbar';

const CommandButton = () => {
  const { query } = useKBar();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => query.toggle()}
      style={{
        marginLeft: 8,
        padding: '8px',
        background: isHovered ? '#ccc' : '#ddd',
        color: '#444',
        fontSize: 20,
        border: 'none',
        borderRadius: '8px',
        outline: 'none',
        cursor: 'pointer',
        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      ⌘k
    </button>
  )
}

export default CommandButton