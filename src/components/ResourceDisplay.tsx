import React from 'react';
import type { Resource } from '../types';

interface Props {
  resources: Resource[];
}

export function ResourceDisplay({ resources }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {resources.map(resource => (
        <div
          key={resource.id}
          className="bg-blue-800/50 rounded-lg p-4 min-w-[140px] backdrop-blur-sm"
        >
          <div className="text-2xl mb-1">{resource.icon}</div>
          <div className="font-medium">{resource.name}</div>
          <div className="text-blue-300">
            {Math.floor(resource.amount).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}