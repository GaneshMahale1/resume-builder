import { Link } from 'react-router-dom'
import { useState } from 'react'
import { exportToPDF } from '../utils/pdfExport'
import { useNotification } from '../contexts/NotificationContext'

function ResumePreview({ resumeData }) {
  const [isExporting, setIsExporting] = useState(false)
  const { showSuccess, showError } = useNotification()

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      const success = await exportToPDF(resumeData)
      if (success) {
        showSuccess('Resume exported successfully! PDF has been downloaded.', 5000)
      } else {
        showError('Failed to export resume. Please try again.', 5000)
      }
    } catch (error) {
      showError('An error occurred while exporting. Please try again.', 5000)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="w-full py-4 sm:py-6 lg:py-8 xl:py-12">
      <div className="w-full bg-white rounded-xl shadow-lg mx-0.5 sm:mx-1 md:mx-2 lg:mx-3 xl:mx-4 2xl:mx-6 p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-2 flex items-center">
            <span className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-3 sm:mr-4">👁️</span>
            Resume Preview
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">Here's how your resume looks</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12 bg-white min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] shadow-inner print:shadow-none print:border-none print:p-6">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              {resumeData.personalInfo.name || 'Your Name'}
            </h3>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 text-gray-600 text-sm sm:text-base">
              {resumeData.personalInfo.email && (
                <span className="flex items-center justify-center space-x-1">
                  <span>📧</span>
                  <span>{resumeData.personalInfo.email}</span>
                </span>
              )}
              {resumeData.personalInfo.phone && (
                <span className="flex items-center justify-center space-x-1">
                  <span>📱</span>
                  <span>{resumeData.personalInfo.phone}</span>
                </span>
              )}
              {resumeData.personalInfo.address && (
                <span className="flex items-center justify-center space-x-1">
                  <span>📍</span>
                  <span>{resumeData.personalInfo.address}</span>
                </span>
              )}
            </div>
          </div>

          {/* Education */}
          {resumeData.education.some(edu => edu.school || edu.degree || edu.year) && (
            <div className="mb-8">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Education</h4>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  (edu.school || edu.degree || edu.year) ? (
                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div className="mb-2 sm:mb-0">
                        <h5 className="text-base sm:text-lg font-semibold text-gray-800">{edu.degree}</h5>
                        <p className="text-gray-600">{edu.school}</p>
                      </div>
                      <span className="text-gray-500 font-medium text-sm sm:text-base">{edu.year}</span>
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.some(exp => exp.company || exp.position || exp.duration || exp.description) && (
            <div className="mb-8">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Work Experience</h4>
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  (exp.company || exp.position || exp.duration || exp.description) ? (
                    <div key={index}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <h5 className="text-base sm:text-lg font-semibold text-gray-800">{exp.position}</h5>
                        <span className="text-gray-500 font-medium text-sm sm:text-base">{exp.duration}</span>
                      </div>
                      <p className="text-gray-600 font-medium mb-2">{exp.company}</p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{exp.description}</p>
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {resumeData.skills.some(skill => skill.trim()) && (
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Skills</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {resumeData.skills.map((skill, index) => (
                  skill.trim() ? (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                      {skill}
                    </span>
                  ) : null
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-10 xl:mt-12 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 lg:gap-6">
          <Link
            to="/skills"
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-lg transition duration-200 text-center text-sm sm:text-base lg:text-lg"
          >
            ← Back to Skills
          </Link>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-lg transition duration-200 text-center flex items-center justify-center space-x-2 text-sm sm:text-base lg:text-lg disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <span>📄</span>
                  <span>Download PDF</span>
                </>
              )}
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-lg transition duration-200 text-center text-sm sm:text-base lg:text-lg">
              Save Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumePreview