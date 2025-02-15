# thebiz - timedout

![Drag and Drop Demo](Animation.GIF)

## Description

From first reading the specs file till finished it took exactly 2 hours, (I am writing this after that), I would like to have spent some more time on it, maybe another 40 minutes I could complete everything, but the basic functionality works, as seen in the gif above.

Some points:

- Spent probably around 30 minutes on the backend, the rest working on the frontend, I spent considerable time debugging the board "with combination" example from beautiful-dnd as it has some type errors out of the box.
- It lacks a user loading indication, styling is all over the place.
- Backend is lacking some basic features, as seen in the end of the gif I can create a dependency loop that breaks the visualization.
- Code is very messy, I would have spent some time to refactor and extract all the dnd functionality in its own component.
- I used claud for code completion and to generate the initial fastapi implementation.
- I used Windows as I'm currently not home.

### Tech Stack

- sqlalchemy with sqlite as it is very simple.
- I choose to use react-beautiful-dnd just because I thought I was going to use its combine functionality, which I endedup ditching, since the package is being depricated, I would have choosen something else, also I hate the fact that they do not provide the source code for the advertised examples.
- Expo: I used a very succint template (first or second commit), I enjoy the flexibility of building for mobile, file based router and some other things that aren't relevant to this project.
- Why react query instead of axios+state? Using a lib like this is actually recommended in the official react docs, and avoids a lot of code repetition, well described here: <https://tkdodo.eu/blog/why-you-want-react-query>.

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

### Frontend

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run the server:

```bash
npm start
```
