# Ogani Shared Module Web

Utilities
How do Utilites relate to single-spa?
A utility is an in-browser module that (generally) has it's own repository and CI process. It exports a public interface of functions and variables that any other microfrontend can import and use. A utility microfrontend is just like any other microfrontend, except it doesn't serve as a single-spa application or parcel.

Utility modules share common logic
Utility modules are a great place to share common logic. Instead of each application creating their own implementation of common logic, you can use a plain JavaScript object (single-spa utility) to share that logic. For example: Authorization. How does each application know which user is logged in? You could have each application ask the server or read a JWT but that creates duplicate work in each application. Using the utility module pattern would allow you to create one module that implements the authorization logic. This module would export any needed methods, and then your other single-spa applications could use those authorization methods by importing them. This approach also works well for data fetching.

Examples of Utility Microfrontends
The following are commonly implemented as a Utility Microfrontend:

Notification service
Styleguide/component library
Error tracking service
Authorization service
Data fetching