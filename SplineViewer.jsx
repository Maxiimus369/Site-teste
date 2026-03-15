import React, { useEffect, useRef } from 'react';

const SplineViewer = ({ url = "https://prod.spline.design/Z7eNuld6c0K9FggR/scene.splinecode?v=2" }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    // Injeta o script do web component manualmente caso não esteja presente
    const SCRIPT_URL = 'https://unpkg.com/@splinetool/viewer/build/spline-viewer.js';
    if (!document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = SCRIPT_URL;
      document.head.appendChild(script);
    }

    const viewer = viewerRef.current;
    if (!viewer) return;

    let direction = 1; // 1 = forward, -1 = reverse
    let interval;

    const onLoad = (e) => {
      const app = e.detail;
      console.log('Spline Scene Loaded', app);

      // Função para alternar a animação (efeito bumerangue / yoyo)
      // Como não sabemos o nome exato da animação ou objeto, tentamos um loop baseado no tempo
      // ou emitindo eventos. Se for uma animação de "Início", podemos tentar emitir periodicamente.
      
      // Ajuste: Vamos assumir que a animação dura cerca de 4-5 segundos
      // Em uma implementação real, poderíamos verificar app.animations se disponível
      
      const toggleAnimation = () => {
        if (direction === 1) {
          app.emitEvent('start'); // Ou o evento que ativa as luzes
        } else {
          app.emitEventReverse('start'); // Inverte o evento
        }
        direction *= -1;
      };

      // Inicia o loop
      // Nota: Se a cena já tiver um loop interno, isso pode conflitar.
      // Mas para o efeito "traz para frente", o emitEventReverse é a chave.
      interval = setInterval(toggleAnimation, 5000); // Ajuste o tempo conforme necessário
    };

    viewer.addEventListener('load', onLoad);

    return () => {
      viewer.removeEventListener('load', onLoad);
      if (interval) clearInterval(interval);
    };
  }, [url]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Custom Element do Spline */}
      <spline-viewer ref={viewerRef} url={url} events-target="global"></spline-viewer>

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
