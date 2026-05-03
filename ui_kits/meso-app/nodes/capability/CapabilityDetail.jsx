import { NodeDetailShell }    from '../../shared/NodeDetailShell'
import { AboutTab }           from './tabs/AboutTab'
import { SubCapabilitiesTab } from './tabs/SubCapabilitiesTab'
import { OwnersTab }          from './tabs/OwnersTab'
import { ProcessesTab }       from './tabs/ProcessesTab'
import { ValueStreamsTab }     from './tabs/ValueStreamsTab'

const CAPABILITIES = [
  {
    id:                 'capability-customer-management',
    name:               'Customer Management',
    description:        'The organisation\'s ability to acquire, onboard, retain, and grow its customer relationships through integrated digital and physical touchpoints.',
    parentCapabilityId: null,
    status:             'active',
    createdAt:          'Mar 5, 2023',
    createdBy:          'Marco Lehmann',
    updatedAt:          'Apr 10, 2025',
    updatedBy:          'Sarah van der Berg',
    subCapabilities: [
      { id: 'capability-digital-acquisition', name: 'Digital Acquisition', level: 'l2', description: 'Capability to acquire customers through digital channels.' },
      { id: 'capability-retention-programmes', name: 'Retention Programmes', level: 'l2', description: 'Structured programmes to increase customer lifetime value.' },
    ],
    owners: [
      { id: 't2', name: 'Data Platform',    nodeType: 'team' },
      { id: 'r1', name: 'Engineering Manager', nodeType: 'role' },
    ],
    processes: [
      { id: 'p1', name: 'Identity Verification',  type: 'compliance',  status: 'active' },
      { id: 'p2', name: 'Account Provisioning',   type: 'operational', status: 'active' },
    ],
    valueStreams: [
      { id: 'value-stream-customer-onboarding', name: 'Customer Onboarding', firstOutcome: 'Reduce time-to-first-value for new customers from 14 days to 5 days.' },
    ],
  },
  {
    id:                 'capability-digital-acquisition',
    name:               'Digital Acquisition',
    description:        'The ability to attract and convert prospective customers through owned, earned, and paid digital channels including search, social, and email.',
    parentCapabilityId: 'capability-customer-management',
    status:             'active',
    createdAt:          'Mar 5, 2023',
    createdBy:          'Marco Lehmann',
    updatedAt:          'Jan 22, 2025',
    updatedBy:          'Priya Nair',
    subCapabilities: [],
    owners: [
      { id: 'r1', name: 'Engineering Manager', nodeType: 'role' },
    ],
    processes: [
      { id: 'p1', name: 'Identity Verification', type: 'compliance', status: 'active' },
    ],
    valueStreams: [
      { id: 'value-stream-customer-onboarding', name: 'Customer Onboarding', firstOutcome: 'Reduce time-to-first-value for new customers from 14 days to 5 days.' },
    ],
  },
  {
    id:                 'capability-data-analytics',
    name:               'Data Analytics',
    description:        'The ability to collect, store, process, and surface data-driven insights that inform product, commercial, and operational decisions at scale.',
    parentCapabilityId: null,
    status:             'active',
    createdAt:          'Jun 20, 2022',
    createdBy:          'Sarah van der Berg',
    updatedAt:          'Mar 1, 2025',
    updatedBy:          'Marco Lehmann',
    subCapabilities: [
      { id: 'capability-reporting', name: 'Reporting', level: 'l2', description: 'Structured reporting against defined metrics and KPIs.' },
    ],
    owners: [
      { id: 't2', name: 'Data Platform', nodeType: 'team' },
    ],
    processes: [
      { id: 'p4', name: 'Deployment Pipeline', type: 'technical',   status: 'active' },
      { id: 'p5', name: 'Code Review',         type: 'quality',     status: 'active' },
    ],
    valueStreams: [
      { id: 'value-stream-product-delivery', name: 'Product Delivery', firstOutcome: 'Increase deployment frequency to daily releases across all product teams.' },
    ],
  },
  {
    id:                 'capability-reporting',
    name:               'Reporting',
    description:        'Structured, repeatable reporting against defined KPIs and metrics, delivered to stakeholders on defined cadences.',
    parentCapabilityId: 'capability-data-analytics',
    status:             'active',
    createdAt:          'Aug 14, 2022',
    createdBy:          'Marco Lehmann',
    updatedAt:          'Feb 5, 2025',
    updatedBy:          'Priya Nair',
    subCapabilities: [],
    owners: [
      { id: 't2', name: 'Data Platform',  nodeType: 'team' },
      { id: 'r2', name: 'SRE Lead',       nodeType: 'role' },
    ],
    processes: [
      { id: 'p6', name: 'Release Management', type: 'operational', status: 'active' },
    ],
    valueStreams: [
      { id: 'value-stream-product-delivery', name: 'Product Delivery', firstOutcome: 'Increase deployment frequency to daily releases across all product teams.' },
    ],
  },
  {
    id:                 'capability-risk-management',
    name:               'Risk Management',
    description:        'The ability to identify, assess, prioritise, and mitigate risks across operational, regulatory, security, and financial domains.',
    parentCapabilityId: null,
    status:             'active',
    createdAt:          'Oct 15, 2023',
    createdBy:          'Ana Petrova',
    updatedAt:          'Mar 18, 2025',
    updatedBy:          'Omar Aziz',
    subCapabilities: [],
    owners: [
      { id: 't3', name: 'Security & Compliance',           nodeType: 'team' },
      { id: 'r3', name: 'Head of Security & Compliance',   nodeType: 'role' },
    ],
    processes: [
      { id: 'p7', name: 'Incident Triage',       type: 'operational', status: 'active' },
      { id: 'p8', name: 'Escalation Management', type: 'operational', status: 'active' },
    ],
    valueStreams: [
      { id: 'value-stream-support-resolution', name: 'Support Resolution', firstOutcome: 'Achieve a first-contact resolution rate of 75% for Tier-1 queries.' },
    ],
  },
]

