#!/bin/bash
# Use PORT from environment or default to 8000
PORT=${PORT:-8000}

uvicorn api:app --host 0.0.0.0 --port $PORT