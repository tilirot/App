import { useState } from 'react'
import './App.css'
import JobSearch from './components/JobSearch'

function App() {
  const [activeSection, setActiveSection] = useState('job-search')

  const navItems = [
    { id: 'job-search', label: 'Job Search' },
    { id: 'applications', label: 'My Applications' },
    { id: 'career-planner', label: 'Career Planner' },
    { id: 'resume-builder', label: 'Resume Builder' },
    { id: 'skills', label: 'Skills Assessment' }
  ]

  const renderContent = () => {
    switch(activeSection) {
      case 'job-search':
        return (
          <section className="section">
            <h1>Job Search</h1>
            <div className="content-area">
              <JobSearch jobs={mockJobs} onSaveApplication={handleSaveApplication} />
            </div>
          </section>
        )
      case 'applications':
        return (
          <section className="section">
            <h1>My Applications</h1>
            <div className="content-area">
              {applications.length === 0 ? (
                <p>Track your applications here — you haven't saved any jobs yet.</p>
              ) : (
                <ul className="applications-list">
                  {applications.map(app => (
                    <li key={app.id} className="application-item">
                      <strong>{app.title}</strong> — {app.company} <span className="applied-badge">Saved</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )
      case 'career-planner':
        return (
          <section className="section">
            <h1>Career Planner</h1>
            <div className="content-area">
              <p>Plan your career path here</p>
            </div>
          </section>
        )
      case 'resume-builder':
        return (
          <section className="section">
            <h1>Resume Builder</h1>
            <div className="content-area">
              <p>Build your resume here</p>
            </div>
          </section>
        )
      case 'skills':
        return (
          <section className="section">
            <h1>Skills Assessment</h1>
            <div className="content-area">
              <p>Assess your skills here</p>
            </div>
          </section>
        )
      default:
        return (
          <section className="section">
            <h1>Job Search</h1>
            <div className="content-area">
              <p>Default content</p>
            </div>
          </section>
        )
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Job Finder App</h1>
        <div className="user-info">
          <span>Welcome, User!</span>
        </div>
      </header>

      <nav className="navigation">
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

// --- Local data & app-level state (kept at bottom to keep render logic above simpler) ---
const mockJobs = [
  { id: '1', title: 'Student Intern', company: 'University Labs', location: 'Remote', type: 'Internship', description: 'Support research and development tasks.' },
  { id: '2', title: 'IT Support', company: 'Acme Corp', location: 'New York, NY', type: 'Full-time', description: 'Help desk support and hardware troubleshooting.' },
  { id: '3', title: 'Bus Driver', company: 'City Transit', location: 'Local', type: 'Part-time', description: 'Commercial driving experience required, 21+.' },
  { id: '4', title: 'Frontend Developer', company: 'Startup Co', location: 'Remote', type: 'Full-time', description: 'React developer to build UX features.' }
]

function AppWrapper() {
  // keep previous App component behavior but add persistent application list at top-level so other sections can access it if needed
  const [applications, setApplications] = useState([])

  function handleSaveApplication(job) {
    setApplications(prev => {
      if (prev.find(j => j.id === job.id)) return prev
      return [...prev, job]
    })
  }

  return <AppInner applications={applications} handleSaveApplication={handleSaveApplication} />
}

// To avoid moving too much code around, export default App for compatibility. We'll keep the original App as the inner component.
function AppInner({ applications: _apps = [], handleSaveApplication: _handleSave = () => {} }) {
  // Reuse the original App code by re-declaring state here; this mirrors the earlier top-level App but wires in props.
  const [activeSection, setActiveSection] = useState('job-search')

  const navItems = [
    { id: 'job-search', label: 'Job Search' },
    { id: 'applications', label: 'My Applications' },
    { id: 'career-planner', label: 'Career Planner' },
    { id: 'resume-builder', label: 'Resume Builder' },
    { id: 'skills', label: 'Skills Assessment' }
  ]

  const renderContentInner = () => {
    switch(activeSection) {
      case 'job-search':
        return (
          <section className="section">
            <h1>Job Search</h1>
            <div className="content-area">
              <JobSearch jobs={mockJobs} onSaveApplication={_handleSave} />
            </div>
          </section>
        )
      case 'applications':
        return (
          <section className="section">
            <h1>My Applications</h1>
            <div className="content-area">
              {_apps.length === 0 ? (
                <p>Track your applications here — you haven't saved any jobs yet.</p>
              ) : (
                <ul className="applications-list">
                  {_apps.map(app => (
                    <li key={app.id} className="application-item">
                      <strong>{app.title}</strong> — {app.company} <span className="applied-badge">Saved</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )
      case 'career-planner':
        return (
          <section className="section">
            <h1>Career Planner</h1>
            <div className="content-area">
              <p>Plan your career path here</p>
            </div>
          </section>
        )
      case 'resume-builder':
        return (
          <section className="section">
            <h1>Resume Builder</h1>
            <div className="content-area">
              <p>Build your resume here</p>
            </div>
          </section>
        )
      case 'skills':
        return (
          <section className="section">
            <h1>Skills Assessment</h1>
            <div className="content-area">
              <p>Assess your skills here</p>
            </div>
          </section>
        )
      default:
        return (
          <section className="section">
            <h1>Job Search</h1>
            <div className="content-area">
              <p>Default content</p>
            </div>
          </section>
        )
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Job Finder App</h1>
        <div className="user-info">
          <span>Welcome, User!</span>
        </div>
      </header>

      <nav className="navigation">
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="main-content">
        {renderContentInner()}
      </main>
    </div>
  )
}

export default AppWrapper