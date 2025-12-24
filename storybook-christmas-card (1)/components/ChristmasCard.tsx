
import React, { useState } from 'react';
import { CardData } from '../types';
import { ChevronRight, ChevronLeft, Volume2, VolumeX, Gift, Heart, Share2, Sparkles } from 'lucide-react';

interface Props {
  data: CardData;
}

const Snowfall: React.FC = () => (
  <div className="snowflakes" aria-hidden="true">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="snowflake">❅</div>
    ))}
  </div>
);

export const ChristmasCard: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Default values if not uploaded
  // Replaced default cover with the one provided in the context if possible, 
  // but using a high-quality placeholder for now that feels like the drawing.
  const coverImg = data.cover || "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=1000";
  const innerImg = data.innerPage.image || "https://images.unsplash.com/photo-1544273677-242ef927164b?auto=format&fit=crop&q=80&w=1000";

  return (
    <div className="relative group perspective-1000 w-[320px] h-[450px] md:w-[420px] md:h-[580px]">
      {/* Container for the 3D effect */}
      <div 
        className={`relative w-full h-full transition-all duration-1000 transform-style-3d origin-left ${isOpen ? 'rotate-y-[-165deg]' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT PAGE */}
        <div 
          className="absolute inset-0 backface-hidden z-20 shadow-2xl rounded-r-2xl overflow-hidden cursor-pointer bg-[#f9bca4]"
          onClick={toggleOpen}
        >
          {/* Cover Image */}
          <img 
            src={coverImg} 
            alt="Christmas Card Cover" 
            className="w-full h-full object-contain mix-blend-multiply opacity-90"
          />
          
          {/* Decorative Overlay mimic the hand-drawn border */}
          <div className="absolute inset-6 border-4 border-[#d27c37]/20 border-double rounded-lg pointer-events-none"></div>

          {/* The Floating Plate Guide - Mimicking the circular plate in the reference image */}
          {!isOpen && (
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
              <div className="relative animate-bounce-slow">
                 {/* This matches the circular plate design from the upload */}
                 <div className="w-52 h-52 md:w-64 md:h-64 bg-white rounded-full border-[10px] border-[#c21e1e] flex items-center justify-center p-2 shadow-2xl transform hover:scale-110 transition-transform hover:shake active:scale-95">
                    {/* Inner Patterned Border */}
                    <div className="w-full h-full border-[6px] border-[#2f5d40] rounded-full border-dotted p-4 flex flex-col items-center justify-center text-center">
                      <div className="font-serif text-[#c21e1e] text-2xl md:text-3xl font-bold italic leading-tight">
                        Merry<br/>Christmas
                      </div>
                      <div className="h-0.5 w-12 bg-[#2f5d40] my-2" />
                      <div className="font-cursive text-2xl text-[#4a3728]">To You</div>
                      <ChevronRight className="text-[#2f5d40] animate-pulse mt-2" size={28} />
                    </div>
                 </div>
              </div>
              <div className="mt-6 px-6 py-2 bg-[#2f5d40] text-white rounded-full text-sm font-bold uppercase tracking-widest shadow-lg border-2 border-white animate-pulse">
                Click to Open
              </div>
            </div>
          )}
        </div>

        {/* BACK OF THE FRONT PAGE (The left page when opened) */}
        <div 
          className="absolute inset-0 bg-[#fdf5f0] shadow-inner rounded-l-2xl flex flex-col items-center justify-center p-8 text-center border-r border-[#2f5d40]/10"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
           {/* Left page content with hand-drawn style */}
           <div className="w-full h-full border-4 border-[#2f5d40]/20 rounded-2xl p-6 flex flex-col items-center justify-between bg-white/50 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 text-9xl text-[#f9bca4]/20 font-serif">❅</div>
              
              <div className="space-y-4 relative z-10">
                <div className="text-5xl">🎁</div>
                <h2 className="text-3xl font-serif text-[#c21e1e] italic">A Magical Moment</h2>
                <div className="flex justify-center gap-1">
                   {[...Array(5)].map((_, i) => <span key={i} className="text-[#d27c37]">★</span>)}
                </div>
              </div>

              <p className="font-cursive text-2xl text-[#4a3728] leading-relaxed relative z-10 italic px-4">
                "Christmas is not just a season, it's a feeling of warmth, togetherness, and love."
              </p>

              <div className="flex flex-col gap-4 w-full relative z-10">
                 <button className="flex items-center justify-center gap-2 w-full py-3 bg-[#2f5d40] text-white rounded-xl shadow hover:bg-[#234530] transition-colors font-bold uppercase text-sm">
                    <Heart size={18} /> Love this Card
                 </button>
                 <button 
                  onClick={toggleOpen}
                  className="text-sm font-bold text-[#c21e1e] hover:underline flex items-center justify-center gap-1"
                >
                  <ChevronLeft size={16} /> Close Story
                </button>
              </div>
           </div>
        </div>
      </div>

      {/* THE INNER PAGE (Visible when the cover is flipped) */}
      <div className="absolute inset-0 z-0 bg-[#fdf5f0] rounded-r-2xl shadow-lg border-l-2 border-[#2f5d40]/10 p-6 md:p-8 flex flex-col overflow-hidden">
        {/* Snow effect on the inner page */}
        <Snowfall />

        {/* Inner Photo Frame */}
        <div className="relative flex-[1.2] min-h-[220px] mb-6 rounded-2xl overflow-hidden border-[12px] border-white shadow-xl bg-gray-50 flex items-center justify-center group/img">
          <img 
            src={innerImg} 
            alt="Inner Memory" 
            className="w-full h-full object-contain transition-transform duration-700 group-hover/img:scale-105"
          />
          <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg">
             <SparkleIcon className="w-6 h-6 text-[#c21e1e]" />
          </div>
          
          {/* Interactive photo overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors pointer-events-none flex items-center justify-center">
             <div className="opacity-0 group-hover/img:opacity-100 transition-opacity flex gap-4 pointer-events-auto">
                <button className="p-3 bg-white rounded-full shadow-xl text-[#c21e1e] hover:scale-110 transition-transform"><Heart size={20}/></button>
                <button className="p-3 bg-white rounded-full shadow-xl text-[#2f5d40] hover:scale-110 transition-transform"><Gift size={20}/></button>
             </div>
          </div>
        </div>

        {/* Text and Controls */}
        <div className="flex-1 flex flex-col items-center justify-between text-center overflow-y-auto">
          <div className="w-full">
            <div className="flex justify-center gap-2 mb-2 text-[#c21e1e]">
               {/* Fixed: Added Sparkles component to lucide-react imports */}
               <Sparkles size={16} />
               <div className="h-0.5 w-16 bg-current my-2 opacity-30" />
               <Sparkles size={16} />
            </div>
            <p className="font-cursive text-2xl md:text-3xl text-[#4a3728] leading-tight px-2 drop-shadow-sm italic">
              {data.innerPage.text}
            </p>
          </div>

          <div className="w-full pt-4 border-t border-[#2f5d40]/10 mt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center px-2">
              <span className="font-serif italic text-[#c21e1e] text-lg">Sent with Love</span>
              <div className="flex gap-2">
                 <button className="p-2 bg-[#2f5d40]/10 rounded-full text-[#2f5d40] hover:bg-[#2f5d40] hover:text-white transition-all"><Share2 size={16}/></button>
              </div>
            </div>

            {/* Music Widget or Player */}
            {data.usePresetMusic && isOpen ? (
              <div className="animate-in slide-in-from-bottom duration-700">
                <iframe 
                  frameBorder="no" 
                  marginWidth={0} 
                  marginHeight={0} 
                  width="100%" 
                  height="86" 
                  src="//music.163.com/outchain/player?type=2&id=2617646167&auto=1&height=66"
                  className="rounded-xl shadow-inner border border-[#2f5d40]/10"
                ></iframe>
              </div>
            ) : !data.usePresetMusic && data.audio && (
              <button 
                onClick={() => setIsAudioMuted(!isAudioMuted)}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-white rounded-xl shadow-sm text-[#c21e1e] font-bold text-sm w-full border border-[#c21e1e]/20"
              >
                {isAudioMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
                {isAudioMuted ? 'Unmute Audio' : 'Playing Audio'}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1500px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-\\[-165deg\\] {
          transform: rotateY(-165deg);
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .shake:hover {
          animation: shake 0.5s infinite;
        }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,2L14.5,9.5L22,12L14.5,14.5L12,22L9.5,14.5L2,12L9.5,9.5L12,2Z" />
  </svg>
);
