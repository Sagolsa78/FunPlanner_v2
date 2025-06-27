// controllers/event.controller.js
import Event from '../models/event.model.js';

export const createEvent = async (req, res) => {
  try {
    const { name, eventType, date, format, sitting, venue } = req.body;

   const userId = req.user?._id;

if (!userId) {
  return res.status(401).json({
    success: false,
    msg: "Unauthorized : User Id not found."
  });
}


    const event = new Event({
      name,
      eventType,
      date,
      format,
      sitting,
      venue,
      user: userId , 
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
