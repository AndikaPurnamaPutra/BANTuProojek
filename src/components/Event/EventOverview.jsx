import EventCard from './EventCard';

const EventOverview = ({ events = [] }) => {
  if (events.length === 0) {
    return (
      <section>
        <div className="container text-center py-20 text-gray-500">
          Tidak ada event saat ini.
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <h1 className="font-Parkinsans text-[56px] font-[400] text-black leading-[150%] mb-8">
          Informasi Event
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {events.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              description={event.description}
              location={event.location}
              time={event.time}
              contact={event.contact}
              thumbnail={event.thumbnail}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventOverview;
