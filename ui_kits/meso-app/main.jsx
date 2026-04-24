import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import '../../colors_and_type.css'
import './app.css'
import { Sidebar, Header }   from './Shell'
import { Button, Modal, Toast, Card, Pill } from './Components'
import { TeamsScreen, TEAMS } from './TeamsScreen'
import { TeamDetail }          from './TeamDetail'
import { PersonDetail, PEOPLE } from './nodes/person/PersonDetail'
import { RoleDetail,   ROLES  } from './nodes/role/RoleDetail'

// ─── Simple list screens for People and Roles ─────────────────────────────────

const PeopleScreen = ({ onOpenPerson }) => (
  <div style={{ padding: `${spacing.xl} ${spacing.xl2} ${spacing.xl3}`, maxWidth: 1040 }}>
    <div style={{ fontFamily: fontFamilies.display, fontSize: '12px', fontWeight: 600, letterSpacing: '-0.2px', color: colors.teal, marginBottom: spacing.s }}>
      Operating model
    </div>
    <h1 style={{ fontFamily: fontFamilies.display, fontSize: typeScale.h1.size, fontWeight: typeScale.h1.weight, letterSpacing: typeScale.h1.letterSpacing, lineHeight: typeScale.h1.lineHeight, color: colors.ink, marginBottom: spacing.xl }}>
      People
    </h1>
    <Card level={1} padding={0} style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Name', 'Location', 'Type', ''].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '14px 20px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: colors.textTertiary, borderBottom: `1px solid ${colors.borderMid}` }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PEOPLE.map(p => (
            <tr
              key={p.id}
              onClick={() => onOpenPerson(p)}
              style={{ cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = colors.stone}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, fontSize: typeScale.ui.size, fontWeight: 500, color: colors.ink }}>{p.name}</td>
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, fontSize: '13px', color: colors.textSecondary }}>{p.location || '—'}</td>
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}` }}>
                {p.isExternal
                  ? <Pill variant="outline">External</Pill>
                  : <Pill variant="neutral" dot="live">Internal</Pill>
                }
              </td>
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: colors.teal }}>View →</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
)

const RolesScreen = ({ onOpenRole }) => (
  <div style={{ padding: `${spacing.xl} ${spacing.xl2} ${spacing.xl3}`, maxWidth: 1040 }}>
    <div style={{ fontFamily: fontFamilies.display, fontSize: '12px', fontWeight: 600, letterSpacing: '-0.2px', color: colors.teal, marginBottom: spacing.s }}>
      Operating model
    </div>
    <h1 style={{ fontFamily: fontFamilies.display, fontSize: typeScale.h1.size, fontWeight: typeScale.h1.weight, letterSpacing: typeScale.h1.letterSpacing, lineHeight: typeScale.h1.lineHeight, color: colors.ink, marginBottom: spacing.xl }}>
      Roles
    </h1>
    <Card level={1} padding={0} style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Role', 'Team', 'Domain', 'Status', ''].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '14px 20px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: colors.textTertiary, borderBottom: `1px solid ${colors.borderMid}` }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROLES.map(r => (
            <tr
              key={r.id}
              onClick={() => onOpenRole(r)}
              style={{ cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = colors.stone}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, fontSize: typeScale.ui.size, fontWeight: 500, color: colors.ink }}>{r.roleName}</td>
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, fontSize: '13px', color: colors.textSecondary }}>{r.teamName}</td>
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, fontSize: '13px', color: colors.textSecondary }}>{r.domain}</td>
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}` }}>
                {r.isVacant
                  ? <Pill variant="neutral" dot="warn">Vacant</Pill>
                  : <Pill variant="teal"    dot="live">Filled</Pill>
                }
              </td>
              <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: colors.teal }}>View →</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
)

// ─── Empty panel for unimplemented sections ───────────────────────────────────

function EmptyPanel({ label }) {
  return (
    <div style={{ padding: `${spacing.xl3} ${spacing.xl2}`, maxWidth: 720 }}>
      <div style={{ fontFamily: fontFamilies.display, fontSize: '12px', fontWeight: 600, letterSpacing: '-0.2px', color: colors.teal, marginBottom: spacing.s }}>
        {label}
      </div>
      <h1 style={{ fontFamily: fontFamilies.display, fontSize: typeScale.h1.size, fontWeight: typeScale.h1.weight, letterSpacing: typeScale.h1.letterSpacing, lineHeight: typeScale.h1.lineHeight, color: colors.ink, marginBottom: spacing.m }}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </h1>
      <p style={{ fontFamily: fontFamilies.body, fontSize: '15px', color: colors.textSecondary, lineHeight: 1.7 }}>
        Section scaffolded but not yet interactive — see the Teams, People, or Roles tabs for the full click-through.
      </p>
    </div>
  )
}

const RECORD_IDS = new Set(['people', 'roles', 'teams', 'services', 'processes', 'governance-bodies'])

function getPageInfo(active, openNode) {
  const label = active.charAt(0).toUpperCase() + active.slice(1).replace(/-/g, ' ')
  if (openNode) return { pageTitle: label, breadcrumbs: ['Records', label, openNode.name ?? openNode.roleName] }
  if (RECORD_IDS.has(active)) return { pageTitle: label, breadcrumbs: ['Records', label] }
  return { pageTitle: label, breadcrumbs: [] }
}

function App() {
  const [active,     setActive]     = useState('teams')
  const [openTeam,   setOpenTeam]   = useState(null)
  const [openPerson, setOpenPerson] = useState(null)
  const [openRole,   setOpenRole]   = useState(null)
  const [modal,      setModal]      = useState(false)
  const [toast,      setToast]      = useState(null)
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const showToast = (kind, msg) => {
    setToast({ kind, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const navigateTo = (id) => {
    setActive(id)
    setOpenTeam(null)
    setOpenPerson(null)
    setOpenRole(null)
  }

  const openNode = openTeam ?? openPerson ?? openRole
  const { pageTitle, breadcrumbs } = getPageInfo(active, openNode)

  return (
    <div>
      <Sidebar active={active} onNavigate={navigateTo} />
      <div style={{ marginLeft: 60, minHeight: '100vh', background: colors.stone }}>
        <Header
          pageTitle={pageTitle}
          breadcrumbs={breadcrumbs}
          onShare={() => showToast('info', 'Link copied to clipboard.')}
        />
        <div key={openNode ? openNode.id : active} className="rise">

          {/* Teams */}
          {active === 'teams' && !openTeam && (
            <TeamsScreen onOpenTeam={setOpenTeam} loading={loading} />
          )}
          {active === 'teams' && openTeam && (
            <TeamDetail team={openTeam} onBack={() => setOpenTeam(null)} onRemove={() => setModal(true)} />
          )}

          {/* People */}
          {active === 'people' && !openPerson && (
            <PeopleScreen onOpenPerson={setOpenPerson} />
          )}
          {active === 'people' && openPerson && (
            <PersonDetail person={openPerson} onBack={() => setOpenPerson(null)} />
          )}

          {/* Roles */}
          {active === 'roles' && !openRole && (
            <RolesScreen onOpenRole={setOpenRole} />
          )}
          {active === 'roles' && openRole && (
            <RoleDetail role={openRole} onBack={() => setOpenRole(null)} />
          )}

          {/* Everything else */}
          {!['teams', 'people', 'roles'].includes(active) && !openNode && (
            <EmptyPanel label={active} />
          )}
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
