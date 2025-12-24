
import React, { useState } from 'react';
import { ChristmasCard } from './components/ChristmasCard';
import { CardData } from './types';
import { Settings, Music, Camera, Sparkles, Send, Check } from 'lucide-react';

const App: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>({
    cover: null,
    innerPage: {
      image: null,
      text: "Wishing you a season filled with warmth, laughter, and magical moments. May your holidays be as bright as the Christmas lights!",
    },
    audio: null,
    usePresetMusic: true
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleUpdate = (updates: Partial<CardData>) => {
    setCardData(prev => ({ ...prev, ...updates }));
  };

  const handleImageUpload = (file: File, target: 'cover' | 'inner') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (target === 'cover') {
        handleUpdate({ cover: e.target?.result as string });
      } else {
        setCardData(prev => ({
          ...prev,
          innerPage: { ...prev.innerPage, image: e.target?.result as string }
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAudioUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      handleUpdate({ audio: e.target?.result as string, usePresetMusic: false });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#f9bca4] text-[#4a3728] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Decorative background patterns mimicking the reference image */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 text-[#d27c37]/20 text-8xl rotate-12">❄️</div>
        <div className="absolute bottom-20 right-10 text-[#d27c37]/20 text-8xl -rotate-12">🎄</div>
        <div className="absolute top-1/2 left-0 w-full h-1/4 bg-[#2f5d40]/5 -z-10 skew-y-1"></div>
      </div>

      <main className="w-full max-w-4xl flex flex-col items-center gap-8 relative z-10">
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl font-serif text-[#c21e1e] drop-shadow-sm">Christmas Story</h1>
          <p className="text-xl text-[#2f5d40] font-cursive italic font-bold">Interactive Holiday Greeting</p>
        </header>

        <ChristmasCard data={cardData} />

        <div className="flex gap-4 flex-wrap justify-center mt-4">
          <button 
            onClick={() => setIsEditorOpen(!isEditorOpen)}
            className="flex items-center gap-2 px-8 py-3 bg-[#c21e1e] text-white rounded-full shadow-lg hover:bg-[#a01818] transition-all transform hover:scale-105 border-4 border-white/20"
          >
            <Settings size={20} />
            {isEditorOpen ? 'Finish Editing' : 'Customize Your Card'}
          </button>
        </div>

        {/* Editor Panel */}
        {isEditorOpen && (
          <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-[#2f5d40] space-y-6 animate-in slide-in-from-bottom duration-500 overflow-hidden relative">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#c21e1e] via-white to-[#2f5d40]"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-bold uppercase tracking-wider text-[#c21e1e]">1. Front Cover</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'cover')}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label htmlFor="cover-upload" className="flex flex-col items-center justify-center p-6 border-4 border-dashed border-[#f9bca4] rounded-2xl cursor-pointer hover:bg-[#f9bca4]/20 transition-colors bg-white">
                    <Camera className="text-[#c21e1e] mb-2" size={32} />
                    <span className="text-sm font-bold">Upload Cover</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold uppercase tracking-wider text-[#2f5d40]">2. Inner Photo</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'inner')}
                    className="hidden"
                    id="inner-upload"
                  />
                  <label htmlFor="inner-upload" className="flex flex-col items-center justify-center p-6 border-4 border-dashed border-[#f9bca4] rounded-2xl cursor-pointer hover:bg-[#f9bca4]/20 transition-colors bg-white">
                    <Sparkles className="text-[#2f5d40] mb-2" size={32} />
                    <span className="text-sm font-bold">Upload Story Photo</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold uppercase tracking-wider text-[#c21e1e]">3. Holiday Music</label>
              <div className="flex flex-col gap-4">
                <div className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${cardData.usePresetMusic ? 'border-[#c21e1e] bg-white' : 'border-[#d27c37]/20 bg-gray-50 opacity-60'}`}>
                  <input type="radio" checked={cardData.usePresetMusic} onChange={() => handleUpdate({ usePresetMusic: true })} />
                  <div className="flex-1">
                    <span className="text-sm font-bold block">Preset Festive Tune</span>
                    <iframe frameBorder="no" marginWidth={0} marginHeight={0} width="100%" height="86" src="//music.163.com/outchain/player?type=2&id=2617646167&auto=0&height=66"></iframe>
                  </div>
                </div>
                <div className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${!cardData.usePresetMusic ? 'border-[#c21e1e] bg-white' : 'border-[#d27c37]/20 bg-gray-50 opacity-60'}`}>
                  <input type="radio" checked={!cardData.usePresetMusic} onChange={() => handleUpdate({ usePresetMusic: false })} />
                  <div className="flex-1">
                    <span className="text-sm font-bold block mb-2">Upload Your Own Audio</span>
                    <input type="file" accept="audio/*" onChange={(e) => e.target.files?.[0] && handleAudioUpload(e.target.files[0])} className="text-xs" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold uppercase tracking-wider text-[#2f5d40]">4. Your Message</label>
              <textarea 
                value={cardData.innerPage.text}
                onChange={(e) => setCardData(prev => ({
                  ...prev,
                  innerPage: { ...prev.innerPage, text: e.target.value }
                }))}
                rows={3}
                className="w-full p-4 rounded-2xl border-2 border-[#f9bca4] focus:border-[#c21e1e] outline-none transition-colors font-cursive text-2xl bg-white"
                placeholder="Write your wishes..."
              />
            </div>
          </div>
        )}
      </main>

      {!cardData.usePresetMusic && cardData.audio && (
        <audio src={cardData.audio} autoPlay loop className="hidden" />
      )}
    </div>
  );
};

export default App;
