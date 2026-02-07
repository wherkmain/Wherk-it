export default function PhoneMockup() {
  return (
    <div className="phone-mockup w-72 h-[580px] bg-white relative">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-10"></div>
      
      {/* Status Bar */}
      <div className="bg-white pt-3 pb-2 px-5 flex justify-between items-center text-xs text-gray-900">
        <span>9:41</span>
        <div className="flex gap-1">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>
      
      {/* App Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark px-5 py-4">
        <div className="flex justify-between items-center text-white">
          <span className="font-bold text-lg">Play-Cal</span>
          <span className="text-sm">Today</span>
        </div>
      </div>
      
      {/* App Content */}
      <div className="p-4 space-y-3 bg-gray-50 h-[calc(100%-100px)] overflow-hidden">
        {/* Playdate Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 text-primary font-bold px-3 py-2 rounded-lg text-sm">
              3:00 PM
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">Playdate with Emma</p>
              <p className="text-xs text-gray-500">Central Park • 2 hours</p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
          </div>
        </div>
        
        {/* Party Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-orange-200">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎂</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">Lucas's Birthday Party</p>
              <p className="text-xs text-gray-500">Saturday, 2:00 PM • RSVP by Friday</p>
            </div>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">
              !
            </div>
          </div>
        </div>
        
        {/* Availability Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900 text-sm">👧 Sarah's Availability</span>
            <span className="text-xs text-gray-500">Visible to 5 families</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-purple-100 text-primary text-xs px-2 py-1 rounded-full">Mon 3-6pm</span>
            <span className="bg-purple-100 text-primary text-xs px-2 py-1 rounded-full">Wed 3-6pm</span>
            <span className="bg-purple-100 text-primary text-xs px-2 py-1 rounded-full">Sat 9-12pm</span>
          </div>
        </div>
        
        {/* Floating Action Button */}
        <div className="absolute bottom-20 right-4 w-14 h-14 bg-accent rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
          +
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-3 flex justify-around">
        <span className="text-2xl">📅</span>
        <span className="text-2xl opacity-50">🎉</span>
        <span className="text-2xl opacity-50">💬</span>
        <span className="text-2xl opacity-50">👤</span>
      </div>
    </div>
  );
}
