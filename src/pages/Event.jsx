import React, { useEffect, useState } from 'react';
import EventHeader from '../components/Event/EventHeader';
import EventMoment from '../components/Event/EventMoment';
import EventOverview from '../components/Event/EventOverview';
import api from '../services/api';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [multimedia, setMultimedia] = useState([]); // Multimedia untuk EventMoment
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data);
        // Ambil multimedia dari event pertama sebagai contoh
        if (res.data.length > 0) {
          setMultimedia(res.data[0].multimedia || []);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p className="container text-center py-20">Loading...</p>;

  return (
    <div className="event pt-[65px] pb-[100px] flex flex-col gap-[100px] min-h-screen max-lg:gap-10">
      <EventHeader />
      <EventMoment multimedia={multimedia} />
      <EventOverview events={events} />
    </div>
  );
};

export default Event;
