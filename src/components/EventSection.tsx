import React from 'react';
import EventCard, { EventProps } from './EventCard';

interface EventSectionProps {
  events: EventProps[];
  isEasyAHosted?: boolean;
}

const EventSection: React.FC<EventSectionProps> = ({ events, isEasyAHosted = false }) => {
  return (
    <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
      {events.map((event, index) => (
        <EventCard 
          key={index} 
          {...event} 
          isEasyAHosted={isEasyAHosted}
        />
      ))}
    </div>
  );
};

export default EventSection;