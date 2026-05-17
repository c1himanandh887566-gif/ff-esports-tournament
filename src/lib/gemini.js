export const parseScreenshots = async (files) => {
  try {
    // Convert all files to base64 format for the API request
    const fileToGenerativePart = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            data: reader.result.split(',')[1],
            mimeType: file.type
          });
        };
        reader.readAsDataURL(file);
      });
    };

    const imageParts = await Promise.all(files.map(fileToGenerativePart));

    // Send the base64 images to our Vercel Serverless backend function
    const response = await fetch('/api/parse-screenshots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ files: imageParts }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error parsing screenshots:", error);
    throw error;
  }
};
