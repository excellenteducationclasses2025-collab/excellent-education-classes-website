import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, BookOpen, Users, Award, Sparkles } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12 relative">
      {/* Floating Holi Color Decorations */}
      <div className="absolute top-10 left-10 opacity-30 pointer-events-none">
        <img
          src="/assets/generated/gulal-burst.dim_128x128.png"
          alt=""
          className="w-16 h-16 animate-color-float"
        />
      </div>
      <div className="absolute top-32 right-20 opacity-30 pointer-events-none">
        <img
          src="/assets/generated/water-balloon.dim_256x256.png"
          alt=""
          className="w-20 h-20 animate-powder-burst"
          style={{ animationDelay: '1s' }}
        />
      </div>
      <div className="absolute bottom-32 left-20 opacity-30 pointer-events-none">
        <img
          src="/assets/generated/gulal-burst.dim_128x128.png"
          alt=""
          className="w-12 h-12 animate-color-splash"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Hero Section */}
      <section className="text-center mb-16 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-holi-magenta/30 via-holi-yellow/20 to-holi-blue/30 blur-3xl rounded-full"></div>
            <div className="relative z-10 p-2 rounded-full bg-gradient-to-br from-holi-magenta/20 via-holi-yellow/20 to-holi-blue/20 shadow-holi-splash">
              <img
                src="/assets/Blue and White Modern School Logo_20260107_110747_0000.png"
                alt="Excellent Education Classes Official Logo"
                className="w-48 h-48 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
        
        {/* Holi Splash Background */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/generated/holi-splash.dim_1200x600.png"
            alt=""
            className="w-96 h-auto opacity-40 animate-splash-wave"
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-holi-magenta via-holi-yellow to-holi-blue bg-clip-text text-transparent">
          Excellent Education Classes
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-holi-magenta" />
          Empowering minds, shaping futures
          <Sparkles className="w-6 h-6 text-holi-blue" />
        </p>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join our community of learners and unlock your full potential with expert guidance,
          comprehensive curriculum, and personalized attention.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => navigate({ to: '/live-classes' })}
            className="text-lg px-8 py-6 shadow-holi-splash hover:shadow-holi-glow transition-all bg-gradient-to-r from-holi-magenta to-holi-pink hover:from-holi-pink hover:to-holi-magenta"
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            View Live Classes
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate({ to: '/admin-login' })}
            className="text-lg px-8 py-6 shadow-lg hover:shadow-holi-splash transition-all border-2 border-primary hover:bg-primary/10"
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            Admin Login
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-holi-magenta via-holi-yellow to-holi-blue bg-clip-text text-transparent">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:shadow-holi-splash transition-all hover:scale-105 bg-gradient-to-br from-card to-holi-magenta/5">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-holi-magenta to-holi-pink flex items-center justify-center shadow-holi-splash">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Comprehensive Curriculum
              </h3>
              <p className="text-muted-foreground">
                Well-structured courses covering all essential topics with detailed study materials.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-holi-splash transition-all hover:scale-105 bg-gradient-to-br from-card to-holi-yellow/5">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-holi-yellow to-holi-orange flex items-center justify-center shadow-holi-splash">
                <Users className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Expert Teachers
              </h3>
              <p className="text-muted-foreground">
                Learn from experienced educators dedicated to your academic success.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-holi-splash transition-all hover:scale-105 bg-gradient-to-br from-card to-holi-blue/5">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-holi-blue to-holi-green flex items-center justify-center shadow-holi-splash">
                <Award className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Proven Results
              </h3>
              <p className="text-muted-foreground">
                Track record of excellent academic performance and student satisfaction.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-holi-splash transition-all hover:scale-105 bg-gradient-to-br from-card to-holi-green/5">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-holi-green to-holi-blue flex items-center justify-center shadow-holi-splash">
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Personalized Attention
              </h3>
              <p className="text-muted-foreground">
                Small batch sizes ensuring individual focus and customized learning paths.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 px-6 rounded-2xl bg-gradient-to-br from-holi-magenta/10 via-holi-yellow/10 to-holi-blue/10 border-2 border-primary/20 shadow-holi-splash relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <img
            src="/assets/generated/holi-splash.dim_1200x600.png"
            alt=""
            className="w-96 h-48"
          />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-holi-magenta via-holi-yellow to-holi-blue bg-clip-text text-transparent">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore our live classes and access premium study materials with expert guidance and a
            supportive learning community.
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/live-classes' })}
            className="text-lg px-10 py-6 shadow-holi-glow hover:shadow-holi-splash transition-all bg-gradient-to-r from-holi-magenta via-holi-pink to-holi-yellow hover:from-holi-yellow hover:via-holi-pink hover:to-holi-magenta"
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
}
