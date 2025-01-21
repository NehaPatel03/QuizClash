# QuizClash 

**QuizClash** is a real-time, multiplayer quiz platform where users can compete against each other by entering the same room. Using **Socket.IO**, the platform enables live interaction, synchronizing quizzes, tracking points, and displaying a leaderboard. At the end of each quiz, the winner is announced based on the leaderboard standings.

## Features  

### 1. **Real-Time Multiplayer Quiz**  
- Users can join the same quiz room to compete with each other in real-time.  
- Leveraging **Socket.IO**, the quiz experience is synchronized across all players.

### 2. **Room-Based Competition**  
- Players can join existing quiz rooms or create their own.  
- Each room allows multiple players to participate in a shared quiz session.  

### 3. **Interactive Questions**  
- Questions are displayed to all players simultaneously, with a set timer for responses.  
- Real-time updates for submitted answers and time left.  

### 4. **Points System**  
- Players earn points based on the correctness and speed of their answers.  
- Quick and accurate answers are rewarded with higher points.

### 5. **Live Leaderboard**  
- A live leaderboard displays the current rankings of players in the room.  
- Updates in real-time as players accumulate points throughout the quiz.

### 6. **Interactive UI**  
- Engaging and responsive interface for players on both desktop and mobile.  
- Smooth transitions between questions, leaderboard updates, and final results.

## Technology Stack  

### **Frontend**  
- **React.js**, **CSS**, **JavaScript**

### **Backend**  
- **Node.js**, **Express.js**, **Socket.IO** (used for real-time communication between frontend and backend)

## How It Works  

1. **Join or Create a Room**  
   - Players can create a quiz room or join an existing room by entering the room ID.

2. **Real-Time Quiz Interaction**  
   - Questions are presented simultaneously to all players in the room.  
   - Players submit their answers within the time limit.  

3. **Live Scoring and Leaderboard**  
   - Points are calculated in real-time based on the accuracy and speed of answers.  
   - The leaderboard is updated dynamically to reflect the current standings.

4. **Winner Announcement**  
   - After the quiz ends, the player with the highest points is declared the winner, and the final leaderboard is displayed.

## Contributing  

Contributions to improve **QuizBattle** are welcomed! Whether it's fadding new features, improving documentation, or optimizing performance. 
Follow the steps below to get started:  

### Steps for contributing:
1. Fork the repository.
2. Create a new branch (git checkout -b feature-name).
3. Make your changes.
4. Commit your changes (git commit -m 'Add feature').
5. Push your changes to your forked repository (git push origin feature-name).
6. Open a pull request.
