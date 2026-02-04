import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  saveResumeToLocalStorage,
  loadResumeFromLocalStorage,
  saveResumeAsTemplate,
  getSavedTemplates,
  deleteTemplate,
  exportResumeAsJSON,
  importResumeFromJSON,
  autoSaveResume
} from '../utils/localStorage'
import { validateResume, getResumeScoreCategory } from '../utils/resumeValidation'
import { useNotification } from '../contexts/NotificationContext'

function ResumeDashboard({ resumeData, setResumeData }) {
  const [showTemplates, setShowTemplates] = useState(false)
  const [showValidation, setShowValidation] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [savedTemplates, setSavedTemplates] = useState([])
  const [validation, setValidation] = useState(null)
  const [lastSaved, setLastSaved] = useState(null)
  const { showSuccess, showError, showWarning } = useNotification()

  useEffect(() => {
    // Load saved templates
    setSavedTemplates(getSavedTemplates())

    // Load saved resume if exists
    const savedResume = loadResumeFromLocalStorage()
    if (savedResume && !resumeData.personalInfo.name) {
      setResumeData(savedResume)
      setLastSaved(savedResume.lastSaved)
    }

    // Initial validation
    const validationResult = validateResume(resumeData)
    setValidation(validationResult)
  }, [])

  useEffect(() => {
    // Auto-save and validate on data changes
    if (resumeData.personalInfo.name || resumeData.education.length > 1 || resumeData.experience.length > 1 || resumeData.skills.length > 1) {
      autoSaveResume(resumeData)
      setLastSaved(new Date().toISOString())

      const validationResult = validateResume(resumeData)
      setValidation(validationResult)
    }
  }, [resumeData])

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      showWarning('Please enter a template name', 3000)
      return
    }

    const success = saveResumeAsTemplate(resumeData, templateName)
    if (success) {
      setSavedTemplates(getSavedTemplates())
      setTemplateName('')
      showSuccess('Template saved successfully!', 3000)
    } else {
      showError('Failed to save template', 3000)
    }
  }

  const handleLoadTemplate = (template) => {
    setResumeData({
      personalInfo: template.personalInfo || { name: '', email: '', phone: '', address: '' },
      education: template.education || [{ school: '', degree: '', year: '' }],
      experience: template.experience || [{ company: '', position: '', duration: '', description: '' }],
      skills: template.skills || ['']
    })
    setShowTemplates(false)
  }

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      const success = deleteTemplate(templateId)
      if (success) {
        setSavedTemplates(getSavedTemplates())
        showSuccess('Template deleted successfully', 3000)
      } else {
        showError('Failed to delete template', 3000)
      }
    }
  }

  const handleExportJSON = () => {
    exportResumeAsJSON(resumeData)
  }

  const handleImportJSON = (event) => {
    const file = event.target.files[0]
    if (file) {
      importResumeFromJSON(file)
        .then((importedData) => {
          setResumeData(importedData)
          showSuccess('Resume imported successfully!', 3000)
        })
        .catch((error) => {
          showError('Failed to import resume: ' + error.message, 5000)
        })
    }
  }

  const scoreCategory = validation ? getResumeScoreCategory(validation.score) : null

  return (
    <div className="w-full py-4 sm:py-6 lg:py-8 xl:py-12">
      <div className="w-full bg-white rounded-xl shadow-lg mx-0.5 sm:mx-1 md:mx-2 lg:mx-3 xl:mx-4 2xl:mx-6 p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-2 flex items-center">
            <span className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3 sm:mr-4">📊</span>
            Resume Dashboard
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">Manage your resume with advanced features</p>
        </div>

        {/* Resume Score */}
        {validation && (
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Resume Score</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${scoreCategory?.bgColor} ${scoreCategory?.color}`}>
                  {scoreCategory?.category}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${
                    validation.score >= 90 ? 'bg-green-500' :
                    validation.score >= 75 ? 'bg-blue-500' :
                    validation.score >= 60 ? 'bg-yellow-500' :
                    validation.score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${validation.score}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-sm">{validation.score}/100 points</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
          <Link
            to="/personal"
            className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 sm:p-6 transition duration-200"
          >
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2 sm:mr-3">👤</span>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Personal Info</h3>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">Update your contact details</p>
          </Link>

          <Link
            to="/education"
            className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 sm:p-6 transition duration-200"
          >
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 text-white rounded-full flex items-center justify-center mr-2 sm:mr-3">🎓</span>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Education</h3>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">Manage your academic background</p>
          </Link>

          <Link
            to="/experience"
            className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 sm:p-6 transition duration-200"
          >
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 text-white rounded-full flex items-center justify-center mr-2 sm:mr-3">💼</span>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Experience</h3>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">Update your work history</p>
          </Link>

          <Link
            to="/skills"
            className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-4 sm:p-6 transition duration-200"
          >
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 text-white rounded-full flex items-center justify-center mr-2 sm:mr-3">⚡</span>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Skills</h3>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">Edit your skills and expertise</p>
          </Link>

          <Link
            to="/preview"
            className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg p-4 sm:p-6 transition duration-200"
          >
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-2 sm:mr-3">👁️</span>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Preview</h3>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">See your resume and export</p>
          </Link>

          <button
            onClick={() => setShowValidation(!showValidation)}
            className="bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg p-4 sm:p-6 transition duration-200 text-left"
          >
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 text-white rounded-full flex items-center justify-center mr-2 sm:mr-3">✓</span>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Validation</h3>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">Check resume completeness</p>
          </button>
        </div>

        {/* Validation Results */}
        {showValidation && validation && (
          <div className="mb-6 sm:mb-8 lg:mb-10 bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Resume Validation</h3>

            {validation.errors.length > 0 && (
              <div className="mb-4">
                <h4 className="text-red-600 font-medium mb-2">Errors (Must Fix):</h4>
                <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
                  {validation.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {validation.warnings.length > 0 && (
              <div className="mb-4">
                <h4 className="text-yellow-600 font-medium mb-2">Warnings:</h4>
                <ul className="list-disc list-inside text-yellow-600 text-sm space-y-1">
                  {validation.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {validation.suggestions.length > 0 && (
              <div>
                <h4 className="text-blue-600 font-medium mb-2">Suggestions:</h4>
                <ul className="list-disc list-inside text-blue-600 text-sm space-y-1">
                  {validation.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Advanced Features */}
        <div className="border-t border-gray-200 pt-6 sm:pt-8 lg:pt-10">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Advanced Features</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Templates */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4 flex items-center">
                <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm">📋</span>
                Resume Templates
              </h4>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Template name"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={handleSaveTemplate}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                  >
                    Save
                  </button>
                </div>

                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg text-sm font-medium transition duration-200"
                >
                  {showTemplates ? 'Hide Templates' : 'Load Template'} ({savedTemplates.length})
                </button>

                {showTemplates && (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {savedTemplates.length === 0 ? (
                      <p className="text-gray-500 text-sm">No saved templates</p>
                    ) : (
                      savedTemplates.map((template) => (
                        <div key={template.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                          <div>
                            <p className="font-medium text-sm">{template.name}</p>
                            <p className="text-xs text-gray-500">
                              {template.personalInfo.name || 'Untitled'} • {new Date(template.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleLoadTemplate(template)}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                            >
                              Load
                            </button>
                            <button
                              onClick={() => handleDeleteTemplate(template.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Import/Export */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4 flex items-center">
                <span className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm">💾</span>
                Import/Export
              </h4>

              <div className="space-y-4">
                <button
                  onClick={handleExportJSON}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition duration-200"
                >
                  📥 Export as JSON
                </button>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Import from JSON</label>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                {lastSaved && (
                  <div className="text-xs text-gray-500">
                    Last saved: {new Date(lastSaved).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeDashboard