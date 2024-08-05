import { useToast } from '@/components/ui/use-toast';
import { Copy, CopyCheck } from 'lucide-react';
import React, { useState } from 'react';

const CopyLink = ({ link }) => {
  const [iconColor, setIconColor] = useState('currentColor');
  const { toast } = useToast()
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIconColor('green');
      setTimeout(() => {
        setIconColor('currentColor');
      }, 2000);
      toast({
        title: 'URL Copied!',
        description: 'The URL has been copied to your clipboard. ✅',
      })
    } catch (err) {
      toast({
        title: 'URL Copy Failed 😞',
        description: 'Unable to Copy URL. Please try again.',
      })
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div onClick={handleCopy} style={{ cursor: 'pointer' }}>
      <CopyCheck className='w-6 h-6' color={iconColor} />
    </div>
  );
};

export default CopyLink;
