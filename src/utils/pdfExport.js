import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (resumeData) => {
  try {
    // Create a temporary div to render the resume for PDF
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = generateResumeHTML(resumeData);
    tempDiv.style.width = '800px';
    tempDiv.style.padding = '40px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.color = '#333';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';

    document.body.appendChild(tempDiv);

    // Generate canvas from the HTML
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: tempDiv.offsetHeight
    });

    // Remove temporary div
    document.body.removeChild(tempDiv);

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download the PDF
    const fileName = `${resumeData.personalInfo.name || 'Resume'}.pdf`;
    pdf.save(fileName);

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

const generateResumeHTML = (resumeData) => {
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #333;">
        <h1 style="font-size: 28px; font-weight: bold; margin: 0 0 10px 0; color: #333;">
          ${resumeData.personalInfo.name || 'Your Name'}
        </h1>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; font-size: 14px; color: #666;">
          ${resumeData.personalInfo.email ? `<span>📧 ${resumeData.personalInfo.email}</span>` : ''}
          ${resumeData.personalInfo.phone ? `<span>📱 ${resumeData.personalInfo.phone}</span>` : ''}
          ${resumeData.personalInfo.address ? `<span>📍 ${resumeData.personalInfo.address}</span>` : ''}
        </div>
      </div>

      <!-- Education -->
      ${resumeData.education.some(edu => edu.school || edu.degree || edu.year) ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: bold; margin: 0 0 15px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Education</h2>
          <div style="display: flex; flex-direction: column; gap: 15px;">
            ${resumeData.education.map(edu => {
              if (edu.school || edu.degree || edu.year) {
                return `
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <h3 style="font-size: 16px; font-weight: bold; margin: 0 0 5px 0; color: #333;">${edu.degree}</h3>
                      <p style="margin: 0; color: #666; font-size: 14px;">${edu.school}</p>
                    </div>
                    <span style="color: #666; font-weight: 500; font-size: 14px;">${edu.year}</span>
                  </div>
                `;
              }
              return '';
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Experience -->
      ${resumeData.experience.some(exp => exp.company || exp.position || exp.duration || exp.description) ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: bold; margin: 0 0 15px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Work Experience</h2>
          <div style="display: flex; flex-direction: column; gap: 20px;">
            ${resumeData.experience.map(exp => {
              if (exp.company || exp.position || exp.duration || exp.description) {
                return `
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                      <h3 style="font-size: 16px; font-weight: bold; margin: 0; color: #333;">${exp.position}</h3>
                      <span style="color: #666; font-weight: 500; font-size: 14px;">${exp.duration}</span>
                    </div>
                    <p style="margin: 0 0 8px 0; color: #666; font-weight: 500; font-size: 14px;">${exp.company}</p>
                    <p style="margin: 0; color: #555; line-height: 1.5; font-size: 14px;">${exp.description}</p>
                  </div>
                `;
              }
              return '';
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Skills -->
      ${resumeData.skills.some(skill => skill.trim()) ? `
        <div>
          <h2 style="font-size: 20px; font-weight: bold; margin: 0 0 15px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Skills</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${resumeData.skills.map(skill => {
              if (skill.trim()) {
                return `<span style="background-color: #f0f0f0; color: #333; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">${skill}</span>`;
              }
              return '';
            }).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
};