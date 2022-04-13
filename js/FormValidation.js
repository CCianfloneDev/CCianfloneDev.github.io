
/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e){
	// Hides all error messages
	hideErrors();

	// Check if there is errors
	if (formHasErrors()){
		// Prevent submission
		e.preventDefault();
		return false;
	}

	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e){
	// Confirm that the user wants to reset the form.
	if (confirm('Clear form?')){
		// Ensure all error fields are hidden
		hideErrors();
		
		// Set focus to the first text field on the page
		document.getElementById("fullname").focus();
		
		// the form will reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	
	return false;	
}

/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement){
	// Check if the text field has a value
	if (fieldElement.value == null || trim(fieldElement.value) == "" )
	{
		// Invalid entry
		return false;
	}
	
	// Valid entry
	return true;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors(){
	let errorFlag = false;
	let requiredFields = ["fullname", "phoneNumber", "email"];

	// looping through required fields and checking if there is any input. If not returns true.
	for (let i = 0; i < requiredFields.length; i++)
	{
		let textField = document.getElementById(requiredFields[i]);
		if (!formFieldHasInput(textField))
		{
			document.getElementById(requiredFields[i] + "_error").style.display = "block";

			if (!errorFlag)
			{
				textField.focus();
				textField.select();
			}
			
			// no input in one of the required fields.
			errorFlag = true;
		}
	}

	// creating regex for phone number
	let phoneNumberRegex = new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);
	let phoneNumberField = document.getElementById("phoneNumber").value;

	if(!phoneNumberRegex.test(phoneNumberField))
	{
		document.getElementById("phoneNumberformat_error").style.display = "block";

		if(!errorFlag)
		{
			document.getElementById("phoneNumber").focus();
			document.getElementById("phoneNumber").select();
		}

		errorFlag = true;
	}

	// creating regex for email.
	let emailRegex = new RegExp(/\S+@\S+\.\S+/);
	let emailField = document.getElementById("email").value;

	// testing input in email field.
	if(!emailRegex.test(emailField))
	{
		document.getElementById("emailformat_error").style.display = "block";

		if(!errorFlag)
		{
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		errorFlag = true;
	}


	return errorFlag;
}


/*
 * Hides all of the error elements.
 */
function hideErrors(){
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for ( let i = 0; i < error.length; i++ ){
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function load(){
	// Event listeners for submit and reset buttons
	document.getElementById("submit").addEventListener("click", validate);
	document.getElementById("reset").addEventListener("click", resetForm);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);
