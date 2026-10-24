import { useState } from 'react';
import { Plus, Edit3, Trash2, Search, X, Check, Star, Image as ImageIcon, Upload } from 'lucide-react';
import { saveProject, deleteProject } from '../../../store/adminDataStore';
import styles from '../styles.module.css';

const CATEGORIES = ['Full-Stack', 'Backend', 'Mobile / Full-Stack', 'AI / ML', 'Frontend'];

export default function ProjectsManager({ projects, onProjectsUpdated, showToast }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    category: 'Full-Stack',
    featured: false,
    liveUrl: '',
    githubUrl: '',
    metric: '',
    techStack: '',
    description: '',
    imageUrl: '',
  });

  const handleStartNew = () => {
    setFormData({
      title: '',
      tagline: '',
      category: 'Full-Stack',
      featured: false,
      liveUrl: '',
      githubUrl: '',
      metric: '',
      techStack: '',
      description: '',
      imageUrl: '',
    });
    setEditingId(null);
    setIsEditing(true);
  };

  const handleStartEdit = (proj) => {
    setFormData({
      title: proj.title || '',
      tagline: proj.tagline || '',
      category: proj.category || 'Full-Stack',
      featured: Boolean(proj.featured),
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      metric: proj.metric || '',
      techStack: Array.isArray(proj.techStack)
        ? proj.techStack.join(', ')
        : (proj.tech ? proj.tech.join(', ') : ''),
      description: proj.description || '',
      imageUrl: proj.imageUrl || (proj.screenshots && proj.screenshots[0]?.url) || '',
    });
    setEditingId(proj.id);
    setIsEditing(true);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('Image size exceeds 2MB limit. Please upload a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({ ...prev, imageUrl: event.target.result }));
      showToast('Screenshot attached successfully');
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Project title is required');
      return;
    }

    const payload = {
      ...formData,
      id: editingId,
      featured: Boolean(formData.featured),
    };

    const updated = saveProject(payload);
    onProjectsUpdated(updated);
    setIsEditing(false);
    setEditingId(null);
    showToast(editingId ? 'Project updated successfully' : 'New project added');
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete project "${title}"?`)) {
      const updated = deleteProject(id);
      onProjectsUpdated(updated);
      showToast('Project deleted');
    }
  };

  const filtered = (projects || []).filter((p) => {
    if (!p) return false;
    const q = (searchQuery || '').toLowerCase();
    const titleMatch = (p.title || '').toLowerCase().includes(q);
    const catMatch = (p.category || '').toLowerCase().includes(q);
    const stack = Array.isArray(p.techStack)
      ? p.techStack
      : Array.isArray(p.tech)
      ? p.tech
      : typeof (p.techStack || p.tech) === 'string'
      ? (p.techStack || p.tech).split(',')
      : [];
    const techMatch = stack.some(t => String(t || '').toLowerCase().includes(q));
    return titleMatch || catMatch || techMatch;
  });

  return (
    <div className={styles.panelContainer}>
      <div className={styles.panelHeaderRow}>
        <div>
          <h2 className={styles.panelTitle}>Projects Management</h2>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--md-on-surface-variant)' }}>
            Add, update, or reorder showcase and production engineering systems.
          </p>
        </div>

        {!isEditing && (
          <button type="button" onClick={handleStartNew} className={styles.primaryBtn}>
            <Plus size={14} aria-hidden="true" />
            <span>Add Project</span>
          </button>
        )}
      </div>

      {/* Editor Form Card */}
      {isEditing && (
        <form onSubmit={handleSubmit} className={styles.formCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h3>
            <button type="button" onClick={handleCancel} className={styles.secondaryBtn} style={{ padding: '0.25rem 0.5rem' }}>
              <X size={13} />
            </button>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Project Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Sunrise Imperial Resort"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={styles.select}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Tagline / Short Summary</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Enterprise luxury Hotel Property Management System (PMS) & guest SaaS"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Live Demo URL</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://..."
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>GitHub Repository URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Key Performance Metric</label>
              <input
                type="text"
                value={formData.metric}
                onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                placeholder="e.g. INP < 10ms · React 19"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup} style={{ justifyContent: 'center' }}>
              <label className={styles.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ width: '16px', height: '16px' }}
                />
                <span>Pin as Featured Project on Home Page</span>
              </label>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Technologies (Comma-separated)</label>
              <input
                type="text"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                placeholder="e.g. React 19, TypeScript, Tailwind CSS, Radix UI, Zustand 5, Clerk"
                className={styles.input}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Detailed Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed explanation of system architecture, features, and engineering decisions..."
                className={styles.textarea}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>
                <ImageIcon size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                Cover Screenshot / Image Asset
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="Paste Image URL (https://... or /assets/...)"
                  className={styles.input}
                  style={{ flex: 1, minWidth: '220px' }}
                />
                <label className={styles.secondaryBtn} style={{ cursor: 'pointer', margin: 0 }}>
                  <Upload size={13} />
                  <span>Upload File</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
                {formData.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                    className={styles.dangerBtn}
                    style={{ padding: '0.45rem 0.65rem' }}
                    title="Remove Image"
                  >
                    <X size={13} />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Live Thumbnail Preview */}
              {formData.imageUrl && (
                <div style={{
                  marginTop: '0.75rem',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid var(--md-outline-variant, #e1e4e8)',
                  maxHeight: '180px',
                  maxWidth: '320px',
                  background: 'var(--md-surface-container, #f1f3f4)'
                }}>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      showToast('Unable to load preview from URL');
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={handleCancel} className={styles.secondaryBtn}>
              Cancel
            </button>
            <button type="submit" className={styles.primaryBtn}>
              <Check size={14} />
              <span>{editingId ? 'Update Project' : 'Save Project'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      {!isEditing && (
        <div className={styles.searchBarRow}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className={styles.input}
              style={{ width: '100%', paddingLeft: '2rem' }}
            />
            <Search size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
          </div>
          <span className={styles.searchCountBadge}>
            Showing {filtered.length} of {projects.length}
          </span>
        </div>
      )}

      {/* Projects List */}
      {!isEditing && (
        <div className={styles.tableContainer}>
          <div className={styles.tableList}>
            {filtered.length > 0 ? (
              filtered.map((proj) => {
                const stack = proj.techStack || proj.tech || [];
                return (
                  <div key={proj.id} className={styles.tableRow}>
                    <div className={styles.rowMainInfo}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        {proj.imageUrl && (
                          <img
                            src={proj.imageUrl}
                            alt=""
                            style={{
                              width: '38px',
                              height: '24px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              border: '1px solid var(--md-outline-variant, #e1e4e8)',
                              flexShrink: 0,
                            }}
                          />
                        )}
                        {proj.featured && <Star size={13} fill="#f59e0b" stroke="#f59e0b" title="Featured" />}
                        <h4 className={styles.rowTitle}>{proj.title}</h4>
                      </div>
                      <div className={styles.rowMeta}>
                        <span className={styles.rowTag}>{proj.category || 'Full-Stack'}</span>
                        {proj.metric && <span>&middot; <strong>{proj.metric}</strong></span>}
                        {stack.length > 0 && <span>&middot; {stack.slice(0, 4).join(', ')}</span>}
                      </div>
                    </div>

                    <div className={styles.rowActions}>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(proj)}
                        className={styles.secondaryBtn}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                        title="Edit"
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className={styles.dangerBtn}
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-on-surface-variant)', fontSize: '0.85rem' }}>
                No projects found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
