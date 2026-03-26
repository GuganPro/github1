import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { business, counters, features, plans, programs, testimonials, trainers } from './data/siteData';
import { ChevronDown, Dumbbell, Phone, MessageCircle, Clock3 } from 'lucide-react';

type Goal = 'Fat Loss' | 'Muscle Gain' | 'General Fitness' | 'Strength Training';
type Level = 'Beginner' | 'Intermediate' | 'Advanced';

const goals: Goal[] = ['Fat Loss', 'Muscle Gain', 'General Fitness', 'Strength Training'];
const levels: Level[] = ['Beginner', 'Intermediate', 'Advanced'];

const weekly = [
  { day: 'Monday', title: 'Chest + Triceps', exercises: ['Bench Press 4x10','Incline Dumbbell Press 3x12','Cable Fly 3x15','Tricep Pushdown 3x12'], rest: '60-90s' },
  { day: 'Tuesday', title: 'Back + Biceps', exercises: ['Lat Pulldown 4x10','Seated Row 3x12','Deadlift 3x8','Hammer Curl 3x12'], rest: '90s' },
  { day: 'Wednesday', title: 'Legs', exercises: ['Squats 4x10','Leg Press 3x12','Lunges 3x12','Calf Raises 4x20'], rest: '90s' },
  { day: 'Thursday', title: 'Shoulders + Core', exercises: ['Shoulder Press 4x10','Lateral Raise 3x15','Plank 3 rounds','Leg Raises 3x20'], rest: '60s' },
  { day: 'Friday', title: 'Full Body Strength', exercises: ['Compound Circuit 5 rounds','Push + Pull Supersets','Core Conditioning'], rest: '60-90s' },
  { day: 'Saturday', title: 'Cardio + Functional', exercises: ['Treadmill Intervals','Battle Rope','Sled Push','Mobility Stretches'], rest: '45-60s' },
  { day: 'Sunday', title: 'Recovery / Rest', exercises: ['Walk + Stretch','Hydration + Sleep Focus'], rest: 'N/A' },
];

const faqs = [
  'Do you have personal training?', 'What are the gym timings?', 'Are beginner-friendly programs available?', 'Do you offer weight loss programs?', 'How can I contact the gym?', 'Are custom workout schedules available?'
];

