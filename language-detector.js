// language-detector.js
document.addEventListener('DOMContentLoaded', function() {
 const htmlElement = document.documentElement;
 
 // Initial detection based on lang attribute
 function checkAndApplyRTL() {
 const currentLang = htmlElement.getAttribute('lang') || 'en';
 const rtlLanguages = ['ar', 'he', 'fa', 'ur']; // Common RTL language codes
 
 if (rtlLanguages.includes(currentLang)) {
 htmlElement.setAttribute('dir', 'rtl');
 document.body.classList.add('rtl-active');
 console.log(`RTL applied for language: ${currentLang}`);
 } else {
 htmlElement.setAttribute('dir', 'ltr');
 document.body.classList.remove('rtl-active');
 }
 }
 
 // MutationObserver to detect Google Translate changes
 const observer = new MutationObserver(function(mutations) {
 mutations.forEach(function(mutation) {
 if (mutation.attributeName === 'lang') {
 checkAndApplyRTL();
 }
 });
 });
 
 // Start observing the html element for lang changes
 observer.observe(htmlElement, { attributes: true });
 
 // Initial check
 checkAndApplyRTL();
 
 // Add visual feedback for RTL state
 function createRTLIndicator() {
 const indicator = document.createElement('div');
 indicator.className = 'rtl-indicator alert alert-info alert-dismissible fade show position-fixed bottom-0 end-0 m-3';
 indicator.setAttribute('role', 'alert');
 indicator.innerHTML = `
 <i class="fas fa-language me-2"></i>
 <strong>RTL Layout Active</strong> - Page direction adjusted for right-to-left language.
 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
 `;
 document.body.appendChild(indicator);
 }
 
 // Listen for RTL class changes to show indicator
 const rtlObserver = new MutationObserver(function() {
 if (document.body.classList.contains('rtl-active')) {
 createRTLIndicator();
 }
 });
 
 rtlObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
});
