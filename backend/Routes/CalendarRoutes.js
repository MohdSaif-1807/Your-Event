import express from 'express';
import { createEvent, getAllEvents } from '../Controllers/CalendarController.js';


export const CalendarRoutes = express.Router();

CalendarRoutes.post('/create-event', createEvent);

CalendarRoutes.get('/events', getAllEvents);
