import { useState, useEffect, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import { colors, fontFamilies, typeScale, spacing } from '@/tokens'
import '../../colors_and_type.css'
import './app.css'
import { Sidebar, Header }            from './Shell'
import { Button, Modal, Toast }       from './Components'
import { TeamsScreen }                 from './nodes/team/TeamsScreen'
import { TeamDetail }                 from './nodes/team/TeamDetail'
import { PersonDetail }               from './nodes/person/PersonDetail'
import { PeopleScreen }               from './nodes/person/PeopleScreen'
import { RoleDetail }                 from './nodes/role/RoleDetail'
import { RolesScreen }                from './nodes/role/RolesScreen'
import { ValueStreamDetail }          from './nodes/value-stream/ValueStreamDetail'
import { ValueStreamScreen }          from './nodes/value-stream/ValueStreamScreen'
import { CapabilityDetail }           from './nodes/capability/CapabilityDetail'
import { CapabilityScreen }           from './nodes/capability/CapabilityScreen'
import { buildBreadcrumbs }           from './shared/breadcrumbs.js'

// ─── Empty panel for unimplemented sections ───────────────────────────────────

function EmptyPanel({ label }) {
  return (
    <div style={{ padding: `${spacing.xl3} ${spacing.xl2}`, maxWidth: 720 }}>
      <div style={{
        fontFamily:    fontFamilies.display,
        fontSize:      typeScale.eyebrow.size,
        fontWeight:    typeScale.eyebrow.weight,
        letterSpacing: typeScale.eyebrow.letterSpacing,
        color:         colors.teal,
        marginBottom:  spacing.s,
      }}>
        {label}
      </div>
      <h1 style={{ fontFamily: fontFamilies.display, fontSize: typeScale.h1.size, fontWeight: typeScale.h1.weight, letterSpacing: typeScale.h1.letterSpacing, lineHeight: typeScale.h1.lineHeight, color: colors.ink, marginBottom: spacing.m }}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </h1>
      <p style={{ fontFamily: fontFamilies.body, fontSize: typeScale.bodyLg.size, color: colors.textSecondary, lineHeight: 1.7 }}>
        Section scaffolded but not yet interactive — see the Teams, People, or Roles tabs for the full click-through.
      </p>
    </div>
  )
}


function App() {
  const [active,           setActive]           = useState('teams')
  const [openTeam,         setOpenTeam]         = useState(null)
  const [openPerson,       setOpenPerson]       = useState(null)
  const [openRole,         setOpenRole]         = useState(null)
  const [openValueStream,  setOpenValueStream]  = useState(null)
  const [openCapability,   setOpenCapability]   = useState(null)
  const [modal,        setModal]        = useState(false)
  const [toast,        setToast]        = useState(null)
  const [loading,      setLoading]      = useState(true)
  const [titleVisible, setTitleVisible] = useState(true)

  const openNode = openTeam ?? openPerson ?? openRole ?? openValueStream ?? openCapability

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
    setOpenValueStream(null)
    setOpenCapability(null)
    setTitleVisible(true)
  }

  const closeNode = useCallback(() => {
    setOpenTeam(null)
    setOpenPerson(null)
    setOpenRole(null)
    setOpenValueStream(null)
    setOpenCapability(null)
    setTitleVisible(true)
  }, [])

  const breadcrumbs = buildBreadcrumbs(active, openNode, closeNode)

  return (
    <div>
      <Sidebar active={active} onNavigate={navigateTo} />
      <div style={{ marginLeft: 60, minHeight: '100vh', background: colors.stone }}>
        <Header
          breadcrumbs={breadcrumbs}
          boldLastBreadcrumb={!titleVisible}
          onShare={() => showToast('info', 'Link copied to clipboard.')}
        />
        <div key={openNode ? openNode.id : active} className="rise">

          {/* Teams */}
          {active === 'teams' && !openTeam && (
            <TeamsScreen onOpenTeam={setOpenTeam} loading={loading} />
          )}
          {active === 'teams' && openTeam && (
            <TeamDetail team={openTeam} onRemove={() => setModal(true)} onTitleVisibilityChange={setTitleVisible} />
          )}

          {/* People */}
          {active === 'people' && !openPerson && (
            <PeopleScreen onOpenPerson={setOpenPerson} />
          )}
          {active === 'people' && openPerson && (
            <PersonDetail person={openPerson} onTitleVisibilityChange={setTitleVisible} />
          )}

          {/* Roles */}
          {active === 'roles' && !openRole && (
            <RolesScreen onOpenRole={setOpenRole} />
          )}
          {active === 'roles' && openRole && (
            <RoleDetail role={openRole} onTitleVisibilityChange={setTitleVisible} />
          )}

          {/* Value Streams */}
          {active === 'value-streams' && !openValueStream && (
            <ValueStreamScreen onOpenValueStream={setOpenValueStream} />
          )}
          {active === 'value-streams' && openValueStream && (
            <ValueStreamDetail valueStream={openValueStream} onTitleVisibilityChange={setTitleVisible} />
          )}

          {/* Capabilities */}
          {active === 'capabilities' && !openCapability && (
            <CapabilityScreen onOpenCapability={setOpenCapability} />
          )}
          {active === 'capabilities' && openCapability && (
            <CapabilityDetail capability={openCapability} onTitleVisibilityChange={setTitleVisible} />
          )}

          {/* Everything else */}
          {!['teams', 'people', 'roles', 'value-streams', 'capabilities'].includes(active) && !openNode && (
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
