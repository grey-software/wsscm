<div align="center">
    <img alt="Community Cleanup Logo" width="100" src="https://github.com/grey-software/community-cleanup/raw/main/community-cleanup-logo.svg">
</div>


# Community Cleanup

Software that allows citizens and their governments to effectively coordinate community cleanup and garbage collection efforts.

## 🥅 Motivation 

**👤 AG**: As a resident of Pakistan, I see garbage thrown illegally and burned recklessly. Despite my personal efforts to ameliorate the problem, there has to be a larger, coordinated effort that involves the municipal corporations that are responsible for collecting garbage. 

## 👁️ Vision 

Citizens will have a mobile app with which they can:

- Report areas of dumped garbage
- Request garbage cleanup from their municipality
- Request for collection points to be placed in their areas 
- View nearby trash cans and collection points

The municipalities will have a web and mobile dashboard with which they can:

- Monitor the incoming requests for garbage cleanup or collection points from users.
- Manage collection operations, with live updates coming from the deployed collectors  

## ⚙️ Implementation

### Platforms

This system requires:

- A mobile app for citizens
- A web and mobile dashboard for municipal corporations

Due to the advances in web technologies, we recommend deploying this system on the web, where citizens will use a Progressive Web App and the government can use a web dashboard. This will allow developers to share code and mitigate the need for maintaining multiple versions for each platform. 

### Data Storage

The garbage markers users place and the pictures they take will be sent to the servers deployed by the municipal corporations. It is likely that this data won't be of a sensitive nature, so it could fall under open government data. If a rewards system is put in place that requires verification of a citizen's data, then measures will have to be taken to ensure that data remains accessible only to the municipal corporations.

## Project Status

Garbage Collector was formally ideated on Github on the 14th of November, 2020
The project invites any willing Product Owners, Designers, and Engineers.

## 🛡️ Team

### ⚓ Product Owners

[Arsala](https://github.com/ArsalaBangash)

[Join our community](http://community.grey.software) and [learn how to contribute](https://grey.software/contribute)

### 🖌 Designers

[Join our community](http://community.grey.software) and [learn how to contribute](https://grey.software/contribute)

We are open to you using any tool of your choice to help us prototype.

### 🛠️ Engineers

[Join our community](http://community.grey.software) and [learn how to contribute](https://grey.software/contribute)

Projected tech stack:

- The [Quasar](https://quasar.dev) or [Nuxt](https://nuxtjs.org) web frameworks to develop the web apps
- [Vue.js](https://cssc.utm.utoronto.ca/resources/vue) to provide advanced functionality on top of [HTML](https://cssc.utm.utoronto.ca/resources/html), [CSS](https://cssc.utm.utoronto.ca/resources/css), and [JS](https://cssc.utm.utoronto.ca/resources/javascript).

## Made with Love, Joy, and Hope

This project was ideated and developed at Grey Software, a not-for-profit organization that empowers students to build open-source software for their communities and societies.

<img alt="Grey Software Sticker" width="500" src="https://grey.software/grey-software-sticker.png">
