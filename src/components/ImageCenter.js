import React from 'react';

export default function ImageCenter ({children, scale}) {
  return (
    <div
      style={{
        textAlign: 'center',
        margin: 'auto',
        maxWidth: scale,
        maxHeight: scale,
    }}>
    {children}
    </div>
  );
}