function App() {
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState<Goal>('Muscle Gain');
  const [level, setLevel] = useState<Level>('Intermediate');
  const [openDay, setOpenDay] = useState('Monday');
  const [faqOpen, setFaqOpen] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [programView, setProgramView] = useState('Muscle gain program');

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.hero-title', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo('.hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5');
    const id = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(id);
  }, []);

  const monthDays = useMemo(() => {
    const current = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const days: Date[] = [];
    while (current.getMonth() === selectedDate.getMonth()) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  }, [selectedDate]);

  const workoutForDate = (date: Date) => weekly[(date.getDate() - 1) % 7];

  return (
    <div className="bg-black text-white min-h-screen scroll-smooth">
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <section id="about" className="section"><h2>Premium Gym in Kumbakonam Built for Real Transformation</h2><p>Gold Gym Kumbakonam is a serious fitness destination for beginners and advanced members, combining disciplined coaching, structured training, and transformation-focused support.</p></section>
      <section className="section grid gap-6 md:grid-cols-2 lg:grid-cols-4">{counters.map((c) => <CounterCard key={c.label} {...c} />)}</section>
      <section id="why" className="section"><SectionTitle title="Why Choose Gold Gym Kumbakonam" /> <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{features.map((f) => <GlassCard key={f} title={f} />)}</div></section>
      <section id="programs" className="section"><SectionTitle title="Programs" /><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">{programs.map((p) => <ProgramCard key={p.title} title={p.title} description={p.description} />)}</div></section>
      <section id="trainers" className="section"><SectionTitle title="Trainer Spotlight" /><div className="grid md:grid-cols-2 gap-6">{trainers.map((t) => <TrainerCard key={t.name} {...t} />)}</div></section>
      <section id="membership" className="section"><SectionTitle title="Membership Plans" /><div className="grid md:grid-cols-3 gap-4">{plans.map((p) => <PricingCard key={p.name} {...p} />)}</div></section>
      <section className="section"><SectionTitle title="Gym Timings" /><div className="grid md:grid-cols-3 gap-4"><GlassCard title="Morning Batch: [Update Timing]"/><GlassCard title="Evening Batch: [Update Timing]"/><GlassCard title="Sunday: [Closed / Update Status]"/></div></section>

      <section id="schedule" className="section"><SectionTitle title="Workout Schedule" />
        <div className="flex flex-wrap gap-2 mb-3">{goals.map((g) => <TabButton key={g} active={goal===g} onClick={() => setGoal(g)}>{g}</TabButton>)}</div>
        <div className="flex flex-wrap gap-2 mb-6">{levels.map((l) => <TabButton key={l} active={level===l} onClick={() => setLevel(l)}>{l}</TabButton>)}</div>
        <p className="text-gold mb-4">{goal} • {level} plan with trainer-guided intensity and recovery.</p>
        <div className="space-y-3">{weekly.map((w) => (
          <motion.div key={w.day} className="card cursor-pointer" onClick={() => setOpenDay(openDay===w.day?'':w.day)} whileHover={{ scale: 1.01 }}>
            <div className="flex justify-between"><h3>{w.day}: {w.title}</h3><ChevronDown className={openDay===w.day ? 'rotate-180 transition' : 'transition'} /></div>
            <AnimatePresence>{openDay===w.day && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><ul className="mt-3 text-gray-300">{w.exercises.map((e) => <li key={e}>• {e}</li>)}</ul><p className="mt-2 text-sm">Warm-up: 8-10 min | Cool-down: 5-8 min | Rest: {w.rest} | Hydration: 500-750ml during session | Trainer note: Adjust loads progressively.</p></motion.div>}</AnimatePresence>
          </motion.div>
        ))}</div>
      </section>

      <section id="planner" className="section"><SectionTitle title="Date-wise Workout Planner" />
        <div className="flex gap-2 flex-wrap mb-6">{['Beginner program','Weight loss program','Muscle gain program','Strength program'].map((p)=><TabButton key={p} active={programView===p} onClick={()=>setProgramView(p)}>{p}</TabButton>)}</div>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 card grid grid-cols-7 gap-2">{monthDays.map((d)=>{const active=d.toDateString()===selectedDate.toDateString();return <button key={d.toISOString()} onClick={()=>setSelectedDate(d)} className={`p-3 rounded-xl text-sm ${active?'bg-gold text-black':'bg-zinc-900 text-gray-200 hover:bg-zinc-800'}`}>{d.getDate()}</button>;})}</div>
          <motion.div layout className="card">
            <h3>{selectedDate.toDateString()}</h3>
            <p className="text-gold">{programView}</p>
            <p className="mt-2 font-semibold">{workoutForDate(selectedDate).title}</p>
            <ul className="text-sm text-gray-300 mt-2">{workoutForDate(selectedDate).exercises.map((e)=><li key={e}>• {e}</li>)}</ul>
            <p className="text-sm mt-2">Duration: 60-75 min • Difficulty: Moderate • Recovery: Sleep 7-8 hrs • Note: Consult trainer for custom intensity.</p>
          </motion.div>
        </div>
      </section>

      <section className="section"><SectionTitle title="Transformation Journey" /><div className="grid md:grid-cols-4 gap-4">{['Weight Loss','Strength Gain','Discipline','Consistency'].map((x)=><GlassCard key={x} title={x} />)}</div></section>
      <section id="gallery" className="section"><SectionTitle title="Gallery" /><div className="columns-1 md:columns-3 gap-4 space-y-4">{[1,2,3,4,5,6].map((i)=><img key={i} loading="lazy" className="rounded-2xl hover:scale-[1.02] transition" src={`https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=${900+i*3}&auto=format&fit=crop`} alt="Gym showcase placeholder" />)}</div></section>
      <section id="testimonials" className="section"><SectionTitle title="Testimonials" /><div className="grid md:grid-cols-3 gap-4">{testimonials.map((t)=><GlassCard key={t.name} title={t.name} description={t.text} />)}</div></section>
      <section id="faq" className="section"><SectionTitle title="FAQ" /><div className="space-y-3">{faqs.map((q,i)=><motion.div key={q} className="card" onClick={()=>setFaqOpen(faqOpen===i?-1:i)}><div className="flex justify-between"><h3>{q}</h3><ChevronDown className={faqOpen===i?'rotate-180 transition':'transition'} /></div><AnimatePresence>{faqOpen===i && <motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="text-gray-300 mt-2">Yes. Please contact us for updated details and personalized guidance.</motion.p>}</AnimatePresence></motion.div>)}</div></section>
      <section id="contact" className="section"><SectionTitle title="Start Your Fitness Journey Today" /><div className="grid lg:grid-cols-2 gap-6"><div className="card space-y-3"><input className="input" placeholder="Name"/><input className="input" placeholder="Phone"/><input className="input" placeholder="Email"/><select className="input"><option>Weight Loss</option><option>Muscle Gain</option><option>Personal Training</option><option>General Fitness</option><option>Strength Training</option></select><input className="input" placeholder="Preferred Time"/><textarea className="input" placeholder="Message" rows={4}/><button className="btn w-full">Send Enquiry</button></div>
      <div className="card space-y-3"><p><strong>Address:</strong> {business.address}</p><p><strong>Phone:</strong> {business.phone}</p><p><strong>Email:</strong> {business.email}</p><a className="btn" href={business.whatsapp}>WhatsApp Enquiry</a><a className="btn-outline" href={business.map}>Open Map</a></div></div></section>
      <footer className="py-10 border-t border-zinc-800 px-6 text-sm text-gray-400"><p>{business.name} • Best gym in Kumbakonam | Fitness center in Kumbakonam | Personal trainer in Kumbakonam</p><p className="mt-2">© {new Date().getFullYear()} {business.name}. Built for transformation and trust.</p></footer>
      <FloatingActions />
    </div>
  );
}

