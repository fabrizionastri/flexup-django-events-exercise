from django.urls import path
from .views import (
    home, events, dashboard, event_create, event_view, event_edit, event_register,
    event_manage, event_delete, response_manage, response_delete, 
    update_response_status, toggle_waiting_list
)

urlpatterns = [
    # Core public pages
    path('', home, name='home'),  # Home page with app introduction and event creation link
    path('events/', events, name='events'),  # Public listing of all events in the system
    path('dashboard/', dashboard, name='dashboard'),  # User dashboard showing created/responded events (browser storage)
    
    # Event creation and viewing
    path('event/create/', event_create, name='event_create'),  # Form for creating a new event
    path('event/<str:event_slug>/', event_view, name='event_view'),  # Public view of an event (read-only)
    
    path('event/<str:event_slug>/register/', event_register, name='event_register'),  # Public page for guests to RSVP
    
    # Organizer routes (token-protected)
    path('event/<str:event_slug>/organizer/<str:organizer_token>/', event_manage, name='event_manage'),  # Secure event management page
    path('event/<str:event_slug>/organizer/<str:organizer_token>/edit/', event_edit, name='event_edit'),  # Edit an event as an organizer
    path('event/<str:event_slug>/organizer/<str:organizer_token>/delete/', event_delete, name='event_delete'),  # Delete event endpoint
    
    # Response management (token-protected)
    path('event/<str:event_slug>/response/<str:response_token>/', response_manage, name='response_manage'),  # Secure response editing page
    path('event/<str:event_slug>/response/<str:response_token>/delete/', response_delete, name='response_delete'),  # Delete response endpoint
    
    # HTMX endpoints for async updates (organizer-only, token-protected)
    path('event/<str:event_slug>/response/<str:response_token>/organizer/<str:organizer_token>/status/', update_response_status, name='update_response_status'),  # Update response status
    path('event/<str:event_slug>/response/<str:response_token>/organizer/<str:organizer_token>/waiting-list', toggle_waiting_list, name='toggle_waiting_list'),  # Toggle waiting list status
]
