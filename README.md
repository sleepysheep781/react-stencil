# Development

### Link to Deployed Website
If you used the stencil code, this is `https://sleepysheep781.github.io/react-stencil`

### Goal and Value of the Application
This application aims to implement the online shopping service for a bakery.

### Usability Principles Considered

### Organization of Components
#### Rendering
I defined a BakeryItem component, and used props and useState to render json data on the page.

#### Filtering
I implemented two filtering categories: Types and Dietary Restrictions. Users can only choose one item under Types category (radio button) but multiple item under Dietary Restrictions category (checkbox). 

#### Sorting
I implemented sorting method in dropdown list. Users can get data sorted by price or calories in descending order.

#### Aggregator
I defined a CartItem component, and used props and useState to implement a shopping cart that aggregates prices and makes it easy for users to add or remove items.

### How Data is Passed Down Through Components

### How the User Triggers State Changes
#### Filtering

#### Sorting

#### Aggregator

### Credit
Data is from https://pastichefinedesserts.com