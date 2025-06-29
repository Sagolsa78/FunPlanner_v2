// controllers/event.controller.js
import Event from '../models/event.model.js';
import Client from '../models/client.model.js';

export const createEvent = async (req, res) => {
  try {
    const { name, eventType, date, format, sitting, venue } = req.body;

   const userId = req.user._id;
   const clientId = req.params.id;

if (!userId) {
  return res.status(401).json({
    success: false,
    msg: "Unauthorized : User Id not found."
  });
}



    const event = new Event({
      client:clientId,
      name,
      eventType,
      date,
      format,
      sitting,
      venue,
      user:userId,
      client: clientId , 
    });

    await event.save();
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    console.error('Create event error:', error.message);
    res.status(400).json({
      success: false,
      message: 'Failed to create event',
      error: error.message,
    });
  }
};


export const getAllEventWithStats = async (req,res) => {
  try {
    const userId = req.user._id;

    const {type} = req.query;
    const currentDate = Date.now();

    const gradientClasses = [
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-pink-500',
      'from-green-400 to-teal-500',
      'from-yellow-400 to-orange-500',
      'from-red-500 to-pink-500',
      'from-cyan-500 to-blue-500',
      'from-lime-500 to-green-500',
    ];

    if(type === 'upcoming'){
      queryFilter.date = {$gte:currentDate}
    }else if(type === 'past'){
      queryFilter.date = {$lt: currentDate}
    }

    const fetchedEvents = await Event.find(queryFilter).lean().sort({ date:1 })

    const eventsWithGradient = fetchedEvents.map(event =>{
      const randomGradient = gradientClasses[Math.floor(Math.random() * gradientClasses.length)]

      const formattedDate = new Date(event.date).toLocaleDateString('en-US',{
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })

      return{
        ...event,
        gradient: randomGradient,
        date: formattedDate,
      };
    });

    const totalEvents = eventsWithGradient.length;

    const eventStats = {
      total:totalEvents,
      saved: 0,
      completed: 0,
      cancelled: 0,
    }

    
  } catch (error) {
    console.error(error.message)
  }
};