const Preloader = () => <motion.div initial={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black flex items-center justify-center"><motion.div animate={{scale:[1,1.15,1]}} transition={{repeat:Infinity,duration:1.3}} className="text-gold text-3xl font-bold">GOLD GYM KUMBAKONAM</motion.div></motion.div>;

const ScrollProgress = () => {
  const [w, setW] = useState(0);
  useEffect(() => { const on = () => setW((window.scrollY/(document.body.scrollHeight-window.innerHeight))*100); window.addEventListener('scroll',on); on(); return ()=>window.removeEventListener('scroll',on); }, []);
  return <div className="fixed top-0 left-0 h-1 bg-gold z-50" style={{width:`${w}%`}} />;
};

const Navbar = () => <nav className="fixed top-1 left-1/2 -translate-x-1/2 z-40 mt-2 bg-zinc-900/80 backdrop-blur border border-zinc-700 rounded-full px-4 py-2 flex gap-4 text-xs md:text-sm">{['about','why','programs','schedule','planner','contact'].map((x)=><a key={x} href={`#${x}`} className="hover:text-gold capitalize">{x}</a>)}</nav>;

const Hero = () => <header className="min-h-screen relative flex items-center justify-center text-center px-6 overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.25),transparent_40%),linear-gradient(120deg,#080808,#161616_50%,#0a0a0a)]"/><motion.div className="relative max-w-4xl" initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1}}><p className="text-gold tracking-[0.3em] text-xs mb-3">BEST GYM IN KUMBAKONAM</p><h1 className="hero-title text-4xl md:text-7xl font-black uppercase leading-tight">Transform Your Body at Gold Gym Kumbakonam</h1><p className="hero-sub text-gray-300 mt-4 text-lg">Elite strength, cardio, personal training, and transformation programs in a premium fitness center in Kumbakonam.</p><p className="mt-3 text-gold">Train Hard. Stay Strong. Transform for Life.</p><div className="flex flex-wrap justify-center gap-3 mt-8"><a href="#contact" className="btn">Join Now</a><a href="#programs" className="btn-outline">View Programs</a><a href={business.whatsapp} className="btn-outline">WhatsApp Enquiry</a></div></motion.div></header>;

const SectionTitle = ({ title }: { title: string }) => <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>;
const GlassCard = ({ title, description }: { title: string; description?: string }) => <motion.article whileHover={{ y: -6 }} className="card"><h3 className="font-semibold text-lg">{title}</h3>{description && <p className="text-gray-300 mt-2">{description}</p>}</motion.article>;
const ProgramCard = ({title,description}:{title:string;description:string}) => <motion.article whileHover={{y:-8, boxShadow:'0 0 30px rgba(212,175,55,0.2)'}} className="card"><Dumbbell className="text-gold"/><h3 className="mt-3 text-xl font-semibold">{title}</h3><p className="text-gray-300 mt-1">{description}</p><button className="btn mt-4">Enquire</button></motion.article>;
const TrainerCard = ({name,role,bio,image}:{name:string;role:string;bio:string;image:string}) => <article className="card"><img src={image} loading="lazy" className="h-72 w-full object-cover rounded-xl"/><h3 className="mt-3 text-2xl">{name}</h3><p className="text-gold">{role}</p><p className="text-gray-300 mt-2">{bio}</p></article>;
const PricingCard = ({name,price,recommended}:{name:string;price:string;recommended:boolean}) => <motion.article whileHover={{y:-8}} className={`card ${recommended?'border-gold shadow-glow':''}`}><h3 className="text-2xl">{name}</h3><p className="text-gold text-xl mt-2">{price}</p><ul className="text-gray-300 mt-3 text-sm"><li>• Structured Workout Programs</li><li>• Trainer Guidance</li><li>• Progress Tracking</li></ul><button className="btn mt-4">Join Plan</button></motion.article>;
const TabButton = ({children, active, onClick}:{children:string;active:boolean;onClick:()=>void}) => <button onClick={onClick} className={`px-4 py-2 rounded-full text-sm border ${active?'bg-gold text-black border-gold':'border-zinc-700 hover:border-gold'}`}>{children}</button>;
const CounterCard = ({label,value}:{label:string;value:number}) => { const [count,setCount]=useState(0); useEffect(()=>{const s=Date.now();const t=setInterval(()=>{const p=Math.min(1,(Date.now()-s)/1200);setCount(Math.floor(value*p)); if(p===1) clearInterval(t);},16); return()=>clearInterval(t);},[value]); return <div className="card text-center"><p className="text-4xl font-bold text-gold">{count}+</p><p className="text-gray-300 mt-1">{label}</p></div>; };
const FloatingActions = () => <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3"><a href={business.whatsapp} className="rounded-full p-3 bg-green-500 text-white animate-pulse"><MessageCircle/></a><a href={`tel:${business.phone}`} className="rounded-full p-3 bg-gold text-black shadow-glow"><Phone/></a><div className="rounded-full p-3 bg-zinc-800 text-white"><Clock3/></div></div>;

export default App;
