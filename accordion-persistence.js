// accordion-persistence.js
document.addEventListener('DOMContentLoaded', function() {
 const accordion = document.getElementById('sustainabilityAccordion');
 if (!accordion) return;

 const storageKey = 'intel-accordion-state';
 
 // Load saved state from localStorage
 const savedState = JSON.parse(localStorage.getItem(storageKey)) || {};
 
 // Initialize accordion with saved state
 const bsCollapseInstances = [];
 accordion.querySelectorAll('.accordion-collapse').forEach((collapseEl, index) => {
 const collapseId = collapseEl.id;
 const bsCollapse = new bootstrap.Collapse(collapseEl, {
 toggle: savedState[collapseId] === true
 });
 bsCollapseInstances.push({ id: collapseId, instance: bsCollapse });
 
 // Listen for show/hide events to update storage
 collapseEl.addEventListener('shown.bs.collapse', function() {
 updateStorage(collapseId, true);
 });
 collapseEl.addEventListener('hidden.bs.collapse', function() {
 updateStorage(collapseId, false);
 });
 });
 
 function updateStorage(id, isOpen) {
 const currentState = JSON.parse(localStorage.getItem(storageKey)) || {};
 currentState[id] = isOpen;
 localStorage.setItem(storageKey, JSON.stringify(currentState));
 }
 
 // Optional: Add a clear button for testing
 const clearButton = document.createElement('button');
 clearButton.className = 'btn btn-sm btn-outline-secondary mt-3';
 clearButton.innerHTML = '<i class="fas fa-eraser me-1"></i>Reset Accordion Memory';
 clearButton.addEventListener('click', function() {
 localStorage.removeItem(storageKey);
 bsCollapseInstances.forEach(item => item.instance.hide());
 alert('Accordion memory cleared. All panels closed.');
 });
 
 accordion.parentNode.appendChild(clearButton);
});
