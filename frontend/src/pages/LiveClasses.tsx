import { Video, Clock, User, ExternalLink, Sparkles } from 'lucide-react';

interface LiveClass {
  id: string;
  title: string;
  instructor: string;
  scheduledDateTime: string;
  description: string;
  liveSessionUrl: string;
  subject: string;
  colorAccent: string;
}

const liveClasses: LiveClass[] = [
  {
    id: '1',
    title: 'Physics Fundamentals – Laws of Motion',
    instructor: 'Dr. Rishit Kumar',
    scheduledDateTime: 'Mon, Mar 3, 2026 · 10:00 AM IST',
    description:
      'Deep dive into Newton\'s Laws of Motion with real-world examples, numerical problem-solving, and interactive Q&A. Perfect for Class 9 students preparing for exams.',
    liveSessionUrl: 'https://zoom.us/j/example1',
    subject: 'Physics',
    colorAccent: 'holi-blue',
  },
  {
    id: '2',
    title: 'Contemporary India – Geography Concepts',
    instructor: 'Ms. Priya Sharma',
    scheduledDateTime: 'Tue, Mar 4, 2026 · 11:30 AM IST',
    description:
      'Explore key geography concepts from Contemporary India including drainage systems, climate patterns, and natural vegetation. Includes map-based exercises.',
    liveSessionUrl: 'https://zoom.us/j/example2',
    subject: 'Social Science',
    colorAccent: 'holi-green',
  },
  {
    id: '3',
    title: 'Physics Numericals – Work, Energy & Power',
    instructor: 'Dr. Rishit Kumar',
    scheduledDateTime: 'Wed, Mar 5, 2026 · 10:00 AM IST',
    description:
      'Intensive numerical practice session covering Work, Energy, and Power. Step-by-step solutions to past exam questions and tricky problems.',
    liveSessionUrl: 'https://zoom.us/j/example3',
    subject: 'Physics',
    colorAccent: 'holi-magenta',
  },
  {
    id: '4',
    title: 'Democratic Politics – Constitution & Rights',
    instructor: 'Mr. Arjun Mehta',
    scheduledDateTime: 'Thu, Mar 6, 2026 · 2:00 PM IST',
    description:
      'Understanding the Indian Constitution, Fundamental Rights, and Directive Principles. Interactive discussion with case studies and current affairs connections.',
    liveSessionUrl: 'https://zoom.us/j/example4',
    subject: 'Civics',
    colorAccent: 'holi-orange',
  },
  {
    id: '5',
    title: 'Gravitation & Floatation – Concept Clarity',
    instructor: 'Dr. Rishit Kumar',
    scheduledDateTime: 'Fri, Mar 7, 2026 · 10:00 AM IST',
    description:
      'Master the concepts of Gravitation, Universal Law, and Floatation with clear explanations, diagrams, and solved numericals from NCERT and beyond.',
    liveSessionUrl: 'https://zoom.us/j/example5',
    subject: 'Physics',
    colorAccent: 'holi-yellow',
  },
  {
    id: '6',
    title: 'Economics – Poverty & Food Security',
    instructor: 'Ms. Priya Sharma',
    scheduledDateTime: 'Sat, Mar 8, 2026 · 12:00 PM IST',
    description:
      'Comprehensive revision of Poverty as a Challenge and Food Security in India. Includes data interpretation, government schemes, and exam-focused tips.',
    liveSessionUrl: 'https://zoom.us/j/example6',
    subject: 'Economics',
    colorAccent: 'holi-pink',
  },
];

const subjectBadgeColors: Record<string, string> = {
  Physics: 'bg-holi-blue/15 text-holi-blue border-holi-blue/30',
  'Social Science': 'bg-holi-green/15 text-holi-green border-holi-green/30',
  Civics: 'bg-holi-orange/15 text-holi-orange border-holi-orange/30',
  Economics: 'bg-holi-pink/15 text-holi-pink border-holi-pink/30',
};

const cardBorderColors: Record<string, string> = {
  'holi-blue': 'border-holi-blue/40 hover:border-holi-blue',
  'holi-green': 'border-holi-green/40 hover:border-holi-green',
  'holi-magenta': 'border-holi-magenta/40 hover:border-holi-magenta',
  'holi-orange': 'border-holi-orange/40 hover:border-holi-orange',
  'holi-yellow': 'border-holi-yellow/40 hover:border-holi-yellow',
  'holi-pink': 'border-holi-pink/40 hover:border-holi-pink',
};

