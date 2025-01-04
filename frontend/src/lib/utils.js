import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const transformData = (data) => {
  const elements = [];

  data.forEach(item => {
    item.agents.forEach(agent => {
      elements.push({
        data: {
          id: agent._id,
          label: agent.name,
          type: 'agent',
          ...agent
        }
      });

      agent.tools.forEach(tool => {
        elements.push({
          data: {
            id: tool._id,
            label: tool.name,
            type: 'tool',
            ...tool
          }
        });

        elements.push({
          data: {
            source: agent._id,
            target: tool._id,
            label: 'uses',
          }
        });
      });
    });
  });

  return elements;
};