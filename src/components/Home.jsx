import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16 xl:py-20 px-0.5 sm:px-1">
      <div className="w-full max-w-none mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
          Create Your Professional Resume
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-12 max-w-2xl mx-auto px-2 sm:px-4">
          Build a stunning resume in minutes with our easy-to-use resume builder.
          Choose from multiple sections and get a professional preview instantly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-white text-lg sm:text-xl">👤</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Personal Info</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Add your contact details and personal information</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-white text-lg sm:text-xl">🎓</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Education</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Showcase your academic background</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-white text-lg sm:text-xl">💼</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Experience</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Highlight your work experience</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-white text-lg sm:text-xl">⚡</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Skills</h3>
            <p className="text-gray-600 text-xs sm:text-sm">List your technical and soft skills</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-white text-lg sm:text-xl">👁️</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Preview</h3>
            <p className="text-gray-600 text-xs sm:text-sm">See your resume in real-time</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-white text-lg sm:text-xl">📄</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Export</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Download your resume as PDF</p>
          </div>
        </div>

        <Link
          to="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 lg:py-4 px-6 sm:px-8 lg:px-12 rounded-lg transition duration-200 text-base sm:text-lg lg:text-xl"
        >
          Get Started - Sign In
        </Link>

        <div className="mt-6 sm:mt-8 lg:mt-12 text-gray-500">
          <p className="text-sm sm:text-base lg:text-lg">Already started? Continue from where you left off</p>
        </div>
      </div>
    </div>
  )
}

export default Home