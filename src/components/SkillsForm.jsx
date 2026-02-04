import { Link } from 'react-router-dom'

function SkillsForm({ resumeData, updateSkill, addSkill, removeSkill }) {
  return (
    <div className="w-full py-4 sm:py-6 lg:py-8 xl:py-12">
      <div className="w-full bg-white rounded-xl shadow-lg mx-0.5 sm:mx-1 md:mx-2 lg:mx-3 xl:mx-4 2xl:mx-6 p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-2 flex items-center">
            <span className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 text-white rounded-full flex items-center justify-center mr-3 sm:mr-4">⚡</span>
            Skills
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">List your technical and soft skills</p>
        </div>

        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="e.g., JavaScript, React, Python"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
                />
                {resumeData.skills.length > 1 && (
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700 p-2 sm:p-3 rounded text-sm sm:text-base"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 sm:mb-6 lg:mb-8">
          <button
            onClick={addSkill}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base lg:text-lg"
          >
            <span>+</span>
            <span>Add Another Skill</span>
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-blue-800 mb-2">💡 Tips for Skills Section</h3>
          <ul className="text-blue-700 text-xs sm:text-sm lg:text-base space-y-1">
            <li>• Include both technical skills (programming languages, tools) and soft skills (communication, leadership)</li>
            <li>• Prioritize the most relevant skills for the job you're applying for</li>
            <li>• Use industry-standard terminology</li>
            <li>• Consider adding proficiency levels if relevant</li>
          </ul>
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-10 xl:mt-12 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 lg:gap-6">
          <Link
            to="/experience"
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-lg transition duration-200 text-center text-sm sm:text-base lg:text-lg"
          >
            ← Back to Experience
          </Link>
          <Link
            to="/preview"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-lg transition duration-200 text-center text-sm sm:text-base lg:text-lg"
          >
            Next: Preview →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SkillsForm