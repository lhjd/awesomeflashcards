// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
// import TopNavBar from './components/TopNavBar'
import App from './App';
// import 'application.scss';

// const Hello = props => (
//   <div>
//     <TopNavBar />
//     <div>Hello {props.name}!</div>
//   </div>
// )

// Hello.defaultProps = {
//   name: 'David'
// }

// Hello.propTypes = {
//   name: PropTypes.string
// }

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    // <Hello name="React" />,
    // document.body.appendChild(document.createElement('div')),
    document.getElementById('root')
  )
})
