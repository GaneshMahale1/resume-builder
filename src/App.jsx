import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import ResumeDashboard from './components/ResumeDashboard'
import PersonalInfoForm from './components/PersonalInfoForm'
import EducationForm from './components/EducationForm'
import ExperienceForm from './components/ExperienceForm'
import SkillsForm from './components/SkillsForm'
import Achievements from './components/Achievements'
import Coursework from './components/Coursework'
import Publications from './components/Publications'
import Research from './components/Research'
import ResearchInterest from './components/ResearchInterest'
import TechnicalSkills from './components/TechnicalSkills'
import ResumePreview from './components/ResumePreview'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('resumeBuilder_token')
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', address: '' },
    education: [{ school: '', degree: '', year: '' }],
    experience: [{ company: '', position: '', duration: '', description: '' }],
    skills: [''],
    achievements: '',
    coursework: '',
    publications: '',
    research: '',
    researchInterest: '',
    technicalSkills: ['']
  })

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const updateEducation = (index, field, value) => {
    const newEducation = [...resumeData.education]
    newEducation[index][field] = value
    setResumeData(prev => ({ ...prev, education: newEducation }))
  }

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', year: '' }]
    }))
  }

  const removeEducation = (index) => {
    const newEducation = resumeData.education.filter((_, i) => i !== index)
    setResumeData(prev => ({ ...prev, education: newEducation }))
  }

  const updateExperience = (index, field, value) => {
    const newExperience = [...resumeData.experience]
    newExperience[index][field] = value
    setResumeData(prev => ({ ...prev, experience: newExperience }))
  }

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }))
  }

  const removeExperience = (index) => {
    const newExperience = resumeData.experience.filter((_, i) => i !== index)
    setResumeData(prev => ({ ...prev, experience: newExperience }))
  }

  const updateSkill = (index, value) => {
    const newSkills = [...resumeData.skills]
    newSkills[index] = value
    setResumeData(prev => ({ ...prev, skills: newSkills }))
  }

  const addSkill = () => {
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, ''] }))
  }

  const removeSkill = (index) => {
    const newSkills = resumeData.skills.filter((_, i) => i !== index)
    setResumeData(prev => ({ ...prev, skills: newSkills.length === 0 ? [''] : newSkills }))
  }

  const updateAchievements = (value) => {
    setResumeData(prev => ({ ...prev, achievements: value }))
  }

  const updateCoursework = (value) => {
    setResumeData(prev => ({ ...prev, coursework: value }))
  }

  const updatePublications = (value) => {
    setResumeData(prev => ({ ...prev, publications: value }))
  }

  const updateResearch = (value) => {
    setResumeData(prev => ({ ...prev, research: value }))
  }

  const updateResearchInterest = (value) => {
    setResumeData(prev => ({ ...prev, researchInterest: value }))
  }

  const updateTechnicalSkill = (index, value) => {
    const newSkills = [...resumeData.technicalSkills]
    newSkills[index] = value
    setResumeData(prev => ({ ...prev, technicalSkills: newSkills }))
  }

  const addTechnicalSkill = () => {
    setResumeData(prev => ({ ...prev, technicalSkills: [...prev.technicalSkills, ''] }))
  }

  const removeTechnicalSkill = (index) => {
    const newSkills = resumeData.technicalSkills.filter((_, i) => i !== index)
    setResumeData(prev => ({ ...prev, technicalSkills: newSkills.length === 0 ? [''] : newSkills }))
  }

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <ThemeProvider>
          <Router>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
              <Header />
            <main className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <ResumeDashboard resumeData={resumeData} setResumeData={setResumeData} />
                  </ProtectedRoute>
                } />
                <Route path="/personal" element={
                  <ProtectedRoute>
                    <PersonalInfoForm
                      resumeData={resumeData}
                      updatePersonalInfo={updatePersonalInfo}
                    />
                  </ProtectedRoute>
                } />
                <Route path="/education" element={
                  <ProtectedRoute>
                    <EducationForm
                      resumeData={resumeData}
                      updateEducation={updateEducation}
                      addEducation={addEducation}
                      removeEducation={removeEducation}
                    />
                  </ProtectedRoute>
                } />
                <Route path="/experience" element={
                  <ProtectedRoute>
                    <ExperienceForm
                      resumeData={resumeData}
                      updateExperience={updateExperience}
                      addExperience={addExperience}
                      removeExperience={removeExperience}
                    />
                  </ProtectedRoute>
                } />
                <Route path="/achievements" element={
                  <ProtectedRoute>
                    <Achievements
                      resumeData={resumeData}
                      updateAchievements={updateAchievements}
                    />
                  </ProtectedRoute>
                } />
                <Route path="/coursework" element={
                  <ProtectedRoute>
                    <Coursework
                      resumeData={resumeData}
                      updateCoursework={updateCoursework}
                    />
                  </ProtectedRoute>
                } />
                <Route path="/publications" element={
                  <ProtectedRoute>
                    <Publications
                      resumeData={resumeData}
                      updatePublications={updatePublications}
                    />
                  </ProtectedRoute>
                } />
                <Route path="/research" element={
                  <ProtectedRoute>
                    <Research
                      resumeData={resumeData}
                      updateResearch={updateResearch}
                    />
                  </ProtectedRoute>
                } />
                <Route path="/research-interest" element={
                  <ProtectedRoute>
                    <ResearchInterest
                      resumeData={resumeData}
                      updateResearchInterest={updateResearchInterest}
                    />
                  </ProtectedRoute>
                } />
                <Route path="/skills" element={
                  <ProtectedRoute>
                    <SkillsForm
                      resumeData={resumeData}
                      updateSkill={updateSkill}
                      addSkill={addSkill}
                      removeSkill={removeSkill}
                    />
                  </ProtectedRoute>
                } />
                <Route path="/technicalskills" element={
                  <ProtectedRoute>
                    <TechnicalSkills
                      resumeData={resumeData}
                      updateTechnicalSkill={updateTechnicalSkill}
                      addTechnicalSkill={addTechnicalSkill}
                      removeTechnicalSkill={removeTechnicalSkill}
                    />
                  </ProtectedRoute>
                } />
                <Route path="/preview" element={
                  <ProtectedRoute>
                    <ResumePreview resumeData={resumeData} />
                  </ProtectedRoute>
                } />
                
                {/* 404 Catch-All Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </NotificationProvider>
    </ErrorBoundary>
  )
}

export default App
