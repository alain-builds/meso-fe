import { NodeDetailShell }   from '../../NodeDetailShell'
import { NodeOverviewPanel } from '../../shared/NodeOverviewPanel'
import { AboutTab }          from './tabs/AboutTab'
import { PeopleTab }         from './tabs/PeopleTab'
import { ServicesTab }       from './tabs/ServicesTab'
import { DeliveryTab }       from './tabs/DeliveryTab'
import { PerformanceTab }    from './tabs/PerformanceTab'

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
    { id: 'm1', name: 'Sarah van der Berg', role: 'Engineering Manager',   isVacant: false, isExternal: false, staffedAt: 'Mar 2022' },
    { id: 'm2', name: 'Thomas Weber',       role: 'Staff Engineer',        isVacant: false, isExternal: false, staffedAt: 'Jun 2022' },
    { id: 'm3', name: 'Katarina Novak',     role: 'SRE Lead',              isVacant: false, isExternal: false, staffedAt: 'Jan 2023' },
    { id: 'm4', name: 'Jin Park',           role: 'Senior Engineer',       isVacant: false, isExternal: false, staffedAt: 'Apr 2023' },
    { id: 'm5', name: 'Anika Bauer',        role: 'Senior Engineer',       isVacant: false, isExternal: false, staffedAt: 'Sep 2023' },
    { id: 'm6', name: 'Remi Fontaine',      role: 'Senior Engineer',       isVacant: false, isExternal: true,  staffedAt: 'Feb 2024' },
    { id: 'm7', name: 'Lars Eriksson',      role: 'Engineer',              isVacant: false, isExternal: false, staffedAt: 'May 2024' },
    { id: 'm8', name: 'Mia Santos',         role: 'Engineer',              isVacant: false, isExternal: true,  staffedAt: 'Nov 2024' },
    { id: 'm9', name: '',                   role: 'Senior Engineer',       isVacant: true,  isExternal: false, staffedAt: null        },
    { id: 'm10',name: '',                   role: 'On-call escalation',    isVacant: true,  isExternal: false, staffedAt: null        },
  ],
  servicesProvidedList: [
    { id: 's1', name: 'CI/CD Platform',      type: 'technical', sla: '99.5% uptime', slaStatus: 'green' },
    { id: 's2', name: 'Observability Stack', type: 'technical', sla: '99% uptime',   slaStatus: 'green' },
    { id: 's3', name: 'Dev Portal',          type: 'business',  sla: null,           slaStatus: 'amber' },
  ],
  servicesConsumedList: [
    { id: 'sc1', name: 'Identity & Access', providerTeam: 'Security',   slaStatus: 'green' },
    { id: 'sc2', name: 'HR Data Feed',      providerTeam: 'People Ops', slaStatus: 'amber' },
  ],
  serviceDependencies: {
    inbound:  [ { id: 'd1', name: 'Feature Teams',        meta: 'depends on CI/CD Platform'      } ],
    outbound: [ { id: 'd2', name: 'Cloud Infrastructure', meta: 'CI/CD Platform depends on this' } ],
  },
  valueStreams: [
    { id: 'vs1', name: 'Developer Experience', contribution: 'contributes', businessOutcome: 'Reduce time-to-deploy across all product teams' },
    { id: 'vs2', name: 'Platform Reliability', contribution: 'owns',        businessOutcome: 'Maintain 99.9% platform SLA'                    },
  ],
  processes: [
    { id: 'p1', name: 'Incident Response',   type: 'operational', status: 'active' },
    { id: 'p2', name: 'Deployment Pipeline', type: 'technical',   status: 'active' },
    { id: 'p3', name: 'Capacity Planning',   type: 'operational', status: 'active' },
  ],
  okrs: [
    {
      id: 'okr1', title: 'Achieve zero-downtime deployments', period: 'Q2-2025',
      progressStatus: 'on_track', confidenceScore: 80,
      keyResults: [
        { id: 'kr1', title: 'Reduce failed deploys to < 0.5%',    progressStatus: 'on_track', currentValue: 0.8, targetValue: 0.5, unit: '%'          },
        { id: 'kr2', title: 'Deploy frequency ≥ 10 deploys/week', progressStatus: 'on_track', currentValue: 8,   targetValue: 10,  unit: 'deploys/wk' },
      ],
    },
    {
      id: 'okr2', title: 'Reduce platform operational toil by 40%', period: 'Q2-2025',
      progressStatus: 'at_risk', confidenceScore: 55,
      keyResults: [
        { id: 'kr3', title: 'Automated toil < 20% of engineering time', progressStatus: 'at_risk', currentValue: 32, targetValue: 20, unit: '%' },
      ],
    },
  ],
  kpis: [
    { id: 'kpi1', name: 'MTTR',              category: 'operational', contributionType: 'owns',        direction: 'lower_is_better',  unit: 'hours'        },
    { id: 'kpi2', name: 'Deploy frequency',  category: 'operational', contributionType: 'contributes', direction: 'higher_is_better', unit: 'deploys/week' },
    { id: 'kpi3', name: 'Infra cost / head', category: 'financial',   contributionType: 'influences',  direction: 'lower_is_better',  unit: 'EUR'          },
  ],
  costCenters: [
    { id: 'cc1', name: 'Platform Engineering', code: 'CC-4720', type: 'operational', allocationPercent: 100 },
  ],
  createdAt: 'Mar 12, 2022',
  createdBy: 'Sarah van der Berg',
  updatedAt: 'Apr 14, 2025',
  updatedBy: 'Thomas Weber',
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
      { id: 'm1', name: 'Marco Lehmann', role: 'Engineering Manager', isVacant: false, isExternal: false, staffedAt: 'Jun 2022' },
      { id: 'm2', name: 'Priya Nair',    role: 'Data Engineer',       isVacant: false, isExternal: false, staffedAt: 'Oct 2022' },
      { id: 'm3', name: 'Ahmed Hassan',  role: 'Data Engineer',       isVacant: false, isExternal: true,  staffedAt: 'Mar 2024' },
      { id: 'm4', name: '',              role: 'Staff Data Engineer',  isVacant: true,  isExternal: false, staffedAt: null        },
    ],
    directMemberCount: 4, totalMemberCount: 4,
    directInternalMemberCount: 3, directExternalMemberCount: 1,
    servicesProvided: 8, servicesConsumed: 3,
    okrHealth: 60,
    createdAt: 'Jun 8, 2022',
    createdBy: 'Marco Lehmann',
    updatedAt: 'Feb 27, 2025',
    updatedBy: 'Marco Lehmann',
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
      { id: 'm1', name: '',            role: 'Head of Security & Compliance', isVacant: true,  isExternal: false, staffedAt: null        },
      { id: 'm2', name: 'Ana Petrova', role: 'Security Engineer',             isVacant: false, isExternal: false, staffedAt: 'Oct 2023' },
      { id: 'm3', name: 'Omar Aziz',   role: 'Compliance Analyst',            isVacant: false, isExternal: false, staffedAt: 'Jan 2024' },
    ],
    directMemberCount: 3, totalMemberCount: 3,
    directInternalMemberCount: 2, directExternalMemberCount: 1,
    servicesProvided: 5, servicesConsumed: 8,
    okrHealth: 50,
    createdAt: 'Oct 3, 2023',
    createdBy: 'Daniel Riemann',
    updatedAt: 'Mar 19, 2025',
    updatedBy: 'Omar Aziz',
  },
}

