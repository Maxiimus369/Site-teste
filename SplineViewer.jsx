import React, { useEffect } from 'react';

const SplineViewer = ({ url = "https://prod.spline.design/Z7eNuld6c0K9FggR/scene.splinecode?v=2" }) => {

  useEffect(() => {
    // Injeta o script do web component manualmente caso não esteja presente
    const SCRIPT_URL = 'https://unpkg.com/@splinetool/viewer/build/spline-viewer.js';
    if (!document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = SCRIPT_URL;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Custom Element do Spline */}
      <spline-viewer url={url} events-target="global"></spline-viewer>

      {/* Overlay visual que cobre a marca d'água "Built with Spline" */}
      {/* A marca aparece no canto inferior direito - cobrimos com a cor de fundo do site */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '200px',
        height: '50px',
        background: '#020b18',
        zIndex: 9999,
        pointerEvents: 'none'
      }} />
    </div>
  );
};

export default SplineViewer;
