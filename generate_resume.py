import os
import fitz  # PyMuPDF
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def build_pdf(filename="public/resume.pdf"):
    # Target: Exactly 1 single-page, Google-standard, ATS-optimized software engineer resume
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=28,
        rightMargin=28,
        topMargin=20,
        bottomMargin=20,
        title="Muhammad Rashid Shafique - Resume",
        author="Muhammad Rashid Shafique"
    )

    # Executive Google Tech Color Palette
    PRIMARY = colors.HexColor("#0F172A")    # Deep slate 900
    ACCENT = colors.HexColor("#0284C7")     # Clean Blue for Links
    BODY = colors.HexColor("#1E293B")       # Crisp Charcoal Body Text
    MUTED = colors.HexColor("#475569")      # Slate 600 for Meta/Dates
    LINE_COLOR = colors.HexColor("#94A3B8") # Crisp divider line

    styles = getSampleStyleSheet()

    style_name = ParagraphStyle(
        'ResumeName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=17,
        leading=19,
        alignment=TA_CENTER,
        textColor=PRIMARY
    )

    style_contact = ParagraphStyle(
        'ResumeContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11,
        alignment=TA_CENTER,
        textColor=BODY
    )

    style_tagline = ParagraphStyle(
        'ResumeTagline',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.5,
        alignment=TA_JUSTIFY,
        textColor=BODY
    )

    style_section_heading = ParagraphStyle(
        'ResumeSectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=11,
        textColor=PRIMARY,
        spaceAfter=0
    )

    style_company_name = ParagraphStyle(
        'ResumeCompanyName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.6,
        leading=10.8,
        textColor=PRIMARY
    )

    style_job_title = ParagraphStyle(
        'ResumeJobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.4,
        leading=10.5,
        textColor=BODY
    )

    style_right_date = ParagraphStyle(
        'ResumeRightDate',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=10.5,
        alignment=TA_RIGHT,
        textColor=MUTED
    )

    style_right_meta = ParagraphStyle(
        'ResumeRightMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.0,
        leading=10.5,
        alignment=TA_RIGHT,
        textColor=MUTED
    )

    style_bullet = ParagraphStyle(
        'ResumeBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=9.8,
        textColor=BODY,
        leftIndent=9,
        firstLineIndent=-9,
        spaceAfter=1.2
    )

    style_skill_label = ParagraphStyle(
        'ResumeSkillLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.9,
        leading=10.2,
        textColor=PRIMARY
    )

    style_skill_body = ParagraphStyle(
        'ResumeSkillBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.2,
        textColor=BODY
    )

    def section_header(title):
        return [
            Spacer(1, 2.5),
            Paragraph(title.upper(), style_section_heading),
            HRFlowable(width="100%", thickness=0.75, color=PRIMARY, spaceBefore=1, spaceAfter=2.5)
        ]

    content = []

    # 1. HEADER (Only Required Professional URLs)
    content.append(Paragraph("MUHAMMAD RASHID SHAFIQUE", style_name))
    content.append(Spacer(1, 2))

    contact_line_1 = (
        'Faisalabad, Pakistan &nbsp;&bull;&nbsp; '
        '+92 319 8696623 &nbsp;&bull;&nbsp; '
        '<a href="mailto:rashidshafique.dev@gmail.com" color="#0284C7"><u>rashidshafique.dev@gmail.com</u></a>'
    )
    content.append(Paragraph(contact_line_1, style_contact))
    content.append(Spacer(1, 1.2))

    # Required professional URLs ONLY
    contact_line_2 = (
        '<a href="https://github.com/rashidshafique-dev" color="#0284C7"><u>github.com/rashidshafique-dev</u></a> &nbsp;&nbsp;|&nbsp;&nbsp; '
        '<a href="https://www.linkedin.com/in/rashidshafique-dev" color="#0284C7"><u>linkedin.com/in/rashidshafique-dev</u></a> &nbsp;&nbsp;|&nbsp;&nbsp; '
        '<a href="https://rashid-shafique-portfolio.vercel.app" color="#0284C7"><u>rashid-shafique-portfolio.vercel.app</u></a>'
    )
    content.append(Paragraph(contact_line_2, style_contact))
    content.append(Spacer(1, 2.5))

    # Tagline / Positioning
    content.append(Paragraph(
        "<b>Full-stack software engineer</b> specializing in AI-integrated web and mobile applications — architecting production-grade systems end-to-end, from database design and secure REST APIs to responsive frontends and cross-platform apps.",
        style_tagline
    ))

    # 2. EDUCATION (6th semester removed; clean Google-ready format)
    content.extend(section_header("Education"))

    edu_table_data = [
        [
            Paragraph("<b>University of Agriculture Faisalabad (UAF)</b>", style_company_name),
            Paragraph("<b>Sept 2023 — 2027 (Expected)</b>", style_right_date)
        ],
        [
            Paragraph("Bachelor of Science in Computer Science (BS CS) &nbsp;|&nbsp; <i>Faisalabad, Pakistan</i>", style_job_title),
            Paragraph("<i>Top Academic Tier</i>", style_right_meta)
        ]
    ]
    t_edu = Table(edu_table_data, colWidths=[400, 156])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    content.append(t_edu)
    content.append(Spacer(1, 1.5))
    content.append(Paragraph(
        "&bull; <b>Core Coursework:</b> Data Structures &amp; Algorithms, Object-Oriented Programming (OOP), Relational Database Management Systems (RDBMS &amp; SQL), Operating Systems, Software Engineering, Web Systems Architecture.",
        style_bullet
    ))
    content.append(Paragraph(
        "&bull; <b>Academic Focus:</b> Algorithmic Time/Space Complexity (Big-O Analysis), Database Optimization, and Distributed Systems fundamentals.",
        style_bullet
    ))

    # 3. EMPLOYMENT / EXPERIENCE
    content.extend(section_header("Employment"))

    exp_table_data = [
        [
            Paragraph("<b>Software Engineer — Full-Stack &amp; AI Systems</b>", style_company_name),
            Paragraph("<b>2023 — Present</b>", style_right_date)
        ],
        [
            Paragraph("<i>Independent / Open-Source Engineering</i>", style_job_title),
            Paragraph("<i>Faisalabad, Pakistan / Remote</i>", style_right_meta)
        ]
    ]
    t_exp = Table(exp_table_data, colWidths=[400, 156])
    t_exp.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    content.append(t_exp)
    content.append(Spacer(1, 1.5))

    content.append(Paragraph(
        "&bull; Architected and shipped production-grade Python backend services (Django, DRF, FastAPI) applying OOP design patterns and modular software principles for clean, maintainable codebases.",
        style_bullet
    ))
    content.append(Paragraph(
        "&bull; Designed optimized SQL schemas, normalization models, and indexing strategies to minimize API response latency by <b>42%</b> and eliminate redundant database round-trips.",
        style_bullet
    ))
    content.append(Paragraph(
        "&bull; Engineered secure authentication systems using stateless JWT tokens with auto-rotation/blacklisting and Google OAuth 2.0 Single Sign-On (SSO).",
        style_bullet
    ))
    content.append(Paragraph(
        "&bull; Built responsive, production-deployed frontends in React.js (Vite, Tailwind CSS, CSS Modules) and cross-platform mobile apps in React Native (Expo), shipping to Vercel and Railway.",
        style_bullet
    ))
    content.append(Paragraph(
        "&bull; <b>Core Technical Toolkit:</b> Data Structures, Algorithmic Analysis (Big-O), OOP, SQL Databases, Python, Django, DRF, FastAPI, React.js, React Native, Vite, Tailwind CSS, JWT, Google OAuth 2.0, Supabase, Firebase, Vercel, Railway, Git, GitHub.",
        style_bullet
    ))

    # 4. SOFTWARE PROJECTS (Exact featured projects with Google-caliber technical depth)
    content.extend(section_header("Software Projects"))

    def project_item(name, live_url, github_url, bullets, util_text, in_progress=False):
        links_parts = []
        if live_url:
            links_parts.append(f'<a href="{live_url}" color="#0284C7"><u>Live: {live_url.replace("https://", "")}</u></a>')
        if github_url:
            links_parts.append(f'<a href="{github_url}" color="#0284C7"><u>GitHub</u></a>')
        
        status_suffix = " <i>(In Progress)</i>" if in_progress else ""
        left_text = f"<b>{name}</b>{status_suffix}"
        if links_parts:
            left_text += f" &nbsp;—&nbsp; {' &nbsp;|&nbsp; '.join(links_parts)}"

        p_header = Paragraph(left_text, style_company_name)
        elements = [p_header, Spacer(1, 1)]
        for b in bullets:
            elements.append(Paragraph(f"&bull; {b}", style_bullet))
        if util_text:
            elements.append(Paragraph(f"&bull; <i>Utilized:</i> {util_text}", style_bullet))
        return elements

    # Project 1: Shifaa
    content.extend(project_item(
        name="Shifaa — AI-Powered Hospital Management System",
        live_url="https://al-shifaa-hms.vercel.app",
        github_url="https://github.com/rashidshafique-dev/AI-HMS",
        bullets=[
            "Architected a multi-role hospital management platform with an AI voice receptionist (\"Sana\") for natural, voice-based appointment booking, serving Admin, Doctor, Patient, Nurse, Receptionist, and Pharmacist roles.",
            "Integrated Groq API (Mistral-7B / Llama 3) for conversational AI, Whisper for real-time speech-to-text, and Coqui TTS for natural voice responses.",
            "Engineered JWT-secured authentication, a feature-sliced React frontend architecture, and a normalized Supabase (PostgreSQL) schema for scalable data access."
        ],
        util_text="Django REST Framework, React 18, Vite, Tailwind CSS, Supabase (PostgreSQL), Groq API, Whisper STT, Coqui TTS, JWT, Git, GitHub"
    ))

    # Project 2: AioVerse
    content.extend(project_item(
        name="AioVerse — Mobile Workspace & Multi-Utility Platform",
        live_url=None,
        github_url="https://github.com/rashidkhan4067/AioVerse",
        bullets=[
            "Architected a cross-platform mobile workspace app integrating 40+ native utilities (Image Studio, PDF Workspace, QR Studio, Task Manager) in React Native (Expo) and TypeScript.",
            "Engineered a high-performance Python Django REST Framework backend with stateless JWT token auto-rotation, guest mode isolation, and pytest validation suites.",
            "Offloaded binary media transformations to native thread workers and implemented offline-first local AsyncStorage caching, achieving locked 60 FPS performance."
        ],
        util_text="React Native, Expo, TypeScript, Python, Django, Django REST Framework, PostgreSQL, JWT, AsyncStorage, Git, GitHub"
    ))

    # Project 3: Bhutta Scents
    content.extend(project_item(
        name="Bhutta Scents Storefront",
        live_url="https://bhuttascents.com",
        github_url="https://github.com/rashidshafique-dev/BhuttaScents",
        bullets=[
            "Built a custom e-commerce web storefront for a luxury fragrance brand featuring dynamic product catalogs and responsive shopping cart management.",
            "Engineered custom responsive grid layouts and fluid UI micro-interactions without relying on heavy third-party UI libraries."
        ],
        util_text="React.js, Vite, Tailwind CSS, Vanilla CSS Modules, JavaScript, Git, GitHub"
    ))

    # Project 4: Sunrise Imperial Resort
    content.extend(project_item(
        name="Sunrise Imperial Resort — Hotel PMS &amp; Guest SaaS Platform",
        live_url="https://sunrise-hotel-plum.vercel.app",
        github_url="https://github.com/rashidkhan4067/Sunrise-Hotel.git",
        bullets=[
            "Architected a full-stack luxury Hotel Property Management System (PMS) and guest reservation portal with React 19, TypeScript, Tailwind CSS v4, and Radix UI.",
            "Built real-time hospitality modules: visual calendar reservation matrix, housekeeping inspection workflows, itemized POS folio invoicing, and ADR/RevPAR analytics.",
            "Optimized web vitals (INP &lt; 10ms) via requestAnimationFrame CSS token batching and engineered automated dynamic chunk retry listeners for 100% deployment reliability."
        ],
        util_text="React 19, TypeScript, Vite 7, Tailwind CSS v4, Radix UI, Zustand 5, TanStack Query, Recharts, Clerk Auth, Git, GitHub"
    ))

    # Project 5: Rescue Project
    content.extend(project_item(
        name="Rescue Project — Missing Person Search &amp; Coordination System",
        live_url="https://rescue-project.vercel.app",
        github_url="https://github.com/rashidkhan4067/Rescue_Project-",
        bullets=[
            "Engineered a search-and-rescue web console for missing person registrations and volunteer squad coordination as part of a team project.",
            "Applied difference hashing algorithms for image comparison and configured secure JWT-based authentication workflows."
        ],
        util_text="Data Structures, Algorithms, Python, FastAPI, Django, React.js, SQL, JWT, Git, GitHub"
    ))

    # Additional Projects Row
    content.append(Paragraph(
        "<b>Additional Projects:</b> Face Recognition Attendance System (Python), Quran Assistant (Django + SQLite + OpenAI), Food Delivery App (React + Firebase), Pharmacy Management System (C# WinForms + MS Access), Grocery Store Website (Flask + SQLite), LAN Chat App (Python GUI)",
        style_bullet
    ))

    # 5. SKILLS (Clean Google ATS categorization)
    content.extend(section_header("Skills"))

    skills_data = [
        [
            Paragraph("<b>CS Fundamentals:</b>", style_skill_label),
            Paragraph("Data Structures &amp; Algorithms, OOP, Big-O Complexity Analysis, RDBMS, Operating Systems, Software Engineering Principles", style_skill_body)
        ],
        [
            Paragraph("<b>Languages:</b>", style_skill_label),
            Paragraph("Python, JavaScript/TypeScript, SQL &nbsp;<i>(Familiar: C++, Java)</i>", style_skill_body)
        ],
        [
            Paragraph("<b>Frameworks &amp; Web:</b>", style_skill_label),
            Paragraph("Django, DRF, FastAPI, React.js, React Native (Expo), Vite, Tailwind CSS, CSS Modules", style_skill_body)
        ],
        [
            Paragraph("<b>Databases &amp; Cloud:</b>", style_skill_label),
            Paragraph("PostgreSQL, SQL, Supabase, Firebase, Vercel, Railway", style_skill_body)
        ],
        [
            Paragraph("<b>AI &amp; Voice:</b>", style_skill_label),
            Paragraph("Groq API, Whisper STT, Coqui TTS, OpenAI API, Prompt Engineering", style_skill_body)
        ],
        [
            Paragraph("<b>Security &amp; Tools:</b>", style_skill_label),
            Paragraph("JWT Authentication, Google OAuth 2.0, Git, GitHub", style_skill_body)
        ],
    ]

    skills_table = Table(skills_data, colWidths=[110, 446])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.6),
        ('TOPPADDING', (0,0), (-1,-1), 0.6),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    content.append(skills_table)

    # Build PDF
    doc.build(content)
    print(f"Successfully generated {filename}!")

if __name__ == "__main__":
    build_pdf()
