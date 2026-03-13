export type Experience = {
  role: string
  company: string
  start: string
  end: string
  location?: string
  summary: string
  highlights: string[]
  tags: string[]
}

export const experiences: Experience[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Singtel',
    start: 'Nov 2021',
    end: 'Present',
    location: 'Singapore',
    summary:
      'Leading frontend architecture and development of scalable web applications, driving performance optimization, developer experience improvements, and cross-team technical standards.',
    highlights: [
      'Led the design and development of a scalable micro-frontend solution using React and Rollup, streamlining eKYC workflows across registration, verification, and outcome flows.',
      'Refactored the payments application by implementing lazy loading, reducing bundle size by 60% and significantly improving checkout performance.',
      'Contributed to new payment methods resulting in a 25% increase in business sales, and developed a save card feature boosting sales by 3%.',
      'Standardized a shared UI component library with Storybook documentation and built internal CLI tools using Node.js to automate development tasks.',
      'Containerized frontend applications using Docker and Kubernetes, and conducted regular Lighthouse performance audits with an in-house automation portal.'
    ],
    tags: ['React', 'TypeScript', 'Micro-Frontend', 'Performance', 'Docker', 'Kubernetes']
  },
  {
    role: 'Senior Frontend Engineer',
    company: '99.co',
    start: 'Jun 2021',
    end: 'Oct 2021',
    location: 'Singapore',
    summary:
      'Contributed to the design and development of key product pages, enhanced debugging infrastructure, and improved test automation coverage for the Singapore property market.',
    highlights: [
      'Designed and developed the New Launch page, resulting in a 3% uplift in website traffic and supporting customer acquisition in the Singapore market.',
      'Integrated Sentry sourcemaps into the support infrastructure, enhancing code-level visibility and accelerating issue resolution.',
      'Increased test automation coverage by 30% through structured testing strategies, bolstering reliability of the New Launch feature.',
      'Created and maintained technical documentation of UI components using Storybook, streamlining design consistency and team collaboration.'
    ],
    tags: ['React', 'Redux', 'TypeScript', 'Sentry', 'Storybook', 'Testing']
  },
  {
    role: 'Software Engineer',
    company: 'Capita',
    start: 'Jun 2020',
    end: 'Jun 2021',
    location: 'Singapore',
    summary:
      'Designed and developed frontend applications, enhanced backend observability, and improved code quality through testing frameworks and modern development practices.',
    highlights: [
      'Led requirements gathering sessions with stakeholders and translated design mockups into interactive user interfaces, prioritizing usability and accessibility.',
      'Enhanced backend system observability by integrating Dynatrace for service monitoring and configuring proactive alerts, improving debugging speed.',
      'Developed unit and integration testing frameworks to maintain high code quality, and actively contributed to elevating coding practices through code reviews.',
      'Designed scalable frontend solutions using React, Redux, and TypeScript, applying internal design systems to build reusable components.'
    ],
    tags: ['React', 'TypeScript', 'Redux', 'Dynatrace', 'Testing', 'AWS']
  },
  {
    role: 'Software Design Engineer',
    company: 'ITCAN',
    start: 'Mar 2019',
    end: 'May 2020',
    location: 'Singapore',
    summary:
      'Led frontend development and CI/CD pipeline automation, driving code quality through comprehensive testing, performance optimization, and modern development practices.',
    highlights: [
      'Designed and implemented a CI/CD pipeline using Jenkins for automated deployment of frontend applications to AWS (S3 & CloudFront), eliminating manual intervention.',
      'Led frontend development using React, Redux, and TypeScript across all stages of the SDLC to ensure high-quality deliverables.',
      'Set up comprehensive end-to-end testing using Cypress, writing robust test cases for reliable feature rollouts and early bug detection.',
      'Enforced strict testing guidelines with a minimum 75% code coverage, integrating CI checks to block non-compliant builds.'
    ],
    tags: ['React', 'TypeScript', 'Jenkins', 'Cypress', 'AWS', 'CI/CD']
  },
  {
    role: 'FullStack Developer',
    company: 'VISEO',
    start: 'Aug 2017',
    end: 'Feb 2019',
    location: 'Singapore',
    summary:
      'Developed e-commerce applications and mobile solutions, working across Shopify, React, and React Native to deliver tailored business solutions.',
    highlights: [
      'Developed and customized e-commerce applications on Shopify, tailoring landing pages to enhance customer engagement through personalized user experiences.',
      'Researched, designed, and developed a React Native mobile application for travelers at Solvay, ensuring alignment with user needs and platform guidelines.',
      'Programmed and integrated Google Sign-In using Firebase, enabling secure authentication for both iOS and Android environments.',
      'Built modular and scalable frontend applications using React and React Router, following best practices for maintainability and performance.'
    ],
    tags: ['React', 'React Native', 'Shopify', 'Firebase', 'Node.js', 'E-Commerce']
  },
  {
    role: 'Senior Software Engineer',
    company: 'Comtel',
    start: 'Nov 2015',
    end: 'Aug 2017',
    location: 'Singapore',
    summary:
      'Designed integration strategies for third-party APIs and embedded UI components, while providing technical consultation and SDK training to global development teams.',
    highlights: [
      'Conducted requirements gathering and analysis to design integration strategies for third-party APIs interacting with Fuji Xerox Multi-Functional Devices.',
      'Coded and enhanced the Address Module using Backbone.js, ensuring smooth integration with next-generation devices and printers.',
      'Delivered SDK training sessions for developers in global teams, ensuring smooth onboarding and technical knowledge transfer.',
      'Participated in architectural discussions with solution and technical architects to ensure scalable designs aligned with Enterprise Architecture standards.'
    ],
    tags: ['JavaScript', 'Backbone.js', 'Java', 'SDK Development', 'API Integration']
  },
  {
    role: 'Software Engineer',
    company: 'Persistent Systems',
    start: 'Jan 2013',
    end: 'Mar 2015',
    location: 'India',
    summary:
      'Designed and developed frontend applications using ExtJS and AngularJS, collaborating with backend teams to build responsive and scalable enterprise solutions.',
    highlights: [
      'Integrated ExtJS applications with REST APIs built using Java and Spring, ensuring smooth data communication and application functionality.',
      'Designed and developed customized solutions for Actifio, conducting thorough research on customer requirements to meet client expectations.',
      'Contributed to reusable UI components using the ExtJS framework, improving development efficiency and enabling code reusability across projects.',
      'Conducted thorough testing and debugging of AngularJS SPAs and ExtJS modules, ensuring functionality, performance, and code quality benchmarks.'
    ],
    tags: ['ExtJS', 'AngularJS', 'JavaScript', 'Java', 'REST APIs', 'CSS']
  }
]

