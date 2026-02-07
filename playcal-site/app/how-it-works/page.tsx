import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "How Play-Cal Works | Simple Steps for Effortless Playdate Scheduling",
  description: "See how Play-Cal transforms family scheduling. A step-by-step guide to setting availability, connecting with friends, and booking playdates without the texting chaos.",
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 via-white to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Scheduling a Playdate Should Be<br />
            <span className="gradient-text">as Fun as Having One</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Play-Cal was designed to be intuitive, simple, and incredibly powerful. 
            Say goodbye to confusing text threads and missed appointments.
          </p>
          <a href="/" className="btn-primary inline-block">
            Join the Waitlist
          </a>
        </div>
      </section>

      {/* Step by Step */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your Journey to Effortless Coordination
            </h2>
          </div>
          
          {/* Step 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-primary px-4 py-2 rounded-full mb-4">
                <span className="font-bold">Step 1</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Set Up in Minutes
              </h3>
              <p className="text-gray-600 mb-6">
                Getting started with Play-Cal is a breeze. After downloading the app, 
                you'll create your secure account and build your family profile. Add 
                your children, their ages, and even fun profile pictures. This is your 
                central hub for all things scheduling.
              </p>
              <ul className="space-y-3">
                {[
                  "Download free from App Store or Google Play",
                  "Securely sign up with email, Google, or Apple",
                  "Create profiles for each of your kids",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm mx-auto">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">👨‍👩‍👧</span>
                    </div>
                    <h4 className="font-bold text-gray-900">Create Family Profile</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-500">Family Name</span>
                      <p className="font-medium">The Johnson Family</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-500">Children</span>
                      <div className="flex gap-2 mt-1">
                        <span className="bg-purple-100 text-primary px-2 py-1 rounded text-sm">Emma, 6</span>
                        <span className="bg-purple-100 text-primary px-2 py-1 rounded text-sm">Noah, 9</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-teal-100 text-accent px-4 py-2 rounded-full mb-4">
                <span className="font-bold">Step 2</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Set Your Availability Windows
              </h3>
              <p className="text-gray-600 mb-6">
                This is where the magic happens. Instead of reacting to endless requests, 
                you proactively define when your kids are free. Set recurring windows like 
                "Tuesdays and Thursdays from 3 PM to 5 PM" or add one-time slots for days 
                off from school.
              </p>
              <ul className="space-y-3">
                {[
                  "Set recurring weekly availability",
                  "Add one-time slots for special days",
                  "Block out busy times (appointments, travel)",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm mx-auto">
                  <h4 className="font-bold text-gray-900 mb-4">Emma's Availability</h4>
                  <div className="space-y-2">
                    {[
                      { day: "Monday", time: "3:00 PM - 6:00 PM", active: true },
                      { day: "Wednesday", time: "3:00 PM - 6:00 PM", active: true },
                      { day: "Friday", time: "3:00 PM - 6:00 PM", active: true },
                      { day: "Saturday", time: "9:00 AM - 12:00 PM", active: true },
                    ].map((slot, i) => (
                      <div key={i} className={`p-3 rounded-lg flex justify-between items-center ${
                        slot.active ? "bg-purple-50 border border-purple-200" : "bg-gray-50"
                      }`}>
                        <div>
                          <p className="font-medium text-gray-900">{slot.day}</p>
                          <p className="text-sm text-gray-500">{slot.time}</p>
                        </div>
                        {slot.active && <span className="text-primary">✓</span>}
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 bg-primary text-white py-2 rounded-lg font-medium">
                    + Add Time Slot
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-primary px-4 py-2 rounded-full mb-4">
                <span className="font-bold">Step 3</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Securely Connect with Friends
              </h3>
              <p className="text-gray-600 mb-6">
                Play-Cal is built on a network of trusted connections. Invite your friends, 
                family, and fellow parents to connect within the app using a secure, private 
                link. Once they accept, you can share and view availability.
              </p>
              <ul className="space-y-3">
                {[
                  "Send invites via text or email",
                  "Approve incoming connection requests",
                  "Control which child each person can see",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm mx-auto">
                  <h4 className="font-bold text-gray-900 mb-4">Your Connections</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Sarah M.", kids: "Emma's class", status: "connected" },
                      { name: "David K.", kids: "Soccer team", status: "connected" },
                      { name: "Lisa R.", kids: "Neighbor", status: "pending" },
                    ].map((person, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                          {person.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{person.name}</p>
                          <p className="text-sm text-gray-500">{person.kids}</p>
                        </div>
                        {person.status === "connected" ? (
                          <span className="text-green-500 text-sm">✓</span>
                        ) : (
                          <span className="text-orange-500 text-sm">⏳</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 border-2 border-primary text-primary py-2 rounded-lg font-medium">
                    Invite Friend
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-teal-100 text-accent px-4 py-2 rounded-full mb-4">
                <span className="font-bold">Step 4</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Request and Confirm Playdates
              </h3>
              <p className="text-gray-600 mb-6">
                Browse a friend's available time slots and send a playdate request with a 
                single tap. The request includes the proposed time, location, and any notes. 
                When they confirm, the event is automatically added to both of your calendars.
              </p>
              <ul className="space-y-3">
                {[
                  "See friends' open availability slots",
                  "Send requests with one tap",
                  "Get notified instantly when confirmed",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm mx-auto">
                  <div className="text-center mb-4">
                    <span className="text-4xl">🎉</span>
                    <h4 className="font-bold text-gray-900 mt-2">Playdate Confirmed!</h4>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">👧</span>
                      <span className="text-2xl">+</span>
                      <span className="text-2xl">👦</span>
                    </div>
                    <p className="font-medium text-gray-900">Emma + Max</p>
                    <p className="text-gray-600">Wednesday, 3:00 PM</p>
                    <p className="text-gray-600">Central Park Playground</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-white py-2 rounded-lg font-medium">
                      View Details
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-primary px-4 py-2 rounded-full mb-4">
                <span className="font-bold">Step 5</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Unify Your Party Schedule
              </h3>
              <p className="text-gray-600 mb-6">
                Stop hunting through your email for that one birthday party invitation. 
                Forward your Evite and Paperless Post emails to Play-Cal, and we'll 
                automatically pull all your invitations into one beautiful, organized list.
              </p>
              <ul className="space-y-3">
                {[
                  "Forward invitations to your unique address",
                  "See all parties in one organized list",
                  "RSVP and share with co-parents",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm mx-auto">
                  <h4 className="font-bold text-gray-900 mb-4">🎉 Party Invitations</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span>🎂</span>
                        <span className="font-medium text-gray-900">Lucas's 7th Birthday</span>
                      </div>
                      <p className="text-sm text-gray-600">Sat, Mar 15 • 2:00 PM</p>
                      <p className="text-sm text-orange-600 mt-1">RSVP by Mar 8</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span>🎈</span>
                        <span className="font-medium text-gray-900">Zoe's Pool Party</span>
                      </div>
                      <p className="text-sm text-gray-600">Sun, Mar 22 • 1:00 PM</p>
                      <p className="text-sm text-green-600 mt-1">✓ You're going</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Tools for Modern Parents
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">👨‍👩‍👧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                The Co-Parenting Dashboard
              </h3>
              <p className="text-gray-600">
                We built Play-Cal with co-parenting in mind. Invite your co-parent to your 
                family hub and give them access to the kids' schedules. You can grant full 
                admin rights or view-only permissions. This shared visibility reduces 
                miscommunication and ensures both parents are on the same page.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🗓️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Your Unified Calendar
              </h3>
              <p className="text-gray-600">
                Play-Cal's calendar view is your command center. It displays confirmed 
                playdates, synced party invitations, and any custom events you add. To make 
                it even more powerful, you can sync Play-Cal with your external Google, 
                Apple, or Outlook calendars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Experience the Simplicity?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Download Play-Cal for free today and discover how easy family scheduling can be. 
            Less time planning, more time for what matters.
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
