# Feed Follow Manager

A command-line tool for managing RSS/Atom feed subscriptions. This application allows users to follow feeds and manage their feed subscriptions.

## Features

- Follow new feeds using URLs
- List all followed feeds
- User-based feed subscription management

## Installation

1. Clone the repository
2. Install dependencies:
```
npm install
```
## Configuration

The application uses a configuration file to manage user settings. Make sure you have a proper configuration file set up with your username.

## Usage

### Following a Feed

To follow a new feed, use the follow command with a feed URL:
```
npm run start follow <feed-url>
```
Example
```aiignore
npm run start follow https://example.com/feed.xml
```
On successful subscription, the program will display:
- The user who followed the feed
- The name of the feed that was followed

### Listing Feed Subscriptions

To view all feeds you're following:
```aiignore
npm run start list
```
This command will display:
- A list of all feeds you're currently following
- If you're not following any feeds, it will show "No feed follows"

## Error Handling

The application handles several error cases:
- Invalid number of arguments
- Unknown/invalid users
- Unknown/invalid feeds
- Missing configuration

## Technical Details

### Technologies Used

- TypeScript
- Node.js
- PostgreSQL (via Drizzle ORM)

### Key Components

- `handlerFollow`: Manages the feed subscription process
- `handlerListFeedFollows`: Displays user's feed subscriptions
- Database queries for user and feed management

### Database Structure

The application uses several database tables:
- Users table: Stores user information
- Feeds table: Stores feed information
- FeedFollows table: Manages user-feed relationships

## Dependencies

- TypeScript: ^5.8.3
- @types/node: ^22.15.21
- drizzle-orm: ^0.43.1
- drizzle-kit: ^0.31.1
- postgres: ^3.4.7
- fast-xml-parser: ^5.2.3
- tsx: ^4.19.4
