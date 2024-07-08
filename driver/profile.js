const submitToGoogleForms = async (data) => {
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeM7NUTfjKYY4RxR2dXwOX764QFAIS5OJFo031lYKDrGEvcHg/formResponse';
  const formData = new URLSearchParams();

  // Map your form data to the Google Form input names
  formData.append('entry.848584137', data.name);
  formData.append('entry.1183249951', data.age);
  formData.append('entry.2009138981', data.description);
  formData.append('entry.1783359152', data.payment);
  formData.append('entry.XXXXXXXXX', data.profilePic); // You'll need to handle file uploads separately

  const response = await fetch(formUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  });

  if (response.ok) {
    console.log('Data submitted successfully');
  } else {
    console.error('Error submitting data');
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const profileForm = document.getElementById('profile-form');
  const profilePicInput = document.getElementById('profile-pic');
  let profileData = {
    name: '',
    age: '',
    description: '',
    payment: '',
    profilePic: ''
  };

  profileForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    profileData.name = profileForm.name.value;
    profileData.age = profileForm.age.value;
    profileData.description = profileForm.description.value;
    profileData.payment = profileForm.payment.value;

    const file = profilePicInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async function() {
        profileData.profilePic = reader.result;
        await submitToGoogleForms(profileData);
      };
      reader.readAsDataURL(file);
    } else {
      await submitToGoogleForms(profileData);
    }

    profileForm.reset();
  });
});
