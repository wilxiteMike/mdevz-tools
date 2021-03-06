import _ from "lodash"
import React, { Component } from "react"
import { createMedia } from "@artsy/fresnel"
import Link from 'next/link'
import {
  Icon,
  Image,
  Menu,
  Sidebar,
  Dropdown
} from "semantic-ui-react"

const leftItems = [
  { content: "General Tools", to: '/general', key: "security", dropdown: [
      { content: "Json Formatter", to: '/json-formatter', key: "jsongormatter" },
      { content: "URL Shortener", to: '/url-shortener', key: "url-shortener" },
      { content: "DNS Checker", to: '/dns-checker', key: "dns-checker" },
  ]},
  { content: "Security Tools", to: '/security', key: "security", dropdown: [
      { content: 'Password Generator', to: '/password-generator', key: "password-generator" },
      { content: 'Security Headers', to: '/security-headers', key: "security-headers" }
  ]},
  { content: 'Contact', to: '/contact', key: "contact" }
];
const rightItems = [
  { content: "Login", to: '/login', key: "login" },
  { content: "Register", to: '/register', key: "register" }
];

const NavBarDropdown = ({
  dropdownItems,
  id,
  text,
  to
}) => (
  <Dropdown 
    key={"dropdown_" + id}
    item 
    text={text}
    onClick={e => e.preventDefault()}>
   <Dropdown.Menu>
     {
       dropdownItems.map((dropdownItem) => 
        <Link href={to + dropdownItem.to}>
          <Dropdown.Item
            key={"dropdown_" + dropdownItem.key}>
              { dropdownItem.content }
          </Dropdown.Item>
        </Link>
      )
     }
   </Dropdown.Menu>
  </Dropdown>
);

const AppMedia = createMedia({
  breakpoints: {
    mobile: 0,
    computer: 992
  }
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

class ResponsiveNavBar extends Component {

  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    return (
      <div>

        <style>{mediaStyles}</style>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            vertical
            visible={visible}
            width='thin'
          >
            <Link href='/'>
              <Menu.Item
                key="sidebar_home">
                <Image size="mini" src="/images/mdevz-icon-purple.svg" />
                <h4>mDevz Tools</h4>
              </Menu.Item>
            </Link>
          {_.map(leftItems, item => item.dropdown ? 
            <NavBarDropdown 
              dropdownItems={item.dropdown}
              id={"sidebar_" + item.key}
              text={item.content}
              to={item.to}
              key={"sidebar_" + item.key}
            /> 
            : 
            <Link href={item.to}><Menu.Item {...item} /></Link>)
            }
          </Sidebar>
          <Sidebar.Pusher
            dimmed={visible}
            onClick={this.handlePusher}
            style={{ minHeight: "100vh" }}
          >
            <Menu fixed="top">
              <Link href='/'>
                <Menu.Item
                key="home">
                  <Image size="mini" src="/images/mdevz-icon-purple.svg" />
                </Menu.Item>
              </Link>
              <MediaContextProvider>
                <Menu.Menu as={Media} at="mobile">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                </Menu.Menu>
                <Menu.Menu as={Media} greaterThanOrEqual="computer">
                  {_.map(leftItems, item => item.dropdown ? 
                      <NavBarDropdown 
                        dropdownItems={item.dropdown}
                        id={item.key}
                        text={item.content}
                        to={item.to}
                        key={item.key}
                      /> 
                      : 
                      <Link href={item.to}><Menu.Item {...item} /></Link>) 
                    }
                </Menu.Menu>
              </MediaContextProvider>
              <Menu.Menu position="right">
                {_.map(rightItems, item => item.dropdown ? 
                  <NavBarDropdown 
                    dropdownItems={item.dropdown}
                    id={item.key}
                    text={item.content}
                    to={item.to}
                    key={item.key}
                  /> 
                  : 
                  <Link href={item.to}><Menu.Item {...item} /></Link>) 
                }
              </Menu.Menu>
            </Menu>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default class NavMenu extends Component {

  render() {
    return (
      <ResponsiveNavBar>
        {this.props.children}
      </ResponsiveNavBar>
    )
  }

};