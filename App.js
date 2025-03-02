const onSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Make sure your form has the proper attributes in the JSX
    // and includes the hidden field for Netlify
    
    // Use FormData for Netlify forms
    const formData = new FormData(e.target);
    
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${await response.text()}`);
    }
    
    // Handle success
    console.log('Form submitted successfully');
    // Reset form or show success message
  } catch (error) {
    console.error('Form submission error:', error);
    // Show error message to user
  }
};

// In your JSX form element, make sure you have:
<form 
  name="contact" 
  method="POST" 
  data-netlify="true"
  netlify-honeypot="bot-field"
  onSubmit={onSubmit}
>
  {/* Add this hidden input */}
  <input type="hidden" name="form-name" value="contact" />
  
  {/* Your other form fields */}
  
  <button type="submit">Submit</button>
</form> 