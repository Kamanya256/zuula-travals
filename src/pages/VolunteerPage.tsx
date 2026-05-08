import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, Home, Stethoscope, GraduationCap, ArrowRight, MapPin, Calendar, CheckCircle } from "lucide-react";
import cultureImg from "@/assets/culture-uganda.jpg";
import heroImg from "@/assets/hero-uganda.jpg";

const opportunities = [
  {
    title: "Orphanage & Children's Homes",
    icon: Home,
    location: "Kampala, Jinja, Mukono",
    duration: "1 week - 3 months",
    desc: "Make a lasting impact on children's lives by volunteering at orphanages across Uganda. Help with education, play activities, feeding programs, and mentorship. Many orphanages welcome visitors for short and long stays.",
    activities: ["Teaching basic English & math", "Organizing play & sports", "Donation drives & feeding programs", "Mentoring teenagers", "Infrastructure improvement projects"],
    img: cultureImg,
  },
  {
    title: "Elderly Care & Old Age Homes",
    icon: Heart,
    location: "Kampala, Entebbe, Masaka",
    duration: "1 week - 2 months",
    desc: "Visit and support elderly residents in care homes who often lack family support. Spend time sharing stories, assisting with daily needs, organizing activities, and bringing comfort and companionship.",
    activities: ["Companionship & storytelling", "Organizing recreational activities", "Health & hygiene assistance", "Donation of essentials", "Cultural exchange programs"],
    img: heroImg,
  },
  {
    title: "Hospital & Health Volunteering",
    icon: Stethoscope,
    location: "Mulago, Mengo, Rural Clinics",
    duration: "2 weeks - 6 months",
    desc: "Support healthcare facilities by volunteering in hospitals and rural health clinics. Medical professionals and non-medical volunteers are both welcome to assist with patient care, health education, and community outreach.",
    activities: ["Patient support & care", "Health education workshops", "Community health outreach", "Medical supply distribution", "Rural clinic support"],
    img: cultureImg,
  },
  {
    title: "Education & School Support",
    icon: GraduationCap,
    location: "Multiple Locations",
    duration: "2 weeks - 6 months",
    desc: "Teach in rural schools, support literacy programs, and help build libraries. Uganda's education system welcomes volunteers who can share knowledge, mentor students, and support teachers with resources.",
    activities: ["Teaching English, math, science", "Library setup & management", "Computer literacy programs", "After-school tutoring", "School infrastructure projects"],
    img: heroImg,
  },
  {
    title: "Community Development",
    icon: Users,
    location: "Rural Uganda",
    duration: "1 week - 3 months",
    desc: "Join community development projects including building water wells, constructing schools, farming initiatives, and women's empowerment programs. Work alongside local communities to create sustainable change.",
    activities: ["Water well construction", "Sustainable farming projects", "Women's empowerment workshops", "Sanitation & hygiene programs", "Micro-enterprise support"],
    img: cultureImg,
  },
];

export default function VolunteerPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={cultureImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Volunteer in Uganda</h1>
          <p className="text-primary-foreground/80 text-lg">
            Make a difference while experiencing the beauty of East Africa. Visit orphanages, hospitals, elderly homes, and community projects.
          </p>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-8 bg-accent/10 border-b border-accent/20">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">🤝 <strong>Welcome, Kind Hearts!</strong> Uganda warmly welcomes volunteers from around the world. Your time, skills, and compassion can transform lives. We help connect you with verified, safe, and impactful volunteer opportunities across the country.</p>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Volunteer Opportunities</h2>
            <p className="text-muted-foreground">Choose from a variety of meaningful volunteer programs. All placements include orientation, local support, and accommodation assistance.</p>
          </div>

          <div className="space-y-12">
            {opportunities.map((opp, idx) => (
              <div key={opp.title} className={`grid lg:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={`${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="rounded-xl overflow-hidden h-72">
                    <img src={opp.img} alt={opp.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className={`${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <opp.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold">{opp.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{opp.duration}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{opp.desc}</p>
                  <div className="space-y-1.5 mb-5">
                    {opp.activities.map((a) => (
                      <div key={a} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />{a}
                      </div>
                    ))}
                  </div>
                  <Button asChild className="rounded-full">
                    <Link to={`/booking?package=volunteer-${opp.title.toLowerCase().replace(/\s+/g, "-")}`}>
                      Sign Up to Volunteer <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-secondary/50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-center mb-8">What We Provide</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Airport pickup & orientation", "Accommodation assistance", "Local SIM card & internet", "Safety briefing & 24/7 support", "Cultural immersion program", "Certificate of participation", "Volunteer placement matching", "Local transport guidance", "Emergency contacts & insurance info"].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-card rounded-xl p-4 border border-border text-sm">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-primary-foreground/80 mb-6">Contact us to discuss volunteer placements, requirements, and travel arrangements.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/packages">Browse Tour Packages</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
