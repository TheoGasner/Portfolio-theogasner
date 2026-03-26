import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactSection() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('gasnertheo@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [form, setForm] = useState({ from_name: '', from_email: '', subject: '', message: '' });

  const isEn = language === 'en';

  const labels = {
    name:        isEn ? 'Full name'        : 'Nom complet',
    namePh:      isEn ? 'Your name'        : 'Votre nom',
    email:       isEn ? 'Email'            : 'Email',
    emailPh:     isEn ? 'your@email.com'   : 'votre.email@exemple.com',
    subject:     isEn ? 'Subject'          : 'Sujet',
    subjectPh:   isEn ? 'Subject of your message' : 'Objet de votre message',
    message:     isEn ? 'Message'          : 'Message',
    messagePh:   isEn ? 'Write your message here...' : 'Ecrivez votre message ici...',
    send:        isEn ? 'Send message'     : 'Envoyer le message',
    sending:     isEn ? 'Sending...'       : 'Envoi...',
    sent:        isEn ? 'Message sent!'    : 'Message envoye !',
    errorBtn:    isEn ? 'Error, retry'     : 'Erreur, reessaie',
    successMsg:  isEn ? 'Your message was sent! I will reply very soon.' : 'Ton message a bien ete envoye ! Je te repondrai tres vite.',
    errorMsg:    isEn ? 'An error occurred. Check your connection or try again later.' : 'Une erreur est survenue. Verifie ta connexion ou reessaie plus tard.',
    visitProfile: isEn ? 'Visit my profile' : 'Visitez mon profil',
    copied:      isEn ? 'Copied!'           : 'Copié !',
    phone:       isEn ? 'Phone'            : 'Telephone',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.from_name,
          email: form.from_email,
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ from_name: '', from_email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative w-full py-20 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-500/5 to-neon-600/10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-electric-500/20 rounded-full blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-neon-600/20 rounded-full blur-3xl opacity-30" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-reveal-clip text-4xl md:text-5xl font-grotesk font-bold mb-16 leading-tight">{t('contact.title')}</h2>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">{t('contact.subtitle')}</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form onSubmit={handleSubmit} className="space-y-6 glass-dark p-8 rounded-2xl">
              <div>
                <label className="block text-sm font-medium text-electric-400 mb-2">{labels.name}</label>
                <input type="text" name="from_name" value={form.from_name} onChange={handleChange} required placeholder={labels.namePh} className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-electric-400 mb-2">{labels.email}</label>
                <input type="email" name="from_email" value={form.from_email} onChange={handleChange} required placeholder={labels.emailPh} className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neon-400 mb-2">{labels.subject}</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder={labels.subjectPh} className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-500 focus:ring-1 focus:ring-neon-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">{labels.message}</label>
                <textarea name="message" value={form.message} onChange={handleChange} required placeholder={labels.messagePh} rows={5} className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none" />
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full px-6 py-3.5 bg-gradient-to-r from-electric-500 to-electric-600 text-white font-semibold rounded-lg hover:shadow-glow active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {status === 'loading' && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                {status === 'loading' ? labels.sending : status === 'success' ? labels.sent : status === 'error' ? labels.errorBtn : labels.send}
              </button>
              {status === 'success' && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm text-green-400 font-medium">
                  {labels.successMsg}
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm text-red-400 font-medium">
                  {labels.errorMsg}
                </motion.p>
              )}
            </form>
          </motion.div>
          <motion.div className="space-y-6" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <motion.button onClick={copyEmail} className="group block w-full text-left glass-dark p-6 rounded-xl hover:shadow-glow transition-all relative overflow-hidden" whileHover={{ x: 6, scale: 1.02, transition: { duration: 0.2 } }} whileTap={{ scale: 0.97 }}>
              <div className="mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-electric-400">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-electric-400 transition-colors">Email</h3>
              <p className="text-gray-200 group-hover:text-white transition-colors">gasnertheo@gmail.com</p>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-3 right-4 text-xs font-semibold text-green-400 bg-dark-800 px-2 py-1 rounded-md"
                >
                  {labels.copied}
                </motion.span>
              )}
            </motion.button>
            <motion.a href="tel:07662826249" className="group block glass-dark p-6 rounded-xl hover:shadow-glow transition-all" whileHover={{ x: 6, scale: 1.02, transition: { duration: 0.2 } }} whileTap={{ scale: 0.97 }}>
              <div className="mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-cyan-400">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">{labels.phone}</h3>
              <p className="text-gray-200 group-hover:text-white transition-colors">07 66 28 26 49</p>
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/th%C3%A9o-gasner-a6758129a/" target="_blank" rel="noopener noreferrer" className="group block glass-dark p-6 rounded-xl hover:shadow-glow transition-all" whileHover={{ x: 6, scale: 1.02, transition: { duration: 0.2 } }} whileTap={{ scale: 0.97 }}>
              <div className="mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#0A66C2]">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-neon-400 transition-colors">LinkedIn</h3>
              <p className="text-gray-200 group-hover:text-white transition-colors">{labels.visitProfile}</p>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}