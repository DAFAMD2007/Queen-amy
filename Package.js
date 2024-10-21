{
  "name": "queen-amy",
  "version": "1.0.0",
  "description": "A bot named Queen Amy",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc",
    "lint": "eslint .",
    "prepare": "npm run build"
  },
  "author": "victor",
  "license": "MIT",
  "dependencies": {
    "discord.js": "^14.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0"
  }
}
