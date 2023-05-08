
#   CRUD app with VUE3 + EXPRESS + Turborepo

This README will guide you through the process of setting up and running a **CRUD - technical assessment project**. Please follow the steps below to get started. 

**Make sure to check your email for the instruction on the required environment variables!!!**

## Prerequisites

Before starting, make sure you have the following tools (at least major versions) installed on your system:

1.  `Node.js v18.16.0`
2.  `pnpm v7.15.0`

These are the exact ones the app was run on.

If you don't have the required versions installed, you can follow the instructions below to set them up:

### Install Node.js

Download the appropriate installer for your operating system from the official [Node.js downloads page](https://nodejs.org/en/download/).

### Install pnpm

After installing Node.js, you can install pnpm using the following command:

```
npm install -g pnpm@7.15.0
```

For macOS users, you can also install pnpm using Homebrew:

```
brew install pnpm@7.15.0 
```
## Setting Up the Project

Follow these steps to set up the project:

1.  Clone the CRUD project using Git (if applicable) or download the project files from [this repository](https://github.com/radosliwa/crud)
```
git clone https://github.com/radosliwa/crud.git 
```
2.  Change to the project directory.
```
cd crud
```
3.  Install dependencies using pnpm.
```
pnpm install
``` 

4.  Set up the environment variables based on the instructional mail you received. 

## Running, testing, linting & builing the Project

1. After setting up the project, you can now run it using the following command from the project's root:
```
pnpm run dev
```
It will run **backend  (port 5000)** and **frontend (port 3000)** simultaneously. 

**If you're not sure about the environment client is running on go to point 2 and run them in separate terminals!!**

2. You can also run them separately:
```
pnpm run dev:client
```
```
pnpm run dev:backend
```

3. In order to run tests enter the the following command from the project's root:
```
pnpm run test
```
4. In order to lint project enter the the following command from the project's root:
```
pnpm run lint
```
5. In order to build both apps the the following command from the project's root:
```
pnpm run build
```

## Troubleshooting

If you run into issues while setting up or running the CRUD project, consider the following troubleshooting steps:

1.  **Double-check the environment variables** in your `.env` files in `apps/client` and `apps/backend`. Make sure they match the values provided in the instructional mail.
    
2.  Ensure you have the correct versions of `Node.js (v18.16.0)` and `pnpm (v7.15.0)` installed. You can check the installed versions by running:
```
node -v
```
```
pnpm -v
``` 
3.  If you encounter errors regarding Turborepo itself try to consult [the official docs](https://turbo.build/repo/docs/troubleshooting)
4. If you're not sure about the port that app is running on **try running frontend and backend separately (paragraph above) and investigate the terminal**
5.  If you still cannot resolve the issue, create an issue on the project's repository detailing the problem and any relevant error messages.

## @TODOs
1. figure out a way to make Vuetify 3 work with Vitest so that unit tests can be written
2. add functionality for all items removal
3. fix forcing selected state on an edited item if it's not selected