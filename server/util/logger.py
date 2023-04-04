import logging
import os

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

log_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)),'..', 'logs')
if not os.path.exists(log_dir):
    os.makedirs(log_dir)

# Create a file handler
handler = logging.FileHandler(os.path.join(log_dir, 'app.log'))
handler.setLevel(logging.INFO)

# Create a logging format
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

# Add the handlers to the logger
logger.addHandler(handler)