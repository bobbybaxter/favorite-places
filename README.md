# Favorite Places
One-page locally hosted site to work on data creation in a JSON file and vanilla XHR Requests.

## Screenshots
![image of personal bio website](https://raw.githubusercontent.com/bobbybaxter/favorite-places/master/images/favorite-places-screenshot.png)

## Getting Started
Clone the repo:
```
$git clone https://github.com/bobbybaxter/favorite-places
```

### Prerequisites
Download HTTP Server, to be able to serve the site locally in your browser:
```
$npm install -g http-server
```

## Running
Browse to the favorite-places/ directory and run HTTP Server by typing the following command into the terminal:
```
$ hs -p 5000
```

In your web browser, copy and paste this:

 `localhost:5000`

 ### Under the Hood
#### places.json
- i've created a `.json` file that includes my favorite cities so that i can practice accessing data via an asyncronous XMLHttpRequest in Javascript.

#### main.js
##### Definitions
- at the top are my definitions
  - `navButtons` points to the elements with the `nav-item` class in the DOM, which will later be used to sort the cards
- `places` is an empty array, which will later be where we store the JSON data we receive
##### Functions
- the `printToDom` function assigns our selected text to our selected DOM element
- the `cardSorter` function passes the click event (later defined in `eventListener()`), gets the `id` of the `target` (in this case, the button being clicked), and then sorts our `places` array in depending on which button was clicked.  then the later defined `domStringBuilder()` rebuilds our newly sorted cards and displays them in the DOM.
  - `default-btn` sorts by `cityId`
  - `city-btn` sorts by `cityName`
  - `state-btn` sorts by `cityState`
- the `domStringBuilder` function declares `domString` as an empty string.  then, with the `.forEach` method, it loops through our `places` array and pulls data from each object to build Bootstrap cards, then calls `printToDom()` to display them on the page.
- the `loadSuccess` function works as follows:
  - `const data = JSON.parse(this.responseText);`
    - `.responseText`: a property of `XMLHttpRequest` that returns the text we receive from the server
    - `this`: refers to the object/constructor that contains it, `XMLHttpRequest`, which itself was created later in the `getPlacesData` function 
    - `JSON.parse()`: constructs the object described by the string within the parentheses
  putting it all together, we're returning the text from our XMLHttpRequest, building an object with it, and assigning it to the variable `data`.  
  - then we're extracting the `places` array from the `data` object, assigning it to the variable `places`
  - finally, we're calling `domStringBuilder()` and passing our `places` array to it to be looped through and displayed on the DOM
- the `loadFailure` function logs to the console so we know if our XMLHttpRequest fails
- the `getPlacesData` function does the following:
  - creates a new object/constructor function of `XMLHttpRequest()` and assigns it to the variable `myRequest`
  - adds an `eventListener` that runs the `loadSuccess` function when the `XMLHttpRequest` transaction completes successfully
  - adds an `eventListener` that runs the `loadFailure` function when the `XMLHttpRequest` encounters an error
  - initializes a request with the `.open` method, passing 2 parameters: 
    - `GET` method to retrieve the data
    - and `./db/places.json` the URL from where it's requesting data
  - finally, it sends the request to the server with the `.send` method.  this method also returns our data whenever it receives the response, and delivers it via any `eventListener` we set up
- the `eventLisenters` function loops through our `navButtons` and adds a click event to each one that runs `cardSorter()` whenever clicked.
##### Execution
- our `init` function first runs `getPlacesData()` then runs `eventListeners`
- then we invoked `init()`