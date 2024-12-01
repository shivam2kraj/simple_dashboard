## Implemented Features
### User List Page
Data Fetching: Fetches a list of users from the public API (https://jsonplaceholder.typicode.com/users).
Table Display: Displays user details (ID, Name, Email, Phone, Address) in a structured table.
### Search and Filter
Search: A text input to filter users by name.
Filter by City: A dropdown to filter users based on their city.
### Pagination
Displays the users in paginated rows for better usability.
Pagination controls allow navigating between pages and adjusting the number of rows displayed.
### User Details Page
Clicking on a user’s ID redirects to a separate details page.
The page displays complete details of the selected user, including:
Name, Email, Phone
Address (Street, Suite, City, Zipcode)
Company Information (Name, Catchphrase, Business).
### Loading and Error States
Loading State: Displays a loading spinner while data is being fetched.
Error Handling: Shows an error message if the data fetch fails.
### Responsive Design
The application is fully responsive, adapting seamlessly to different screen sizes (mobile, tablet, desktop).
### Redux State Management
Manages the global state for users, search, and city filter using Redux.
Actions and reducers are implemented for:
Storing user data.
Managing search and filter logic.
Efficiently updating the filtered user list.


## Install Dependencies
Make sure you have Node.js and npm installed. Run the following command to install the required dependencies:

npm install
## Start the Development Server
To start the React development server:

npm start