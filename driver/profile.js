document.addEventListener('DOMContentLoaded', function() {
  const profileForm = document.getElementById('profile-form');
  const profileDisplay = document.getElementById('profile-display');
  const editButton = document.getElementById('edit-button');
  const profilePicInput = document.getElementById('profile-pic');
  let profileData = {
    name: '',
    age: '',
    description: '',
    payment: '',
    profilePic: ''
  };

  // Function to update profile display
  const updateProfileDisplay = () => {
    profileDisplay.innerHTML = `
      <strong>Name:</strong> ${profileData.name}<br>
      <strong>Age:</strong> ${profileData.age}<br>
      <strong>Description:</strong><br>${profileData.description}<br>
      <strong>Payment Information:</strong> ${profileData.payment}<br>
    `;
    if (profileData.profilePic) {
      const img = document.createElement('img');
      img.src = profileData.profilePic;
      profileDisplay.appendChild(img);
    }
  };

  // Function to handle form submission
  profileForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    profileData.name = profileForm.name.value;
    profileData.age = profileForm.age.value;
    profileData.description = profileForm.description.value;
    profileData.payment = profileForm.payment.value;

    const file = profilePicInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profileData.profilePic = e.target.result;
        submitToGoogleForms(profileData);
        updateProfileDisplay();
      };
      reader.readAsDataURL(file);
    } else {
      submitToGoogleForms(profileData);
      updateProfileDisplay();
    }

    profileForm.reset(); // Reset form fields
  });

  // Function to submit profile data to Google Web App
  const submitToGoogleForms = async (data) => {
    const formUrl = 'https://butransit-driver-panel.vercel.app/'; // Replace with your web app URL
    const response = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'name': data.name,
        'age': data.age,
        'description': data.description,
        'payment': data.payment,
        'profilePic': data.profilePic
      })
    });

    if (response.ok) {
      console.log('Form submitted successfully');
    } else {
      console.error('Error submitting form:', response.statusText);
    }
  };

  // Edit button functionality
  editButton.addEventListener('click', function() {
    profileForm.name.value = profileData.name;
    profileForm.age.value = profileData.age;
    profileForm.description.value = profileData.description;
    profileForm.payment.value = profileData.payment;
  });
});
