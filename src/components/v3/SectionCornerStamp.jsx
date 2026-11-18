import React from 'react';

/**
 * SectionCornerStamp - Esquina SVG pequeña igual a la del logo (path M10 54V10h44)
 * Se dibuja con stroke-dasharray/dashoffset al entrar en pantalla (0.6s).
 */
export default function SectionCornerStamp({ color = '#673DE6', size = 15, style = {} }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      aria-hidden="true"
      className="pc-section-stamp"
      style={{
        display: 'inline-block',
        verticalAlign: '-2px',
        marginRight: '8px',
        flexShrink: 0,
        ...style
      }}
    >
      <path 
        d="M10 54V10h44" 
        stroke={color} 
        strokeWidth="7" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="pc-stamp-path"
      />
    </svg>
  );
}
