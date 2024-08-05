import React from 'react';
import QRCode from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const QRCodeGenerator = ({ value ,name}) => {
  const { toast } = useToast()
  const downloadQRCode = () => {
    const canvas = document.querySelector('#qr-code'); // Changed to querySelector
    if (canvas) {
      const imageUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${name || 'qrcode'}QR.png`;
      link.click();
      toast({
        title: 'QR Code Downloaded! ✅',
        description: 'The QR code has been successfully downloaded. 🎉',
      })
    } else {
      console.error('Canvas not found');
      toast({
        title: 'Download Failed 😞',
        description: 'Unable to downloaded QR code. Please try again.',
      })
    }
  };

  return (
    <div className=' flex gap-2 flex-col'>
      <QRCode value={value} id="qr-code" size={256} /> {/* Set size to make it more scannable */}
      {/* <div className='w-[100%] whitespace-nowrap overflow-hidden'>{value}</div> */}
      <Button onClick={downloadQRCode}>Download QR Code</Button>
    </div>
  );
};

export default QRCodeGenerator;
