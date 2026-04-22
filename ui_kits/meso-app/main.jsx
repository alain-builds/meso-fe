import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { colors, fontFamilies } from '@/tokens'
import '../../colors_and_type.css'
import './app.css'
import { Sidebar, Header } from './Shell'
import { Button, Modal, Toast } from './Components'
import { TeamsScreen } from './TeamsScreen'
import { TeamDetail } from './TeamDetail'

function EmptyPanel({ label }) {
  return (
    <div style={{ padding: '80px 40px', maxWidth: 720 }}>
      <div style={{ fontFamily: fontFamilies.display, fontSize: 12, fontWeight: 600, letterSpacing: '-0.2px', color: colors.teal, marginBottom: 8 }}>
        {label}
      </div>
      <h1 style={{ fontFamily: fontFamilies.display, fontSize: 38, fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.04, color: colors.ink, marginBottom: 16 }}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </h1>
      <p style={{ fontSize: 15, color: colors.textSecondary, lineHeight: 1.7 }}>
        Section scaffolded in the kit but not interactive — see the Teams tab for the full click-through demo.
      </p>
    </div>
  )
}

const RECORD_IDS = new Set(['people', 'roles', 'teams', 'services', 'processes', 'governance-bodies'])

function getPageInfo(active, openTeam) {
  const label = active.charAt(0).toUpperCase() + active.slice(1).replace(/-/g, ' ')
  if (openTeam) return { pageTitle: label, breadcrumbs: ['Records', label, openTeam.name] }
  if (RECORD_IDS.has(active)) return { pageTitle: label, breadcrumbs: ['Records', label] }
  return { pageTitle: label, breadcrumbs: [] }
}

function App() {
  const [active, setActive] = useState('teams')
  const [openTeam, setOpenTeam] = useState(null)
  const [modal, setModal] = useState(false)
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const showToast = (kind, msg) => {
    setToast({ kind, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const { pageTitle, breadcrumbs } = getPageInfo(active, openTeam)

  return (
    <div>
      <Sidebar
        active={active}
        onNavigate={(id) => { setActive(id); setOpenTeam(null) }}
      />
      <div style={{ marginLeft: 60, minHeight: '100vh', background: colors.stone }}>
        <Header
          pageTitle={pageTitle}
          breadcrumbs={breadcrumbs}
          onShare={() => showToast('info', 'Link copied to clipboard.')}
        />
        <div key={openTeam ? openTeam.id : active} className="rise">
          {active === 'teams' && !openTeam && (
            <TeamsScreen onOpenTeam={setOpenTeam} loading={loading} />
          )}
          {openTeam && (
            <TeamDetail team={openTeam} onBack={() => setOpenTeam(null)} onRemove={() => setModal(true)} />
          )}
          {active !== 'teams' && !openTeam && <EmptyPanel label={active} />}
        </div>
      </div>

      <Modal
        open={modal}
        title={`Remove ${openTeam?.name}?`}
        onClose={() => setModal(false)}
        footer={<>
          <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => {
            setModal(false)
            setOpenTeam(null)
            showToast('error', `Team "${openTeam.name}" removed. 3 dependent workflows re-routed.`)
          }}>Remove team</Button>
        </>}
      >
        This team owns 3 workflows and 12 services. Removing it will queue those dependencies for reassignment. This cannot be undone.
      </Modal>

      <div style={{ position: 'fixed', top: 80, right: 24, zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toast && <Toast kind={toast.kind} msg={toast.msg} onDismiss={() => setToast(null)} />}
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
