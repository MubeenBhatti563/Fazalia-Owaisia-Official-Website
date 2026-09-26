import { EventItem, EventCategory } from "@/types";
import { initialEvents } from "@/lib/data/events";

/**
 * Service abstraction for Events.
 * Currently serves static in-memory data.
 * When integrating Supabase later:
 *   const { data, error } = await supabase.from('events').select('*');
 *   return data as EventItem[];
 */
export async function getEvents(category: EventCategory = "all"): Promise<EventItem[]> {
  // Simulate asynchronous fetch
  if (category === "all") {
    return initialEvents;
  }
  return initialEvents.filter((event) => event.category === category);
}

export async function getFeaturedEvent(): Promise<EventItem | null> {
  const featured = initialEvents.find((event) => event.isFeatured);
  return featured || initialEvents[0] || null;
}

export async function getEventById(id: number): Promise<EventItem | null> {
  const event = initialEvents.find((e) => e.id === id);
  return event || null;
}

export async function getAllEventIds(): Promise<number[]> {
  return initialEvents.map((e) => e.id);
}
