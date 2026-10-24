import { useState } from 'react';
import { Plus, Edit3, Trash2, Search, X, Check } from 'lucide-react';
import { saveBuildLog, deleteBuildLog } from '../../../store/adminDataStore';
import styles from '../styles.module.css';

const CATEGORIES = ['Backend', 'Performance', 'Database Systems', 'AI & Systems', 'Mobile Systems', 'Algorithms', 'IoT'];

export default function BuildLogsManager({ logs, onLogsUpdated, showToast }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    type: 'Backend',
    metric: '',
    excerpt: '',
    tags: '',
    content: '',
  });

  const handleStartNew = () => {
    setFormData({
      title: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      type: 'Backend',
      metric: '',
      excerpt: '',
      tags: '',
      content: '',
    });
    setEditingId(null);
    setIsEditing(true);
  };

  const handleStartEdit = (log) => {
    setFormData({
      title: log.title || '',
      date: log.date || '',
      type: log.type || 'Backend',
      metric: log.metric || '',
      excerpt: log.excerpt || '',
      tags: Array.isArray(log.tags) ? log.tags.join(', ') : log.tags || '',
      content: log.content || '',
    });
    setEditingId(log.id);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Log title is required');
      return;
    }

    const payload = {
      ...formData,
      id: editingId,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    const updated = saveBuildLog(payload);
    onLogsUpdated(updated);
    setIsEditing(false);
    setEditingId(null);
    showToast(editingId ? 'Build log updated successfully' : 'New build log published');
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete build log "${title}"?`)) {
      const updated = deleteBuildLog(id);
      onLogsUpdated(updated);
      showToast('Build log deleted');
    }
  };

  const filtered = (logs || []).filter((log) => {
    if (!log) return false;
    const q = (searchQuery || '').toLowerCase();
    const titleMatch = (log.title || '').toLowerCase().includes(q);
    const typeMatch = (log.type || '').toLowerCase().includes(q);
    const tags = Array.isArray(log.tags) ? log.tags : [];
    const tagMatch = tags.some(t => String(t || '').toLowerCase().includes(q));
    return titleMatch || typeMatch || tagMatch;
  });

  return (
    <div className={styles.panelContainer}>
      <div className={styles.panelHeaderRow}>
        <div>
          <h2 className={styles.panelTitle}>Build Logs Management</h2>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--md-on-surface-variant)' }}>
            Publish and edit deep technical architecture notes and system write-ups.
          </p>
        </div>

        {!isEditing && (
          <button type="button" onClick={handleStartNew} className={styles.primaryBtn}>
            <Plus size={14} aria-hidden="true" />
            <span>New Build Log</span>
          </button>
        )}
      </div>

      {/* Editor Form Modal / Card */}
      {isEditing && (
        <form onSubmit={handleSubmit} className={styles.formCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
              {editingId ? 'Edit Build Log' : 'Create New Build Log'}
            </h3>
            <button type="button" onClick={handleCancel} className={styles.secondaryBtn} style={{ padding: '0.25rem 0.5rem' }}>
              <X size={13} />
            </button>
          </div>

          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Optimizing OpenCV & Keras Frame Pipelines for Sub-120ms AI"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className={styles.select}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="e.g. Oct 24, 2026"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Key Impact Metric (Optional)</label>
              <input
                type="text"
                value={formData.metric}
                onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                placeholder="e.g. <120ms AI Inference"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tags (Comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="e.g. Python, OpenCV, TensorFlow, AI"
                className={styles.input}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Excerpt / Executive Summary</label>
              <textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief 1-2 sentence overview shown on cards..."
                className={styles.textarea}
                style={{ minHeight: '60px' }}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Markdown Content / Full Article</label>
              <textarea
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write full technical log with ### Headings, code blocks, lists..."
                className={styles.textarea}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={handleCancel} className={styles.secondaryBtn}>
              Cancel
            </button>
            <button type="submit" className={styles.primaryBtn}>
              <Check size={14} />
              <span>{editingId ? 'Update Log' : 'Publish Log'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter / Search Bar */}
      {!isEditing && (
        <div className={styles.searchBarRow}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs by keyword..."
              className={styles.input}
              style={{ width: '100%', paddingLeft: '2rem' }}
            />
            <Search size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
          </div>
          <span className={styles.searchCountBadge}>
            Showing {filtered.length} of {logs.length}
          </span>
        </div>
      )}

      {/* Logs Table / List */}
      {!isEditing && (
        <div className={styles.tableContainer}>
          <div className={styles.tableList}>
            {filtered.length > 0 ? (
              filtered.map((log) => (
                <div key={log.id} className={styles.tableRow}>
                  <div className={styles.rowMainInfo}>
                    <h4 className={styles.rowTitle}>{log.title}</h4>
                    <div className={styles.rowMeta}>
                      <span className={styles.rowTag}>{log.type}</span>
                      <span>{log.date}</span>
                      {log.metric && <span>&middot; <strong>{log.metric}</strong></span>}
                      {log.tags && log.tags.length > 0 && (
                        <span>&middot; {log.tags.slice(0, 3).join(', ')}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.rowActions}>
                    <button
                      type="button"
                      onClick={() => handleStartEdit(log)}
                      className={styles.secondaryBtn}
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                      title="Edit"
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(log.id, log.title)}
                      className={styles.dangerBtn}
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-on-surface-variant)', fontSize: '0.85rem' }}>
                No build logs matching search.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
