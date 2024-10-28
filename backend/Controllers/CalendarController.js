import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
export const createEvent = async (req, res) => {
    const { eventName, location, endTime, startTime, eventDescription } = req.body;
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI,

    );

    oauth2Client.setCredentials({
        access_token: req.user.accessToken
    });
    const calendar = google.calendar({ version: 'v3', oauth2Client });

    const event = {
        'summary': eventName,
        'start': {
            dateTime: startTime,
            timeZone: 'Asia/Kolkata', // Set the timezone to Asia/Kolkata
        },
        'end': {
            dateTime: endTime,
            timeZone: 'Asia/Kolkata', // Set the timezone to Asia/Kolkata
        },
        'location': location,
        'description': eventDescription
    };

    try {
        const response = await calendar.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            resource: event,
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getAllEvents = async (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
    oauth2Client.setCredentials({
        access_token: req.user.accessToken
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    try {
        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });
        res.status(200).json(response.data.items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
