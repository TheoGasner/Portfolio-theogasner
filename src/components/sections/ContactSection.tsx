import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

export function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 md:py-32 px-6 overflow-hidden"
    >
      {/* Background with animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-500/5 to-neon-600/10 pointer-events-none" />

      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-electric-500/20 rounded-full blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-neon-600/20 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Main message */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-grotesk font-bold mb-6 leading-tight">
            {t('contact.title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 glass-dark p-8 rounded-2xl"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-electric-400 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-electric-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre.email@exemple.com"
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-all"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-neon-400 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Objet de votre message"
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-500 focus:ring-1 focus:ring-neon-500 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Écrivez votre message ici..."
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.div
                animate={{
                  boxShadow: submitted
                    ? '0 0 30px rgba(14, 165, 233, 0.8)'
                    : '0 0 0 rgba(14, 165, 233, 0)',
                }}
              >
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-electric-500 to-electric-600 text-white font-semibold rounded-lg hover:shadow-glow active:scale-95 transition-all duration-300"
                >
                  {submitted ? '✓ Message envoyé !' : 'Envoyer le message'}
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Email */}
            <a
              href="mailto:gasnertheo@gmail.com"
              className="group block glass-dark p-6 rounded-xl hover:shadow-glow transition-all"
            >
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-electric-400 transition-colors">
                Email
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                gasnertheo@gmail.com
              </p>
            </a>

            {/* Phone */}
            <a
              href="tel:07662826249"
              className="group block glass-dark p-6 rounded-xl hover:shadow-glow transition-all"
            >
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                Téléphone
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                07 66 28 26 49
              </p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/th%C3%A9o-gasner-a6758129a/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block glass-dark p-6 rounded-xl hover:shadow-glow transition-all"
            >
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-neon-400 transition-colors">
                LinkedIn
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Visitez mon profil
              </p>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
