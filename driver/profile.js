document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    const profileDisplay = document.getElementById('profile-display');
    const editButton = document.getElementById('edit-button');
    let profileData = {
      name: '',
      age: '',
      description: '',
      payment: ''
    };
  
    // Function to update profile display
    const updateProfileDisplay = () => {
      profileDisplay.innerHTML = `
        <strong>Name:</strong> ${profileData.name}<br>
        <strong>Age:</strong> ${profileData.age}<br>
        <strong>Description:</strong><br>${profileData.description}<br>
        <strong>Payment Information:</strong> ${profileData.payment}<br>
      `;
    };
  
    // Function to handle form submission
    profileForm.addEventListener('submit', function(event) {
      event.preventDefault();
      profileData.name = profileForm.name.value;
      profileData.age = profileForm.age.value;
      profileData.description = profileForm.description.value;
      profileData.payment = profileForm.payment.value;
      updateProfileDisplay();
      profileForm.reset(); // Reset form fields
    });
  
    // Edit button functionality
    editButton.addEventListener('click', function() {
      profileForm.name.value = profileData.name;
      profileForm.age.value = profileData.age;
      profileForm.description.value = profileData.description;
      profileForm.payment.value = profileData.payment;
    });
  });
  