const getDetail = (team) => TEAM_DETAILS[team.id] ?? { ...DEFAULTS, purpose: `${team.name} owns and operates its domain within the operating model.` }

const mapStatus = (s) => {
  if (s === 'active')   return 'active'
  if (s === 'inactive') return 'archived'
  return 'active'
}

const TeamDetail = ({ team, onRemove, onTitleVisibilityChange }) => {
  const detail     = getDetail(team)
  const filled     = detail.members.filter(m => !m.isVacant).length
  const totalRoles = detail.members.length

  const tabs = [
    { id: 'about',       label: 'About',          content: <AboutTab       detail={detail} /> },
    { id: 'people',      label: 'People & roles', badge: `${filled} / ${totalRoles}`, content: <PeopleTab detail={detail} /> },
    { id: 'services',    label: 'Services',       content: <ServicesTab    detail={detail} /> },
    { id: 'delivery',    label: 'Delivery',       content: <DeliveryTab    detail={detail} /> },
    { id: 'performance', label: 'Performance',    content: <PerformanceTab detail={detail} /> },
  ]

  const overviewFields = [
    { type: 'description', value: detail.purpose },
    { type: 'text',   label: 'Domain',    value: detail.domain },
    { type: 'pill',   label: 'Team type', value: detail.teamType.replace(/_/g, ' ') },
    { type: 'person', label: 'Lead(s)',   people: detail.leads },
    { type: 'date',   label: 'Last updated', date: detail.updatedAt, by: detail.updatedBy },
    { type: 'links',  label: 'Workspace links', links: detail.workspaceLinks },
  ]

  return (
    <NodeDetailShell
      nodeType="Team"
      nodeSubtype={detail.teamType}
      name={team.name}
      status={mapStatus(team.status)}
      createdAt={detail.createdAt}
      createdBy={detail.createdBy}
      updatedAt={detail.updatedAt}
      updatedBy={detail.updatedBy}
      sidebarContent={<NodeOverviewPanel name={team.name} fields={overviewFields} />}
      tabs={tabs}
      onTitleVisibilityChange={onTitleVisibilityChange}
    />
  )
}

export { TeamDetail }
