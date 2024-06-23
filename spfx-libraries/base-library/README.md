# Base Library Sample

This is a sample project that demonstrates how to create a base SPFx library to be used inside a SPFx web part solution.

## base-library

This is the base library project. It contains a simple `TestBaseLibrary` class that has a single method `getCurrentTime()`. This method returns a string that contains the current time.

## test-project

This is the test project that demonstrates how to use the base library in a SPFx web part solution. The web part simply calls the `getCurrentTime()` method from the base library and displays the result.

## Building and using the projects

### Locally

#### base-library

Build the base-library solution:

```bash
cd base-library
npm install
gulp build
gulp bundle --ship
```

Create an NPM link for the base-library:

```bash
cd base-library
npm link
```

This creates a link to the base-library in the global NPM repository, the name of the link is the name of the project specified inside the package.json file.

#### test-project

Link the base-library to the test-project:

```bash
cd test-project
npm link base-library
```

Build and run the test-project solution:

```bash
cd test-project
npm install
gulp build
gulp serve --nobrowser
```

### Using the library with the app catalog

#### base-library

Build the base-library solution:

```bash
cd base-library
gulp bundle --ship
gulp package-solution --ship
```

Deploy the package to the app catalog.

#### test-project

Add the reference to the base-library in the test-project solution updating the package.json file adding the following line:

```json
"dependencies": {
  "base-library": "0.0.1"
}
```

> Note: The version number should match the version number of the base-library package.

> ⚠️ Important: if you want to execute the npm install command you should remove the dependency from the package.json, execute the command, and then restore the link to the base-library and add the dependency back to the package.json file.

Build the test-project solution:

```bash
cd test-project
gulp bundle --ship
gulp package-solution --ship
```

Deploy the package to the app catalog and add the web part to a page.
