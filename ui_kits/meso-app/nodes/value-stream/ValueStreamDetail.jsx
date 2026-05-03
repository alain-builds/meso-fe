import { useMemo }          from 'react'
import { NodeDetailShell }  from '../../shared/NodeDetailShell'
import { AboutTab }         from './tabs/AboutTab'
import { ContributorsTab }  from './tabs/ContributorsTab'
import { ProcessesTab }     from './tabs/ProcessesTab'
import { CapabilitiesTab }  from './tabs/CapabilitiesTab'
import { KPIsTab }          from './tabs/KPIsTab'
import { VALUE_STREAMS, DEFAULT_VALUE_STREAM } from './valueStreamData.js'

const getValueStream = (vs) =>
  VALUE_STREAMS.find(v => v.id === vs.id) ?? { ...DEFAULT_VALUE_STREAM, name: vs.name }

const ValueStreamDetail = ({ valueStream, onTitleVisibilityChange }) => {
  const detail = useMemo(() => getValueStream(valueStream), [valueStream.id])

  const tabs = useMemo(() => [
    { id: 'about',        label: 'About',        content: <AboutTab        detail={detail} /> },
    { id: 'contributors', label: 'Contributors',  badge: detail.contributors.length  || undefined, content: <ContributorsTab detail={detail} /> },
    { id: 'processes',    label: 'Processes',     badge: detail.processes.length     || undefined, content: <ProcessesTab    detail={detail} /> },
    { id: 'capabilities', label: 'Capabilities',  badge: detail.capabilities.length  || undefined, content: <CapabilitiesTab detail={detail} /> },
    { id: 'kpis',         label: 'KPIs',          badge: detail.kpis.length          || undefined, content: <KPIsTab         detail={detail} /> },
  ], [detail])

  return (
    <NodeDetailShell
      nodeType="Value stream"
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

export { ValueStreamDetail, VALUE_STREAMS }
