import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../../constants/portfolioData';
import styles from '../styles.module.css';

function TestimonialCard({ testimonial }) {
  // Initials from author name (first + last initial)
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 1).toUpperCase();
    return (parts[0].substring(0, 1) + parts[parts.length - 1].substring(0, 1)).toUpperCase();
  };

  return (
    <article className={styles.card}>
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

  const testimonialList = testimonials || [];

  const updateScrollButtons = useCallback(() => {
    const el = carouselRef.current;
    if (el) {
      const atStart = el.scrollLeft <= 5;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
      setCanScrollLeft(!atStart);
      setCanScrollRight(!atEnd);
    }
  }, []);

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
  }, [updateScrollButtons]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstChild?.offsetWidth || 340;
      const gap = 20;
      carouselRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstChild?.offsetWidth || 340;
      const gap = 20;
      carouselRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
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

        {/* Testimonials Horizontal Carousel */}
        <div className={styles.carouselWrapper}>
          <div ref={carouselRef} className={styles.carouselContainer}>
            {testimonialList.map((t) => (
              <div key={t.id} className={styles.carouselCardWrapper}>
                <TestimonialCard testimonial={t} />
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

      </div>
    </section>
  );
}
