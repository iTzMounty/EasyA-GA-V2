import type { EventProps } from '../components/EventCard';

let events: EventProps[] = [];

export const getEvents = (): EventProps[] => {
  return [...events].reverse(); // Return events in reverse order so newest appear first
};

export const addEvent = (event: EventProps) => {
  events.push({
    ...event,
    id: Math.random().toString(36).substr(2, 9)
  });
};

export const toggleEventAttendance = (eventId: string) => {
  const event = events.find(e => e.id === eventId);
  if (event) {
    event.isAttending = !event.isAttending;
  }
};

export const clearEvents = () => {
  events = [];
};