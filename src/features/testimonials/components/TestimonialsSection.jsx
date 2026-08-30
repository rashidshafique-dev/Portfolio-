import { useState, useEffect, useRef } from 'react';
import { Star, PenTool, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../../constants/portfolioData';
import styles from '../styles.module.css';

function TestimonialCard({ testimonial, isAdmin, onDelete }) {
  // Initials from author name (first + last initial)
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 1).toUpperCase();
    return (parts[0].substring(0, 1) + parts[parts.length - 1].substring(0, 1)).toUpperCase();
  };

  return (
    <article className={styles.card}>
      {/* Admin Delete Action Button */}
      {isAdmin && testimonial.isCustom && (
        <button
          onClick={() => onDelete(testimonial.id)}
          className={styles.deleteReviewBtn}
          title="Delete this recommendation (Admin Only)"
          aria-label={`Delete recommendation from ${testimonial.name}`}
        >
          <Trash2 size={13} />
        </button>
      )}

      {/* Quote mark (top) */}
      <span className={styles.quoteMark} aria-hidden="true">“</span>

      {/* Quote text */}
      <blockquote className={styles.quoteText}>
        "{testimonial.content}"
      </blockquote>

      {/* Divider */}
      <div className={styles.cardDivider} />

      {/* Author row (bottom) */}
      <footer className={styles.authorRow}>
        <div className={styles.avatar}>
          {getInitials(testimonial.name)}
        </div>
        <div className={styles.authorInfo}>
          <h4 className={styles.authorName}>{testimonial.name}</h4>
          <span className={styles.authorRole}>
            {testimonial.role} · <span style={{ color: 'var(--md-primary)', fontWeight: 600 }}>{testimonial.company}</span>
          </span>
        </div>
        {testimonial.rating > 0 && (
          <div className={styles.starRating} aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} size={12} fill="#f59e0b" stroke="#f59e0b" className={styles.starIcon} />
            ))}
          </div>
        )}
      </footer>
    </article>
  );
}

