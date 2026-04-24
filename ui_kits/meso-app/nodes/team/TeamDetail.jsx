import { NodeDetailShell } from '../../NodeDetailShell'
import { AboutTab }         from './tabs/AboutTab'
import { MembersTab }       from './tabs/MembersTab'
import { TabStub }          from './tabs/TabStub'

// Extended mock detail data keyed by team id.
// Falls back to DEFAULTS for teams not listed here.
const DEFAULTS = {
  teamType:   'stream_aligned',
  domain:     'Engineering',
  purpose:    'Responsible for the reliability, scalability, and operational excellence of the platform layer shared across all product teams.',
  responsibilities: [
    'Own and operate the shared infrastructure layer (compute, networking, observability).',
    'Define and enforce platform engineering standards across the organisation.',
    'Provide internal developer tooling that accelerates other teams\' delivery cycles.',
    'Run the on-call rotation and incident command for platform-level incidents.',
  ],
  decisionAuthorities: [
    { title: 'Emergency infrastructure spend',  approver: 'CIO + team lead',  threshold: '> €25 k'   },
    { title: 'Production deploy — off-hours',    approver: 'SRE Lead',         threshold: 'Any'        },
    { title: 'Architecture changes',             approver: 'Staff Engineer',    threshold: 'Cross-team' },
  ],
  workspaceLinks: [
    { label: 'Team handbook' },
    { label: 'Incident runbooks' },
    { label: 'On-call schedule' },
  ],
  communicationChannels: [
    { name: '#platform-engineering' },
    { name: '#incidents' },
  ],
  directMemberCount:         12,
  totalMemberCount:          12,
  directInternalMemberCount: 9,
  directExternalMemberCount: 3,
  servicesProvided:  12,
  servicesConsumed:   5,
  okrHealth:         75,
  leads: [
    { id: 'l1', name: 'Sarah van der Berg', role: 'Engineering Manager', isVacant: false, isExternal: false },
    { id: 'l2', name: 'Thomas Weber',       role: 'Staff Engineer',      isVacant: false, isExternal: false },
  ],
  members: [
    { id: 'm1', name: 'Sarah van der Berg', role: 'Engineering Manager',   isVacant: false, isExternal: false },
    { id: 'm2', name: 'Thomas Weber',       role: 'Staff Engineer',        isVacant: false, isExternal: false },
    { id: 'm3', name: 'Katarina Novak',     role: 'SRE Lead',              isVacant: false, isExternal: false },
    { id: 'm4', name: 'Jin Park',           role: 'Senior Engineer',       isVacant: false, isExternal: false },
    { id: 'm5', name: 'Anika Bauer',        role: 'Senior Engineer',       isVacant: false, isExternal: false },
    { id: 'm6', name: 'Remi Fontaine',      role: 'Senior Engineer',       isVacant: false, isExternal: true  },
    { id: 'm7', name: 'Lars Eriksson',      role: 'Engineer',              isVacant: false, isExternal: false },
    { id: 'm8', name: 'Mia Santos',         role: 'Engineer',              isVacant: false, isExternal: true  },
    { id: 'm9', name: '',                   role: 'Senior Engineer',       isVacant: true,  isExternal: false },
    { id: 'm10',name: '',                   role: 'On-call escalation',    isVacant: true,  isExternal: false },
  ],
}

