/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  Clock, 
  ChevronRight, 
  Trash2, 
  RotateCcw, 
  ShoppingCart, 
  X, 
  Plus, 
  ArrowLeft,
  Sun,
  SunMedium,
  Moon,
  Dices,
  Heart,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { MENU_ITEMS, MenuItem, TimeOfDay, Category } from '@/src/constants/menuData';

type Screen = 'START' | 'TIME_SELECTION' | 'MAIN_MENU' | 'RECOMMENDATION' | 'CART';

export default function App() {
  const [screen, setScreen] = useState<Screen>('START');
  const [selectedTime, setSelectedTime] = useState<TimeOfDay | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<MenuItem[]>([]);

  // Filtered recommendations
  const recommendations = useMemo(() => {
    if (!selectedTime) return [];
    
    let items = MENU_ITEMS.filter(item => item.times.includes(selectedTime));
    
    if (selectedCategory && selectedCategory !== 'RANDOM') {
      items = items.filter(item => item.category === selectedCategory);
    } else if (selectedCategory === 'RANDOM') {
      // Shuffle and pick 13 (as per example) or all available
      return [...items].sort(() => Math.random() - 0.5).slice(0, 13);
    }
    
    return items;
  }, [selectedTime, selectedCategory]);

  const addToCart = (item: MenuItem) => {
    if (!cart.find(i => i.id === item.id)) {
      setCart(prev => [...prev, item]);
      setHistory(prev => [item, ...prev.filter(i => i.id !== item.id)].slice(0, 10));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const resetCart = () => setCart([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  // Background color based on time
  const getBgColor = () => {
    if (screen === 'START') return 'bg-gradient-to-br from-pink-200 via-rose-300 to-orange-200';
    if (!selectedTime) return 'bg-[#FFF9F5]';
    switch (selectedTime) {
      case 'MORNING': return 'bg-gradient-to-b from-[#FFF9E6] to-[#FFFDF5]';
      case 'LUNCH': return 'bg-gradient-to-b from-[#E6F7FF] to-[#F5FBFF]';
      case 'DINNER': return 'bg-gradient-to-b from-[#1A1C2E] to-[#0F1123]';
      default: return 'bg-[#FFF9F5]';
    }
  };

  const getTextColor = () => {
    return selectedTime === 'DINNER' ? 'text-rose-100' : 'text-slate-700';
  };

  const springTransition = { type: 'spring', stiffness: 300, damping: 20 };

  return (
    <div className={`w-full min-h-screen transition-colors duration-1000 font-sans selection:bg-rose-200 ${getBgColor()} ${getTextColor()}`}>
      <AnimatePresence mode="wait">
        {/* START SCREEN */}
        {screen === 'START' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={springTransition}
            className="flex flex-col items-center justify-center min-h-screen p-6 text-slate-800"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] mb-8 shadow-[0_20px_50px_rgba(255,100,100,0.15)] border-4 border-white/60"
            >
              <span className="text-8xl">🍱</span>
            </motion.div>
            <h1 className="text-7xl font-heading mb-4 tracking-tight text-rose-500 drop-shadow-sm">저메추</h1>
            <p className="text-2xl opacity-80 mb-12 font-medium">오늘 뭐 먹을지 고민이라면? 😋</p>
            <Button 
              size="lg"
              onClick={() => setScreen('TIME_SELECTION')}
              className="bg-rose-500 text-white hover:bg-rose-600 px-16 py-10 rounded-full text-3xl font-heading shadow-[0_10px_30px_rgba(244,63,94,0.3)] transition-all hover:scale-110 active:scale-95"
            >
              시작하기!
            </Button>
          </motion.div>
        )}

        {/* TIME SELECTION SCREEN */}
        {screen === 'TIME_SELECTION' && (
          <motion.div
            key="time"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={springTransition}
            className="flex flex-col items-center justify-center min-h-screen p-6"
          >
            <div className="text-center mb-16">
              <span className="text-6xl mb-4 block">⏰</span>
              <h2 className="text-5xl font-heading text-rose-500">지금은 몇 시인가요?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
              {[
                { type: 'MORNING', label: '아침', emoji: '☀️', color: 'bg-[#FFEDD5] text-[#9A3412]', desc: '상쾌한 아침 식사' },
                { type: 'LUNCH', label: '점심', emoji: '🌤️', color: 'bg-[#E0F2FE] text-[#0369A1]', desc: '든든한 점심 한 끼' },
                { type: 'DINNER', label: '저녁', emoji: '🌙', color: 'bg-[#E0E7FF] text-[#4338CA]', desc: '행복한 저녁 마무리' }
              ].map((time) => (
                <motion.button
                  key={time.type}
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedTime(time.type as TimeOfDay);
                    setScreen('MAIN_MENU');
                  }}
                  className={`${time.color} p-10 rounded-[3rem] shadow-xl flex flex-col items-center gap-6 transition-all border-4 border-white/50`}
                >
                  <span className="text-7xl">{time.emoji}</span>
                  <div className="text-center">
                    <span className="text-3xl font-heading block mb-1">{time.label}</span>
                    <span className="text-lg opacity-70">{time.desc}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* MAIN MENU SCREEN */}
        {screen === 'MAIN_MENU' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={springTransition}
            className="flex flex-col items-center min-h-screen p-6"
          >
            <header className="w-full max-w-5xl flex justify-between items-center mb-16">
              <Button 
                variant="ghost" 
                onClick={() => setScreen('TIME_SELECTION')} 
                className={`rounded-full px-6 py-6 text-xl font-heading ${selectedTime === 'DINNER' ? 'text-rose-100 hover:bg-white/10' : 'text-slate-600 hover:bg-rose-100'}`}
              >
                <ArrowLeft className="mr-2" /> 시간 바꿀래!
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setScreen('CART')} 
                className={`relative rounded-full px-8 py-6 text-xl font-heading border-2 ${selectedTime === 'DINNER' ? 'border-rose-300 text-rose-100' : 'border-rose-400 text-rose-500'}`}
              >
                <ShoppingCart className="mr-2" /> 장바구니
                {cart.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 bg-rose-500 text-white text-sm w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg"
                  >
                    {cart.length}
                  </motion.span>
                )}
              </Button>
            </header>

            <div className="text-center mb-16">
              <span className="text-6xl mb-4 block">👩‍🍳</span>
              <h2 className="text-5xl font-heading text-rose-500 mb-4">어떤 종류가 좋을까요?</h2>
              <p className="text-2xl opacity-60">취향대로 골라보세요!</p>
            </div>

            <motion.div 
              animate={{ x: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="mb-12 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-rose-200 text-rose-500 font-medium text-xl shadow-sm"
            >
              ✨ 팁: 결정이 힘들 땐 <span className="font-heading">랜덤!</span> 버튼을 눌러보세요!
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-6xl">
              {[
                { type: 'KOREAN', label: '한식', emoji: '🍱' },
                { type: 'CHINESE', label: '중식', emoji: '🥟' },
                { type: 'WESTERN', label: '양식', emoji: '🍕' },
                { type: 'JAPANESE', label: '일식', emoji: '🍣' },
                { type: 'RANDOM', label: '랜덤!', emoji: '✨', special: true }
              ].map((cat) => (
                <motion.button
                  key={cat.type}
                  whileHover={{ y: -8, rotate: [0, -2, 2, 0] }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory(cat.type as Category);
                    setScreen('RECOMMENDATION');
                  }}
                  className={`p-10 rounded-[3rem] shadow-lg flex flex-col items-center gap-6 border-4 transition-all ${
                    cat.special 
                      ? 'bg-gradient-to-br from-rose-400 to-orange-400 text-white border-transparent shadow-rose-200' 
                      : 'bg-white/60 border-white hover:border-rose-300'
                  }`}
                >
                  <span className="text-6xl">{cat.emoji}</span>
                  <span className="text-2xl font-heading">{cat.label}</span>
                </motion.button>
              ))}
            </div>

            {history.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-24 w-full max-w-4xl bg-white/30 backdrop-blur-md p-8 rounded-[3rem] border-2 border-white/50"
              >
                <h3 className="text-2xl font-heading mb-6 flex items-center gap-3 text-rose-500">
                  <History size={28} /> 최근에 본 메뉴들
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {history.map(item => (
                    <motion.div 
                      key={item.id} 
                      whileHover={{ scale: 1.05 }}
                      className="flex-shrink-0 bg-white/80 border-2 border-rose-100 px-6 py-3 rounded-full text-lg font-medium shadow-sm"
                    >
                      {item.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* RECOMMENDATION SCREEN */}
        {screen === 'RECOMMENDATION' && (
          <motion.div
            key="recommend"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center min-h-screen p-6"
          >
            <header className="w-full max-w-7xl flex justify-between items-center mb-12 sticky top-4 z-30 py-4 px-8 bg-white/40 backdrop-blur-2xl rounded-full shadow-xl border-2 border-white/60">
              <Button 
                variant="ghost" 
                onClick={() => setScreen('MAIN_MENU')} 
                className="rounded-full text-xl font-heading text-slate-600"
              >
                <ArrowLeft className="mr-2" /> 다른 거 볼래
              </Button>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setScreen('CART')} 
                  className="relative rounded-full px-8 py-6 text-xl font-heading border-2 border-rose-400 text-rose-500"
                >
                  <ShoppingCart className="mr-2" /> {cart.length}개 담음!
                </Button>
                {selectedCategory === 'RANDOM' && (
                  <Button 
                    onClick={() => setSelectedCategory('RANDOM')} 
                    className="bg-orange-400 hover:bg-orange-500 text-white rounded-full px-8 py-6 text-xl font-heading shadow-lg"
                  >
                    <RotateCcw className="mr-2" /> 다시 뽑기!
                  </Button>
                )}
              </div>
            </header>

            <div className="text-center mb-16">
              <h2 className="text-6xl font-heading text-rose-500 mb-4">
                {selectedTime === 'MORNING' ? '아침' : selectedTime === 'LUNCH' ? '점심' : '저녁'} 추천 리스트 ✨
              </h2>
              <p className="text-2xl opacity-60">
                {selectedCategory === 'RANDOM' ? '두근두근! 랜덤 메뉴예요' : `${selectedCategory} 맛집 메뉴들!`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl pb-20">
              {recommendations.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, ...springTransition }}
                >
                  <Card className="overflow-hidden h-full flex flex-col bg-white/70 border-4 border-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button 
                        onClick={() => toggleFavorite(item.id)}
                        className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-md text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                      >
                        <Heart size={24} fill={favorites.includes(item.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <CardHeader className="p-8">
                      <CardTitle className="text-3xl font-heading text-slate-800 mb-2">{item.name}</CardTitle>
                      <CardDescription className="text-xl leading-relaxed text-slate-500">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto p-8 pt-0">
                      <Button 
                        onClick={() => addToCart(item)}
                        disabled={!!cart.find(i => i.id === item.id)}
                        className={`w-full rounded-full py-8 text-2xl font-heading shadow-lg transition-all ${
                          cart.find(i => i.id === item.id) 
                            ? 'bg-slate-100 text-slate-400' 
                            : 'bg-rose-500 hover:bg-rose-600 text-white hover:scale-105'
                        }`}
                      >
                        {cart.find(i => i.id === item.id) ? '이미 담았어요!' : <><Plus className="mr-2" /> 장바구니 담기</>}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CART SCREEN */}
        {screen === 'CART' && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={springTransition}
            className="flex flex-col items-center min-h-screen p-6"
          >
            <header className="w-full max-w-3xl flex justify-between items-center mb-16">
              <Button 
                variant="ghost" 
                onClick={() => setScreen('RECOMMENDATION')} 
                className="rounded-full text-xl font-heading text-slate-600"
              >
                <ArrowLeft className="mr-2" /> 더 고를래!
              </Button>
              <h2 className="text-4xl font-heading text-rose-500">내 장바구니 🛒</h2>
              <div className="w-12" />
            </header>

            <div className="w-full max-w-3xl bg-white/60 backdrop-blur-2xl rounded-[3.5rem] p-10 border-4 border-white shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
              {cart.length === 0 ? (
                <div className="py-24 text-center space-y-8">
                  <div className="text-9xl opacity-20">🛒</div>
                  <p className="text-3xl font-heading opacity-40">장바구니가 텅 비었어요..</p>
                  <Button 
                    onClick={() => setScreen('MAIN_MENU')} 
                    className="bg-rose-500 text-white rounded-full px-12 py-8 text-2xl font-heading shadow-xl"
                  >
                    맛있는 거 보러가기
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-6 mb-10 max-h-[55vh] overflow-y-auto pr-4 custom-scrollbar">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        className="flex items-center justify-between p-6 bg-white/80 rounded-[2.5rem] border-2 border-rose-50 group hover:border-rose-200 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-6">
                          <img src={item.image} alt={item.name} className="w-24 h-24 rounded-[2rem] object-cover shadow-md" referrerPolicy="no-referrer" />
                          <div>
                            <h4 className="font-heading text-3xl text-slate-800">{item.name}</h4>
                            <span className="text-lg text-rose-400 font-bold uppercase tracking-wider">{item.category}</span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.id)}
                          className="w-14 h-14 rounded-full text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
                        >
                          <Trash2 size={28} />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex gap-6 pt-10 border-t-4 border-rose-50">
                    <Button 
                      variant="outline" 
                      onClick={resetCart}
                      className="flex-1 py-10 rounded-full border-4 border-rose-100 text-rose-400 text-2xl font-heading hover:bg-rose-50 transition-all"
                    >
                      <RotateCcw className="mr-2" /> 다 비우기
                    </Button>
                    <Button 
                      className="flex-1 py-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-heading text-3xl shadow-[0_15px_40px_rgba(244,63,94,0.3)] hover:scale-105 transition-all"
                      onClick={() => alert('냠냠! 맛있게 드세요! 😋')}
                    >
                      결정 완료!
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
