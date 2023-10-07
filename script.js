const data = [];
const net = new brain.NeuralNetwork();

// Disable all inputs and buttons except jsonInput initially
// document.querySelectorAll('input[type="file"], button').forEach((element) => {
//   console.log(`122 element.id`, element.id);
//   if (element.id !== "jsonInput") {
//     element.disabled = true;
//   }
// });

// Function to process JSON files
document.getElementById("jsonInput").addEventListener("change", function (e) {
  const jsonFiles = e.target.files;
  console.log("Reading json files");
  // Check if JSON files have been selected
  if (jsonFiles.length > 0) {
    // Parse and combine JSON data from multiple files
    for (const file of jsonFiles) {
      const reader = new FileReader();
      reader.onload = function (event) {
        try {
          const jsonData = JSON.parse(event.target.result);
          data.push(jsonData);
        } catch (error) {
          console.log(`122 error`, error);
          console.error(`Error parsing JSON from file: ${file.name}`);
        }
      };
      reader.readAsText(file);
    }
    // Train the neural network with the combined JSON data (data variable)
    // You can place your neural network training code here
  }
  console.log("click Train ME", data);
});

document.getElementById("train-me").addEventListener("click", () => {
  console.log("Training",data);
  net.train(data);
  console.log("Training done");
});
// Function to handle image upload and display
document.getElementById("imageInput").addEventListener("change", function (e) {
  const imageDisplay = document.getElementById("imageDisplay");
  imageDisplay.innerHTML = "";

  const file = e.target.files[0];

  // Check if a file has been selected
  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        // Display the uploaded image
        const img = document.createElement("img");
        img.src = event.target.result;
        img.style.maxWidth = "100%"; // Adjust the image size if needed
        img.style.height = "auto";
        imageDisplay.appendChild(img);

        // Convert the uploaded image into an RGB array of objects
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        img.onload = function () {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Extract pixel data
          const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
          const pixelDataArray = [];

          for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            pixelDataArray.push({ r, g, b });
          }

          // Run the RGB data through the neural network
          const guess = net.run(pixelDataArray)[0];
          console.log(`122 guess`, guess);
          const ripStatus = document.getElementById("ripStatus");

          if (guess > 0.5) {
            ripStatus.textContent = "It's ripe";
          } else {
            ripStatus.textContent = "It's unripe";
          }
        };
      } catch (error) {
        console.error("Error processing the uploaded image:", error);
      }
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(file);
  }
});

console.log("script loaded");
