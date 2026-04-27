import { NodeDetailShell } from '../../NodeDetailShell'
import { AboutTab }        from './tabs/AboutTab'
import { PersonTab }       from './tabs/PersonTab'
import { TabStub }         from '../team/tabs/TabStub'

const ROLES = [
  {
    id: 'r1',
    roleName:        'Engineering Manager',
    masterRoleLabel: 'Engineering Manager',
    teamName:        'Platform Engineering',
    domain:          'Engineering',
    status:          'filled',
    isVacant:        false,
    filledByName:    'Sarah van der Berg',
    vacantSince:     null,
    purpose:         'Lead the Platform Engineering team, drive engineering culture, and own delivery outcomes across the platform layer.',
    responsibilities: [
      'Set team direction and manage delivery against quarterly OKRs.',
      'Coach and develop engineers through regular 1:1s and structured feedback.',
      'Partner with the CTO and product leadership on roadmap and resourcing.',
      'Own hiring, onboarding, and performance management for the team.',
    ],
    decisionAuthorities: [
      { title: 'Headcount requests',       authorityType: 'Approves',  threshold: 'Up to 2 hires' },
      { title: 'Emergency infra spend',    authorityType: 'Co-decides', threshold: '> €25 k with CIO' },
      { title: 'Team operating agreement', authorityType: 'Decides',   threshold: 'Unilateral'   },
    ],
    workspaceLinks:        [{ label: 'Role spec doc' }, { label: 'OKR tracker' }],
    communicationChannels: [{ name: '#platform-engineering' }, { name: '#engineering-leads' }],
    servicesOwned:    3,
    processesOwned:   2,
    processesExecuted:4,
    costCentresOwned: 1,
    okrsOwned:        3,
    okrsOnTrack:      2,
    governanceSeats:  2,
    priorHolders: [
      { id: 'ph1', name: "James O'Brien", period: 'Jan 2022 – Mar 2023' },
    ],
    createdAt: 'Jan 10, 2021',
    createdBy: 'Daniel Riemann',
    updatedAt: 'Mar 3, 2025',
    updatedBy: 'Sarah van der Berg',
  },
  {
    id: 'r2',
    roleName:        'SRE Lead',
    masterRoleLabel: 'Site Reliability Engineer',
    teamName:        'Platform Engineering',
    domain:          'Engineering',
    status:          'filled',
    isVacant:        false,
    filledByName:    'Katarina Novak',
    vacantSince:     null,
    purpose:         'Own platform reliability, on-call operations, and incident command for the shared infrastructure layer.',
    responsibilities: [
      'Run the on-call rotation and coordinate incident response.',
      'Define and monitor SLOs for all platform services.',
      'Lead reliability reviews and post-mortems.',
      'Partner with engineering teams to embed reliability practices.',
    ],
    decisionAuthorities: [
      { title: 'Production deploy — off-hours', authorityType: 'Decides', threshold: 'Any' },
      { title: 'Incident escalation',           authorityType: 'Decides', threshold: 'Severity 1' },
    ],
    workspaceLinks:        [{ label: 'Runbooks' }, { label: 'SLO dashboard' }],
    communicationChannels: [{ name: '#incidents' }, { name: '#on-call' }],
    servicesOwned:    6,
    processesOwned:   3,
    processesExecuted:8,
    costCentresOwned: 0,
    okrsOwned:        2,
    okrsOnTrack:      1,
    governanceSeats:  1,
    priorHolders: [],
    createdAt: 'Apr 5, 2021',
    createdBy: 'Sarah van der Berg',
    updatedAt: 'Jan 15, 2025',
    updatedBy: 'Katarina Novak',
  },
  {
    id: 'r3',
    roleName:        'Head of Security & Compliance',
    masterRoleLabel: 'Head of Security',
    teamName:        'Security & Compliance',
    domain:          'Security',
    status:          'vacant',
    isVacant:        true,
    filledByName:    null,
    vacantSince:     'November 2024',
    purpose:         'Lead the Security & Compliance team and own the organisation\'s risk and compliance posture.',
    responsibilities: [
      'Define and maintain the security policy framework.',
      'Own compliance programmes (ISO 27001, GDPR, SOC 2).',
      'Partner with legal and operations on risk management.',
    ],
    decisionAuthorities: [
      { title: 'Security policy exceptions', authorityType: 'Approves', threshold: 'Any' },
    ],
    workspaceLinks:        [],
    communicationChannels: [{ name: '#security' }],
    servicesOwned:    2,
    processesOwned:   4,
    processesExecuted:6,
    costCentresOwned: 1,
    okrsOwned:        2,
    okrsOnTrack:      1,
    governanceSeats:  3,
    priorHolders: [
      { id: 'ph1', name: 'Fatima Al-Rashid', period: 'Sep 2021 – Oct 2024' },
    ],
    createdAt: 'Sep 1, 2021',
    createdBy: 'Daniel Riemann',
    updatedAt: 'Nov 4, 2024',
    updatedBy: 'Ana Petrova',
  },
]

