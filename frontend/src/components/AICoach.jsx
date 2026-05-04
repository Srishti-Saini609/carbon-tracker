import { useState, useEffect, useRef } from 'react';

const AICoach = ({ activities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your Eco-Coach. I've analyzed your recent logs and have some personalized tips. Want to hear them?" }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateTip = () => {
    const list = activities || [];
    if (list.length === 0) return "You haven't logged anything yet! Start by logging your commute or a meal to get personalized tips.";
    
    // Simple rule-based analysis
    const transport = list.filter(a => a.type === 'transport').reduce((s, a) => s + (a.co2e || 0), 0);
    const diet = list.filter(a => a.type === 'diet').reduce((s, a) => s + (a.co2e || 0), 0);
    const energy = list.filter(a => a.type === 'energy').reduce((s, a) => s + (a.co2e || 0), 0);

    if (transport > diet && transport > energy) {
      return "Your transport emissions are quite high. Consider using a bike or public transit for short trips to save about 2kg of CO2 per journey!";
    } else if (diet > transport && diet > energy) {
      return "I see your diet contributes most to your footprint. Trying one 'Meatless Monday' could reduce your emissions by up to 50kg this month!";
    } else if (energy > 0) {
      return "Your energy usage is a focus area. Unplugging devices at night can reduce standby power emissions by up to 10%!";
    }
    
    return "You're doing great! Keep logging to uncover more patterns in your sustainability journey.";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');

    // Simulate AI thinking
    setTimeout(() => {
      let aiText = "";
      if (input.toLowerCase().includes('tip') || input.toLowerCase().includes('advice') || input.toLowerCase().includes('help')) {
        aiText = generateTip();
      } else if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
        aiText = "Hi there! Ready to reduce your footprint today?";
      } else {
        aiText = "That's interesting! I'm still learning, but I'm here to help you track and reduce your carbon footprint. Try asking for 'tips'!";
      }
      
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-3xl border border-white/50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="p-6 bg-primary text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-green rounded-xl flex items-center justify-center text-xl">🤖</div>
              <div>
                <p className="text-sm font-black tracking-tight">Eco-Coach AI</p>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Active Intelligence</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white text-xl">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium shadow-sm ${
                  m.role === 'ai' 
                    ? 'bg-gray-100 text-primary rounded-tl-none' 
                    : 'bg-primary text-white rounded-tr-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for advice..."
                className="w-full bg-white border border-gray-100 rounded-2xl py-3 px-4 pr-12 text-sm font-medium focus:ring-2 focus:ring-primary/10 outline-none shadow-sm"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors">
                ↗️
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[2rem] shadow-2xl flex items-center justify-center text-3xl transition-all duration-500 hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-white text-primary' : 'bg-primary text-white'
        }`}
      >
        {isOpen ? '✕' : '🤖'}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-green border-4 border-white rounded-full animate-pulse"></span>
        )}
      </button>
    </div>
  );
};

export default AICoach;
