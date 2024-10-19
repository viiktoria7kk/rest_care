# Rest Care Client

Rest Care Client is a web application for booking parking spaces in the Rest Care multifunctional center. It provides a convenient infrastructure for drivers to book parking spaces online, manage their profiles, and view booking history.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/viiktoria7kk/rest-care-client.git
    cd rest-care-client
    ```

2. Install dependencies using pnpm:
    ```sh
    pnpm install
    ```

## Usage

To start the development server, run:
```sh
pnpm start
```

To build the project for production, run:
```sh
pnpm build
```

To preview the production build, run:
```sh  
pnpm serve
```

## Project Structure

The project is structured as follows:
- `public/`: Contains static files that are served as-is.
- `src/`: Contains the source code of the application.
  - `assets/`: Contains images, fonts, and other assets.
  - `components/`: Contains reusable components.
  - `constants/`: Contains constants used throughout the application.
  - `contexts/`: Contains React contexts.
  - `hooks/`: Contains custom hooks.
  - `pages/`: Contains the main pages of the application.
  - `services/`: Contains services for making API requests.
  - `styles/`: Contains global styles.
  - `utils/`: Contains utility functions.
  - `App.tsx`: The main component of the application.
  - `index.tsx`: The entry point of the application.


## Features

- User authentication and authorization
- Real-time parking space availability
- Interactive map for selecting parking spaces
- Online payment integration
- User profile management
- Admin panel for managing bookings and users


## Technologies Used

- React: Frontend library for building user interfaces
- Vite: Build tool for frontend projects
- Redux Toolkit: State management
- RTK Query: Data fetching and caching
- Formik: Form handling
- Yup: Form validation
- MUI: UI components
- pnpm: Package manager
- ESLint: Linting
- Prettier: Code formatting

## License

This project is licensed under the MIT License