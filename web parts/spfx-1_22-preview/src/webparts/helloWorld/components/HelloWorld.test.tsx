// Mock the image requires since they won't exist in test environment
jest.mock('../assets/welcome-dark.png', () => 'test-dark-image', { virtual: true });
jest.mock('../assets/welcome-light.png', () => 'test-light-image', { virtual: true });

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HelloWorld from './HelloWorld';
import type { IHelloWorldProps } from './IHelloWorldProps';

describe('HelloWorld Component', () => {
  const defaultProps: IHelloWorldProps = {
    description: 'Hello World!',
    isDarkTheme: false,
    environmentMessage: 'Test environment',
    hasTeamsContext: false,
    userDisplayName: 'Test User'
  };

  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  const renderComponent = (props: IHelloWorldProps): void => {
    ReactDOM.render(<HelloWorld {...props} />, container);
  };

  test('renders h2 tag containing "Well done, {username}" text', () => {
    renderComponent(defaultProps);
    
    const h2Elements = container.querySelectorAll('h2');
    const targetHeading = Array.from(h2Elements).find(h2 => 
      h2.textContent?.includes('Well done, Test User!')
    );
    
    expect(targetHeading).toBeDefined();
    expect(targetHeading?.textContent).toBe('Well done, Test User!');
  });

  test('displays correct text after "Web part property value: "', () => {
    renderComponent(defaultProps);
    
    const textContent = container.textContent || '';
    expect(textContent).toContain('Web part property value:');
    
    // Find the strong element that should contain "Hello World!"
    const strongElements = container.querySelectorAll('strong');
    const descriptionElement = Array.from(strongElements).find(strong => 
      strong.textContent === 'Hello World!'
    );
    
    expect(descriptionElement).toBeDefined();
    expect(descriptionElement?.textContent).toBe('Hello World!');
  });

  test('ul tag with className starting with "links" has 7 li children', () => {
    renderComponent(defaultProps);
    
    // Find the ul element with className containing "links"
    const ulElements = container.querySelectorAll('ul');
    const linksUl = Array.from(ulElements).find(ul => 
      ul.className.includes('links')
    );
    
    expect(linksUl).toBeDefined();
    
    // Count the li children
    const liElements = linksUl?.querySelectorAll('li');
    expect(liElements?.length).toBe(7);
  });

  test('renders different welcome image based on theme', () => {
    // Test light theme
    renderComponent({ ...defaultProps, isDarkTheme: false });
    const welcomeImage = container.querySelector('img');
    expect(welcomeImage?.src).toContain('test-light-image');
  });

  test('renders different welcome image for dark theme', () => {
    // Test dark theme
    renderComponent({ ...defaultProps, isDarkTheme: true });
    const welcomeImage = container.querySelector('img');
    expect(welcomeImage?.src).toContain('test-dark-image');
  });

  test('applies teams class when hasTeamsContext is true', () => {
    renderComponent({ ...defaultProps, hasTeamsContext: true });
    const sectionElement = container.querySelector('section');
    expect(sectionElement?.className).toContain('teams');
  });

  test('does not apply teams class when hasTeamsContext is false', () => {
    renderComponent({ ...defaultProps, hasTeamsContext: false });
    const sectionElement = container.querySelector('section');
    expect(sectionElement?.className).not.toContain('teams');
  });

  test('displays environment message', () => {
    const testMessage = 'Custom environment message';
    renderComponent({ ...defaultProps, environmentMessage: testMessage });
    
    const textContent = container.textContent || '';
    expect(textContent).toContain(testMessage);
  });

  test('renders all expected links in the links list', () => {
    renderComponent(defaultProps);
    
    const expectedLinks = [
      'SharePoint Framework Overview',
      'Use Microsoft Graph in your solution',
      'Build for Microsoft Teams using SharePoint Framework',
      'Build for Microsoft Viva Connections using SharePoint Framework',
      'Publish SharePoint Framework applications to the marketplace',
      'SharePoint Framework API reference',
      'Microsoft 365 Developer Community'
    ];

    const textContent = container.textContent || '';
    expectedLinks.forEach(linkText => {
      expect(textContent).toContain(linkText);
    });
  });

  test('all links have correct attributes', () => {
    renderComponent(defaultProps);
    
    const links = container.querySelectorAll('a');
    
    expect(links.length).toBeGreaterThan(0);
    
    Array.from(links).forEach(link => {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noreferrer');
      expect(link.getAttribute('href')).toBeTruthy();
    });
  });
});