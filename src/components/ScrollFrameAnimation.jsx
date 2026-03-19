import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ScrollFrameAnimation = ({ totalFrames = 120 }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const frameRateRef = useRef(1); // Control frame update rate for mobile
  const loadedCountRef = useRef(0);

  // Get responsive image path based on screen size
  const getResponsiveImagePath = (index) => {
    if (typeof window === 'undefined') return '';
    
    const width = window.innerWidth;
    let sizeFolder = 'desktop'; // Default for desktop
    
    if (width < 768) {
      sizeFolder = 'mobile';
    } else if (width < 1024) {
      sizeFolder = 'tablet';
    }
    
    return `/assets/backgrounds/frames-responsive/${sizeFolder}/frame_${index.toString().padStart(3, '0')}.webp`;
  };

  // Preload all frames with optimized lazy loading strategy
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // For mobile, load frames in batches to prevent blocking
    const loadFramesBatch = (startIndex, endIndex) => {
      for (let i = startIndex; i < endIndex && i < totalFrames; i++) {
        const img = new Image();
        img.src = getResponsiveImagePath(i);
        img.decoding = 'async'; // Async decoding for better performance
        img.fetchPriority = 'low'; // Low priority for non-critical frames
        
        img.onload = () => {
          loadedCountRef.current++;
        };
        
        imagesRef.current[i] = img;
      }
    };
    
    // Load initial frames immediately (first 20 for quick start)
    loadFramesBatch(0, 20);
    
    // Load remaining frames after a short delay (lazy loading)
    setTimeout(() => {
      loadFramesBatch(20, 60);
      
      // Load rest after another delay
      setTimeout(() => {
        loadFramesBatch(60, totalFrames);
      }, 500);
    }, 300);
    
    // Reduce frame rate for mobile devices
    if (isMobile) {
      frameRateRef.current = 2; // Update every 2 scroll events on mobile
    }
  }, [totalFrames]);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let scrollEventCount = 0;
    
    // Set canvas size to match window - optimized for mobile and performance
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      
      // Optimize canvas resolution based on device
      if (isMobile) {
        // Mobile: Use lower resolution for better performance
        canvas.width = width * 0.75;
        canvas.height = height * 0.75;
      } else if (isTablet) {
        // Tablet: Medium resolution
        canvas.width = width * 0.9;
        canvas.height = height * 0.9;
      } else {
        // Desktop: Full resolution
        canvas.width = width;
        canvas.height = height;
      }
      
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw frame with cover fit
    const drawFrame = (frameIndex) => {
      if (!imagesRef.current[frameIndex]) return;
      
      const img = imagesRef.current[frameIndex];
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Optimized scroll handler for mobile and desktop
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          scrollEventCount++;
          
          // Skip frames on mobile for better performance
          if (frameRateRef.current > 1 && scrollEventCount % frameRateRef.current !== 0) {
            ticking = false;
            return;
          }
          
          const scrollTop = window.scrollY;
          const maxScroll = document.body.scrollHeight - window.innerHeight;
          const scrollProgress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
          
          const targetFrame = Math.floor(scrollProgress * (totalFrames - 1));
          
          if (targetFrame !== currentFrameRef.current) {
            currentFrameRef.current = targetFrame;
            drawFrame(targetFrame);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    // Initial draw
    drawFrame(0);

    // Use passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, { dependencies: [totalFrames] });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ opacity: 0.5 }}
      />
    </div>
  );
};

export default ScrollFrameAnimation;
