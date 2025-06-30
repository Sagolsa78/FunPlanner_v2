// controllers/event.controller.js
import Event from '../models/event.model.js';
import Client from '../models/client.model.js';

export const createEvent = async (req, res) => {
  try {
    const { name, eventType, date, format, sitting, venue,budget,attendees } = req.body;

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
      budget,
      attendees,
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

export const getAllEventsOfClient = async (req,res) =>{
  try {
    const userId = req.user._id;
    const clientId = req.params.id;

    const client = await Client.findOne({_id:clientId , user: userId});
    if(!client){
      return res.status(403).json({error : "Unauthorized access to client's events"})
    }

    const events =await Event.find({client : clientId}).select('name date budget attendees status');

    const simplifiedEvents = events.map(event =>({
      id: event._id,
      name: event.name,
      date: event.date,
      budget: event.budget,
      attendees: event.attendees,
      status: event.status
    }));

    return res.status(200).json(simplifiedEvents)
  } catch (error) {
    console.error("Error getting Event Data ", error.message);
    return res.status(500).json({error:"Failed to fetch event data"})
  }
}

export const getAllEventWithStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const events = await Event.find({ user: userId }).select('name date').lean();

    const simplifiedEvents = events.map(event => ({
      id: event._id,
      name: event.name,
      date: event.date,
    }));

    return res.status(200).json(simplifiedEvents);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return res.status(500).json({ error: "Failed to load events" });
  }
};

export const getEventDistribution = async (req,res) => {
  try {
    const userId = req.user._id;
    const events = await Event.find({user:userId}).select('eventType').lean();

    const distributionMap = {};

    events.forEach(event =>{
      const type = event.eventType || 'Unknown';
      distributionMap[type] = (distributionMap[type] || 0) +1;
    })

    const total = events.length;
    const distribution = Object.entries(distributionMap).map(([category,count]) =>{
      return{
        category,
        percentage: ((count/total)*100).toFixed(1),
        color: getColorForCategory(category),
      }
    })

    console.log(distribution)
    return res.status(200).json(distribution);
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: "Failed to fetch event distribution" });
  }
};

const getColorForCategory = (category) => {
  const colorMap = {
    Corporate: 'bg-purple-500',
    Social: 'bg-pink-500',
    Tech: 'bg-blue-500',
    Charity: 'bg-green-500',
  };
  return colorMap[category] || 'bg-slate-500';
};
