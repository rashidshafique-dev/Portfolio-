import { useState } from 'react';
import { Star, Trash2, Plus, X, Check } from 'lucide-react';
import { deleteStoredTestimonial, getStoredTestimonials } from '../../../store/adminDataStore';
import styles from '../styles.module.css';

export default function TestimonialsManager({ testimonials, onTestimonialsUpdated, showToast }) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete recommendation from ${name}?`)) {
      deleteStoredTestimonial(id);
      const updated = getStoredTestimonials();
      onTestimonialsUpdated(updated);
      showToast('Recommendation deleted');
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) {
      showToast('Name and content are required');
      return;
    }

    const currentSaved = JSON.parse(localStorage.getItem('user_testimonials') || '[]');
    const newEntry = {
      ...formData,
      id: Date.now(),
      isCustom: true,
      rating: Number(formData.rating) || 5,
    };
    const updated = [newEntry, ...currentSaved];
    localStorage.setItem('user_testimonials', JSON.stringify(updated));
    window.dispatchEvent(new Event('portfolio_data_updated'));

    onTestimonialsUpdated(getStoredTestimonials());
    setIsAdding(false);
    setFormData({ name: '', role: '', company: '', content: '', rating: 5 });
    showToast('New recommendation published');
  };

  return (
    <div className={styles.panelContainer}>
      <div className={styles.panelHeaderRow}>
        <div>
          <h2 className={styles.panelTitle}>Testimonials &amp; Moderation</h2>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--md-on-surface-variant)' }}>
            Moderate visitor recommendations, delete spam, or add verified client reviews.
          </p>
        </div>

        {!isAdding && (
          <button type="button" onClick={() => setIsAdding(true)} className={styles.primaryBtn}>
            <Plus size={14} />
            <span>Add Recommendation</span>
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className={styles.formCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Add Verified Recommendation</h3>
            <button type="button" onClick={() => setIsAdding(false)} className={styles.secondaryBtn} style={{ padding: '0.25rem 0.5rem' }}>
              <X size={13} />
            </button>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Author Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sarah Jenkins"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Lead Technical Architect"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Company / Organization</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Horizon Cloud"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Rating (1 to 5 Stars)</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className={styles.select}
              >
                <option value={5}>5 Stars - Exceptional</option>
                <option value={4}>4 Stars - Very Good</option>
                <option value={3}>3 Stars - Good</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Recommendation Content *</label>
              <textarea
                rows={3}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter client quote or recommendation..."
                className={styles.textarea}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={() => setIsAdding(false)} className={styles.secondaryBtn}>
              Cancel
            </button>
            <button type="submit" className={styles.primaryBtn}>
              <Check size={14} />
              <span>Publish Review</span>
            </button>
          </div>
        </form>
      )}

      {/* Testimonials List */}
      <div className={styles.tableContainer}>
        <div className={styles.tableList}>
          {(testimonials && testimonials.length > 0) ? (
            testimonials.map((t) => (
              <div key={t.id} className={styles.tableRow}>
                <div className={styles.rowMainInfo}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <h4 className={styles.rowTitle}>{t.name}</h4>
                    {t.isCustom && (
                      <span className={styles.rowTag} style={{ fontSize: '0.62rem', backgroundColor: 'rgba(22, 163, 74, 0.08)', color: '#16a34a' }}>
                        User Submitted
                      </span>
                    )}
                  </div>
                  <div className={styles.rowMeta}>
                    <span>{t.role} · <strong>{t.company}</strong></span>
                    {t.rating > 0 && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: '#f59e0b' }}>
                        <Star size={11} fill="#f59e0b" /> {t.rating}/5
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: 'var(--md-on-surface-variant)', fontStyle: 'italic' }}>
                    "{t.content}"
                  </p>
                </div>

                <div className={styles.rowActions}>
                  <button
                    type="button"
                    onClick={() => handleDelete(t.id, t.name)}
                    className={styles.dangerBtn}
                    title="Delete review"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-on-surface-variant)', fontSize: '0.85rem' }}>
              No recommendations found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
