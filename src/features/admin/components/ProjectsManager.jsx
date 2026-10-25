import { useState } from 'react';
import { Plus, Edit3, Trash2, Search, X, Check, Star, Image as ImageIcon, Upload, Download, RefreshCw, Sparkles } from 'lucide-react';
import { saveProject, deleteProject, resolveProjectImage } from '../../../store/adminDataStore';
import { generateSemanticImageName, compressImageClient } from '../../../utils/projectUtils';
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
    imageName: '',
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
      imageName: '',
    });
    setEditingId(null);
    setIsEditing(true);
  };

  const handleStartEdit = (proj) => {
    const defaultImg = resolveProjectImage(proj);
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
      imageUrl: proj.imageUrl || defaultImg || (proj.screenshots && proj.screenshots[0]?.url) || '',
      imageName: proj.imageName || generateSemanticImageName(proj.title, proj.imageUrl, 'cover'),
    });
    setEditingId(proj.id);
    setIsEditing(true);
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size exceeds 5MB limit. Please upload a smaller image.');
      return;
    }

    const semanticName = generateSemanticImageName(formData.title, file.name, 'cover');

    try {
      showToast('Compressing image for maximum speed...');
      const optimizedDataUrl = await compressImageClient(file, 1200, 0.82);
      setFormData((prev) => ({
        ...prev,
        imageUrl: optimizedDataUrl,
        imageName: semanticName,
      }));
      showToast(`Renamed & optimized: "${semanticName}"`);
    } catch (err) {
      console.warn('Compression failed, using fallback:', err);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: event.target.result,
          imageName: semanticName,
        }));
        showToast(`Renamed image to "${semanticName}"`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoRenameImage = () => {
    const newName = generateSemanticImageName(formData.title, formData.imageName || 'cover.webp', 'cover');
    setFormData((prev) => ({ ...prev, imageName: newName }));
    showToast(`Renamed image file to "${newName}"`);
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

    const semanticName = formData.imageName || generateSemanticImageName(formData.title, formData.imageUrl, 'cover');

    const payload = {
      ...formData,
      id: editingId,
      featured: Boolean(formData.featured),
      imageName: semanticName,
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
                    onClick={() => setFormData({ ...formData, imageUrl: '', imageName: '' })}
                    className={styles.dangerBtn}
                    style={{ padding: '0.45rem 0.65rem' }}
                    title="Remove Image"
                  >
                    <X size={13} />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Semantic Image Name Controls & Badge */}
              {(formData.imageUrl || formData.imageName) && (
                <div style={{
                  marginTop: '0.65rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  backgroundColor: 'var(--md-surface-container, rgba(0,0,0,0.03))',
                  border: '1px solid var(--md-outline-variant, #e1e4e8)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--md-on-surface-variant)' }}>
                      🏷️ Semantic Image Name:
                    </span>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={handleAutoRenameImage}
                        className={styles.secondaryBtn}
                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}
                        title="Auto-rename image according to project title"
                      >
                        <RefreshCw size={11} style={{ marginRight: '3px' }} />
                        <span>Auto-Rename</span>
                      </button>
                      {formData.imageUrl && formData.imageUrl.startsWith('data:') && (
                        <a
                          href={formData.imageUrl}
                          download={formData.imageName || 'project-cover.webp'}
                          className={styles.secondaryBtn}
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', textDecoration: 'none' }}
                          title="Download renamed file"
                        >
                          <Download size={11} style={{ marginRight: '3px' }} />
                          <span>Download</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={formData.imageName}
                    onChange={(e) => setFormData({ ...formData, imageName: e.target.value })}
                    placeholder="e.g. sunrise-imperial-resort-cover.webp"
                    className={styles.input}
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.6rem' }}
                  />
                </div>
              )}

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
                    src={resolveProjectImage({ imageUrl: formData.imageUrl, title: formData.title, id: editingId })}
                    alt="Preview"
                    loading="lazy"
                    decoding="async"
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
                const resolvedThumbnail = resolveProjectImage(proj);
                return (
                  <div key={proj.id} className={styles.tableRow}>
                    <div className={styles.rowMainInfo}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div
                          style={{
                            width: '44px',
                            height: '30px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            border: '1px solid var(--md-outline-variant, #e1e4e8)',
                            background: 'var(--md-surface-container, rgba(0,0,0,0.04))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                          title={proj.imageName ? `Asset: ${proj.imageName}` : (proj.title || '')}
                        >
                          {resolvedThumbnail ? (
                            <img
                              src={resolvedThumbnail}
                              alt={proj.title || 'Project thumbnail'}
                              loading="lazy"
                              decoding="async"
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                if (e.currentTarget.parentElement) {
                                  e.currentTarget.parentElement.innerHTML = '<span style="font-size:9px;font-weight:600;opacity:0.5;">IMG</span>';
                                }
                              }}
                            />
                          ) : (
                            <ImageIcon size={14} style={{ opacity: 0.35 }} />
                          )}
                        </div>
                        {proj.featured && <Star size={13} fill="#f59e0b" stroke="#f59e0b" title="Featured" />}
                        <h4 className={styles.rowTitle}>{proj.title}</h4>
                      </div>
                      <div className={styles.rowMeta}>
                        <span className={styles.rowTag}>{proj.category || 'Full-Stack'}</span>
                        {proj.metric && <span>&middot; <strong>{proj.metric}</strong></span>}
                        {stack.length > 0 && <span>&middot; {stack.slice(0, 4).join(', ')}</span>}
                        {proj.imageName && (
                          <span style={{ opacity: 0.7, fontSize: '0.72rem' }}>
                            &middot; 📷 {proj.imageName}
                          </span>
                        )}
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
