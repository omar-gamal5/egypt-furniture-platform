import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, X, Calendar as CalendarIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';

interface Event {
  id: string;
  title: string;
  date: string;
  description?: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    description: ''
  });

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: crypto.randomUUID(),
      title: newEvent.title,
      date: newEvent.date,
      description: newEvent.description
    };
    setEvents([...events, event]);
    setNewEvent({ title: '', date: format(new Date(), 'yyyy-MM-dd'), description: '' });
    setIsAddingEvent(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => event.date === format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Industry Events Calendar</h1>
          <Button onClick={() => setIsAddingEvent(true)}>
            <Plus size={16} className="mr-2" />
            Add Event
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">
              {format(currentDate, 'MMMM yyyy')}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={previousMonth}>
                <ChevronLeft size={16} />
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium">
                  {day}
                </div>
              ))}
              {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, index) => (
                <div key={`empty-${index}`} className="bg-white p-2 h-32" />
              ))}
              {days.map((day) => {
                const dayEvents = getEventsForDate(day);
                return (
                  <div
                    key={day.toISOString()}
                    className={`bg-white p-2 h-32 ${
                      !isSameMonth(day, currentDate) ? 'text-gray-400' : ''
                    } ${isToday(day) ? 'bg-primary-50' : ''}`}
                  >
                    <div className="font-medium mb-1">{format(day, 'd')}</div>
                    <div className="space-y-1">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="text-xs p-1 bg-primary-100 text-primary-700 rounded truncate flex justify-between items-center"
                        >
                          <span className="truncate">{event.title}</span>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-primary-500 hover:text-primary-700"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Add Event Modal */}
        {isAddingEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New Event</h2>
                <button
                  onClick={() => setIsAddingEvent(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddEvent}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Event Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        required
                        className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description (Optional)
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddingEvent(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Add Event
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}