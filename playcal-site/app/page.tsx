import WaitlistForm from "./components/WaitlistForm";
import PhoneMockup from "./components/PhoneMockup";
import FeatureCard from "./components/FeatureCard";
import StepCard from "./components/StepCard";
import TestimonialCard from "./components/TestimonialCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero pt-20 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-2xl">🎉</span>
                <span className="text-sm font-medium text-gray-700">Launching Spring 2026</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Stop the Playdate{" "}
                <span className="gradient-text">Texting Chaos</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
                Play-Cal makes playdate scheduling effortless with availability-based booking, 
                party invitation sync, and co-parent coordination. Join thousands of parents 
                reclaiming their time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <a href="#waitlist" className="btn-primary text-center">
                  Join the Waitlist
                </a>
                <a href="#how-it-works" className="btn-secondary text-center">
                  See How It Works
                </a>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-teal-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span><strong>2,000+ parents</strong> on the waitlist</span>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="animate-float">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Sound Familiar?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Parents everywhere are drowning in the chaos of coordinating their kids social lives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Group Chat Nightmare</h3>
              <p className="text-gray-600">
                Texting 15 parents to find one playdate slot. Endless &ldquo;How about Tuesday?&rdquo; 
                &ldquo;No, Tuesday doesn&apos;t work.&rdquo; back-and-forth.
              </p>
            </div>
            
            <div className="bg-orange-50 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">😰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Missed Party</h3>
              <p className="text-gray-600">
                That Evite invitation went to your spam folder. Your kid missed their friend&apos;s 
                birthday party and you feel terrible.
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">😤</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Co-Parent Confusion</h3>
              <p className="text-gray-600">
                Your ex accepted a playdate you knew nothing about. You show up to pick up your 
                kid and they&apos;re not there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-semibold tracking-wide uppercase text-sm">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Everything You Need for Family Scheduling
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No more juggling apps, calendars, and group texts. Play-Cal brings it all together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon="📅"
              title="Availability-Based Booking"
              description="Set your child's available windows once. Other parents see when you're free and request playdates in one tap."
              color="purple"
            />
            <FeatureCard
              icon="🎉"
              title="Party Invitation Sync"
              description="Forward Evite and Paperless Post emails to Play-Cal. We extract details, set reminders, and alert you before RSVP deadlines."
              color="teal"
            />
            <FeatureCard
              icon="👨‍👩‍👧"
              title="Co-Parent Sync"
              description="Share schedules and invitations with your co-parent, spouse, or caregivers. Everyone sees the same calendar."
              color="purple"
            />
            <FeatureCard
              icon="💬"
              title="In-App Messaging"
              description="Quick parent-to-parent coordination without giving out your phone number. 'Running 10 minutes late' made easy."
              color="teal"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-semibold tracking-wide uppercase text-sm">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Schedule a Playdate in 3 Taps
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard
              number={1}
              title="Set Availability"
              description="Tell us when your child is free for playdates. Set recurring schedules like 'Weekdays 3-6pm' or one-off availability."
            />
            <StepCard
              number={2}
              title="Connect with Parents"
              description="Invite parents you know and trust. They can see your child's availability and request playdates."
            />
            <StepCard
              number={3}
              title="Approve & Schedule"
              description="Get playdate requests, approve with one tap, and it automatically goes on your calendar. Everyone gets notified."
            />
          </div>
        </div>
      </section>

      {/* Party Invitation Feature */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-semibold tracking-wide uppercase text-sm">Never Miss a Party</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Party Invitation Tracking
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Evite and Paperless Post invitations get lost in email chaos. Forward them to 
                Play-Cal and we&apos;ll:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Extract all the details — date, time, location, RSVP deadline",
                  "Set smart reminders — alert you 7 days and 1 day before deadlines",
                  "Share with your co-parent — they see it too, no more 'Did you RSVP?'",
                  "Track your response — know at a glance which parties you're attending"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#waitlist" className="btn-primary inline-block">
                Get Party Tracking
              </a>
            </div>
            
            <div className="relative">
              {/* Email to App visualization */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
                <div className="text-sm text-gray-500 mb-2">From: invitations@evite.com</div>
                <div className="text-sm text-gray-500 mb-4">Subject: You're Invited! Lucas's 7th Birthday</div>
                <div className="bg-gray-100 rounded-lg p-4 text-sm">
                  <p className="font-semibold mb-2">🎂 You're invited to Lucas's 7th Birthday Party!</p>
                  <p><strong>When:</strong> Saturday, March 15th at 2:00 PM</p>
                  <p><strong>Where:</strong> Jump Zone, 123 Main Street</p>
                  <p><strong>RSVP by:</strong> March 8th</p>
                </div>
                <div className="mt-4 text-center text-primary font-medium">
                  → Forward to your-playcal@play-cal.com
                </div>
              </div>
              
              <div className="text-center text-4xl text-primary mb-4">↓</div>
              
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-primary">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🎉</span>
                  <span className="font-bold text-primary">Party Tracked!</span>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">Lucas's 7th Birthday</p>
                  <p className="text-gray-600">Sat, Mar 15 • 2:00 PM</p>
                  <p className="text-gray-600">Jump Zone • RSVP by Mar 8</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium">Going</button>
                  <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium">Can't Go</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Loved by Parents Everywhere
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Play-Cal is a game-changer. I used to spend hours every week in text threads trying to set up one playdate. Now it takes me 30 seconds. I can't imagine my life without it."
              author="Sarah K."
              role="Mom of Two"
              color="purple"
            />
            <TestimonialCard
              quote="As a co-parent, this app has been a lifesaver. We can both see and manage our son's social schedule without constant check-ins. The party invitation sync is genius."
              author="Michael B."
              role="Dad of One"
              color="teal"
            />
            <TestimonialCard
              quote="I love that I can set my daughter's availability and just let my friends pick a time. It removes all the social awkwardness and pressure of scheduling. Highly recommend!"
              author="Emily R."
              role="Mom of Three"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Be the First to Play-Cal
            </h2>
            <p className="text-lg text-purple-100 mb-8">
              Join 2,000+ parents on the waitlist. Get early access and help shape the future of family scheduling.
            </p>
            
            <WaitlistForm />
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-purple-100 text-sm">
              <span>✓ Early access</span>
              <span>✓ Founding member badge</span>
              <span>✓ Shape product features</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
