import { useState } from 'react';
import { CheckCircle, Loader2, User, Phone, Mail, Users, School, BookOpen, Sparkles } from 'lucide-react';
import { useSubmitRegistration } from '../hooks/useQueries';

interface FormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  gender: string;
  schoolName: string;
  classLevel: string;
}

const initialForm: FormData = {
  fullName: '',
  mobileNumber: '',
  email: '',
  gender: '',
  schoolName: '',
  classLevel: '',
};

export default function RegistrationPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitRegistration = useSubmitRegistration();

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!form.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Enter a valid mobile number';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.gender) newErrors.gender = 'Please select a gender';
    if (!form.schoolName.trim()) newErrors.schoolName = 'School name is required';
    if (!form.classLevel.trim()) newErrors.classLevel = 'Class is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submitRegistration.mutateAsync({
        fullName: form.fullName.trim(),
        mobileNumber: form.mobileNumber.trim(),
        email: form.email.trim(),
        gender: form.gender,
        schoolName: form.schoolName.trim(),
        classLevel: form.classLevel.trim(),
      });
      setSubmitted(true);
    } catch {
      // error handled by mutation state
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        {/* Decorative Holi elements */}
        <div className="absolute top-32 left-8 opacity-20 pointer-events-none">
          <img src="/assets/generated/gulal-burst.dim_128x128.png" alt="" className="w-24 h-24 animate-color-splash" />
        </div>
        <div className="absolute top-32 right-8 opacity-20 pointer-events-none">
          <img src="/assets/generated/water-balloon.dim_256x256.png" alt="" className="w-28 h-28 animate-color-float" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-holi-glow p-10 max-w-md w-full text-center relative overflow-hidden">
          {/* Top color bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-holi-gradient rounded-t-2xl" />

          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-holi-magenta via-holi-yellow to-holi-green flex items-center justify-center shadow-holi-splash animate-color-splash">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">Registration Successful! 🎉</h2>
          <p className="text-muted-foreground mb-6">
            Thank you, <span className="font-semibold text-primary">{form.fullName}</span>! Your registration has been submitted successfully. We'll get in touch with you soon.
          </p>

          <div className="bg-muted/50 rounded-xl p-4 text-left space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-holi-magenta flex-shrink-0" />
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium text-foreground">{form.fullName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <School className="w-4 h-4 text-holi-blue flex-shrink-0" />
              <span className="text-muted-foreground">School:</span>
              <span className="font-medium text-foreground">{form.schoolName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-holi-green flex-shrink-0" />
              <span className="text-muted-foreground">Class:</span>
              <span className="font-medium text-foreground">{form.classLevel}</span>
            </div>
          </div>

          <button
            onClick={() => { setForm(initialForm); setSubmitted(false); setErrors({}); }}
            className="w-full py-2.5 px-6 rounded-xl bg-gradient-to-r from-holi-magenta to-holi-pink text-primary-foreground font-semibold shadow-holi-splash hover:opacity-90 transition-opacity"
          >
            Register Another Student
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-12 px-4 relative">
      {/* Decorative Holi elements */}
      <div className="absolute top-8 left-4 opacity-15 pointer-events-none hidden md:block">
        <img src="/assets/generated/gulal-burst.dim_128x128.png" alt="" className="w-28 h-28 animate-powder-burst" />
      </div>
      <div className="absolute top-8 right-4 opacity-15 pointer-events-none hidden md:block">
        <img src="/assets/generated/water-balloon.dim_256x256.png" alt="" className="w-32 h-32 animate-color-float" style={{ animationDelay: '1.5s' }} />
      </div>
      <div className="absolute bottom-16 left-1/4 opacity-10 pointer-events-none hidden lg:block">
        <img src="/assets/generated/holi-splash.dim_1200x600.png" alt="" className="w-48 h-24 animate-splash-wave" />
      </div>

      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-holi-magenta via-holi-yellow to-holi-blue flex items-center justify-center shadow-holi-splash">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Student Registration
          </h1>
          <p className="text-muted-foreground text-base">
            Join <span className="font-semibold text-primary">Excellent Education Classes</span> — fill in your details below
          </p>
          {/* Holi color dots */}
          <div className="flex justify-center gap-2 mt-3">
            {['bg-holi-magenta', 'bg-holi-yellow', 'bg-holi-blue', 'bg-holi-green', 'bg-holi-orange'].map((c, i) => (
              <span key={i} className={`inline-block w-2.5 h-2.5 rounded-full ${c} opacity-80`} />
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl shadow-holi-splash relative overflow-hidden">
          {/* Top color bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-holi-gradient" />

          <form onSubmit={handleSubmit} className="p-6 md:p-8 pt-8 space-y-5">
            {/* Error banner */}
            {submitRegistration.isError && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-xl px-4 py-3 text-sm">
                Something went wrong. Please try again.
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <User className="w-4 h-4 text-holi-magenta" />
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors.fullName ? 'border-destructive' : 'border-input'
                }`}
              />
              {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Phone className="w-4 h-4 text-holi-orange" />
                Mobile Number <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                value={form.mobileNumber}
                onChange={(e) => handleChange('mobileNumber', e.target.value)}
                placeholder="e.g. 9876543210"
                className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors.mobileNumber ? 'border-destructive' : 'border-input'
                }`}
              />
              {errors.mobileNumber && <p className="text-destructive text-xs mt-1">{errors.mobileNumber}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Mail className="w-4 h-4 text-holi-blue" />
                Email Address <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors.email ? 'border-destructive' : 'border-input'
                }`}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Users className="w-4 h-4 text-holi-pink" />
                Gender <span className="text-destructive">*</span>
              </label>
              <select
                value={form.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer ${
                  errors.gender ? 'border-destructive' : 'border-input'
                } ${!form.gender ? 'text-muted-foreground' : ''}`}
              >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-destructive text-xs mt-1">{errors.gender}</p>}
            </div>

            {/* School Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <School className="w-4 h-4 text-holi-green" />
                School Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={form.schoolName}
                onChange={(e) => handleChange('schoolName', e.target.value)}
                placeholder="Enter your school name"
                className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors.schoolName ? 'border-destructive' : 'border-input'
                }`}
              />
              {errors.schoolName && <p className="text-destructive text-xs mt-1">{errors.schoolName}</p>}
            </div>

            {/* Class */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <BookOpen className="w-4 h-4 text-holi-yellow" />
                Class <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={form.classLevel}
                onChange={(e) => handleChange('classLevel', e.target.value)}
                placeholder="e.g. Class 9, Class 10, Class 11..."
                className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors.classLevel ? 'border-destructive' : 'border-input'
                }`}
              />
              {errors.classLevel && <p className="text-destructive text-xs mt-1">{errors.classLevel}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitRegistration.isPending}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-holi-magenta via-holi-pink to-holi-orange text-primary-foreground font-bold text-base shadow-holi-splash hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {submitRegistration.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Submit Registration
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center pt-1">
              All fields marked with <span className="text-destructive font-bold">*</span> are required.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
