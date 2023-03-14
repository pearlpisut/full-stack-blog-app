# Full-Stack Blog App
This is my personal project, a full-stack Course Review Blog created with React and Django.

https://user-images.githubusercontent.com/82090378/224871827-995cae49-720b-4ff8-a51c-1a85d07dd6ea.mp4


## Main features
- Toggle Themes (light/dark)
- Search reviews
- Read reviews

## Motivations and messages
As much as I seek to find reviews to read before taking any course, I have become enjoy writing ones myself too. Through this project, users can view reviews of CUHK courses written by (as of now) me. While it took me a great deal to learn Django and work with states using React Hooks, I now feel quite more comfortable using both technologies.

I, in fact, was planning to create a full-stack personal portfolio website, where a course review blog is one of the features, to learn more about backend side of webapps for the very first time and stregthen skills in frontend frameworks. After realizing potential of each technologies and what I can learn further, developing such remaining features along with acquiring new skills will be my next objective.

## Technologies used
**Front-end**: HTML, CSS, SCSS, JavaScript, React.JS, Tailwind

**Back-end**: Django, Python

## How to install & run

Firstly, cloning this repository into your device. Then, run the following node command:

``` bash
git clone https://github.com/pearlpisut/full-stack-blog-app.git

npm install
```
The dependencies needed for running Django can be found in `backend/requirement.txt`.

Then, users shall start Django server and React server, respectively, through these commands:

``` bash
# cd backend
py manage.py runserver

# cd frontend
npm start
```

The Django will be running on `localhost:8000`, which is where the application, accessible via `localhost:3000`, will fetch the data from.

## Footnotes
Any suggestion is welcome! from backend part to frontend part, or from the current system to future imporvement, feel free to drop message to my email. Ps. I'm not a ~~good~~ designer, so excuse me the skilled frontend devs out there XD.
