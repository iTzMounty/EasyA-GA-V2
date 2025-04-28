import React from 'react';
import { MapPin, Calendar, Check } from 'lucide-react';
import { toggleEventAttendance } from '../lib/eventStorage';

export interface EventProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  isEasyAHosted?: boolean;
  id?: string;
  isAttending?: boolean;
}

const EventCard: React.FC<EventProps> = ({ 
  title, 
  date, 
  location, 
  imageUrl, 
  isEasyAHosted = false,
  id,
  isAttending = false
}) => {
  const handleAttendClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id) {
      toggleEventAttendance(id);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative h-56 sm:h-64">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {isEasyAHosted && (
          <div className="absolute top-4 left-4 bg-[#4D61FC] text-white px-3 py-1.5 rounded-full text-sm font-medium">
            EasyA Hosted
          </div>
        )}
        {!isEasyAHosted && id && (
          <button
            onClick={handleAttendClick}
            className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2
              ${isAttending 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-white text-gray-900 hover:bg-gray-100'}`}
          >
            {isAttending && <Check size={16} />}
            {isAttending ? 'Attending' : 'Attend'}
          </button>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-xl text-gray-900 mb-3">{title}</h3>
        <div className="flex items-center text-gray-500 text-base mb-2">
          <Calendar size={18} className="mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-gray-500 text-base">
          <MapPin size={18} className="mr-2" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;