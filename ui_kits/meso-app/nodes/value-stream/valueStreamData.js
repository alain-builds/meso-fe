const VALUE_STREAMS = [
  {
    id:   'value-stream-customer-onboarding',
    name: 'Customer Onboarding',
    businessOutcomes: [
      'Reduce time-to-first-value for new customers from 14 days to 5 days.',
      'Increase onboarding completion rate to 92% within 30 days of signup.',
      'Reduce onboarding support tickets by 40%.',
    ],
    status:    'active',
    createdAt: 'Feb 3, 2023',
    createdBy: 'Marco Lehmann',
    updatedAt: 'Apr 1, 2025',
    updatedBy: 'Sarah van der Berg',
    contributors: [
      { id: 't1', name: 'Platform Engineering',  nodeType: 'team'    },
      { id: 't2', name: 'Data Platform',          nodeType: 'team'    },
      { id: 'r1', name: 'Engineering Manager',    nodeType: 'role'    },
      { id: 's1', name: 'Customer Portal API',    nodeType: 'service' },
      { id: 'p1', name: 'Identity Verification',  nodeType: 'process' },
    ],
    processes: [
      { id: 'p1', name: 'Identity Verification',  type: 'compliance',  status: 'active' },
      { id: 'p2', name: 'Account Provisioning',   type: 'operational', status: 'active' },
      { id: 'p3', name: 'Welcome Communications', type: 'marketing',   status: 'active' },
    ],
    capabilities: [
      { id: 'capability-customer-management', name: 'Customer Management', level: 'l1' },
      { id: 'capability-digital-acquisition', name: 'Digital Acquisition', level: 'l2' },
    ],
    kpis: [
      { id: 'kpi-tta',         name: 'Time to activate',      category: 'operational', contributionType: 'owns',       unit: 'days',         direction: 'lower_is_better'  },
      { id: 'kpi-csat',        name: 'Onboarding CSAT',       category: 'customer',    contributionType: 'owns',       unit: 'score /5',     direction: 'higher_is_better' },
      { id: 'kpi-support-vol', name: 'Support ticket volume', category: 'operational', contributionType: 'influences', unit: 'tickets/week', direction: 'lower_is_better'  },
    ],
  },
  {
    id:   'value-stream-product-delivery',
    name: 'Product Delivery',
    businessOutcomes: [
      'Increase deployment frequency to daily releases across all product teams.',
      'Reduce lead time from commit to production below 48 hours.',
      'Achieve 95% change success rate with no emergency rollbacks.',
    ],
    status:    'active',
    createdAt: 'Jun 15, 2022',
    createdBy: 'Sarah van der Berg',
    updatedAt: 'Mar 22, 2025',
    updatedBy: 'Thomas Weber',
    contributors: [
      { id: 't1', name: 'Platform Engineering', nodeType: 'team'    },
      { id: 't2', name: 'Data Platform',        nodeType: 'team'    },
      { id: 'r2', name: 'SRE Lead',             nodeType: 'role'    },
      { id: 's2', name: 'CI/CD Platform',       nodeType: 'service' },
      { id: 'p4', name: 'Deployment Pipeline',  nodeType: 'process' },
    ],
    processes: [
      { id: 'p4', name: 'Deployment Pipeline', type: 'technical',   status: 'active' },
      { id: 'p5', name: 'Code Review',         type: 'quality',     status: 'active' },
      { id: 'p6', name: 'Release Management',  type: 'operational', status: 'active' },
    ],
    capabilities: [
      { id: 'capability-data-analytics', name: 'Data Analytics', level: 'l1' },
    ],
    kpis: [
      { id: 'kpi-deploy-freq', name: 'Deploy frequency',    category: 'operational', contributionType: 'owns',        unit: 'deploys/week', direction: 'higher_is_better' },
      { id: 'kpi-lead-time',   name: 'Lead time',           category: 'operational', contributionType: 'owns',        unit: 'hours',        direction: 'lower_is_better'  },
      { id: 'kpi-csr',         name: 'Change success rate', category: 'quality',     contributionType: 'contributes', unit: '%',            direction: 'higher_is_better' },
    ],
  },
  {
    id:   'value-stream-support-resolution',
    name: 'Support Resolution',
    businessOutcomes: [
      'Achieve a first-contact resolution rate of 75% for Tier-1 queries.',
      'Reduce median resolution time for Tier-2 issues to under 4 hours.',
    ],
    status:    'active',
    createdAt: 'Oct 10, 2023',
    createdBy: 'Ana Petrova',
    updatedAt: 'Feb 14, 2025',
    updatedBy: 'Omar Aziz',
    contributors: [
      { id: 't3', name: 'Security & Compliance',         nodeType: 'team'    },
      { id: 'r3', name: 'Head of Security & Compliance', nodeType: 'role'    },
      { id: 's3', name: 'Support Portal',                nodeType: 'service' },
      { id: 'p7', name: 'Incident Triage',               nodeType: 'process' },
    ],
    processes: [
      { id: 'p7', name: 'Incident Triage',       type: 'operational', status: 'active' },
      { id: 'p8', name: 'Escalation Management', type: 'operational', status: 'active' },
    ],
    capabilities: [
      { id: 'capability-risk-management', name: 'Risk Management', level: 'l1' },
    ],
    kpis: [
      { id: 'kpi-fcr',  name: 'First-contact resolution', category: 'customer',    contributionType: 'owns', unit: '%',     direction: 'higher_is_better' },
      { id: 'kpi-mttr', name: 'MTTR',                     category: 'operational', contributionType: 'owns', unit: 'hours', direction: 'lower_is_better'  },
    ],
  },
]

const DEFAULT_VALUE_STREAM = {
  id:               'value-stream-unknown',
  name:             'Value stream',
  businessOutcomes: [],
  status:           'active',
  createdAt:        null,
  createdBy:        null,
  updatedAt:        null,
  updatedBy:        null,
  contributors:     [],
  processes:        [],
  capabilities:     [],
  kpis:             [],
}

export { VALUE_STREAMS, DEFAULT_VALUE_STREAM }
