// Local storage utilities for resume data persistence

export const saveResumeToLocalStorage = (resumeData) => {
  try {
    const resumeWithTimestamp = {
      ...resumeData,
      lastSaved: new Date().toISOString(),
      id: resumeData.id || generateResumeId()
    };
    localStorage.setItem('resumeBuilder_current', JSON.stringify(resumeWithTimestamp));
    return true;
  } catch (error) {
    console.error('Error saving resume to localStorage:', error);
    return false;
  }
};

export const loadResumeFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('resumeBuilder_current');
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  } catch (error) {
    console.error('Error loading resume from localStorage:', error);
    return null;
  }
};

export const saveResumeAsTemplate = (resumeData, templateName) => {
  try {
    const templates = getSavedTemplates();
    const template = {
      ...resumeData,
      name: templateName,
      id: generateResumeId(),
      createdAt: new Date().toISOString()
    };
    templates.push(template);
    localStorage.setItem('resumeBuilder_templates', JSON.stringify(templates));
    return true;
  } catch (error) {
    console.error('Error saving template:', error);
    return false;
  }
};

export const getSavedTemplates = () => {
  try {
    const templates = localStorage.getItem('resumeBuilder_templates');
    return templates ? JSON.parse(templates) : [];
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
};

export const loadTemplate = (templateId) => {
  try {
    const templates = getSavedTemplates();
    return templates.find(template => template.id === templateId) || null;
  } catch (error) {
    console.error('Error loading template:', error);
    return null;
  }
};

export const deleteTemplate = (templateId) => {
  try {
    const templates = getSavedTemplates();
    const filteredTemplates = templates.filter(template => template.id !== templateId);
    localStorage.setItem('resumeBuilder_templates', JSON.stringify(filteredTemplates));
    return true;
  } catch (error) {
    console.error('Error deleting template:', error);
    return false;
  }
};

export const exportResumeAsJSON = (resumeData) => {
  try {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personalInfo.name || 'Resume'}_data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error exporting resume as JSON:', error);
    return false;
  }
};

export const importResumeFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const resumeData = JSON.parse(e.target.result);
        resolve(resumeData);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

const generateResumeId = () => {
  return 'resume_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Auto-save functionality
let autoSaveTimeout;
export const autoSaveResume = (resumeData, delay = 2000) => {
  clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(() => {
    saveResumeToLocalStorage(resumeData);
  }, delay);
};

export const clearAutoSave = () => {
  clearTimeout(autoSaveTimeout);
};