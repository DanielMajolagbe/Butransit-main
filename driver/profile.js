// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBycv2aba03DLLwk5w98BakRjStUOB8LI4",
  authDomain: "butransit-1.firebaseapp.com",
  projectId: "butransit-1",
  storageBucket: "butransit-1.appspot.com",
  messagingSenderId: "574695582590",
  appId: "1:574695582590:web:bd463917cbf4c94d7ea12f",
  measurementId: "G-0RCGKJC18F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    const profileDisplay = document.getElementById('profile-display');
    const editButton = document.getElementById('edit-button');
    const profilePicInput = document.getElementById('profile-pic');
    const loadNameInput = document.getElementById('load-name');
    const loadButton = document.getElementById('load-button');
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
    profileForm.addEventListener('submit', function(event) {
      event.preventDefault();
      profileData.name = profileForm.name.value;
      profileData.age = profileForm.age.value;
      profileData.description = profileForm.description.value;
      profileData.payment = profileForm.payment.value;
  
      const file = profilePicInput.files[0];
      if (file) {
        const storageRef = firebase.storage().ref();
        const profilePicRef = storageRef.child('profilePics/' + file.name);
        profilePicRef.put(file).then(() => {
          profilePicRef.getDownloadURL().then((url) => {
            profileData.profilePic = url;
            saveProfileData(profileData);
            updateProfileDisplay();
          });
        });
      } else {
        saveProfileData(profileData);
        updateProfileDisplay();
      }
  
      profileForm.reset(); // Reset form fields
    });
  
    // Function to save profile data to Firebase
    const saveProfileData = (data) => {
      firebase.database().ref('profiles/' + data.name).set(data);
    };
  
    // Edit button functionality
    editButton.addEventListener('click', function() {
      profileForm.name.value = profileData.name;
      profileForm.age.value = profileData.age;
      profileForm.description.value = profileData.description;
      profileForm.payment.value = profileData.payment;
    });
  
    // Function to load profile data from Firebase
    const loadProfileForName = (name) => {
      const profileRef = firebase.database().ref('profiles/' + name);
      profileRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
          profileData = snapshot.val();
          updateProfileDisplay();
        } else {
          alert('Profile not found');
        }
      });
    };
  
    // Load button functionality
    loadButton.addEventListener('click', function() {
      const name = loadNameInput.value;
      if (name) {
        loadProfileForName(name);
      } else {
        alert('Please enter a name');
      }
    });
  });
  