import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Clock, CheckCircle2, AlertCircle, Loader2, Briefcase, Monitor, Laptop } from 'lucide-react';
import { personalInfo } from '../../../constants/portfolioData';
import SectionWrapper, { itemVariants } from '../../../components/SectionWrapper';
import styles from '../styles.module.css';

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = 'Enter a valid email address';
  if (!values.subject.trim()) errors.subject = 'Subject is required';
  if (!values.message.trim()) errors.message = 'Message is required';
  else if (values.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters';
  return errors;
}

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate({ ...form, [name]: value })[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(form)[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]));
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    try {
      const response = await fetch('https://formsubmit.co/ajax/rashidshafique.dev@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: form.name,
          Email: form.email,
          Subject: form.subject,
          Message: form.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setForm(INITIAL_FORM);
        setTouched({});
      } else {
        throw new Error('API submission rejected');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
    }
  };

  const getFieldClass = (field) => {
    const isError = touched[field] && errors[field];
    return `${styles.input} ${isError ? styles.inputError : ''}`;
  };

  return (
    <SectionWrapper id="contact" alt>
      {/* Section Header */}
      <div className={styles.headerContainer}>
        <span className={styles.eyebrow}>GET IN TOUCH</span>
        <h1 className={styles.title}>Let's Work Together</h1>
        <p className={styles.subtitle}>
          Available for internships, junior roles, and freelance projects — remote or Faisalabad, Pakistan.
        </p>
      </div>

      <div className={styles.contactGrid}>
        {/* Left Column — Contact Details Card */}
        <motion.div className={styles.contactInfo} variants={itemVariants}>
          <h3 className={styles.infoTitle}>Contact Details</h3>
          <div className={styles.infoItems}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}><Mail size={16} /></span>
              <div>
                <p className={styles.infoLabel}>Email</p>
                <a href={`mailto:${personalInfo.email}`} className={styles.infoValue}>
                  {personalInfo.email}
                </a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}><MapPin size={16} /></span>
              <div>
                <p className={styles.infoLabel}>Location</p>
                <p className={styles.infoValue}>{personalInfo.location}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}><Phone size={16} /></span>
              <div>
                <p className={styles.infoLabel}>Phone</p>
                <a href={`tel:${personalInfo.phone}`} className={styles.infoValue}>
                  {personalInfo.phone}
                </a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}><Clock size={16} /></span>
              <div>
                <p className={styles.infoLabel}>Working Hours</p>
                <p className={styles.infoValue}>Mon–Fri (GMT+5)</p>
              </div>
            </div>
          </div>

          <div className={styles.availBadge}>
            <span className={`${styles.availDot} animate-pulse`} />
            <span>Currently Available</span>
          </div>

          <div className={styles.divider} />

          {/* What I'm Looking For */}
          <div className={styles.lookingFor}>
            <h4 className={styles.lookingForTitle}>What I'm Looking For</h4>
            <div className={styles.lookingForItems}>
              <div className={styles.lookingForItem}>
                <span className={styles.lookingForIcon}><Briefcase size={14} /></span>
                <div>
                  <p className={styles.lookingForLabel}>Open To</p>
                  <p className={styles.lookingForValue}>Internships · Junior Full-Stack · Backend Roles · Freelance</p>
                </div>
              </div>
              <div className={styles.lookingForItem}>
                <span className={styles.lookingForIcon}><Monitor size={14} /></span>
                <div>
                  <p className={styles.lookingForLabel}>Work Mode</p>
                  <p className={styles.lookingForValue}>Remote · On-site (Faisalabad, Pakistan)</p>
                </div>
              </div>
              <div className={styles.lookingForItem}>
                <span className={styles.lookingForIcon}><Laptop size={14} /></span>
                <div>
                  <p className={styles.lookingForLabel}>Core Stack</p>
                  <p className={styles.lookingForValue}>Python · Django · FastAPI · React.js · PostgreSQL</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column — Contact Form Card */}
        <motion.div className={styles.formWrapper} variants={itemVariants}>
          {status === 'success' ? (
            <div className={styles.successState}>
              <CheckCircle2 size={48} className={styles.successIcon} />
              <h3 className={styles.successTitle}>Message Sent!</h3>
              <p className={styles.successSubtitle}>I'll get back to you within 24 hours.</p>
              <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
                Send Another
              </button>
            </div>
          ) : (
            <>
              <h3 className={styles.formTitle}>Send a Message</h3>
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="contact-name" className={styles.label}>Full Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getFieldClass('name')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      autoComplete="name"
                    />
                    {touched.name && errors.name && (
                      <span id="contact-name-error" className={styles.errorMsg} role="alert">
                        <AlertCircle size={12} /> {errors.name}
                      </span>
                    )}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-email" className={styles.label}>Email Address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getFieldClass('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      autoComplete="email"
                    />
                    {touched.email && errors.email && (
                      <span id="contact-email-error" className={styles.errorMsg} role="alert">
                        <AlertCircle size={12} /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-subject" className={styles.label}>Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getFieldClass('subject')}
                    aria-invalid={!!errors.subject}
                  />
                  {touched.subject && errors.subject && (
                    <span className={styles.errorMsg} role="alert">
                      <AlertCircle size={12} /> {errors.subject}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-message" className={styles.label}>Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    maxLength={500}
                    placeholder="Tell me about your project, role, or just say hi..."
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${getFieldClass('message')} ${styles.textarea}`}
                    aria-invalid={!!errors.message}
                  />
                  {touched.message && errors.message && (
                    <span className={styles.errorMsg} role="alert">
                      <AlertCircle size={12} /> {errors.message}
                    </span>
                  )}
                  <span className={styles.charCount}>
                    {form.message.length} / 500 chars
                  </span>
                </div>

                {status === 'error' && (
                  <div className={styles.formError}>
                    <AlertCircle size={16} /> Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={styles.submitButton}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
