import { useMemo }             from 'react'
import { NodeDetailShell }    from '../../shared/NodeDetailShell'
import { AboutTab }           from './tabs/AboutTab'
import { SubCapabilitiesTab } from './tabs/SubCapabilitiesTab'
import { OwnersTab }          from './tabs/OwnersTab'
import { ProcessesTab }       from './tabs/ProcessesTab'
import { ValueStreamsTab }     from './tabs/ValueStreamsTab'
import { deriveLevel }        from './capabilityUtils.js'
import { CAPABILITIES, DEFAULT_CAPABILITY } from './capabilityData.js'

const getCapability = (cap) => {
  const found  = CAPABILITIES.find(c => c.id === cap.id) ?? { ...DEFAULT_CAPABILITY, name: cap.name }
  const level  = deriveLevel(found, CAPABILITIES)
  const parent = found.parentCapabilityId
    ? (CAPABILITIES.find(c => c.id === found.parentCapabilityId)?.name ?? null)
    : null
  return { ...found, level, parentCapabilityName: parent }
}

const LEVEL_LABEL = { l1: 'L1', l2: 'L2', l3: 'L3' }

const CapabilityDetail = ({ capability, onTitleVisibilityChange }) => {
  const detail = useMemo(() => getCapability(capability), [capability.id])

  const tabs = useMemo(() => [
    { id: 'about',            label: 'About',            content: <AboutTab           detail={detail} /> },
    { id: 'sub-capabilities', label: 'Sub-capabilities', badge: detail.subCapabilities.length || undefined, content: <SubCapabilitiesTab detail={detail} /> },
    { id: 'owners',           label: 'Owners',           badge: detail.owners.length           || undefined, content: <OwnersTab          detail={detail} /> },
    { id: 'processes',        label: 'Processes',        badge: detail.processes.length        || undefined, content: <ProcessesTab       detail={detail} /> },
    { id: 'value-streams',    label: 'Value streams',    badge: detail.valueStreams.length     || undefined, content: <ValueStreamsTab     detail={detail} /> },
  ], [detail])

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
