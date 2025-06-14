import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventHeader from './EventHeader';
import EventMoment from './EventMoment';
import EventOverview from './EventOverview';
import api from '../../services/api'; // Axios instance

const EventDetail = () => {
  const { id } = useParams(); // ID dari URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
        setError('');
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setError('Event tidak ditemukan atau terjadi kesalahan.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <p className="container text-center py-20">Loading...</p>;
  }

  if (error || !event) {
    return (
      <p className="container text-center py-20 text-red-500">
        {error || 'Event tidak ditemukan.'}
      </p>
    );
  }

  return (
    <div className="event pt-[65px] pb-[100px] flex flex-col gap-[100px] min-h-screen max-lg:gap-10">
      <EventHeader
        title={event.title}
        subtitle={event.subtitle}
        description={event.description}
        location={event.location}
        time={event.time}
        date={event.date}
        contact={event.contact}
      />
      <EventMoment multimedia={event.multimedia || []} />
      <EventOverview events={[event]} />
    </div>
  );
};

export default EventDetail;
