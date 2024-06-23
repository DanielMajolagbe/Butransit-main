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
    const loadProfileData = () => {
        const profileRef = firebase.database().ref('profiles/' + profileData.name);
        profileRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                profileData = snapshot.val();
                updateProfileDisplay();
            }
        });
    };

    // Function to handle profile name input for loading data
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

    // Example: Load profile data for a given name on initial load
    // You can replace 'exampleName' with the desired profile name to load
    loadProfileForName('Driver-panel');
});
