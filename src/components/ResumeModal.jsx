import React from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const ResumeModal = ({ isOpen, onClose, resumeUrl }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl h-full bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1a1a1a]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <Icon icon="mdi:file-pdf-box" className="text-xl text-red-500" />
              </div>
              <h3 className="text-white font-medium uppercase tracking-widest text-sm">Resumé Manifest // Akshay Pratap Singh</h3>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={resumeUrl}
                download="Akshay_Pratap_Singh_Resume.pdf"
                className="flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-full text-[10px] font-bold uppercase transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                <Icon icon="mdi:download" className="text-sm" />
                Download
              </a>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors group"
              >
                <Icon icon="mdi:close" className="text-xl text-white/50 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-hidden relative bg-[#0a0a0a]">
            {/* Loading Indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
               <div className="flex flex-col items-center gap-4">
                 <Icon icon="mdi:loading" className="text-5xl animate-spin text-white" />
                 <span className="text-[10px] uppercase font-bold tracking-widest text-white">Initializing Stream...</span>
               </div>
            </div>
            
            <iframe
              src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-none relative z-10"
              title="Resume Viewer"
            />
          </div>

          {/* Footer Info */}
          <div className="px-6 py-3 border-t border-white/10 bg-[#111] flex justify-between items-center">
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Connection: Secure</span>
                </div>
                <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Protocol: HTTPS_RSA_4096</div>
             </div>
             <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">© 2024 AKSHAY PRATAP SINGH</div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeModal;