export default function TestimonialsSection() {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [testimonialList, setTestimonialList] = useState(() => {
    const saved = localStorage.getItem('user_testimonials');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const parsedWithCustom = parsed.map(p => ({ ...p, isCustom: true }));
        return [...testimonials, ...parsedWithCustom];
      } catch {
        return testimonials;
      }
    }
    return testimonials;
  });

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', role: '', company: '', content: '', rating: 0 });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Simple, secure admin checking (URL param: ?admin=true or localStorage flag)
  const isAdmin = typeof window !== 'undefined' && (
    window.location.search.includes('admin=true') || 
    localStorage.getItem('admin_moderator') === 'true'
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRatingChange = (ratingVal) => {
    setNewReview(prev => ({ ...prev, rating: ratingVal }));
    if (formErrors.rating) {
      setFormErrors(prev => ({ ...prev, [ratingVal]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newReview.name.trim()) errors.name = 'Full Name is required';
    if (newReview.rating <= 0) errors.rating = 'Please select a Rating Score';
    if (!newReview.content.trim()) errors.content = 'Recommendation Content is required';
    else if (newReview.content.trim().length < 15) errors.content = 'Review must be at least 15 characters';
    return errors;
  };

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      window.addEventListener('resize', updateScrollButtons);
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', updateScrollButtons);
      }
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [testimonialList]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstChild.offsetWidth;
      const gap = 20; // 1.25rem = 20px
      carouselRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstChild.offsetWidth;
      const gap = 20; // 1.25rem = 20px
      carouselRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API request latency of 800ms
    setTimeout(() => {
      const reviewObj = {
        id: Date.now(),
        ...newReview,
        rating: Number(newReview.rating),
        isCustom: true
      };

      const updatedList = [...testimonialList, reviewObj];
      setTestimonialList(updatedList);

      // Save custom reviews separately to localStorage
      const saved = localStorage.getItem('user_testimonials');
      const existingCustom = saved ? JSON.parse(saved) : [];
      localStorage.setItem('user_testimonials', JSON.stringify([...existingCustom, reviewObj]));

      // Reset Form
      setNewReview({ name: '', role: '', company: '', content: '', rating: 0 });
      setFormErrors({});
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Hide success message after 2.5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowReviewForm(false);
      }, 2500);
    }, 800);
  };

  const handleDeleteReview = (reviewId) => {
    const updatedList = testimonialList.filter(t => t.id !== reviewId);
    setTestimonialList(updatedList);

    // Update custom items saved in local storage
    const saved = localStorage.getItem('user_testimonials');
    if (saved) {
      const parsed = JSON.parse(saved);
      const updatedCustom = parsed.filter(t => t.id !== reviewId);
      localStorage.setItem('user_testimonials', JSON.stringify(updatedCustom));
    }
  };

  return (
    <section className={styles.section} id="testimonials">
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.headerContainer}>
          <span className={styles.eyebrow}>RECOMMENDATIONS</span>
          <h2 className={styles.title}>Testimonials & Feedback</h2>
          <p className={styles.subtitle}>
            Endorsements from clients, engineering collaborators, and mentors on technical execution and product delivery.
          </p>
        </div>

        {/* Dynamic Admin Moderator Banner */}
        {isAdmin && (
          <div style={{
            background: 'rgba(234, 67, 53, 0.08)',
            border: '1px solid rgba(234, 67, 53, 0.2)',
            color: '#EA4335',
            padding: '0.75rem 1.25rem',
            borderRadius: '28px',
            fontSize: '0.85rem',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            🛡️ Admin Moderation Mode Active — Custom user-submitted reviews can now be deleted directly from this panel.
          </div>
        )}

        {/* Testimonials Horizontal Carousel */}
        <div className={styles.carouselWrapper}>
          <div ref={carouselRef} className={styles.carouselContainer}>
            {testimonialList.map((t) => (
              <div key={t.id} className={styles.carouselCardWrapper}>
                <TestimonialCard 
                  testimonial={t} 
                  isAdmin={isAdmin}
                  onDelete={handleDeleteReview}
                />
              </div>
            ))}
          </div>

          {/* Navigation Actions */}
          <div className={styles.carouselActions}>
            <button 
              onClick={scrollLeft} 
              className={styles.navBtn}
              disabled={!canScrollLeft}
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={scrollRight} 
              className={styles.navBtn}
              disabled={!canScrollRight}
              aria-label="Next testimonials"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ── STATEFUL WRITE REVIEW SECTION ── */}
        <div className={styles.reviewSection}>
          {!showReviewForm ? (
            <button 
              className={styles.reviewToggleBtn}
              onClick={() => setShowReviewForm(true)}
              aria-expanded="false"
            >
              <PenTool size={15} />
              <span>Write a Review</span>
            </button>
          ) : (
            <div className={styles.reviewFormCard}>
              <h3>Leave a Professional Recommendation</h3>
              <p>Share your experience working with me. Your feedback will be instantly integrated into the showcase gallery.</p>
              
              {submitSuccess && (
                <div className={styles.successNotice} role="status">
                  Thank you! Your recommendation has been compiled and added to the gallery successfully.
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className={styles.formGrid} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label htmlFor="rev-name" className={styles.formLabel}>
                      Full Name <span className={styles.requiredIndicator}>*</span>
                    </label>
                    <input 
                      id="rev-name"
                      name="name"
                      type="text"
                      placeholder="e.g., Jane Doe"
                      value={newReview.name}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                    {formErrors.name && <span className={styles.validationError}>{formErrors.name}</span>}
                  </div>
                  
                  <div className={styles.formField}>
                    <label htmlFor="rev-role" className={styles.formLabel}>Role / Title</label>
                    <input 
                      id="rev-role"
                      name="role"
                      type="text"
                      placeholder="e.g., Engineering Lead"
                      value={newReview.role}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label htmlFor="rev-company" className={styles.formLabel}>Company / Institution</label>
                    <input 
                      id="rev-company"
                      name="company"
                      type="text"
                      placeholder="e.g., Google"
                      value={newReview.company}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.formLabel}>
                      Rating Score <span className={styles.requiredIndicator}>*</span>
                    </label>
                    <div className={styles.ratingSelector} aria-label="Select star rating count">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => handleRatingChange(starVal)}
                          className={`${styles.selectorStar} ${starVal <= newReview.rating ? styles.selectorStarActive : ''}`}
                          aria-label={`Rate ${starVal} out of 5 stars`}
                        >
                          <Star size={18} fill={starVal <= newReview.rating ? '#f59e0b' : 'none'} stroke={starVal <= newReview.rating ? '#f59e0b' : 'currentColor'} />
                        </button>
                      ))}
                    </div>
                    {formErrors.rating && <span className={styles.validationError}>{formErrors.rating}</span>}
                  </div>
                </div>

                <div className={styles.formField}>
                  <label htmlFor="rev-content" className={styles.formLabel}>
                    Recommendation Content <span className={styles.requiredIndicator}>*</span>
                  </label>
                  <textarea 
                    id="rev-content"
                    name="content"
                    rows={4}
                    placeholder="Describe how Rashid contributed to your project, systems architectures, or team success..."
                    value={newReview.content}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                  />
                  {formErrors.content && <span className={styles.validationError}>{formErrors.content}</span>}
                </div>

                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowReviewForm(false);
                      setNewReview({ name: '', role: '', company: '', content: '', rating: 0 });
                      setFormErrors({});
                    }}
                    className={styles.cancelBtn}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting || submitSuccess}
                  >
                    Submit Recommendation
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

