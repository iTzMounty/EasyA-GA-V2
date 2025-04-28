import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Image as ImageIcon, Info, Ticket } from 'lucide-react';
import { addEvent } from '../lib/eventStorage';
import { getCurrentUser } from '../lib/userStorage';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    isOnline: false,
    maxAttendees: '',
    description: '',
    imageUrl: '',
    ticketPrice: '0',
    isTicketed: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = getCurrentUser();
    if (!user) {
      alert('Please sign in to create an event');
      return;
    }

    const newEvent = {
      title: formData.title,
      date: `${formData.date} • ${formData.time}`,
      location: formData.isOnline ? 'Virtual Event' : formData.location,
      imageUrl: formData.imageUrl || 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
      createdBy: user.id
    };

    addEvent(newEvent);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: Info },
    { number: 2, title: 'Date & Location', icon: Calendar },
    { number: 3, title: 'Tickets & Capacity', icon: Ticket }
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-xl font-semibold text-gray-900 mb-2">
                What's your event called?
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4D61FC] focus:border-transparent"
                placeholder="Give your event a clear, catchy title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-xl font-semibold text-gray-900 mb-2">
                Tell people what your event is about
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4D61FC] focus:border-transparent"
                placeholder="Describe what attendees can expect from your event..."
                required
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-xl font-semibold text-gray-900 mb-2">
                Add a cover image
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4D61FC] focus:border-transparent pl-12"
                  placeholder="Paste an image URL"
                />
                <ImageIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <p className="mt-2 text-sm text-gray-500">Tip: Use a high-quality image that represents your event</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-xl font-semibold text-gray-900 mb-2">
                  When is it happening?
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4D61FC] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-xl font-semibold text-gray-900 mb-2">
                  What time?
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4D61FC] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-2">
                Where is it happening?
              </label>
              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isOnline"
                    name="isOnline"
                    checked={formData.isOnline}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#4D61FC] rounded focus:ring-[#4D61FC]"
                  />
                  <span className="text-lg text-gray-700">This is an online event</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4D61FC] focus:border-transparent pl-12"
                  placeholder={formData.isOnline ? "Enter virtual event link" : "Enter venue address"}
                  required
                />
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="maxAttendees" className="block text-xl font-semibold text-gray-900 mb-2">
                How many people can attend?
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="maxAttendees"
                  name="maxAttendees"
                  value={formData.maxAttendees}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4D61FC] focus:border-transparent pl-12"
                  placeholder="Enter maximum capacity"
                  min="1"
                  required
                />
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-2">
                Ticket Information
              </label>
              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isTicketed"
                    name="isTicketed"
                    checked={formData.isTicketed}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#4D61FC] rounded focus:ring-[#4D61FC]"
                  />
                  <span className="text-lg text-gray-700">This is a paid event</span>
                </label>
              </div>
              {formData.isTicketed && (
                <div className="relative">
                  <input
                    type="number"
                    id="ticketPrice"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4D61FC] focus:border-transparent pl-12"
                    placeholder="Enter ticket price"
                    min="0"
                    step="0.01"
                    required
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">£</span>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8 border-b pb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create an Event</h1>
            <div className="flex space-x-2">
              {steps.map((s) => (
                <button
                  key={s.number}
                  onClick={() => setStep(s.number)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    step === s.number
                      ? 'bg-[#4D61FC] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <s.icon className="w-4 h-4 mr-2" />
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            <div className="flex justify-between mt-8 pt-8 border-t">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-900"
                >
                  Previous
                </button>
              )}
              <div className="ml-auto">
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="bg-[#4D61FC] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#3D4FE7] transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-[#4D61FC] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#3D4FE7] transition-colors"
                  >
                    Create Event
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;

export default CreateEvent