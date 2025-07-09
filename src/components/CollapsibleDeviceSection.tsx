import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, SmartphoneIcon, TabletIcon, CheckIcon } from 'lucide-react'

interface CollapsibleDeviceSectionProps {
  title: string
  devices: string[]
  notes?: string[]
  icon: 'phone' | 'tablet' | 'watch'
  translation: any
}

export const CollapsibleDeviceSection = ({
  title,
  devices,
  notes,
  icon,
  translation,
}: CollapsibleDeviceSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getIcon = () => {
    switch (icon) {
      case 'phone':
        return <SmartphoneIcon size={24} className="text-gray-700" />
      case 'tablet':
        return <TabletIcon size={24} className="text-gray-700" />
      default:
        return <SmartphoneIcon size={24} className="text-gray-700" />
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {getIcon()}
          <span className="text-lg font-medium text-gray-900">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="border-t border-gray-200 bg-white p-6">
          {/* Device List */}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {devices.map((device, index) => (
              <li
                key={index}
                className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50"
              >
                <CheckIcon
                  size={18}
                  className="text-green-600 mt-0.5 flex-shrink-0"
                />
                <span className="text-gray-700">{device}</span>
              </li>
            ))}
          </ul>

          {/* Notes */}
          {notes && notes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{translation.notes}:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {notes.map((note, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}