const DEFAULT_ROLE = {
  id: 'rx',
  roleName:        'Role',
  masterRoleLabel: '—',
  teamName:        '—',
  domain:          '—',
  status:          'filled',
  isVacant:        false,
  filledByName:    null,
  vacantSince:     null,
  purpose:         'Role purpose not yet defined.',
  responsibilities: [],
  decisionAuthorities: [],
  workspaceLinks:        [],
  communicationChannels: [],
  servicesOwned:    0,
  processesOwned:   0,
  processesExecuted:0,
  costCentresOwned: 0,
  okrsOwned:        0,
  okrsOnTrack:      0,
  governanceSeats:  0,
  priorHolders:    [],
  createdAt: null,
  createdBy: null,
  updatedAt: null,
  updatedBy: null,
}

const getRole = (role) =>
  ROLES.find(r => r.roleName === role.name || r.id === role.id) ?? { ...DEFAULT_ROLE, roleName: role.name }

const RoleDetail = ({ role, onTitleVisibilityChange }) => {
  const detail = getRole(role)

  const statTiles = [
    {
      id:    'status',
      label: 'Status',
      value: detail.isVacant ? 'Vacant' : 'Filled',
      sub:   detail.isVacant
        ? `Since ${detail.vacantSince ?? '—'}`
        : `by ${detail.filledByName ?? '—'}`,
    },
    {
      id:    'services',
      label: 'Services owned',
      value: `${detail.servicesOwned}`,
    },
    {
      id:    'processes',
      label: 'Processes',
      value: `${detail.processesOwned} owned`,
      sub:   `${detail.processesExecuted} executed`,
    },
    {
      id:    'cost-centres',
      label: 'Cost centres',
      value: `${detail.costCentresOwned}`,
      sub:   'owned',
    },
    {
      id:    'okrs',
      label: 'OKRs',
      value: `${detail.okrsOwned} owned`,
      sub:   `${detail.okrsOnTrack} on track`,
    },
    {
      id:    'governance',
      label: 'Governance seats',
      value: `${detail.governanceSeats}`,
    },
  ]

  const tabs = [
    { id: 'about',       label: 'About',       content: <AboutTab  detail={detail} /> },
    { id: 'person',      label: 'Person',       content: <PersonTab detail={detail} /> },
    { id: 'team-ctx',    label: 'Team context', content: <TabStub section="Team context · §6.3"        /> },
    { id: 'ownership',   label: 'Ownership',    content: <TabStub section="Ownership · §6.3"           /> },
    { id: 'governance',  label: 'Governance',   content: <TabStub section="Governance · §6.3"          /> },
    { id: 'sponsorships',label: 'Sponsorships', content: <TabStub section="Sponsorships · §6.3"        /> },
    { id: 'delegations', label: 'Delegations',  content: <TabStub section="Delegations received · §6.3" /> },
  ]

  return (
    <NodeDetailShell
      nodeType="Role"
      nodeSubtype={detail.masterRoleLabel !== detail.roleName ? detail.masterRoleLabel : undefined}
      name={detail.roleName}
      status={detail.isVacant ? 'draft' : 'active'}
      createdAt={detail.createdAt}
      createdBy={detail.createdBy}
      updatedAt={detail.updatedAt}
      updatedBy={detail.updatedBy}
      statTiles={statTiles}
      tabs={tabs}
      onTitleVisibilityChange={onTitleVisibilityChange}
    />
  )
}

export { RoleDetail, ROLES }
