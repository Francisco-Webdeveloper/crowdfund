<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Francisco-Webdeveloper/sports-quiz">
    <h2 align="center">Crowdfund</h2>
  </a>

  <p align="center">
    A responsive frontend crowdfunding projects page, where the users can select the project they want to support and therefore submit a pledge and check the project's data status (the goal, total money backed, total number of backers, progress bar).
<br/>
    This web application went through Unit and Integration tests with Testing Library, and End-To-End tests with Cypress.
    <br />
    <a href="https://github.com/Francisco-Webdeveloper/crowdfunding-page"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Francisco-Webdeveloper/crowdfunding-page">View Demo</a>
    ·
    <a href="https://github.com/Francisco-Webdeveloper/crowdfunding-page/issues">Report Bug</a>
    ·
    <a href="https://github.com/Francisco-Webdeveloper/crowdfunding-page/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
  * [What I learned](#what-i-learned)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

![Screenshot 2022-07-06 at 18 29 59](https://user-images.githubusercontent.com/67716187/177599222-3820dc40-9d41-4bd8-8146-7a1ba0d46b3c.png)
![Screenshot 2022-07-06 at 18 30 52](https://user-images.githubusercontent.com/67716187/177599329-b478b2b7-a166-4033-81b3-9cd84690d636.png)

Users should be able to:

* View the optimal layout depending on their device's screen size
* See hover states for interactive elements
* Make a selection of which pledge to make
* See an updated progress bar and total money raised based on their pledge total after confirming a pledge
* See the number of total backers increment by one after confirming a pledge
* Toggle whether or not the product is bookmarked

### Built With
This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [React](https://reactjs.org/)
* [create-react-app](https://github.com/facebook/create-react-app)
* [Sass](https://sass-lang.com/)
* [React-Bootstrap](https://react-bootstrap.github.io/)
* [Testing Library](https://testing-library.com/)
* [Cypress](https://www.cypress.io/)
* [Firebase](https://firebase.google.com/)
* [Netlify](https://www.netlify.com/)
* Flexbox
* CSS Modules

### What I learned
* Using component composition to avoid prop drilling in React. It is possible to compose components by making one a child of another.
```
<PledgesModalCard
  showModal={showModal}
  onHide={handleCloseModal}
  modalIntroduction={modalIntroduction}
  pledgeSubmitted={pledgeSubmitted}
  confirmationPledgeText={confirmationPledgeText}
>
  <PledgeList
    pledges={allPledges}
    selectedPledge={selectedPledge}
    onPledgeSelect={handlePledgeSelect}
    onSubmit={handleSubmit}
    onPledgeConfirmClick={handlePledgeConfirmClick}
  />
</PledgesModalCard>  
```
`PledgeList` is invoked inside of `PledgesModalCard` and hence it is a child of it. Every component has an automatic prop name `children` that holds the children of the component. Therefore, in `PledgesModalCard` we can write:
```
export const PledgesModalCard = ({children}) => {
  return (
    <Modal>
      (...)
      {children}
    </Modal>
  );
};
```
Finally, we can access the `PledgeList` props that were passed from the `PledgesModalCard` component:
```
export const PledgeList = ({
  pledges,
  selectedPledge,
  onPledgeSelect,
  onSubmit,
  onPledgeConfirmClick,
}) => {
  return (
    (...)
  );
});
```
* Import SVGs as React Components
```
import { ReactComponent as BookmarkIcon } from "../../icons/icon-bookmark.svg";

export const ProjectHeader = ({ title, description, onClick }) => {
  (...)
  return (
    <BookmarkIcon />
  )
```
The `ReactComponent` import name is significant and tells Create React App that you want a React component that renders a SVG, rather than its filename.

* Child component updating Parent state <br />
In the parent component, declare a state and define a function to update the state. Pass that function down as props to the child component
```
const Project = ({ pledges, project }) => {
  const [allPledges, setAllPledges] = useState(pledges);
  const [projectStatus, setProjectStatus] = useState({
    moneyBacked: project.moneyBacked,
    totalBackers: project.totalBackers,
  });
  
  const handleStockUpdate = (pledgeId) => {
    setAllPledges((...));
  };

  const handleProjectStatus = (pledgedAmount) => {
    setProjectStatus((...));
  };

  const handlePledgeConfirmClick = (pledgeId, pledgedAmount) => {
    handleProjectStatus(pledgedAmount);
    handleStockUpdate(pledgeId);
  };
  
  return(
    (...)
    <PledgeList
      onPledgeConfirmClick={handlePledgeConfirmClick}
    />
  )
}
```
Between the parent component and the component where the function will be invoked there is a middle component that will work as a bridge to accept and pass props through to the child component.
```
export const PledgeList = ({
  onPledgeConfirmClick,
}) => {
  return (
    <Pledge
      onContinueButtonClick={onPledgeConfirmClick}
    />
  )
```
in the Child component, we define a button with an onClick event and invoke the function passed as props with the correspondent arguments:
```
export const Pledge = ({ onContinueButtonClick }) => {
  return (
    <button onClick={() => onContinueButtonClick(id, amountInputRef.current.value)} >
      Continue
    </button>
  )
}
```
* Storing values with the useRef hook <br />
As the name suggests, `useRef` can store a reference to a DOM element.
To do this, I create the ref, and then I pass it into the element:
```
export const Pledge = ({ minimumAmount, id, onContinueButtonClick }) => {
  const amountInputRef = useRef();

  return(
    <input
      type="text"
      ref={amountInputRef}
      name="pledgeAmount"
    />
  )
}
```
This way I can access the value of the input element by using the methods .current and .value like so `amountInputRef.current.value)`. <br />
The key difference between `useState` and `useRef` is that:
* If you update the state, your component will re-render;
* If you update the value stored in your ref, nothing will happen.

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

You need to install the following elements:
* npm
```sh
npm install npm@latest -g
```
* yarn
```sh
npm install yarn -g
```

### Installation

1. Get a free JSON API at [https://opentdb.com/api_config.php](https://opentdb.com/api_config.php). Use of this API does not require an API Key.
3. Clone the repo
```sh
git clone git@github.com:Francisco-Webdeveloper/sports-quiz.git
```
3. Install NPM packages
```sh
yarn install
```

<!-- USAGE EXAMPLES -->
## Usage

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/Francisco-Webdeveloper/sports-quiz/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


<!-- CONTACT -->
## Contact

Your Name - [@FranciscoLX81](https://twitter.com/FranciscoLX81) - francisco.santos.lx81@gmail.com

Project Link: [https://github.com/Francisco-Webdeveloper/crowdfund](https://github.com/Francisco-Webdeveloper/crowdfund)


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com/)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template/blob/master/README.md)
* [Sass](https://sass-lang.com/guide)
* [CSS Modules](https://github.com/css-modules/css-modules)
* [Frontend Mentor](https://www.frontendmentor.io)
* [Firebase Documentation](https://firebase.google.com/docs/firestore?authuser=0)
* [The Net Nina](https://netninja.dev/p/getting-started-with-firebase-9)
* [Raúl Marín](https://github.com/raulmarindev)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Francisco-Webdeveloper/sports-quiz.svg?style=for-the-badge
[contributors-url]: https://github.com/Francisco-Webdeveloper/sports-quiz/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Francisco-Webdeveloper/sports-quiz.svg?style=for-the-badge
[forks-url]: https://github.com/Francisco-Webdeveloper/sports-quiz/network/members
[stars-shield]: https://img.shields.io/github/stars/Francisco-Webdeveloper/sports-quiz.svg?style=for-the-badge
[stars-url]: https://github.com/Francisco-Webdeveloper/sports-quiz/stargazers
[issues-shield]: https://img.shields.io/github/issues/Francisco-Webdeveloper/sports-quiz.svg?style=for-the-badge
[issues-url]: https://github.com/Francisco-Webdeveloper/sports-quiz/issues
[license-shield]: https://img.shields.io/github/license/Francisco-Webdeveloper/sports-quiz.svg?style=for-the-badge
[license-url]: https://github.com/Francisco-Webdeveloper/sports-quiz/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/francisco-santos-frontend/
[product-screenshot]: public/screenshot.png


