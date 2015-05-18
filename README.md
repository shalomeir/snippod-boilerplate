# **Snippod-Boilerplate**

## Overview

[**Snippod-Boilerplate**](https://github.com/shalomeir/snippod-boilerplate) is a starter kit like [yeogurt](https://github.com/larsonjj/generator-yeogurt) boilerplate. This boilerplate was made for **Snippod's baseline**.
We'd like to this service based on full stack single page web application architecture.
Snippod's architecture used a this kind of technology, **React + Flux (RefluxJS) + django REST framewrok + RDBMS**.
[This stack](https://www.gliffy.com/go/publish/7756603) is presented by diagram too.


## Base Repository, Module

Frontside [Snippod-Boilerplate](https://github.com/shalomeir/snippod-boilerplate) is based on [Yeogurt Generator](https://github.com/larsonjj/generator-yeogurt). 
And we recommend to check this [react-tweets](https://github.com/scotch-io/react-tweets) examples.
Also serverside are maded by [django REST framework](http://www.django-rest-framework.org/). We recommend to check this [blog post](https://thinkster.io/django-angularjs-tutorial/) and [repository](https://github.com/brwr/thinkster-django-angular) for server side.

We made this using these technologies.

* [React](http://facebook.github.io/react/)
* [Reflux](https://github.com/spoike/refluxjs)
* [Django](https://github.com/brwr/thinkster-django-angular) and [Djnago REST Framework](http://www.django-rest-framework.org/)

## Getting Started
First of all, you have to git clone this repository.

```
git clone https://github.com/shalomeir/snippod-boilerplate
```

### Installation for frontend WebApp
In the 'snippod-webapp' directory.

There are a few dependencies that this project relies on: Node.js, Grunt & Bower
The front side is based on [Yeogurt Generator](https://github.com/larsonjj/generator-yeogurt). So please follow that install guide if you want to know more description.

`npm install && bower install`

### Installation for REST API Server
In the 'snippod-server' directory

`virtualenv venv`
`source venv/bin/activate`
`pip install -r requirements.txt`

`python manage.py makemigrations && python manage.py migrate`
`python manage.py createsuperuser`


### Usage for frontend WebApp
In the 'snippod-webapp' directory

- `grunt` for testing and building a production version of your site.
- `grunt serve` for previewing your site/app on a development server.
- `grunt serve:docs` is the same as `grunt serve` but will also re-compile you automated documentation.
- `grunt serve:dist` for previewing a production version of your site/app.


### Usage for REST API Server 
In the 'snippod-server' directory

- `python manage.py runserver`


## Contributing

Contributions, questions and comments are all welcome and encouraged.

## License
[MIT License]().
Copyright 2015 Seonggyu Lee.




