# DHA Karachi Villas - Real Estate Website

A modern, responsive real estate website built with Next.js for showcasing properties in DHA Karachi. This website includes property listings, contact forms, admin panel, and email integration.

## 🚀 Features

- **Property Listings**: Browse residential and commercial properties
- **Advanced Search & Filters**: Filter by category, type, bedrooms, price, and location
- **Property Details**: Detailed property information with image galleries
- **Contact Forms**: Multiple contact options with email integration
- **Admin Panel**: Password-protected admin area for property management
- **Responsive Design**: Mobile-friendly interface
- **Image Management**: Multiple image upload and preview functionality
- **Email Integration**: Automated email notifications using Resend API
- **SEO Optimized**: Meta tags, structured data, and search engine friendly URLs

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage for images
- **Email**: Resend API
- **Forms**: React Hook Form with Zod validation
- **UI Components**: shadcn/ui component library

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

### Required Software
1. **Node.js** (version 18.0 or higher)
   - Download from: https://nodejs.org/
   - To check if installed: Open terminal/command prompt and run \`node --version\`

2. **npm** (comes with Node.js)
   - To check if installed: Run \`npm --version\`

### Required Services
1. **Supabase Account** (for database and file storage)
   - Sign up at: https://supabase.com/
   
2. **Resend Account** (for email functionality)
   - Sign up at: https://resend.com/

## 🛠️ Installation & Setup

### Step 1: Extract Project Files
1. Extract the downloaded zip file to your desired location
2. Open terminal/command prompt
3. Navigate to the project folder:
   \`\`\`bash
   cd path/to/dha-karachi-villas-website
   \`\`\`

### Step 2: Install Dependencies
Run the following command to install all required packages:
\`\`\`bash
npm install
\`\`\`

If you encounter any errors, try:
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### Step 3: Environment Variables Setup
1. Create a new file named \`.env.local\` in the root directory
2. Copy and paste the following template:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Configuration
RESEND_API_KEY=your_resend_api_key
\`\`\`

3. Replace the placeholder values with your actual credentials:

#### Getting Supabase Credentials:
- Go to your Supabase dashboard
- Select your project
- Go to Settings → API
- Copy the Project URL and anon/public key
- Copy the service_role key (keep this secret!)

#### Getting Resend API Key:
- Go to your Resend dashboard
- Navigate to API Keys
- Create a new API key
- Copy the key

### Step 4: Database Setup
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the SQL scripts from the \`scripts/\` folder in this order:
   - \`create-properties-table.sql\`
   - \`add-images-array-column.sql\`
   - \`update-property-id-to-text.sql\`
   - \`20250715-allow-anon-upload-property-images.sql\`
   - \`insert-sample-properties.sql\` (optional - for sample data)

### Step 5: Storage Setup
1. In Supabase, go to Storage
2. Create a new bucket named \`property-images\`
3. Make sure the bucket is public
4. Set appropriate RLS policies for file uploads

## 🚀 Running the Project

### Development Mode
To run the project in development mode:
\`\`\`bash
npm run dev
\`\`\`

The website will be available at: http://localhost:3000

### Production Build
To build and run the project for production:
\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
dha-karachi-villas-website/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── add-property/      # Add property form
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── properties/        # Properties listing
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── header.tsx        # Site header
│   ├── footer.tsx        # Site footer
│   └── ...               # Other components
├── lib/                  # Utility functions
├── scripts/              # Database scripts
├── styles/               # Global styles
└── public/               # Static assets
\`\`\`

## 🔧 Configuration

### Admin Panel Access
- URL: \`/admin/listings\`
- Password: \`Farhan777*&#@\`

### Email Configuration
- Emails are sent from: \`DHA Karachi Villas <noreply@dhakv.com>\`
- Emails are sent to: \`farhaankhatri@gmail.com\`
- Make sure to verify your domain in Resend for production use

### Image Upload
- Maximum images per property: 15
- Supported formats: JPG, PNG, WebP
- Images are stored in Supabase Storage

## 🌐 Deployment

### Vercel Deployment (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔍 SEO Features

### Implemented SEO Elements:
- ✅ Proper meta titles and descriptions
- ✅ Open Graph tags for social sharing
- ✅ Structured data for properties
- ✅ Responsive design
- ✅ Fast loading times
- ✅ Clean URLs
- ✅ Sitemap ready
- ✅ Mobile-friendly

## 🐛 Troubleshooting

### Common Issues:

**1. "Module not found" errors**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

**2. Port 3000 already in use**
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

**3. Images not loading**
- Check Supabase storage bucket permissions
- Verify environment variables
- Ensure bucket is public

**4. Email not sending**
- Verify Resend API key
- Check domain verification in Resend
- Review email logs in Resend dashboard

**5. Database connection issues**
- Verify Supabase credentials
- Check if database tables exist
- Review RLS policies

## 📄 License

This project is proprietary software developed for DHA Karachi Villas.

---

**Last Updated**: July 2025
**Version**: 1.0.0
**Built with**: Next.js 14, Supabase, Tailwind CSS, TypeScript
