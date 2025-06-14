# Task Manager Application
![Screenshot 2025-05-27 062905](https://github.com/user-attachments/assets/2c0408c0-09d0-46c8-b7ad-0767657f0bac)

A responsive, accessible, and user-friendly Task Manager built with React and Framer Motion. This application allows you to create, edit, delete, and filter tasks by different categories, with smooth animations and custom alerts.

## Table of Contents

* [Features](#features)
* [Demo](#demo)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Accessibility](#accessibility)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)

## Features

* **Add Tasks**: Create new tasks with a title and category.
* **Edit Tasks**: Inline editing by double-clicking the task text.
* **Delete Tasks**: Remove tasks easily with a delete button and confirmation dialog.
* **Toggle Completion**: Mark tasks as completed or not by clicking or pressing Enter.

* **Filter & Search**: Filter tasks by category and search by keyword.
* **Clear Completed**: Bulk remove all completed tasks.
* **Smooth Animations**: Powered by [Framer Motion](https://www.framer.com/motion/).
* **Custom Alerts**: Accessible modal alerts for notifications.
* **Persisted Data**: Tasks and user filter preferences stored in `localStorage`.

## Demo

[*Add a link or GIF here demonstrating the application in action.*
](https://sprightly-axolotl-3d0937.netlify.app)

## Tech Stack

* **React** (v18+)
* **Framer Motion** for animations
* **JavaScript (ES6+)**
* **HTML5 & CSS3**
* **LocalStorage** for data persistence

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/blope12/QuickLists.git
   cd QuickLists
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm start
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

## Usage

1. **Add a new task**: Enter task text, select a category, and click **Add**.
2. **Edit a task**: Double-click the task text or select and press Enter; edit inline and press Enter or click outside.
3. **Complete a task**: Click on a task or press Enter when focused.
4. **Delete a task**: Click the trash can icon and confirm deletion.
5. **Filter tasks**: Click category buttons to filter, or use the search box to find tasks by text.
6. **Clear completed**: Click **Clear Completed** to remove all tasks marked as done.

## Accessibility

* **Keyboard Navigation**: All interactive elements can be operated via keyboard (Enter, Escape).
* **ARIA Roles & Attributes**: Proper roles (`role="alertdialog"`, `aria-live`, `aria-pressed`, etc.) for screen readers.
* **Focus Management**: Inputs and modals manage focus appropriately.

## Project Structure

```
src/
├── App.js          # Main component
├── Task.js         # Individual task component
├── FilterButtons.js# Category filter component
├── CustomAlert.js  # Accessible alert modal
├── index.js        # Entry point
└── styles.css      # Stylesheet
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for details.
