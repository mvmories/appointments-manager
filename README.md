# appointments-manager

## Description

text

## To Run The Project

Try out the project by:
1) cloning the repository; 
2) "cd" into the root folder (where the server.js document is located); and 
3) run the CLI command "npm run dev"


## UX/UI Experience Suggestion

In the frontend my suggestion for the best experience would be:
- STAFF (Start by creating some staff members)
- CLIENTS (Then create some clients - I created some of your existing clients like "Jacquemus" for example)
- APPOINTMENTS (Once you have some staff members and clients created, you can now create some appointments)

[side note -> below every form you will immediately see the created staff, clients and appointment records]

- HOME (Although this was the first page you saw, only now will you be able to see the created appointments in the calendar)
- This calendar has some dynamic display views that allow you to see it in days, weeks and months
- Everytime you add an appointment in the "Appointments page" it will show up as a calendar event (here in HOME)
- Every event will be clickable and show an alert with its details (as you can see all data from the other entities is interconnected into one appointment)


## Additional Notes

I prepared the server with the ability to create, read, update and delete (GET; POST; PATCH & DELETE) all the Database entities (which i named: Staff, Clients & Appointments)
However, in the frontend I only developed functionalities to get, and create records (not update or delete them).
Thus said, I would be delighted if you also use Postman to test my server nodejs express API.
