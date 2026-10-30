import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Sparkles, Heart } from 'lucide-react';

export default function Navbar({ onOrderClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'محتويات البوكس', href: '#contents' },
    { name: 'لماذا مشكاة؟', href: '#why-mishkat' },
    { name: 'نظرة مقربة', href: '#video' },
    { name: 'آراء المشتركات', href: '#reviews' },
    { name: 'الأسئلة الشائعة', href: '#faq' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' : 'bg-[#FAF7F2]/90 backdrop-blur-sm py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Area */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#470923]/20 bg-white p-1 shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
              <img 
                src="/images/logo.png" 
                alt="شعار مشكاة" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
              <span className="font-amiri font-bold text-xl text-[#470923] hidden group-[.has-no-img]:inline">مشكاة</span>
            </div>
            <div>
              <span className="font-amiri text-2xl font-bold text-[#470923] tracking-wide block leading-tight">
                مِشْكَاة
              </span>
              <span className="text-[10px] text-plum-700 font-medium tracking-wider block">
                MISHKAT • GRAPHICS BY BI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#4A202D] hover:text-[#470923] font-semibold text-sm transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-[#470923] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOrderClick}
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-white bg-[#470923] hover:bg-plum-800 font-bold text-sm shadow-plum transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <ShoppingBag className="w-4 h-4 text-cream-200 transition-transform group-hover:-translate-y-0.5" />
              <span>اطلبي الآن</span>
              <span className="text-xs bg-plum-800/80 text-cream-200 px-2 py-0.5 rounded-full border border-plum-600">
                3,900 دج
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOrderClick}
              className="sm:hidden px-3.5 py-2 rounded-full text-white bg-[#470923] font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>اطلبي</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-[#470923] hover:bg-plum-50 transition-colors"
              aria-label="القائمة الرئيسية"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-plum-100 bg-white/95 rounded-2xl p-4 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-xl font-semibold text-sm text-[#4A202D] hover:bg-plum-50 hover:text-[#470923] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-plum-100">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOrderClick();
                  }}
                  className="w-full py-3 rounded-xl text-white bg-[#470923] font-bold text-sm flex items-center justify-center gap-2 shadow-plum"
                >
                  <ShoppingBag className="w-4 h-4 text-cream-200" />
                  <span>اطلبي بوكس مشكاة الآن (3,900 دج)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

