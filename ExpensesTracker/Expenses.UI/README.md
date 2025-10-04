# Expenses.UI

This project is a modern web application built with Angular 20, designed to showcase the latest features of the framework. It serves as a comprehensive guide for developers working with cutting-edge web technologies, emphasizing performance, maintainability, and a streamlined development experience.

## Overview

The Expenses.UI application is an Angular-based frontend that demonstrates best practices in modern web development. It leverages standalone components, reactive state management with signals, and the latest Angular APIs to create a responsive and efficient user interface. This project is intended to be a reference for building high-quality Angular applications and provides clear examples of how to implement common features in a modern web app.

## Technology Stack

The project is built with a focus on modern, efficient, and maintainable technologies. Below is a list of the core technologies and their roles in the application:

| Technology    | Version | Description                                                                                                              |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| Angular       | 20      | The primary framework for building the user interface, utilizing standalone components and signals for state management. |
| TypeScript    | ~5.9    | The primary language for application development, providing strong typing and modern language features.                  |
| Angular CLI   | 20.x    | Used for managing the development workflow, including building, serving, and testing the application.                    |
| Karma/Jasmine |         | The testing framework used for unit and integration tests, ensuring code quality and reliability.                        |

## Project Architecture

The application follows a modern Angular architecture, emphasizing modularity and separation of concerns. Below is a high-level overview of the key architectural patterns and principles:

- **Standalone Components**: The application is built using standalone components, which simplifies the architecture by reducing the need for NgModules. Each component is self-contained and manages its own dependencies, making the codebase easier to maintain and scale.
- **Reactive State Management**: State management is handled using Angular Signals, a reactive and efficient way to manage application state. This approach simplifies data flow and improves performance by automatically tracking dependencies and updating the UI when the state changes.
- **Component-Based Structure**: The UI is organized into a hierarchy of components, each with a specific responsibility. This modular approach makes it easy to reuse components and reason about the application's structure.
- **Service Layer**: Business logic and data access are encapsulated in services, which are injected into components using the `inject()` function. This promotes a clean separation of concerns and makes the codebase more testable.
- **Global Interceptors**: HTTP requests are managed using a global interceptor, which handles authentication and other cross-cutting concerns. This ensures that all outgoing requests are properly authenticated without cluttering the application's business logic.

## Getting Started

To get started with the project, you will need to have Node.js and the Angular CLI installed on your machine. Follow the steps below to set up the development environment:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later)
- [Angular CLI](https://angular.io/cli) (v20.x or later)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NaveenManjappa/angular-dotnet-playground.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd angular-dotnet-playground/ExpensesTracker/Expenses.UI
   ```
3. **Install the dependencies**:
   ```bash
   npm install
   ```

### Running the Application

To run the application in a development environment, use the following command:

```bash
npm start
```

This will start a local development server at `http://localhost:4200`. The application will automatically reload if you change any of the source files.

## Project Structure

The project follows a standard Angular project structure, with the source code located in the `src` directory. Below is an overview of the key directories and their contents:

- **`src/app`**: Contains the main application logic, including components, services, and routing.
- **`src/app/components`**: Contains the UI components, each in its own subdirectory.
- **`src/app/services`**: Contains the application's services, which handle business logic and data access.
- **`src/app/guards`**: Contains route guards for protecting routes and controlling access to certain parts of the application.
- **`src/app/interceptors`**: Contains HTTP interceptors for handling cross-cutting concerns like authentication.
- **`src/assets`**: Contains static assets such as images and fonts.
- **`src/environments`**: Contains environment-specific configuration files.

## Development Workflow

The development workflow is designed to be efficient and collaborative. Below are the key steps in the development process:

1. **Branching**: Create a new branch for each feature or bug fix.
2. **Development**: Write code, following the coding standards and best practices outlined in this document.
3. **Testing**: Write unit and integration tests to ensure the quality and reliability of your code.
4. **Pull Request**: Open a pull request to merge your changes into the main branch.
5. **Code Review**: The team will review your code and provide feedback.
6. **Merge**: Once the code is approved, it will be merged into the main branch.

## Coding Standards

To maintain a high level of code quality, we follow a set of coding standards and best practices:

- **Signals for State Management**: Use signals for managing component state and `computed()` for derived state.
- **OnPush Change Detection**: Set `changeDetection: ChangeDetectionStrategy.OnPush` in all components to improve performance.
- **`inject()` for Dependency Injection**: Use the `inject()` function for dependency injection instead of constructor injection.
- **Native Control Flow**: Use native control flow (`@if`, `@for`, `@switch`) in templates instead of `*ngIf`, `*ngFor`, and `*ngSwitch`.
- **Type Safety**: Use TypeScript's type system to ensure type safety and catch errors at compile time.

## Testing

The project uses Karma and Jasmine for unit and integration testing. To run the tests, use the following command:

```bash
npm test
```

This will run the tests in a headless browser and output the results to the console.

## Contributing

We welcome contributions from the community. If you would like to contribute to the project, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bug fix.
3. **Make your changes** and commit them with a descriptive commit message.
4. **Push your changes** to your fork.
5. **Open a pull request** to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
