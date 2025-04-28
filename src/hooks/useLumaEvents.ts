import useSWR from 'swr';
import type { EventProps } from '../components/EventCard';
import { communityEvents as staticCommunityEvents } from '../data/eventData';
import { getEvents } from '../lib/eventStorage';

const fetchEvents = async () => {
  const dynamicEvents = getEvents();
  return [...staticCommunityEvents, ...dynamicEvents];
};

export function useLumaEvents() {
  const { data, error } = useSWR('community-events', fetchEvents, {
    refreshInterval: 1000, // Refresh every second to see changes immediately
  });

  return {
    events: data || [],
    isLoading: false,
    isError: error
  };
}