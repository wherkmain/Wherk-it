import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";

export const metadata = {
  title: "Play-Cal Features | Availability Booking, Party Sync & Co-Parenting Tools",
  description: "Explore Play-Cal's powerful features designed for busy parents: availability-based playdate booking, automatic party invitation sync, seamless co-parent coordination, and a unified family calendar.",
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features.<br />
            <span className="gradient-text">Peaceful Scheduling.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Play-Cal is more than just a calendar. It's a complete toolkit designed to solve 
            the real-world scheduling challenges that modern families face.
          </p>
          <a href="/" className="btn-primary inline-block">
            Join the Waitlist
          </a>
        </div>
      </section>

      {/* Playdate Management Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Reinventing the Playdate
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to coordinate playdates without the chaos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                The End of Back-and-Forth Texting
              </h3>
              <p className="text-gray-700 mb-4">
                This is the core of Play-Cal. Set your child's recurring availability windows 
                once, and you're done. Friends can see your open slots and send requests for 
                times that you've already pre-approved. It turns a 10-text conversation into 
                a single tap.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Recurring weekly schedules
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  One-time availability blocks
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Privacy controls per connection
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Smart Playdate Requests
              </h3>
              <p className="text-gray-600">
                Send or receive playdate requests with all essential info: who, when, where, 
                and notes. When accepted, it automatically adds to everyone's calendar.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-4xl mb-4">🗓️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Unified Playdate Calendar
              </h3>
              <p className="text-gray-600">
                Color-coded view of all upcoming playdates. Tap any event for details, 
                directions, or message the other parent. Your family's social command center.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Flexible Locations
              </h3>
              <p className="text-gray-600">
                Your place, their place, or a neutral location. Everyone knows exactly 
                where to go with built-in maps integration.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Calendar Sync
              </h3>
              <p className="text-gray-600">
                Sync with Google Calendar, Apple Calendar, and Outlook. Playdates appear 
                everywhere you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Party & Event Coordination */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Never Miss a Celebration
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Party invitation management that actually works.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Your Digital Party Assistant
              </h3>
              <p className="text-gray-600 mb-4">
                Stop searching your inbox for that one party invitation. Securely forward 
                your Evite and Paperless Post emails, and Play-Cal acts as your personal 
                assistant, automatically syncing every invitation into an organized list.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  Automatic Evite integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  Paperless Post support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  RSVP deadline reminders
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                One-Tap RSVPs & Sharing
              </h3>
              <p className="text-gray-600 mb-4">
                Once an invitation is synced, view all details and RSVP directly from Play-Cal. 
                Share invitations with your co-parent or caregiver with a single tap—ensuring 
                everyone knows about upcoming parties.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  RSVP without leaving the app
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  Share with co-parents instantly
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  Track all your responses
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Parenting Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for the Modern Family Structure
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Co-parenting doesn't have to be complicated.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">👨‍👩‍👧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Seamless Co-Parent Coordination
              </h3>
              <p className="text-gray-600">
                Invite your co-parent to your Play-Cal family hub and grant them permission 
                to view and manage the children's schedules. Shared visibility eliminates 
                constant check-ins.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Granular Permission Controls
              </h3>
              <p className="text-gray-600">
                Give your co-parent full admin rights, or provide "view-only" access for 
                grandparents or nannies. You decide who can see and do what.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Multi-Family Support
              </h3>
              <p className="text-gray-600">
                Perfect for blended families. Easily switch between different family hubs 
                or manage schedules for children who split time between households.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Communication Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Stay Connected
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💬</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">In-App Messaging</h3>
                <p className="text-gray-600">
                  Quick, contextual communication. Send "We're running 5 minutes late!" 
                  directly within Play-Cal. All playdate-related messages stay in one place.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-3xl">🔔</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Notifications</h3>
                <p className="text-gray-600">
                  Get notified about upcoming playdates, pending requests, and RSVP deadlines. 
                  Customize your preferences so you only get alerts that matter.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-3xl">🔒</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy First</h3>
                <p className="text-gray-600">
                  No public profiles or searchable directories. All connections are 
                  explicitly invited and approved. COPPA, GDPR, and CCPA compliant.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-3xl">📱</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cross-Platform</h3>
                <p className="text-gray-600">
                  Available on iOS and Android. Real-time sync across all devices. 
                  Your schedule stays current no matter which device you use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Experience the Future of Family Scheduling
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Download Play-Cal for free and discover how our powerful features can bring 
            peace and order to your family's busy life.
          </p>
          <a href="/" className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors">
            Join the Waitlist
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
