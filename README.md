# Jobs Feed Application
This application displays a list of active jobs without duplicates and allows users to interact with job entries. When clicking on a job:

If the job is active, a details dialog will display.

If the job is stopped, a toast notification will appear.

## Installation and Running Instructions
### 1. Installation
Ensure you have latest Node.js and npm installed on your system (Project is in Angular 19). 

Then, run the following command in the project directory: *npm install*

### 2. Running the Application
To start the app locally, run: *npm start* or *ng serve*

### 3. Running Cypress Tests
a. *npm run cy:open* To open Cypress in Interactive Mode

b. *npm run cy:run* To run Cypress Tests in Headless Mode

## Architecture Overview
This application is structured into three main folders for better scalability and maintainability and best of readability:

## Folder Structure
**CORE:** Contains core functionality specific to the app, such as interceptors and authentication services.

**SHARED:** Houses reusable and common functionality such as utilities, guards, and shared services.

**FEATURES:** Encapsulates components that define specific app features and their related modules, services, and templates.

## Folder and File Descriptions

### 1. Core
**Interceptors:**
*auth.interceptor.ts:* Handles authentication headers for requests.

*global-error-handler.interceptor.ts:* Centralizes error handling for API calls.
**Services:**
*auth.service.ts:* Manages authentication logic (e.g., managing JWT tokens).

### 2. Shared

**Enums:**

*paginator.enum.ts:* Defines constants related to pagination behavior.

*status.enum.ts:* Enumerates job statuses (e.g., active, inactive).

**Guards:**

*auth.guard.ts:* Protects routes by verifying authentication status.

**Helpers:**

*date-converter.helper.ts:* Provides utility functions for date formatting and conversions.

**Services:**

*global-loader.service.ts:* Manages a global loading spinner.

*logging.service.ts:* Centralizes logging functionality.

*navigation.service.ts:* Simplifies navigation across routes and is a common place for common functionality concerning navigation.

*paginator.service.ts:* Handles pagination logic to keep the implementation simple and efficient.

*session-storage.service.ts:* Wraps sessionStorage for easier storage management.

*toast.service.ts:* Manages toast notifications for user feedback.

### 3. Features

**Components:**

*jobs/components/item-dialog.component:* Displays job details dialog for active jobs.

*jobs/components/jobs-list.component:* Renders a list of active jobs without duplicates.

**Models:**

*jobs.model.ts:* Defines the structure for job-related data.

*feed-entry-details.model.ts:* Defines data structure for job feed entry details.

**Services:**

*jobs.service.ts:* Handles API calls related to job data.

**Routes:**

*jobs.routes.ts:* Configures lazy loading for job-related routes.

## Key Features and Decisions

### Lazy Loading:

Used lazy loading for components to enhance performance, especially with a real backend.

### @defer for Large Components:

Used Angular's @defer to lazily load large components within templates.

### Optimized Images:

Leveraged ngSrc with NgOptimizedImage to ensure efficient image handling and performance.

### Pagination:

Implemented a PaginatorService to manage pagination simply and effectively. For more complex state sharing in the future, NgRx may be considered.

### Proxy for CORS:

A proxy was used to bypass CORS issues during development, which won't be needed with a real backend.

### JWT Token:

Stored a dummy JWT token in sessionStorage, simulating real backend authentication.

### Change Detection:

Utilized ChangeDetectionStrategy.OnPush to minimize unnecessary change detection cycles, improving performance.

### Signals:

Used Angular Signals where appropriate to enhance performance and simplify reactivity.