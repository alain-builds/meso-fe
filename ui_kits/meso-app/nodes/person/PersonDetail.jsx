import { NodeDetailShell }       from '../../NodeDetailShell'
import { AboutTab }              from './tabs/AboutTab'
import { PositionsTab }          from './tabs/PositionsTab'
import { TeamsCommunitiesTab }   from './tabs/TeamsCommunitiesTab'
import { TabStub }               from '../team/tabs/TabStub'

const PEOPLE = [
  {
    id: 'p1',
    name:       'Sarah van der Berg',
    email:      'sarah.vdberg@example.com',
    location:   'Amsterdam, NL',
    isExternal: false,
    personType: 'full',
    pronouns:   'she/her',
    aboutMe:    'Platform engineering lead with a focus on developer experience and reliability. Passionate about sustainable on-call practices and clear documentation.',
    personalityProfiles: [
      { type: 'MBTI',          value: 'INTJ' },
      { type: 'Working style', value: 'Deep focus — calendar blocks, async-first' },
    ],
    socialLinks:          [{ label: 'LinkedIn' }, { label: 'GitHub' }],
    communicationChannels:[{ name: '#platform-engineering' }],
    rolesFilledCount:  1,
    teamsLedCount:     1,
    teamsMemberCount:  1,
    directReports:     4,
    supervisor:        'Daniel Riemann',
    governanceSeats:   2,
    communitiesLed:    1,
    communitiesMember: 2,
    positions: [
      { id: 'pos1', roleName: 'Engineering Manager', masterRoleLabel: 'Engineering Manager', teamName: 'Platform Engineering' },
    ],
    teams: [
      { id: 't1', name: 'Platform Engineering', domain: 'Engineering', isLead: true },
    ],
    communities: [
      { id: 'c1', name: 'Engineering Leadership CoP', domain: 'Engineering', isLead: true },
      { id: 'c2', name: 'Women in Tech ERG',           domain: 'People',      isLead: false },
    ],
    createdAt: 'Feb 3, 2021',
    createdBy: 'HR Admin',
    updatedAt: 'Jan 20, 2025',
    updatedBy: 'Sarah van der Berg',
  },
  {
    id: 'p2',
    name:       'Marco Lehmann',
    email:      'marco.lehmann@example.com',
    location:   'Berlin, DE',
    isExternal: false,
    personType: 'full',
    pronouns:   'he/him',
    aboutMe:    'Data infrastructure lead. Focused on building reliable, scalable pipelines that serve the whole organisation. Fan of open-source tools and good coffee.',
    personalityProfiles: [{ type: 'Working style', value: 'Systems thinker, structured planner' }],
    socialLinks:          [{ label: 'LinkedIn' }],
    communicationChannels:[{ name: '#data-infra' }],
    rolesFilledCount:  1,
    teamsLedCount:     1,
    teamsMemberCount:  1,
    directReports:     3,
    supervisor:        'Daniel Riemann',
    governanceSeats:   1,
    communitiesLed:    0,
    communitiesMember: 1,
    positions: [
      { id: 'pos1', roleName: 'Engineering Manager', masterRoleLabel: 'Engineering Manager', teamName: 'Data Infrastructure' },
    ],
    teams: [
      { id: 't2', name: 'Data Infrastructure', domain: 'Data', isLead: true },
    ],
    communities: [
      { id: 'c3', name: 'Data Guild', domain: 'Data', isLead: false },
    ],
    createdAt: 'May 16, 2022',
    createdBy: 'HR Admin',
    updatedAt: 'Dec 9, 2024',
    updatedBy: 'Marco Lehmann',
  },
]

const DEFAULT_PERSON = {
  id: 'px',
  name: 'Team Member',
  email: '',
  location: '',
  isExternal: false,
  personType: 'stub',
  pronouns: null,
  aboutMe: null,
  personalityProfiles: [],
  socialLinks: [],
  communicationChannels: [],
  rolesFilledCount: 1,
  teamsLedCount: 0,
  teamsMemberCount: 1,
  directReports: 0,
  supervisor: '—',
  governanceSeats: 0,
  communitiesLed: 0,
  communitiesMember: 0,
  positions: [],
  teams: [],
  communities: [],
  createdAt: null,
  createdBy: null,
  updatedAt: null,
  updatedBy: null,
}

const getPerson = (person) =>
  PEOPLE.find(p => p.id === person.id) ?? { ...DEFAULT_PERSON, ...person }

const PersonDetail = ({ person, onTitleVisibilityChange }) => {
  const detail = getPerson(person)

  const tabs = [
    { id: 'about',       label: 'About',            content: <AboutTab detail={detail} /> },
    { id: 'positions',   label: 'Positions',         content: <PositionsTab detail={detail} /> },
    { id: 'org-view',    label: 'Org view',          content: <TabStub section="Org view · §7.3 — org tree is a separate workstream" /> },
    { id: 'teams-comms', label: 'Teams & communities', content: <TeamsCommunitiesTab detail={detail} /> },
    { id: 'governance',  label: 'Governance',        content: <TabStub section="Governance · §7.3" /> },
    { id: 'okrs-kpis',   label: 'OKRs & KPIs',      content: <TabStub section="OKRs & KPIs · §7.3" /> },
    { id: 'legal',       label: 'Legal entity',      content: <TabStub section="Legal entity · §7.3" /> },
  ]

  return (
    <NodeDetailShell
      nodeType="Person"
      nodeSubtype={detail.isExternal ? 'external' : detail.personType}
      name={detail.name}
      status="active"
      createdAt={detail.createdAt}
      createdBy={detail.createdBy}
      updatedAt={detail.updatedAt}
      updatedBy={detail.updatedBy}
      tabs={tabs}
      onTitleVisibilityChange={onTitleVisibilityChange}
    />
  )
}

export { PersonDetail, PEOPLE }
