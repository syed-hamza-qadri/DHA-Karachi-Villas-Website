"use server"

import { Resend } from "resend"

const resend = new Resend("re_2u2y66t2_JFKwhebVD2AHxj2pLY1KXfY2")

interface ContactFormData {
  name: string
  email: string
  phone: string
  purpose: string
  propertyType: string
  customPropertyType?: string
  message: string
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    const propertyTypeDisplay = formData.propertyType === "other" ? formData.customPropertyType : formData.propertyType

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Property Inquiry - DHA Karachi Villas</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #334155;
              margin: 0;
              padding: 0;
              background-color: #f8fafc;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
              color: white;
              padding: 32px 24px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 700;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header p {
              margin: 8px 0 0 0;
              font-size: 16px;
              opacity: 0.95;
            }
            .content {
              padding: 32px 24px;
            }
            .inquiry-badge {
              display: inline-block;
              background: linear-gradient(135deg, #dc2626, #b91c1c);
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 24px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .info-grid {
              display: grid;
              gap: 20px;
              margin-bottom: 32px;
            }
            .info-item {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 16px;
              border-left: 4px solid #dc2626;
            }
            .info-label {
              font-weight: 600;
              color: #475569;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 4px;
            }
            .info-value {
              color: #1e293b;
              font-size: 16px;
              font-weight: 500;
            }
            .message-section {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 20px;
              margin-top: 24px;
              border-left: 4px solid #dc2626;
            }
            .message-label {
              font-weight: 600;
              color: #475569;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 12px;
            }
            .message-content {
              color: #1e293b;
              font-size: 16px;
              line-height: 1.7;
              white-space: pre-wrap;
            }
            .footer {
              background: #1e293b;
              color: white;
              padding: 24px;
              text-align: center;
            }
            .footer h3 {
              margin: 0 0 12px 0;
              font-size: 20px;
              font-weight: 600;
            }
            .footer p {
              margin: 4px 0;
              opacity: 0.9;
            }
            .contact-info {
              margin-top: 16px;
              padding-top: 16px;
              border-top: 1px solid #475569;
            }
            .priority-badge {
              background: #fef3c7;
              color: #92400e;
              padding: 4px 12px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏡 DHA Karachi Villas</h1>
              <p>New Property Inquiry Received</p>
            </div>
            
            <div class="content">
              <div class="inquiry-badge">
                ${formData.purpose ? `${formData.purpose.toUpperCase()} INQUIRY` : "PROPERTY INQUIRY"}
              </div>
              
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Client Name</div>
                  <div class="info-value">${formData.name}</div>
                </div>
                
                <div class="info-item">
                  <div class="info-label">Email Address</div>
                  <div class="info-value">${formData.email}</div>
                </div>
                
                ${
                  formData.phone
                    ? `
                <div class="info-item">
                  <div class="info-label">Phone Number</div>
                  <div class="info-value">${formData.phone}</div>
                </div>
                `
                    : ""
                }
                
                ${
                  formData.purpose
                    ? `
                <div class="info-item">
                  <div class="info-label">Purpose</div>
                  <div class="info-value">${formData.purpose.charAt(0).toUpperCase() + formData.purpose.slice(1)}</div>
                </div>
                `
                    : ""
                }
                
                ${
                  propertyTypeDisplay
                    ? `
                <div class="info-item">
                  <div class="info-label">Property Type</div>
                  <div class="info-value">${propertyTypeDisplay.charAt(0).toUpperCase() + propertyTypeDisplay.slice(1)}</div>
                </div>
                `
                    : ""
                }
              </div>
              
              ${
                formData.message
                  ? `
              <div class="message-section">
                <div class="message-label">Client Message</div>
                <div class="message-content">${formData.message}</div>
              </div>
              `
                  : ""
              }
              
              <div style="margin-top: 24px; padding: 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; text-align: center;">
                <span class="priority-badge">High Priority</span>
                <p style="margin: 8px 0 0 0; color: #991b1b; font-weight: 500;">
                  Please respond to this inquiry within 24 hours for best client experience.
                </p>
              </div>
            </div>
            
            <div class="footer">
              <h3>DHA Karachi Villas</h3>
              <p>Your Trusted Real Estate Partner</p>
              <div class="contact-info">
                <p><strong>📞 Phone:</strong> 03 111 468 222</p>
                <p><strong>📧 Email:</strong> dhakarachivillas@gmail.com</p>
                <p><strong>📍 Office:</strong> Bukhari Commercial, DHA Phase 6, Karachi</p>
                <p><strong>🌐 Website:</strong> dhakv.com</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "DHA Karachi Villas <noreply@dhakv.com>",
      to: ["farhaankhatri@gmail.com"],
      subject: `🏡 New ${formData.purpose ? formData.purpose.toUpperCase() : "Property"} Inquiry from ${formData.name}`,
      html: emailHtml,
      replyTo: formData.email,
    })

    if (error) {
      console.error("Email sending error:", error)
      return { success: false, error: "Failed to send email" }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error: "Failed to send email" }
  }
}
