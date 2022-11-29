# Development

### Link to Deployed Website
If you used the stencil code, this is `https://sleepysheep781.github.io/react-stencil`

### Goal and Value of the Application
This application aims to implement the online shopping service for a bakery. Users can filter items by the combination of 2 filtering categories (Types and Dietary Restrictions). Users can also sort items by price or calories in descending order. Users can add items to the shopping cart, get the total price and easily increase or decrease the quantity of items in the cart.

### Usability Principles Considered
**1. Aesthetic and minimalist design:** The page doesn't have any irrelevant information and consists of header name, filtering form, sorting dropdown, image gallery, and shopping-cart aggregator. Each part has a different color so that users can distinguish them.

**2. Visibility of system status:** The page always keeps users informed about what is going on with appropriate titles.

**3. Consistency and standards:** The application is designed with consistent styling such as font size, font color, font style, image display, etc.

**4. Recoginition rather than recall:** Instructions are visible. Users don't need to remember any information. 

**5. User control and freedom:** The shopping cart supports undo and redo. Users can easily add to or remove from the cart.

**6. Match between system and real world:** Following real-world conventions, the application speaks users' language with words, icons, concepts familiar to users. For example, a radio button indicates a single selection, while a checkbox allows multiple selections.

### Organization of Components
**1. Rendering:** I defined a BakeryItem component, and used props and useState to render json data on the page.

**2. Filtering:** I implemented two filtering categories: Types and Dietary Restrictions. Users can only choose one item under Types category (radio button) but multiple item under Dietary Restrictions category (checkbox). 

**3. Sorting:** I implemented sorting method in dropdown list. Users can get data sorted by price or calories in descending order.

**4. Aggregator:** I defined a CartItem component, and used props and useState to implement a shopping cart that aggregates prices and makes it easy for users to add or remove items.

### How Data is Passed Down Through Components
I used **forEach function** to fetch data from json file and store data in **bakeryData array**. 

### How the User Triggers State Changes
#### 1. Filtering
**"Types"** only supports single selection. **"All"** is selected by default. Whenever users select one of the radio button, **selectFilterType function** is triggered, which passes *selected type value*, compares it with the *type of every item* and filters the same ones. 
**"Dietary Restrictions"** allows multiple selections. When users select any radio button, **filterRestriction funciton** is triggers, which passes the checkbox values, checks **restrictionSet set**, if the value doesn't exist in the set, add it to the set, otherwise, remove it from the set. When **restrictionSet set** is not empty, iterating the restriction value and filtering the items' restriction attribute.

#### 2. Sorting
When users select sorting value in the dropdown, **setSortType funciton** is triggered, which passes the sorting value. In **useEffect**, sorting the items and calling **setSortList** and then rendering items in descending order.

#### 3. Aggregator
When users click the **Add to cart button** in the item card or **"+" button** in the shopping cart, **addToCart function** is triggered and its logic is checking the cart: if the selected item is already in the cart, increase its quantity; otherwise, set its quantity to 1 and add it to cart.  <br/>
When users click the **"-" button** in the shopping cart, **removeFromCart function** is triggered and its logic is checking the cart: if the selected item is already in the cart, decrease its quantity, if its quantity is 0, remove it from the cart; otherwise, set its quantity to 0. <br/>


### Credit
Data is from https://pastichefinedesserts.com