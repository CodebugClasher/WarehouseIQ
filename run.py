#!/usr/bin/env python3
"""
WarehouseIQ Project Runner

This script provides helpful commands for running the WarehouseIQ project
with the new directory structure.

Usage:
    python run.py [command]

Commands:
    frontend-dev    - Start the frontend development server
    frontend-build  - Build the frontend for production
    backend-dev     - Start the backend development server
    install-deps    - Install all dependencies (frontend + backend)
"""

import sys
import subprocess
import os
from pathlib import Path

def run_command(command, cwd=None):
    """Run a command and return the result."""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, check=True)
        return result.returncode == 0
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {e}")
        return False

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return

    command = sys.argv[1]
    project_root = Path(__file__).parent

    if command == "frontend-dev":
        print("Starting frontend development server...")
        run_command("npm run dev", cwd=project_root / "frontend")
    
    elif command == "frontend-build":
        print("Building frontend for production...")
        run_command("npm run build", cwd=project_root / "frontend")
    
    elif command == "backend-dev":
        print("Starting backend development server...")
        # Assuming you have a main.py in backend/app/
        run_command("python -m uvicorn app.main:app --reload", cwd=project_root / "backend")
    
    elif command == "install-deps":
        print("Installing frontend dependencies...")
        run_command("npm install", cwd=project_root / "frontend")
        print("Installing backend dependencies...")
        run_command("pip install -r requirements.txt", cwd=project_root / "backend")
    
    else:
        print(f"Unknown command: {command}")
        print(__doc__)

if __name__ == "__main__":
    main()
