import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import ResumePreview from './components/ResumePreview'

function App() {
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', address: '' },
    education: [{ school: '', degree: '', year: '' }],
    experience: [{ company: '', position: '', duration: '', description: '' }],
    skills: ['']
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
    setResumeData(prev => ({ ...prev, skills: newSkills }))
  }

  return (
    <NotificationProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col w-full">
            <Header />
            <main className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={<ResumeDashboard resumeData={resumeData} setResumeData={setResumeData} />}
                />
                <Route
                  path="/personal"
                  element={
                    <PersonalInfoForm
                      resumeData={resumeData}
                      updatePersonalInfo={updatePersonalInfo}
                    />
                  }
                />
                <Route
                  path="/education"
                  element={
                    <EducationForm
                      resumeData={resumeData}
                      updateEducation={updateEducation}
                      addEducation={addEducation}
                      removeEducation={removeEducation}
                    />
                  }
                />
                <Route
                  path="/experience"
                  element={
                    <ExperienceForm
                      resumeData={resumeData}
                      updateExperience={updateExperience}
                      addExperience={addExperience}
                      removeExperience={removeExperience}
                    />
                  }
                />
                <Route
                  path="/skills"
                  element={
                    <SkillsForm
                      resumeData={resumeData}
                      updateSkill={updateSkill}
                      addSkill={addSkill}
                      removeSkill={removeSkill}
                    />
                  }
                />
                <Route
                  path="/preview"
                  element={<ResumePreview resumeData={resumeData} />}
                />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </NotificationProvider>
  )
}

export default App