const cardTopBarColors: Record<string, string> = {
  'holi-blue': 'bg-holi-blue',
  'holi-green': 'bg-holi-green',
  'holi-magenta': 'bg-holi-magenta',
  'holi-orange': 'bg-holi-orange',
  'holi-yellow': 'bg-holi-yellow',
  'holi-pink': 'bg-holi-pink',
};

const joinButtonColors: Record<string, string> = {
  'holi-blue': 'bg-holi-blue hover:bg-holi-blue/80 shadow-[0_4px_14px_0_rgba(0,120,255,0.35)]',
  'holi-green': 'bg-holi-green hover:bg-holi-green/80 shadow-[0_4px_14px_0_rgba(0,180,80,0.35)]',
  'holi-magenta': 'bg-holi-magenta hover:bg-holi-magenta/80 shadow-[0_4px_14px_0_rgba(220,0,120,0.35)]',
  'holi-orange': 'bg-holi-orange hover:bg-holi-orange/80 shadow-[0_4px_14px_0_rgba(255,120,0,0.35)]',
  'holi-yellow': 'bg-holi-yellow hover:bg-holi-yellow/80 shadow-[0_4px_14px_0_rgba(255,200,0,0.35)]',
  'holi-pink': 'bg-holi-pink hover:bg-holi-pink/80 shadow-[0_4px_14px_0_rgba(255,80,160,0.35)]',
};

export default function LiveClasses() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative Holi splash background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-72 opacity-10">
          <img
            src="/assets/generated/holi-splash.dim_1200x600.png"
            alt=""
            className="w-full h-full object-cover animate-splash-wave"
          />
        </div>
        <div className="absolute top-16 left-8 opacity-20 animate-powder-burst">
          <img src="/assets/generated/gulal-burst.dim_128x128.png" alt="" className="w-24 h-24" />
        </div>
        <div className="absolute top-16 right-8 opacity-20 animate-color-float" style={{ animationDelay: '0.8s' }}>
          <img src="/assets/generated/gulal-burst.dim_128x128.png" alt="" className="w-20 h-20" style={{ filter: 'hue-rotate(120deg)' }} />
        </div>
        <div className="absolute bottom-32 left-12 opacity-15 animate-color-float" style={{ animationDelay: '1.5s' }}>
          <img src="/assets/generated/gulal-burst.dim_128x128.png" alt="" className="w-16 h-16" style={{ filter: 'hue-rotate(240deg)' }} />
        </div>
        <div className="absolute bottom-32 right-12 opacity-15 animate-powder-burst" style={{ animationDelay: '2s' }}>
          <img src="/assets/generated/water-balloon.dim_256x256.png" alt="" className="w-20 h-20" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-holi-magenta" />
            <span className="text-sm font-medium text-primary">Live Sessions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-holi-magenta via-holi-orange to-holi-yellow bg-clip-text text-transparent">
              Live Class Portal
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our interactive live sessions led by expert instructors. Click <strong>Join</strong> to enter the live classroom directly.
          </p>

          {/* Holi color dots decoration */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {['bg-holi-magenta', 'bg-holi-yellow', 'bg-holi-blue', 'bg-holi-green', 'bg-holi-orange', 'bg-holi-pink'].map((color, i) => (
              <span
                key={i}
                className={`inline-block w-3 h-3 rounded-full ${color} animate-color-splash`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveClasses.map((cls) => (
            <div
              key={cls.id}
              className={`relative bg-card rounded-2xl border-2 ${cardBorderColors[cls.colorAccent]} shadow-holi-multi transition-all duration-300 hover:scale-[1.02] hover:shadow-lg overflow-hidden flex flex-col`}
            >
              {/* Top color bar */}
              <div className={`h-1.5 w-full ${cardTopBarColors[cls.colorAccent]}`} />

              <div className="p-6 flex flex-col flex-1">
                {/* Subject badge */}
                <div className="mb-3">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${
                      subjectBadgeColors[cls.subject] ?? 'bg-primary/10 text-primary border-primary/20'
                    }`}
                  >
                    {cls.subject}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-foreground mb-2 leading-snug">{cls.title}</h2>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{cls.description}</p>

                {/* Meta info */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4 shrink-0 text-holi-magenta" />
                    <span>{cls.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 shrink-0 text-holi-blue" />
                    <span>{cls.scheduledDateTime}</span>
                  </div>
                </div>

                {/* Join Button */}
                <a
                  href={cls.liveSessionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-white font-semibold text-sm transition-all duration-200 ${joinButtonColors[cls.colorAccent]}`}
                >
                  <Video className="w-4 h-4" />
                  Join Live Class
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            🎨 All sessions are conducted live. Make sure to join a few minutes early to set up your audio and video.
          </p>
        </div>
      </div>
    </div>
  );
}
