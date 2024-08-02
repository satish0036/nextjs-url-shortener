import { Copy } from 'lucide-react';
import React, { useState } from 'react';

const CopyLink = ({ link }) => {
  const [iconColor, setIconColor] = useState('currentColor');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIconColor('green');
      setTimeout(() => {
        setIconColor('currentColor');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div onClick={handleCopy} style={{ cursor: 'pointer' }}>
      <Copy className='w-8 h-8' color={iconColor} />
    </div>
  );
};

export default CopyLink;