const DEFAULT_CAPABILITY = {
  id:                 'capability-unknown',
  name:               'Capability',
  description:        '',
  parentCapabilityId: null,
  status:             'active',
  createdAt:          null,
  createdBy:          null,
  updatedAt:          null,
  updatedBy:          null,
  subCapabilities:    [],
  owners:             [],
  processes:          [],
  valueStreams:       [],
}

const deriveLevel = (cap, all) => {
  if (!cap.parentCapabilityId) return 'l1'
  const parent = all.find(c => c.id === cap.parentCapabilityId)
  if (!parent?.parentCapabilityId) return 'l2'
  return 'l3'
}

const getCapability = (cap) => {
  const found = CAPABILITIES.find(c => c.id === cap.id) ?? { ...DEFAULT_CAPABILITY, name: cap.name }
  const level = deriveLevel(found, CAPABILITIES)
  const parent = found.parentCapabilityId
    ? (CAPABILITIES.find(c => c.id === found.parentCapabilityId)?.name ?? null)
    : null
  return { ...found, level, parentCapabilityName: parent }
}

const LEVEL_LABEL = { l1: 'L1', l2: 'L2', l3: 'L3' }

const CapabilityDetail = ({ capability, onTitleVisibilityChange }) => {
  const detail = getCapability(capability)

  const tabs = [
    { id: 'about',            label: 'About',            content: <AboutTab           detail={detail} /> },
    { id: 'sub-capabilities', label: 'Sub-capabilities', badge: String(detail.subCapabilities.length), content: <SubCapabilitiesTab detail={detail} /> },
    { id: 'owners',           label: 'Owners',           badge: String(detail.owners.length),          content: <OwnersTab          detail={detail} /> },
    { id: 'processes',        label: 'Processes',        badge: String(detail.processes.length),       content: <ProcessesTab       detail={detail} /> },
    { id: 'value-streams',    label: 'Value streams',    badge: String(detail.valueStreams.length),    content: <ValueStreamsTab     detail={detail} /> },
  ]

  return (
    <NodeDetailShell
      nodeType="Capability"
      nodeSubtype={LEVEL_LABEL[detail.level]}
      name={detail.name}
      status={detail.status}
      createdAt={detail.createdAt}
      createdBy={detail.createdBy}
      updatedAt={detail.updatedAt}
      updatedBy={detail.updatedBy}
      tabs={tabs}
      onTitleVisibilityChange={onTitleVisibilityChange}
    />
  )
}

export { CapabilityDetail, CAPABILITIES }
