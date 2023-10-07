# Fruit separator
> A simple project will help to find the image contains a fruit or not.

This is a startup repo. This project was created to help the students to get the idea how to use the javascript(brain js library) for image processing.

Overall architecture idea is to create a user interface that helps the users to upload a image that contains a fruit.
The code should figure out by itself that the fruit is ripe or not.

This is the points gathered so far: (Need some idea on this)

   - Receive the image data
   - Send the image data
   - Train the brain js in backend
   - Guess the image info and send to front-end


So what we are going to do is to load and image to an HTML page
Simple upload functionality and load the data.
Pixelate or read the all the pixels in a color
Each pixels color should be found in rgb and loaded as array of objects 
load the pixel data into the brainJS library 
but there is points that to be considered now
If the image as a small fruit section means it's not going to predict the output properly 
We need lot of images to load it into the HTML page and get the data out of them

https://www.npmjs.com/package/jimp
https://stackoverflow.com/questions/72082372/getting-the-color-of-a-pixel-on-an-image
