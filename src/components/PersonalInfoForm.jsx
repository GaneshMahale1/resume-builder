import { Link } from 'react-router-dom'
import { useState } from 'react'

function PersonalInfoForm({ resumeData, updatePersonalInfo }) {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateField = (field, value) => {
    const newErrors = { ...errors }

    switch (field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Full name is required'
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters'
        } else {
          delete newErrors.name
        }
        break
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address'
        } else {
          delete newErrors.email
        }
        break
      case 'phone':
        if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number'
        } else {
          delete newErrors.phone
        }
        break
      default:
        break
    }

    setErrors(newErrors)
  }

  const handleFieldChange = (field, value) => {
    updatePersonalInfo(field, value)
    if (touched[field]) {
      validateField(field, value)
    }
  }

  const getFormProgress = () => {
    const fields = ['name', 'email']
    const completedFields = fields.filter(field => resumeData.personalInfo[field]?.trim())
    return Math.round((completedFields.length / fields.length) * 100)
  }

  const progress = getFormProgress()
  return (
    <div className="w-full py-4 sm:py-6 lg:py-8 xl:py-12">
      <div className="w-full bg-white rounded-xl shadow-lg mx-0.5 sm:mx-1 md:mx-2 lg:mx-3 xl:mx-4 2xl:mx-6 p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 flex items-center">
              <span className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2 sm:mr-4 text-sm sm:text-base">👤</span>
              <span className="text-lg sm:text-xl lg:text-2xl">Personal Information</span>
            </h2>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Progress</div>
              <div className="text-lg font-semibold text-blue-600">{progress}%</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">Tell us about yourself to get started</p>
        </div>

        <form className="space-y-4 sm:space-y-6" role="form" aria-labelledby="personal-info-heading">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={resumeData.personalInfo.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                onBlur={() => handleFieldBlur('name')}
                className={`w-full p-3 sm:p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base sm:text-lg ${
                  errors.name && touched.name
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
                required
                aria-label="Full Name"
                aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                aria-invalid={errors.name && touched.name ? "true" : "false"}
              />
              {errors.name && touched.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={resumeData.personalInfo.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={() => handleFieldBlur('email')}
                className={`w-full p-3 sm:p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base ${
                  errors.email && touched.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
                required
                aria-label="Email Address"
                aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                aria-invalid={errors.email && touched.email ? "true" : "false"}
              />
              {errors.email && touched.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={resumeData.personalInfo.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                onBlur={() => handleFieldBlur('phone')}
                className={`w-full p-3 sm:p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base ${
                  errors.phone && touched.phone
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
                aria-label="Phone Number"
                aria-describedby={errors.phone && touched.phone ? "phone-error" : undefined}
                aria-invalid={errors.phone && touched.phone ? "true" : "false"}
              />
              {errors.phone && touched.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">{errors.phone}</p>
              )}
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Address</label>
              <input
                type="text"
                placeholder="City, State, Country"
                value={resumeData.personalInfo.address}
                onChange={(e) => updatePersonalInfo('address', e.target.value)}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base"
              />
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
            <Link
              to="/"
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-200 text-center text-sm sm:text-base"
            >
              ← Back to Home
            </Link>
            <Link
              to="/education"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-200 text-center text-sm sm:text-base"
            >
              Next: Education →
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PersonalInfoForm