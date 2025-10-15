# FlexUp Events

A streamlined Django application for event planning and RSVP management that eliminates the need for traditional user accounts, logins, or email confirmations.

## Table of Contents
- [FlexUp Events](#flexup-events)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Usage](#usage)
    - [1. Creating a New Event (Organizer)](#1-creating-a-new-event-organizer)
    - [2. Guest RSVP](#2-guest-rsvp)
    - [3. Organizer Actions](#3-organizer-actions)
  - [Technical Details](#technical-details)
  - [Technologies Used](#technologies-used)
  - [Contribution](#contribution)
  - [URL Structure](#url-structure)
    - [Authentication Pattern](#authentication-pattern)
    - [Key URL Patterns](#key-url-patterns)
      - [Public URLs](#public-urls)
      - [Secure URLs (Token Protected)](#secure-urls-token-protected)



## Description
FlexUp Events is a lightweight event management platform that simplifies the process of organizing gatherings, meetups, and events of any size. The application uses unique, secure tokens instead of traditional authentication:

- **Organizers** create events with customizable details (date, time, location, capacity)
- **Guests** can RSVP with one of multiple status options (confirm, maybe, decline) without creating an account
- **Token-based security** ensures only authorized individuals can modify event details or responses
- **Capacity management** automatically handles event limits and waiting lists

The goal is to provide a frictionless experience for both organizers and attendees while maintaining security and control over event data.



## Features
- **No User Accounts or Emails Required**  
  No login, password, or email verification needed to create or respond to events.
  
- **Unique Token-Based Security**  
  Each event and each response has a unique, secret link that enables secure editing without traditional authentication.
  
- **Comprehensive RSVP Status System**  
  Support for multiple response statuses (Confirmed, Maybe, Can't go, Invited, Accepted).
  
- **Capacity Management**  
  Set minimum and maximum attendee limits with automatic waiting list functionality.
  
- **Approval Workflow**  
  Optional approval process for guest registrations.
  
- **Inline Editing with HTMX**  
  Events and responses can be updated directly from the same page for a smoother user experience.
  
- **Simple Sharing**  
  Share your event URL anywhere—email, social media, or messaging apps.



## Prerequisites
Software you need to have installed before setting up the application:
- [Python](https://www.python.org/downloads/) (3.8+ recommended)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [uv](https://docs.astral.sh/uv/) (lightweight dependency manager)

Prior knowledge of the following technologies is required:
- Basic understanding of Django framework
- Familiarity with HTML, CSS, and JavaScript
- Basic knowledge of Bootstrap for styling
- HTMX for handling AJAX-like requests (optional, can be learned on the go)


## Installation
1. **Clone the repository**:
   ```
   git clone https://github.com/fabrizionastri/flexup-django-events-exercise
   cd flexup-django-events-exercise
   ```
2. **Sync dependencies**:
   ```
   uv sync
   ```
   This will create and activate a virtual environment and install all required packages.



## Running the Application
1. **Apply migrations & create the database**:
   ```
   python manage.py migrate
   ```
1. **Start the Django development server**:
   ```
   python manage.py runserver
   ```
2. **Access the application**:
   Open your browser and go to [http://localhost:8000/](http://localhost:8000/), [http://127.0.0.1:8000/](http://127.0.0.1:8000/) or any other address indicated in your terminal.



## Usage
### 1. Creating a New Event (Organizer)
- Click on **"New event"** in the navigation bar.
- Fill out the form with event details.
- Click **"Create event"**.

You will then receive **two links**:
1. **Registration link** (e.g., `events.flexup.org/event/<event_slug>/register`)  
   Share this link with guests.
2. **Organizer link** (e.g., `events.flexup.org/event/<event_slug>/organizer/<organizer_token>`)  
   Keep this private; it allows you to edit the event and manage responses.

### 2. Guest RSVP
- When guests follow the **registration link**, they see:
  1. **Event Details** (read-only)
  2. **Responses** (list of responses who have responded, read-only)
  3. **New Response Form** to submit their own RSVP  
     - Possible statuses: **Confirmed**, **Maybe**, or **Declined**  
     - Upon submitting, each guest is given a **unique link** to update their response in the future.
- When they create a new response, they receive a **response link** (e.g., `events.flexup.org/event/<event_slug>/response/<response_token>`) to view or edit their RSVP later.

### 3. Organizer Actions
- Using the **organizer link**, the organizer can:
  1. View and edit **Event Details** (toggling between view/edit modes with the edit button)
  2. View and edit **Responses** (toggling between view/edit modes for each response)
  3. Add new responses on behalf of guests
  4. Manage the waiting list by toggling the "On waiting list" status for each response
  5. Set additional response statuses, which are unavailable to regular guests:
     - **Invited** - For tracking sent invitations
     - **Accepted** - For tracking accepted invitations pending confirmation
  6. Configure event to require approval for all guests



## Technical Details
1. **No Email or User Login**  
   - No user database or password management.
   - No email service integrated.
   - Authentication is handled through unique secure tokens (using nanoid).
2. **Single Form Structure**  
   - Event and response forms can switch between read-only and edit modes using HTMX and JavaScript, using the same form and without reloading the page.
   - The form’s read-only status is controlled by a `data-readonly` attribute and toggled in the browser.
   - The `data-readonly` variable controls:
     - the form's style
     - the input's attributes (disabled, readonly)
     - the visibility of the edit, save and cancel buttons
3. **Unique Links for Edit Authorization**  
   - Only users with the correct unique token can edit event details or response information.
   - Such authorization is enforced both in the front-end (hiding buttons) and in the back-end (checking tokens).
   - Event organizers access their event through the organizer_token.
   - Participants access their response through the response_token.
4. **Waiting List Management**
   - Events can require approval for all guests (waiting_list=True).
   - When event capacity is reached, new confirmed guests are automatically added to the waiting list.
   - Organizers can manually move guests on/off the waiting list.


## Technologies Used
- **Django** – Backend framework  
- **Django Templating Engine** – Render dynamic HTML  
- **HTMX** – Handling AJAX-like requests for partial page updates  
- **Bootstrap** – CSS framework for styling and layout  
- **JavaScript** – Client-side interactions and form handling  
- **SQLite** (default) or any other Django-compatible database  



## Contribution
Contributions and improvements are welcome!  
1. **Clone this repository** locally:  
   ```bash
   git clone https://github.com/fabrizionastri/flexup-django-events-exercise
   cd flexup-django-events-exercise
   ```

2. **Create your own repository**:
   - Create a new GitHub repo named `flexup-django-events-<your-firstname>`
   - Set your local repository to use your new GitHub repo as remote:
   ```bash
   git remote set-url origin https://github.com/<your-username>/flexup-django-events-<your-firstname>
   ```
   - Push to your new repository:
   ```bash
   git push -u origin main
   ```

3. Create a **response branch** to contain all your improvements:  
   ```bash
   git checkout -b response
   ```
5. Make your changes and **commit each feature separately** with clear, descriptive messages:  
   ```bash
   git add .
   git commit -m 'Add feature: brief description of what you added'
   # Make more changes
   git add .
   git commit -m 'Add another feature: brief description'
   ```
6. **Push** your changes to your repository:  
   ```bash
   git push origin response
   ```
7. Share the link to your repository with your improvements once you're done (make sure your repository is public).


## URL Structure

The application uses RESTful URL patterns for managing events and responses, leveraging token-based authorization instead of traditional authentication.

### Authentication Pattern

Access to secure resources is managed through unique tokens embedded in URLs:

- **Organizer Token**: A 16-character unique ID generated when an event is created
  - Example: `/event/summer-party/organizer/a1b2c3d4e5f6g7h8/`
  
- **Response Token**: A 16-character unique ID generated when a guest responds
  - Example: `/event/summer-party/response/j9k8l7m6n5o4p3q2/`

### Key URL Patterns

#### Public URLs
- `/`: Home page with application overview
- `/events/`: Listing of all events
- `/event/create/`: Create a new event
- `/event/<event_slug>/`: View event details
- `/event/<event_slug>/register/`: Register for an event

#### Secure URLs (Token Protected)
- Event Management: `/event/<event_slug>/organizer/<organizer_token>/`
- Response Management: `/event/<event_slug>/response/<response_token>/`

The application also includes HTMX endpoints for asynchronous updates to provide a smoother user experience without full page reloads.

For full technical details on URL patterns, see the comments in `events/urls.py`.
