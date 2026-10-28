import { useState } from 'react';
import { Check, Upload, Image as ImageIcon, X, User } from 'lucide-react';
import { saveProfile } from '../../../store/adminDataStore';
import { generateSemanticImageName, compressImageClient } from '../../../utils/projectUtils';
import styles from '../styles.module.css';

export default function ProfileManager({ profile, onProfileUpdated, showToast }) {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    title: profile.title || '',
    tagline: profile.tagline || '',
    bio: profile.bio || '',
    location: profile.location || '',
    email: profile.email || '',
    phone: profile.phone || '',
    avatarUrl: profile.avatarUrl || '',
    avatarName: profile.avatarName || '',
    socials: {
      github: profile.socials?.github || '',
      linkedin: profile.socials?.linkedin || '',
      newsletter: profile.socials?.newsletter || '',
      twitter: profile.socials?.twitter || '',
      whatsapp: profile.socials?.whatsapp || '',
    },
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size exceeds 5MB limit. Please upload a smaller photo.');
      return;
    }

    const semanticName = generateSemanticImageName(formData.name || 'Rashid Shafique', file.name, 'profile');

    try {
      showToast('Optimizing photo for fast page load...');
      const optimized = await compressImageClient(file, 600, 0.82);
      setFormData((prev) => ({
        ...prev,
        avatarUrl: optimized,
        avatarName: semanticName,
      }));
      showToast(`Profile photo optimized & renamed as "${semanticName}"`);
    } catch (err) {
      console.warn('Avatar compression failed, using fallback:', err);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          avatarUrl: event.target.result,
          avatarName: semanticName,
        }));
        showToast(`Profile photo attached and renamed as "${semanticName}"`);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSocialChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [key]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = saveProfile(formData);
    onProfileUpdated(updated);
    showToast('Personal profile and contact info updated');
  };

  return (
    <div className={styles.panelContainer}>
      <div className={styles.panelHeaderRow}>
        <div>
          <h2 className={styles.panelTitle}>Profile &amp; Contact Settings</h2>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--md-on-surface-variant)' }}>
            Update your public executive bio, portrait photo, contact endpoints, and social channels.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGrid}>

          {/* Profile Photo / Avatar Card */}
          <div className={`${styles.formGroup} ${styles.fullWidth}`} style={{
            padding: '1.25rem',
            backgroundColor: 'var(--md-surface-container, #f8f9fa)',
            borderRadius: '8px',
            border: '1px solid var(--md-outline-variant, #e1e4e8)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}>
            {/* Avatar Preview Box */}
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid var(--md-primary, #1a73e8)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--md-surface, #ffffff)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt="Profile Avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    showToast('Failed to load image preview');
                  }}
                />
              ) : (
                <User size={38} style={{ color: 'var(--md-on-surface-variant)' }} />
              )}
            </div>

            {/* Controls */}
            <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ImageIcon size={14} style={{ color: 'var(--md-primary)' }} />
                <label className={styles.label} style={{ margin: 0, fontWeight: 600 }}>
                  Profile Portrait / Photo
                </label>
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--md-on-surface-variant)' }}>
                Updates the portrait photo across your homepage Hero and About Me section.
              </p>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.2rem' }}>
                <label className={styles.primaryBtn} style={{ cursor: 'pointer', margin: 0, padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
                  <Upload size={13} />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleAvatarUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                {formData.avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, avatarUrl: '' }))}
                    className={styles.dangerBtn}
                    style={{ padding: '0.4rem 0.65rem', fontSize: '0.78rem' }}
                    title="Remove custom photo and use original codebase default"
                  >
                    <X size={13} />
                    <span>Reset to Default</span>
                  </button>
                )}
              </div>

              <div style={{ marginTop: '0.25rem' }}>
                <input
                  type="text"
                  value={formData.avatarUrl}
                  onChange={(e) => handleInputChange('avatarUrl', e.target.value)}
                  placeholder="Or paste hosted image URL (https://... or /assets/...)"
                  className={styles.input}
                  style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem', width: '100%' }}
                />
              </div>

              {formData.avatarName && (
                <div style={{ fontSize: '0.72rem', color: 'var(--md-on-surface-variant)', opacity: 0.85 }}>
                  🏷️ Semantic File: <code>{formData.avatarName}</code>
                </div>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Professional Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g. Full-Stack Software Engineer · Python · Django · React"
              className={styles.input}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Executive Bio</label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>GitHub Profile URL</label>
            <input
              type="url"
              value={formData.socials.github}
              onChange={(e) => handleSocialChange('github', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>LinkedIn Profile URL</label>
            <input
              type="url"
              value={formData.socials.linkedin}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>LinkedIn Newsletter Follow URL</label>
            <input
              type="url"
              value={formData.socials.newsletter}
              onChange={(e) => handleSocialChange('newsletter', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.primaryBtn}>
            <Check size={14} />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
