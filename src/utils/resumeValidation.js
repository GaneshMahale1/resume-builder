// Resume validation and scoring utilities

export const validateResume = (resumeData) => {
  const errors = [];
  const warnings = [];
  const suggestions = [];

  // Personal Info Validation
  if (!resumeData.personalInfo.name?.trim()) {
    errors.push('Full name is required');
  }

  if (!resumeData.personalInfo.email?.trim()) {
    errors.push('Email address is required');
  } else if (!isValidEmail(resumeData.personalInfo.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!resumeData.personalInfo.phone?.trim()) {
    warnings.push('Phone number is recommended for better contact options');
  }

  // Education Validation
  const validEducation = resumeData.education.filter(edu =>
    edu.school?.trim() || edu.degree?.trim() || edu.year?.trim()
  );

  if (validEducation.length === 0) {
    errors.push('At least one education entry is required');
  } else {
    validEducation.forEach((edu, index) => {
      if (!edu.degree?.trim()) {
        warnings.push(`Education ${index + 1}: Degree/title is recommended`);
      }
      if (!edu.school?.trim()) {
        warnings.push(`Education ${index + 1}: School/institution name is recommended`);
      }
      if (!edu.year?.trim()) {
        suggestions.push(`Education ${index + 1}: Add graduation year for better context`);
      }
    });
  }

  // Experience Validation
  const validExperience = resumeData.experience.filter(exp =>
    exp.company?.trim() || exp.position?.trim() || exp.duration?.trim() || exp.description?.trim()
  );

  if (validExperience.length === 0) {
    warnings.push('Work experience is highly recommended for most positions');
  } else {
    validExperience.forEach((exp, index) => {
      if (!exp.position?.trim()) {
        warnings.push(`Experience ${index + 1}: Job title/position is required`);
      }
      if (!exp.company?.trim()) {
        warnings.push(`Experience ${index + 1}: Company name is recommended`);
      }
      if (!exp.duration?.trim()) {
        suggestions.push(`Experience ${index + 1}: Add employment duration`);
      }
      if (!exp.description?.trim()) {
        suggestions.push(`Experience ${index + 1}: Add job description and achievements`);
      } else if (exp.description.length < 50) {
        suggestions.push(`Experience ${index + 1}: Consider adding more details about your responsibilities and achievements`);
      }
    });
  }

  // Skills Validation
  const validSkills = resumeData.skills.filter(skill => skill?.trim());

  if (validSkills.length === 0) {
    warnings.push('Skills section helps showcase your abilities');
  } else if (validSkills.length < 5) {
    suggestions.push('Consider adding more skills (5-10 is typically good)');
  }

  // ATS Optimization Suggestions
  if (resumeData.personalInfo.name) {
    suggestions.push('Consider including relevant keywords from the job description in your experience descriptions');
  }

  return {
    errors,
    warnings,
    suggestions,
    isValid: errors.length === 0,
    score: calculateResumeScore(resumeData)
  };
};

export const calculateResumeScore = (resumeData) => {
  let score = 0;
  let maxScore = 100;

  // Personal Info (25 points)
  if (resumeData.personalInfo.name?.trim()) score += 10;
  if (resumeData.personalInfo.email?.trim() && isValidEmail(resumeData.personalInfo.email)) score += 10;
  if (resumeData.personalInfo.phone?.trim()) score += 5;

  // Education (25 points)
  const validEducation = resumeData.education.filter(edu =>
    edu.school?.trim() || edu.degree?.trim() || edu.year?.trim()
  );
  if (validEducation.length > 0) {
    score += Math.min(validEducation.length * 8, 25);
  }

  // Experience (30 points)
  const validExperience = resumeData.experience.filter(exp =>
    exp.company?.trim() || exp.position?.trim() || exp.duration?.trim() || exp.description?.trim()
  );
  if (validExperience.length > 0) {
    score += Math.min(validExperience.length * 10, 30);
  }

  // Skills (20 points)
  const validSkills = resumeData.skills.filter(skill => skill?.trim());
  if (validSkills.length > 0) {
    score += Math.min(validSkills.length * 4, 20);
  }

  return Math.min(score, maxScore);
};

export const getResumeScoreCategory = (score) => {
  if (score >= 90) return { category: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
  if (score >= 75) return { category: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
  if (score >= 60) return { category: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
  if (score >= 40) return { category: 'Needs Improvement', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  return { category: 'Incomplete', color: 'text-red-600', bgColor: 'bg-red-100' };
};

export const getKeywordSuggestions = (jobDescription = '') => {
  const commonKeywords = [
    'leadership', 'communication', 'problem-solving', 'teamwork', 'project management',
    'customer service', 'sales', 'marketing', 'data analysis', 'programming',
    'javascript', 'python', 'react', 'node.js', 'sql', 'agile', 'scrum',
    'microsoft office', 'excel', 'powerpoint', 'word', 'google workspace'
  ];

  if (!jobDescription) return commonKeywords.slice(0, 10);

  const jobDescLower = jobDescription.toLowerCase();
  const matchedKeywords = commonKeywords.filter(keyword =>
    jobDescLower.includes(keyword.toLowerCase())
  );

  return matchedKeywords.length > 0 ? matchedKeywords : commonKeywords.slice(0, 10);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};