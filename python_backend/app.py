from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Simple in-memory storage (in a real app, use a database)
contact_messages = []
subscribers = []
event_registrations = []

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Add timestamp
        data['timestamp'] = datetime.now().isoformat()
        
        # Store the message (in a real app, save to database)
        contact_messages.append(data)
        
        # Log the submission
        logging.info(f"Contact form submitted by {data['name']} ({data['email']})")
        
        return jsonify({'success': True, 'message': 'Thank you for your message. We will get back to you soon.'}), 200
    
    except Exception as e:
        logging.error(f"Error processing contact form: {str(e)}")
        return jsonify({'error': 'Server error processing your request'}), 500

@app.route('/api/subscribe', methods=['POST'])
def subscribe():
    """Handle newsletter subscriptions"""
    try:
        data = request.json
        
        # Validate email
        if 'email' not in data or not data['email']:
            return jsonify({'error': 'Email is required'}), 400
        
        # Check if already subscribed
        if data['email'] in [sub['email'] for sub in subscribers]:
            return jsonify({'message': 'You are already subscribed to our newsletter'}), 200
        
        # Add to subscribers
        subscribers.append({
            'email': data['email'],
            'timestamp': datetime.now().isoformat()
        })
        
        logging.info(f"New newsletter subscription: {data['email']}")
        
        return jsonify({'success': True, 'message': 'Thank you for subscribing to our newsletter!'}), 200
    
    except Exception as e:
        logging.error(f"Error processing subscription: {str(e)}")
        return jsonify({'error': 'Server error processing your request'}), 500

@app.route('/api/events/register', methods=['POST'])
def register_event():
    """Handle event registrations"""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'email', 'eventId']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Add timestamp
        data['timestamp'] = datetime.now().isoformat()
        
        # Store the registration
        event_registrations.append(data)
        
        logging.info(f"Event registration: {data['name']} for event {data['eventId']}")
        
        return jsonify({'success': True, 'message': 'You have successfully registered for this event.'}), 200
    
    except Exception as e:
        logging.error(f"Error processing event registration: {str(e)}")
        return jsonify({'error': 'Server error processing your request'}), 500

@app.route('/api/events', methods=['GET'])
def get_events():
    """Return list of upcoming events"""
    # In a real app, this would fetch from a database
    events = [
        {
            'id': 1,
            'title': 'Kathina Ceremony',
            'date': 'October 15, 2025',
            'description': 'Annual robe offering ceremony to the monastic community after the end of the rainy season retreat.',
            'location': 'Main Temple Hall',
            'attendees': 120
        },
        {
            'id': 2,
            'title': 'Vipassana Meditation Retreat',
            'date': 'November 5-12, 2025',
            'description': '7-day silent meditation retreat guided by Venerable Sayadaw U Nandisara.',
            'location': 'Meditation Center',
            'attendees': 45
        },
        {
            'id': 3,
            'title': 'Buddha Jayanti Celebration',
            'date': 'May 26, 2025',
            'description': "Celebration of Buddha's birth, enlightenment, and passing away with special ceremonies and offerings.",
            'location': 'Temple Grounds',
            'attendees': 200
        },
        {
            'id': 4,
            'title': 'Dhamma Talk Series',
            'date': 'Every Sunday, 10:00 AM',
            'description': 'Weekly Dhamma talks by resident monks and visiting teachers on Buddhist philosophy and practice.',
            'location': 'Dhamma Hall',
            'attendees': 60
        }
    ]
    
    return jsonify(events), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