const TEAM_DETAILS = {
  t2: {
    ...DEFAULTS,
    teamType: 'platform',
    domain:   'Data',
    purpose:  'Build and operate the data infrastructure powering analytics, reporting, and ML pipelines across Meso.',
    leads: [
      { id: 'l1', name: 'Marco Lehmann', role: 'Engineering Manager', isVacant: false, isExternal: false },
    ],
    members: [
      { id: 'm1', name: 'Marco Lehmann', role: 'Engineering Manager', isVacant: false, isExternal: false },
      { id: 'm2', name: 'Priya Nair',    role: 'Data Engineer',       isVacant: false, isExternal: false },
      { id: 'm3', name: 'Ahmed Hassan',  role: 'Data Engineer',       isVacant: false, isExternal: true  },
      { id: 'm4', name: '',              role: 'Staff Data Engineer',  isVacant: true,  isExternal: false },
    ],
    directMemberCount: 4, totalMemberCount: 4,
    directInternalMemberCount: 3, directExternalMemberCount: 1,
    servicesProvided: 8, servicesConsumed: 3,
    okrHealth: 60,
  },
  t3: {
    ...DEFAULTS,
    teamType: 'enabling',
    domain:   'Security',
    purpose:  'Enable all teams to deliver securely and compliantly by providing expertise, tooling, and governance frameworks.',
    leads: [
      { id: 'l1', name: '', role: 'Head of Security & Compliance', isVacant: true, isExternal: false },
    ],
    members: [
      { id: 'm1', name: '', role: 'Head of Security & Compliance', isVacant: true,  isExternal: false },
      { id: 'm2', name: 'Ana Petrova', role: 'Security Engineer',  isVacant: false, isExternal: false },
      { id: 'm3', name: 'Omar Aziz',   role: 'Compliance Analyst', isVacant: false, isExternal: false },
    ],
    directMemberCount: 3, totalMemberCount: 3,
    directInternalMemberCount: 2, directExternalMemberCount: 1,
    servicesProvided: 5, servicesConsumed: 8,
    okrHealth: 50,
  },
}

const getDetail = (team) => TEAM_DETAILS[team.id] ?? { ...DEFAULTS, purpose: `${team.name} owns and operates its domain within the operating model.` }

const mapStatus = (s) => {
  if (s === 'active')   return 'active'
  if (s === 'inactive') return 'archived'
  return 'active'
}

const TeamDetail = ({ team, onBack, onRemove }) => {
  const detail      = getDetail(team)
  const vacancyCount = detail.members.filter(m => m.isVacant).length

  const statTiles = [
    {
      id:    'headcount',
      label: 'Headcount',
      value: `${detail.directMemberCount}`,
      sub:   `${detail.directInternalMemberCount} internal · ${detail.directExternalMemberCount} external`,
    },
    {
      id:    'vacancies',
      label: 'Vacancies',
      value: vacancyCount > 0 ? `${vacancyCount} open` : 'None',
      sub:   `of ${detail.members.length} roles`,
    },
    {
      id:    'services',
      label: 'Services',
      value: `${detail.servicesProvided} provided`,
      sub:   `${detail.servicesConsumed} consumed`,
    },
    {
      id:    'okr-health',
      label: 'OKR health',
      value: `${detail.okrHealth}%`,
      sub:   'on track',
    },
    {
      id:    'cost',
      label: 'Annual cost',
      value: '—',
      sub:   'Cost centre not set',
    },
    {
      id:    'team-type',
      label: 'Team type',
      value: detail.teamType.replace(/_/g, ' '),
      sub:   'Team Topologies',
    },
  ]

  const tabs = [
    { id: 'about',         label: 'About',          content: <AboutTab   detail={detail} /> },
    { id: 'members',       label: 'Members & roles', badge: vacancyCount, content: <MembersTab detail={detail} /> },
    { id: 'services',      label: 'Services',        content: <TabStub section="Services · §3.3"          /> },
    { id: 'value-streams', label: 'Value streams',   content: <TabStub section="Value streams · §3.3"     /> },
    { id: 'capabilities',  label: 'Capabilities',    content: <TabStub section="Capabilities owned · §3.3" /> },
    { id: 'okrs-kpis',     label: 'OKRs & KPIs',    content: <TabStub section="OKRs & KPIs · §3.3"       /> },
    { id: 'governance',    label: 'Governance',      content: <TabStub section="Governance · §3.3"        /> },
    { id: 'relationships', label: 'Relationships',   content: <TabStub section="Relationships · §3.3"     /> },
    { id: 'cost',          label: 'Cost',            content: <TabStub section="Cost · §3.3"              /> },
    { id: 'processes',     label: 'Processes',       content: <TabStub section="Processes · §3.3"         /> },
  ]

  return (
    <NodeDetailShell
      nodeType="Team"
      nodeSubtype={detail.teamType}
      name={team.name}
      status={mapStatus(team.status)}
      breadcrumb={[detail.domain]}
      statTiles={statTiles}
      tabs={tabs}
      onBack={onBack}
    />
  )
}

export { TeamDetail }
