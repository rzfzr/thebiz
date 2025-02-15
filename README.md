# thebiz - timedout

## Setup Instructions

### Backend

1. Create a virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install fastapi uvicorn sqlalchemy sqlite3
```

3. Run the server:

```bash
uvicorn main:app --reload
```
